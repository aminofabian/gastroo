import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get the user's email from the session
    const userEmail = session.user.email;
    
    if (!userEmail) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    // Find all registrations for this user
    const registrations = await prisma.eventRegistration.findMany({
      where: {
        email: userEmail
      },
      select: {
        id: true,
        eventId: true,
        paymentStatus: true
      }
    });

    return NextResponse.json(registrations);
  } catch (error) {
    console.error("Error fetching user registrations:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Failed to fetch registrations"
      },
      { status: 500 }
    );
  }
} 