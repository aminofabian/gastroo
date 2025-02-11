import { NextResponse } from "next/server";
import { z } from "zod";

const guestRegistrationSchema = z.object({
  eventId: z.string(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  paymentMethod: z.enum(["MPESA", "CARD", "BANK_TRANSFER"]),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = guestRegistrationSchema.parse(body);

    // TODO: Implement your database logic here
    // 1. Create a guest user record if it doesn't exist
    // 2. Register the guest for the event
    // 3. Generate payment instructions based on the payment method
    // 4. Send confirmation email with payment instructions

    // This is a placeholder response
    return NextResponse.json({
      message: "Registration successful",
      paymentInstructions: {
        MPESA: "Please send payment to XXXXXX and use your email as reference",
        CARD: "You will be redirected to the payment gateway",
        BANK_TRANSFER: "Please transfer to Account: XXXXX, Bank: XXXXX, Branch: XXXXX",
      }[validatedData.paymentMethod],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error processing guest registration:", error);
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
} 