import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.json();
    const { eventId, firstName, lastName, email, phone, paymentMethod } = data;

    if (!eventId || !firstName || !lastName || !email || !phone || !paymentMethod) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { attendees: true },
    });

    if (!event) {
      return new NextResponse("Event not found", { status: 404 });
    }

    // Check if user is already registered
    const existingRegistration = await prisma.eventAttendees.findFirst({
      where: {
        eventId,
        email,
      },
    });

    if (existingRegistration) {
      return new NextResponse("Already registered for this event", { status: 400 });
    }

    // Check capacity if set
    if (event.capacity && event.attendees.length >= event.capacity) {
      return new NextResponse("Event is at full capacity", { status: 400 });
    }

    // Create registration
    const registration = await prisma.eventAttendees.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        paymentMethod,
        event: { connect: { id: eventId } },
        user: session.user.email ? { connect: { email: session.user.email } } : undefined,
      },
    });

    return NextResponse.json(registration);
  } catch (error) {
    console.error("[EVENT_REGISTRATION]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 