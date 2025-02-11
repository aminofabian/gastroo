import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      designation,
      specialization,
      licenseNumber,
      hospital,
      address,
      city,
      county,
      postalCode,
    } = body;

    // Create membership application
    const membershipApplication = await prisma.membershipApplication.create({
      data: {
        userId: session.user.id,
        phone,
        designation,
        specialization,
        licenseNumber,
        hospital,
        address,
        city,
        county,
        postalCode,
        status: "PENDING",
      },
    });

    // Get current user data
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { email: true }
    });

    // Prepare update data without email
    const updateData = {
      firstName,
      lastName,
      phone,
      designation,
      specialization,
      hospital,
      profileCompleteness: 50, // Set initial profile completeness
    };

    // Only include email in update if it's different from current email
    if (email !== currentUser?.email) {
      // Check if the new email is already used by another user
      const existingUserWithEmail = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUserWithEmail && existingUserWithEmail.id !== session.user.id) {
        return new NextResponse("Email already in use", { status: 400 });
      }

      Object.assign(updateData, { email });
    }

    // Update user profile with the provided information
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: updateData,
    });

    return NextResponse.json({
      membershipApplication,
      user: updatedUser,
    });
  } catch (error) {
    console.error("[MEMBERSHIP_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 