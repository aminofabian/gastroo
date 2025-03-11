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
      return addCorsHeaders(NextResponse.json({ error: "Event not found" }, { status: 404 }));
    }

    // Check if registration is closed
    if (event.registrationDeadline && new Date(event.registrationDeadline) < new Date()) {
      return addCorsHeaders(NextResponse.json({ error: "Registration is closed for this event" }, { status: 400 }));
    }

    // Check if event is at capacity
    const totalRegistrations = event.attendees.length + event.registrations.length;
    if (event.capacity && totalRegistrations >= event.capacity) {
      return addCorsHeaders(NextResponse.json({ error: "Event is at full capacity" }, { status: 400 }));
    }

    // Check if guest is already registered
    const isAlreadyRegistered = event.registrations.some(
      (registration) => registration.email === validatedData.email
    );

    if (isAlreadyRegistered) {
      return addCorsHeaders(NextResponse.json({ error: "Already registered for this event" }, { status: 400 }));
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
          ${registrationId}, ${validatedData.eventId}, ${validatedData.firstName}, 
          ${validatedData.lastName}, ${validatedData.email}, ${validatedData.phone}, 
          ${validatedData.paymentMethod}, 'PENDING', false, ${new Date()}, ${new Date()}
        )
      `;

      // Return registration info with payment instructions
      return addCorsHeaders(NextResponse.json({
        success: true,
        message: "Registration successful",
        registrationId,
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
    } catch (dbError) {
      console.error("Database error during guest registration:", dbError);
      
      // Check if it's a duplicate registration error
      if (dbError instanceof Error && dbError.message.includes("duplicate key")) {
        return addCorsHeaders(NextResponse.json(
          { error: "You are already registered for this event" },
          { status: 400 }
        ));
      }
      
      return addCorsHeaders(NextResponse.json(
        { error: "Failed to create registration in database" },
        { status: 500 }
      ));
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return addCorsHeaders(NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      ));
    }

    console.error("Error processing guest registration:", error);
    return addCorsHeaders(NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    ));
  }
} 