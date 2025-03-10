import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { addCorsHeaders } from "@/app/api/cors";

const guestRegistrationSchema = z.object({
  eventId: z.string(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  paymentMethod: z.enum(["MPESA", "CARD", "BANK_TRANSFER"]),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = guestRegistrationSchema.parse(body);

    // Check if the event exists
    const event = await prisma.event.findUnique({
      where: { id: validatedData.eventId },
      select: {
        id: true,
        title: true,
        nonMemberPrice: true,
        capacity: true,
        registrationDeadline: true,
        attendees: {
          select: { id: true }
        },
        registrations: {
          select: { id: true, email: true }
        }
      }
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Check if registration is closed
    if (event.registrationDeadline && new Date(event.registrationDeadline) < new Date()) {
      return NextResponse.json({ error: "Registration is closed for this event" }, { status: 400 });
    }

    // Check if event is at capacity
    const totalRegistrations = event.attendees.length + event.registrations.length;
    if (event.capacity && totalRegistrations >= event.capacity) {
      return NextResponse.json({ error: "Event is at full capacity" }, { status: 400 });
    }

    // Check if guest is already registered
    const isAlreadyRegistered = event.registrations.some(
      (registration) => registration.email === validatedData.email
    );

    if (isAlreadyRegistered) {
      return NextResponse.json({ error: "Already registered for this event" }, { status: 400 });
    }

    // Create a guest registration
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId: validatedData.eventId,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        paymentMethod: validatedData.paymentMethod,
        paymentStatus: "PENDING"
      }
    });

    // Return registration info with payment instructions
    return addCorsHeaders(NextResponse.json({
      success: true,
      message: "Registration successful",
      registrationId: registration.id,
      event: {
        id: event.id,
        title: event.title,
        price: event.nonMemberPrice
      },
      paymentInstructions: {
        MPESA: "Please proceed to payment to complete your registration.",
        CARD: "Please proceed to payment to complete your registration.",
        BANK_TRANSFER: "Please proceed to payment to complete your registration."
      }[validatedData.paymentMethod],
      nextStep: "payment"
    }));
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