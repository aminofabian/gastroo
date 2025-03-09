import { submitPayment } from '@/lib/pesapal';
import { auth } from '@/auth';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { amount, membershipType } = body;

    const paymentResponse = await submitPayment({
      amount,
      email: session.user.email!,
      firstName: session.user.firstName || '',
      lastName: session.user.lastName || '',
      phone: body.phone || '',
      membershipType
    });

    return Response.json(paymentResponse);
  } catch (error) {
    console.error('Payment submission error:', error);
    return Response.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    );
  }
} 