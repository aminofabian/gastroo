import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    // Get the current user
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Check if the user is registered for this event
    const registration = await prisma.eventRegistration.findFirst({
      where: {
        eventId: eventId,
        email: session.user.email,
      },
    });

    return NextResponse.json({
      isRegistered: !!registration,
      registrationId: registration?.id || null,
      paymentStatus: registration?.paymentStatus || null,
    });
  } catch (error) {
    console.error("Check registration error:", error);
    return NextResponse.json(
      { error: "Failed to check registration status" },
      { status: 500 }
    );
  }
} 