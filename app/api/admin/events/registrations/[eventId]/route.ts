import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    // Check if user is authenticated and is an admin
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const eventId = params.eventId;
    
    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, title: true }
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Fetch all registrations for this event
    const registrations = await prisma.eventRegistration.findMany({
      where: { eventId },
      orderBy: { createdAt: 'desc' },
      include: {
        payment: {
          select: {
            status: true,
            amount: true,
            transactionId: true,
            createdAt: true
          }
        }
      }
    });

    return NextResponse.json({
      event,
      registrations,
      count: registrations.length
    });
  } catch (error) {
    console.error("Error fetching event registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch event registrations" },
      { status: 500 }
    );
  }
} 