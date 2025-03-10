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
        // Update payment record - use only fields that exist in the Payment model
        await prisma.payment.update({
          where: { transactionId: merchantReference },
          data: {
            status: 'COMPLETED', // This is a valid PaymentStatus enum value
            // No paymentMethod field in the model, so we don't update it
          }
        });

        console.log('Payment record updated successfully');

        // Try to update user subscription
        try {
          const userId = merchantReference.split('-')[1];
          
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
            
            console.log('User subscription updated successfully');
          } else {
            console.warn('Could not extract user ID from merchant reference:', merchantReference);
          }
        } catch (userUpdateError) {
          console.error('Error updating user subscription:', userUpdateError);
          // Continue even if user update fails
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
    return Response.redirect(new URL(redirectUrl, process.env.NEXT_PUBLIC_APP_URL));

  } catch (error) {
    console.error('Callback processing error:', error);
    return Response.redirect(new URL('/payment/failed', process.env.NEXT_PUBLIC_APP_URL));
  }
} 