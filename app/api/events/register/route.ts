import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await req.json();
    const { eventId, firstName, lastName, email, phone, paymentMethod } = data;

    if (!eventId || !firstName || !lastName || !email || !phone || !paymentMethod) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Check if registration deadline has passed
    if (event.registrationDeadline && new Date(event.registrationDeadline) < new Date()) {
      return NextResponse.json(
        { error: "Registration is closed for this event" },
        { status: 400 }
      );
    }

    try {
      // Create a unique ID for the registration
      const registrationId = `reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      
      // Insert the registration directly into the database
      await prisma.$executeRaw`
        INSERT INTO "event_registrations" (
          "id", "eventId", "firstName", "lastName", "email", "phone", 
          "paymentMethod", "paymentStatus", "isAttended", "createdAt", "updatedAt"
        ) VALUES (
          ${registrationId}, ${eventId}, ${firstName}, ${lastName}, ${email}, ${phone}, 
          ${paymentMethod}, 'PENDING', false, ${new Date()}, ${new Date()}
        )
      `;

      return NextResponse.json({
        success: true,
        message: "Registration successful. Redirecting to payment...",
        registrationId,
        event: {
          id: event.id,
          title: event.title
        }
      });
    } catch (dbError) {
      console.error("Database error during registration:", dbError);
      
      // Check if it's a duplicate registration error
      if (dbError instanceof Error && dbError.message.includes("duplicate key")) {
        return NextResponse.json(
          { error: "You are already registered for this event" },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: "Failed to create registration in database" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Failed to register for event"
      },
      { status: 500 }
    );
  }
} 