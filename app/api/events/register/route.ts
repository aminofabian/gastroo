import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const registerSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
});

export async function POST(req: Request) {
  console.log("[EVENT_REGISTRATION] Starting registration process");
  
  try {
    // Get the authenticated user
    const session = await auth();
    console.log('[EVENT_REGISTRATION] Full auth session:', JSON.stringify(session));
    console.log('[EVENT_REGISTRATION] Auth session user ID:', session?.user?.id);
    
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse and validate the request body
    const body = await req.json();
    console.log("[EVENT_REGISTRATION] Request body:", body);
    
    const { eventId } = registerSchema.parse(body);

    // Check if user exists
    const user = await db.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) {
      console.log("[EVENT_REGISTRATION] User not found:", session.user.id);
      return new NextResponse("User not found", { status: 404 });
    }

    // Check if event exists and get its details
    const event = await db.event.findUnique({
      where: { id: eventId },
      include: {
        attendees: {
          select: { id: true }
        }
      }
    });

    console.log("[EVENT_REGISTRATION] Event found:", event?.id);

    if (!event) {
      return new NextResponse("Event not found", { status: 404 });
    }

    // Check if registration is closed
    if (event.registrationDeadline && new Date(event.registrationDeadline) < new Date()) {
      return new NextResponse("Registration is closed for this event", { status: 400 });
    }

    // Check if event is at capacity
    if (event.capacity && event.attendees.length >= event.capacity) {
      return new NextResponse("Event is at full capacity", { status: 400 });
    }

    // Check if user is already registered
    const isAlreadyRegistered = event.attendees.some(
      (attendee) => attendee.id === session.user.id
    );

    if (isAlreadyRegistered) {
      return new NextResponse("Already registered for this event", { status: 400 });
    }

    // Register user for the event
    console.log("[EVENT_REGISTRATION] Registering user:", session.user.id, "for event:", eventId);
    
    const updatedEvent = await db.event.update({
      where: { id: eventId },
      data: {
        attendees: {
          connect: { id: session.user.id }
        }
      },
      include: {
        attendees: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    console.log("[EVENT_REGISTRATION] Registration successful");

    return NextResponse.json({
      success: true,
      message: "Successfully registered for the event",
      event: updatedEvent
    });

  } catch (error) {
    console.error("[EVENT_REGISTRATION_ERROR]", error);

    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({
        success: false,
        message: "Invalid request data",
        errors: error.errors
      }), { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    return new NextResponse(JSON.stringify({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error"
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 