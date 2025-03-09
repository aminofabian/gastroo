import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      OrderTrackingId,
      OrderMerchantReference,
      OrderNotificationType,
      OrderPaymentStatus
    } = body;

    // Update payment status in your database
    await prisma.payment.update({
      where: { transactionId: OrderMerchantReference },
      data: {
        status: OrderPaymentStatus,
        // Add other relevant fields
      }
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('IPN handling error:', error);
    return Response.json({ error: 'Failed to process IPN' }, { status: 500 });
  }
} 