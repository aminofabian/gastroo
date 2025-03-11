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
  paymentMethod: z.enum(["MPESA", "CARD", "BANK_TRANSFER", "FREE"]),
  paymentTrackingId: z.string().optional(),
  paymentStatus: z.enum(["PENDING", "PAID", "FAILED", "COMPLETED"]).optional(),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { 
      eventId, 
      firstName, 
      lastName, 
      email, 
      phone, 
      paymentMethod,
      paymentTrackingId,
      paymentStatus
    } = data;

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

    // Check if the event requires payment
    const requiresPayment = event.nonMemberPrice && event.nonMemberPrice > 0;
    
    // If event requires payment but no payment info is provided
    if (requiresPayment && paymentMethod !== "FREE" && !paymentTrackingId) {
      return NextResponse.json(
        { error: "Payment information is required for this event" },
        { status: 400 }
      );
    }

    try {
      // Create a unique ID for the registration
      const registrationId = `reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      
      console.log(`Creating guest registration for event: ${eventId}, email: ${email}`);
      
      // Create payment record if payment info is provided
      let paymentId = null;
      if (paymentMethod !== "FREE" && paymentTrackingId) {
        console.log(`Creating payment record for tracking ID: ${paymentTrackingId}`);
        
        const payment = await prisma.payment.create({
          data: {
            amount: event.nonMemberPrice || 0,
            status: paymentStatus || 'PENDING',
            transactionId: paymentTrackingId,
            phoneNumber: phone,
            description: `Guest Registration: ${event.title}`,
            userId: 'guest', // Use a placeholder for guest users
            currency: 'KES',
          }
        });
        
        paymentId = payment.id;
        console.log(`Payment record created: id=${payment.id}, status=${payment.status}`);
      }
      
      // Use Prisma's create method instead of raw SQL
      const registration = await prisma.eventRegistration.create({
        data: {
          id: registrationId,
          eventId: eventId,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          paymentMethod: paymentMethod,
          paymentStatus: paymentStatus || 'PENDING',
          isAttended: false,
          paymentId: paymentId,
        }
      });

      console.log(`Guest registration created successfully: id=${registration.id}, eventId=${eventId}, email=${email}, paymentStatus=${registration.paymentStatus}`);

      // Verify that the registration was actually created
      const verifyRegistration = await prisma.eventRegistration.findUnique({
        where: { id: registrationId }
      });
      
      if (!verifyRegistration) {
        console.error(`Failed to verify guest registration creation: id=${registrationId}`);
        throw new Error("Failed to verify registration creation");
      }
      
      console.log(`Guest registration verified in database: id=${verifyRegistration.id}, status=${verifyRegistration.paymentStatus}`);

      return NextResponse.json({
        success: true,
        message: "Registration successful.",
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