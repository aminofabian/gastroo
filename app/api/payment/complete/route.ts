import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, membershipType, amount } = await req.json();

    // Calculate subscription dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1); // 1 year subscription

    // Generate membership number (you can customize this format)
    const membershipNumber = `GSK${Date.now().toString().slice(-6)}`;

    // Update user subscription status
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: "ACTIVE",
        subscriptionStartDate: startDate,
        subscriptionEndDate: endDate,
        lastPaymentAmount: amount,
        lastPaymentDate: startDate,
        membershipNumber,
        currency: "KES",
      },
    });

    // Create a payment record
    await prisma.payment.create({
      data: {
        userId,
        amount,
        currency: "KES",
        status: "COMPLETED",
        transactionId: `TXN${Date.now()}`,
        phoneNumber: "", // This will be filled by the payment gateway
        description: `${membershipType === "new" ? "New" : "Renewal"} Membership Payment`,
      },
    });

    return Response.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Payment completion error:", error);
    return Response.json({ success: false, error: "Failed to process payment" }, { status: 500 });
  }
} 