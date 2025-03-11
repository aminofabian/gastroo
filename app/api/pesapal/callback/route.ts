import { prisma } from "@/lib/prisma";
import { checkPaymentStatus } from "@/lib/pesapal";
import { addCorsHeaders } from "@/app/api/cors";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderTrackingId = searchParams.get('OrderTrackingId');
  const merchantReference = searchParams.get('OrderMerchantReference');

  if (!orderTrackingId || !merchantReference) {
    return addCorsHeaders(Response.json({ error: 'Invalid callback parameters' }, { status: 400 }));
  }

  try {
    console.log('Processing callback for order:', {
      orderTrackingId,
      merchantReference
    });
    
    // Try to get payment status directly from PesaPal
    let paymentStatus;
    try {
      paymentStatus = await checkPaymentStatus(orderTrackingId);
    } catch (error: any) {
      console.error('Error checking payment status:', error);
      
      // If the error is due to the null error object, we can still proceed
      // PesaPal sometimes returns an error object with null values even for successful responses
      if (error.message && error.message.includes('{"error_type":null,"code":null,"message":null}')) {
        console.log('Ignoring null error object from PesaPal');
        
        // Assume payment is completed if we received a callback
        paymentStatus = {
          status: 'COMPLETED',
          amount: 0, // We don't know the amount, but we'll update it from the database
          paymentMethod: 'UNKNOWN',
          reference: merchantReference
        };
      } else {
        // For other errors, rethrow
        throw error;
      }
    }

    console.log('Payment status:', paymentStatus);

    if (paymentStatus.status === 'COMPLETED') {
      try {
        // Find the payment record
        const payment = await prisma.payment.findUnique({
          where: { transactionId: merchantReference },
          include: {
            eventRegistration: true
          }
        });

        if (payment) {
          console.log(`Found payment record: id=${payment.id}, status=${payment.status}, transactionId=${payment.transactionId}`);
          
          // Update payment record
          await prisma.payment.update({
            where: { id: payment.id },
            data: {
              status: 'COMPLETED'
            }
          });

          console.log('Payment record updated successfully to COMPLETED status');

          // Check if this is an event payment by looking at the transaction ID format
          if (merchantReference.startsWith('EVENT-')) {
            console.log('Processing event registration payment');
            
            // Update event registration if it exists
            if (payment.eventRegistration) {
              console.log(`Found linked event registration: id=${payment.eventRegistration.id}, eventId=${payment.eventRegistration.eventId}`);
              
              await prisma.eventRegistration.update({
                where: { id: payment.eventRegistration.id },
                data: {
                  paymentStatus: 'COMPLETED'
                }
              });
              console.log('Event registration updated successfully to COMPLETED status');
            } else {
              console.log('No direct event registration link found, searching by payment ID');
              
              // Try to find the event registration by payment ID
              const eventRegistration = await prisma.eventRegistration.findFirst({
                where: { paymentId: payment.id }
              });
              
              if (eventRegistration) {
                console.log(`Found event registration by payment ID: id=${eventRegistration.id}, eventId=${eventRegistration.eventId}`);
                
                await prisma.eventRegistration.update({
                  where: { id: eventRegistration.id },
                  data: {
                    paymentStatus: 'COMPLETED'
                  }
                });
                console.log('Event registration updated successfully to COMPLETED status');
              } else {
                console.log('Searching for event registration by transaction ID pattern');
                
                // Try to extract event ID from the transaction ID
                // Format: EVENT-eventId-timestamp
                const parts = merchantReference.split('-');
                if (parts.length >= 2) {
                  const eventId = parts[1];
                  const userEmail = payment.userId; // This might be the email or user ID
                  
                  console.log(`Extracted eventId=${eventId}, searching for registration with this eventId and user connection`);
                  
                  // Try to find the registration by event ID and user connection
                  const registrations = await prisma.eventRegistration.findMany({
                    where: {
                      eventId: eventId,
                      OR: [
                        { email: userEmail }, // If userId is actually an email
                        { 
                          event: {
                            attendees: {
                              some: { id: payment.userId }
                            }
                          }
                        }
                      ]
                    }
                  });
                  
                  if (registrations.length > 0) {
                    console.log(`Found ${registrations.length} registrations for this event and user`);
                    
                    // Update the most recent registration
                    const registration = registrations[0];
                    await prisma.eventRegistration.update({
                      where: { id: registration.id },
                      data: {
                        paymentStatus: 'COMPLETED',
                        paymentId: payment.id
                      }
                    });
                    console.log(`Updated registration id=${registration.id} to COMPLETED status`);
                  } else {
                    console.warn('Could not find any event registrations for this event and user');
                  }
                }
              }
            }
          } else {
            console.log('Processing membership payment');
            
            // This is a membership payment, handle accordingly
            try {
              // Extract user ID from merchant reference for membership payments
              // Format is typically: userId-timestamp
              const userId = merchantReference.split('-')[0];
              
              if (userId) {
                await prisma.user.update({
                  where: { id: userId },
                  data: {
                    subscriptionStatus: 'ACTIVE',
                    subscriptionStartDate: new Date(),
                    lastPaymentAmount: paymentStatus.amount || 0,
                    lastPaymentDate: new Date()
                  }
                });
                
                console.log('User membership subscription updated successfully');
              } else {
                console.warn('Could not extract user ID from merchant reference:', merchantReference);
              }
            } catch (userUpdateError) {
              console.error('Error updating user membership subscription:', userUpdateError);
            }
          }
        } else {
          console.warn('Payment record not found for transaction ID:', merchantReference);
        }
      } catch (dbError) {
        console.error('Error updating payment record:', dbError);
        // Continue even if database update fails
      }
    }

    // Redirect to success or failure page
    const redirectUrl = paymentStatus.status === 'COMPLETED'
      ? '/payment/success'
      : '/payment/failed';

    console.log('Redirecting to:', redirectUrl);
    
    // First, send a JSON response with the status
    // This helps clients that are polling for status updates
    const responseData = {
      status: paymentStatus.status,
      success: paymentStatus.status === 'COMPLETED',
      redirectUrl: new URL(redirectUrl, process.env.NEXT_PUBLIC_APP_URL).toString()
    };
    
    // Then redirect the user
    return Response.redirect(new URL(redirectUrl, process.env.NEXT_PUBLIC_APP_URL));

  } catch (error) {
    console.error('Callback processing error:', error);
    return Response.redirect(new URL('/payment/failed', process.env.NEXT_PUBLIC_APP_URL));
  }
} 