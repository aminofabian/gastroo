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
    const { 
      eventId, 
      firstName, 
      lastName, 
      email, 
      phone, 
      paymentMethod,
      paymentReference,
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
    const requiresPayment = event.memberPrice && event.memberPrice > 0;
    
    // If event requires payment but no payment info is provided
    if (requiresPayment && paymentMethod !== "FREE" && !paymentReference && !paymentTrackingId) {
      return NextResponse.json(
        { error: "Payment information is required for this event" },
        { status: 400 }
      );
    }

    try {
      // Create a unique ID for the registration
      const registrationId = `reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      
      console.log(`Creating registration for user: ${session.user.id}, event: ${eventId}, email: ${email}`);
      
      // Create payment record if payment info is provided
      let paymentId = null;
      if (paymentMethod !== "FREE" && paymentReference && paymentTrackingId) {
        console.log(`Creating payment record for tracking ID: ${paymentTrackingId}`);
        
        const payment = await prisma.payment.create({
          data: {
            amount: event.memberPrice || 0,
            status: paymentStatus || 'PENDING',
            transactionId: paymentTrackingId,
            phoneNumber: phone,
            description: `Event Registration: ${event.title}`,
            userId: session.user.id,
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
      
      console.log(`Registration created successfully: id=${registration.id}, eventId=${eventId}, email=${email}, paymentStatus=${registration.paymentStatus}`);

      // Verify that the registration was actually created
      const verifyRegistration = await prisma.eventRegistration.findUnique({
        where: { id: registrationId }
      });
      
      if (!verifyRegistration) {
        console.error(`Failed to verify registration creation: id=${registrationId}`);
        throw new Error("Failed to verify registration creation");
      }
      
      console.log(`Registration verified in database: id=${verifyRegistration.id}, status=${verifyRegistration.paymentStatus}`);

      // Also add the user to the event's attendees if they're not already there
      try {
        const isAlreadyAttendee = await prisma.eventAttendees.findFirst({
          where: {
            A: eventId,
            B: session.user.id
          }
        });
        
        if (!isAlreadyAttendee) {
          await prisma.eventAttendees.create({
            data: {
              A: eventId,
              B: session.user.id
            }
          });
          console.log(`User ${session.user.id} added to event ${eventId} attendees`);
        }
      } catch (attendeeError) {
        console.error("Error adding user to event attendees:", attendeeError);
        // Continue even if this fails
      }

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