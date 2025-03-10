import { prisma } from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Verify payment status
    if (data.status === 'COMPLETED') {
      // Update payment status in your database
      await prisma.payment.update({
        where: {
          merchantReference: data.merchant_reference
        },
        data: {
          status: 'COMPLETED',
          paymentMethod: data.payment_method,
          transactionDate: new Date()
        }
      });

      // You might want to emit an event or update the UI somehow
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('IPN Error:', error);
    return NextResponse.json({ error: 'IPN processing failed' }, { status: 500 });
  }
} 