import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { amount, phone, membershipType } = await req.json();

    // Format phone number (remove leading 0 and add 254)
    const formattedPhone = phone.startsWith('0') 
      ? `254${phone.slice(1)}` 
      : phone;

    // Generate a unique checkout request ID
    const checkoutRequestId = `GSK${Date.now()}${Math.random().toString(36).slice(-4)}`;

    // Create a pending payment record
    await prisma.payment.create({
      data: {
        userId: session.user.id,
        amount,
        status: "PENDING",
        transactionId: checkoutRequestId,
        phoneNumber: formattedPhone,
        description: `GSK ${membershipType} Membership Payment`,
        currency: "KES",
      },
    });

    // Initiate STK Push
    const response = await fetch(`${process.env.PESAPAL_API_URL}/stkpush/process`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PESAPAL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        BusinessShortCode: process.env.PESAPAL_SHORTCODE,
        Password: process.env.PESAPAL_PASSWORD,
        Timestamp: new Date().toISOString(),
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: process.env.PESAPAL_SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/pesapal/callback`,
        AccountReference: "GSK Membership",
        TransactionDesc: `GSK ${membershipType} Membership Payment`,
      }),
    });

    const data = await response.json();

    if (data.ResponseCode !== "0") {
      throw new Error(data.ResponseDescription || "Failed to initiate payment");
    }

    return Response.json({ 
      success: true, 
      checkoutRequestId,
      message: "STK push sent successfully" 
    });

  } catch (error) {
    console.error('STK push error:', error);
    return Response.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    );
  }
} 