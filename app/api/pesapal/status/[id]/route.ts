import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const payment = await prisma.payment.findUnique({
      where: { transactionId: params.id },
    });

    if (!payment) {
      return Response.json({ error: "Payment not found" }, { status: 404 });
    }

    return Response.json({ status: payment.status });
  } catch (error) {
    console.error('Status check error:', error);
    return Response.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
} 