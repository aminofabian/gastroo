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

    // Check if event has capacity limit
    if (event.capacity) {
      // Count existing registrations
      const registrationCount = await prisma.eventRegistration.count({
        where: { eventId }
      });

      // Count attendees
      const attendeeCount = await prisma.eventAttendees.count({
        where: { A: eventId }
      });

      if (registrationCount + attendeeCount >= event.capacity) {
        return NextResponse.json(
          { error: "Event is at full capacity" },
          { status: 400 }
        );
      }
    }

    // Check if already registered
    const existingRegistration = await prisma.eventRegistration.findFirst({
      where: {
        eventId,
        email
      }
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: "You are already registered for this event" },
        { status: 400 }
      );
    }

    // Create registration
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId,
        firstName,
        lastName,
        email,
        phone,
        paymentMethod,
        paymentStatus: "PENDING"
      }
    });

    return NextResponse.json({
      success: true,
      message: "Registration successful. Redirecting to payment...",
      registrationId: registration.id,
      event: {
        id: event.id,
        title: event.title
      }
    });
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