import { prisma } from "@/lib/prisma";
import { checkPaymentStatus } from "@/lib/pesapal";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderTrackingId = searchParams.get('OrderTrackingId');
  const merchantReference = searchParams.get('OrderMerchantReference');

  if (!orderTrackingId || !merchantReference) {
    return Response.json({ error: 'Invalid callback parameters' }, { status: 400 });
  }

  try {
    const paymentStatus = await checkPaymentStatus(orderTrackingId);

    if (paymentStatus.status === 'COMPLETED') {
      // Update payment record
      await prisma.payment.update({
        where: { transactionId: merchantReference },
        data: {
          status: 'COMPLETED',
          paymentMethod: paymentStatus.paymentMethod,
        }
      });

      // Update user subscription
      await prisma.user.update({
        where: { id: merchantReference.split('-')[1] },
        data: {
          subscriptionStatus: 'ACTIVE',
          subscriptionStartDate: new Date(),
          lastPaymentAmount: paymentStatus.amount,
          lastPaymentDate: new Date()
        }
      });
    }

    // Redirect to success or failure page
    const redirectUrl = paymentStatus.status === 'COMPLETED'
      ? '/payment/success'
      : '/payment/failed';

    return Response.redirect(new URL(redirectUrl, process.env.NEXT_PUBLIC_APP_URL));

  } catch (error) {
    console.error('Callback processing error:', error);
    return Response.redirect(new URL('/payment/failed', process.env.NEXT_PUBLIC_APP_URL));
  }
} 