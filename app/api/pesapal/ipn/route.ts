import { prisma } from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log('IPN received:', data);
    
    // Verify payment status
    if (data.status === 'COMPLETED') {
      // Find the payment record
      const payment = await prisma.payment.findUnique({
        where: {
          transactionId: data.merchant_reference
        },
        include: {
          eventRegistration: true
        }
      });

      if (payment) {
        console.log(`IPN: Found payment record: id=${payment.id}, status=${payment.status}, transactionId=${payment.transactionId}`);
        
        // Update payment status in your database
        await prisma.payment.update({
          where: {
            id: payment.id
          },
          data: {
            status: 'COMPLETED'
          }
        });
        
        console.log('IPN: Payment record updated successfully to COMPLETED status');

        // Check if this is an event payment by looking at the transaction ID format
        if (data.merchant_reference.startsWith('EVENT-')) {
          console.log('IPN: Processing event registration payment');
          
          // Update event registration if it exists
          if (payment.eventRegistration) {
            console.log(`IPN: Found linked event registration: id=${payment.eventRegistration.id}, eventId=${payment.eventRegistration.eventId}`);
            
            await prisma.eventRegistration.update({
              where: { id: payment.eventRegistration.id },
              data: {
                paymentStatus: 'COMPLETED'
              }
            });
            console.log('IPN: Event registration updated successfully to COMPLETED status');
          } else {
            console.log('IPN: No direct event registration link found, searching by payment ID');
            
            // Try to find the event registration by payment ID
            const eventRegistration = await prisma.eventRegistration.findFirst({
              where: { paymentId: payment.id }
            });
            
            if (eventRegistration) {
              console.log(`IPN: Found event registration by payment ID: id=${eventRegistration.id}, eventId=${eventRegistration.eventId}`);
              
              await prisma.eventRegistration.update({
                where: { id: eventRegistration.id },
                data: {
                  paymentStatus: 'COMPLETED'
                }
              });
              console.log('IPN: Event registration updated successfully to COMPLETED status');
            } else {
              console.log('IPN: Searching for event registration by transaction ID pattern');
              
              // Try to extract event ID from the transaction ID
              // Format: EVENT-eventId-timestamp
              const parts = data.merchant_reference.split('-');
              if (parts.length >= 2) {
                const eventId = parts[1];
                const userEmail = payment.userId; // This might be the email or user ID
                
                console.log(`IPN: Extracted eventId=${eventId}, searching for registration with this eventId and user connection`);
                
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
                  console.log(`IPN: Found ${registrations.length} registrations for this event and user`);
                  
                  // Update the most recent registration
                  const registration = registrations[0];
                  await prisma.eventRegistration.update({
                    where: { id: registration.id },
                    data: {
                      paymentStatus: 'COMPLETED',
                      paymentId: payment.id
                    }
                  });
                  console.log(`IPN: Updated registration id=${registration.id} to COMPLETED status`);
                } else {
                  console.warn('IPN: Could not find any event registrations for this event and user');
                }
              }
            }
          }
        } else {
          console.log('IPN: Processing membership payment');
          // This is a membership payment, don't update event registrations
        }
      } else {
        console.warn('IPN: Payment record not found for transaction ID:', data.merchant_reference);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('IPN Error:', error);
    return NextResponse.json({ error: 'IPN processing failed' }, { status: 500 });
  }
} 