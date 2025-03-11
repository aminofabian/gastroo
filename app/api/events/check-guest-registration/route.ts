import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    const email = searchParams.get("email");

    if (!eventId || !email) {
      return NextResponse.json(
        { error: "Event ID and email are required" },
        { status: 400 }
      );
    }

    // Check if the guest is registered for this event
    const registration = await prisma.eventRegistration.findFirst({
      where: {
        eventId: eventId,
        email: email,
      },
    });

    return NextResponse.json({
      isRegistered: !!registration,
      registrationId: registration?.id || null,
      paymentStatus: registration?.paymentStatus || null,
    });
  } catch (error) {
    console.error("Check guest registration error:", error);
    return NextResponse.json(
      { error: "Failed to check registration status" },
      { status: 500 }
    );
  }
} 