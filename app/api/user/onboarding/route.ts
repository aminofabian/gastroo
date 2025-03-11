import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

export async function PUT(request: Request) {
  try {
    const session = await auth();
    
    // Check if user is authenticated
    if (!session?.user) {
      return new NextResponse("Unauthorized: No session found", { status: 401 });
    }
    
    // Get user ID from session
    const userId = session.user.id;
    if (!userId) {
      return new NextResponse("Unauthorized: No user ID found", { status: 401 });
    }

    // Parse request data
    let data;
    try {
      data = await request.json();
    } catch (error) {
      console.error("Error parsing request body:", error);
      return new NextResponse("Invalid request body", { status: 400 });
    }

    const { isOnboarded, profileCompleteness, email, ...profileData } = data;

    // Log the data being processed
    console.log("Processing onboarding data:", { userId, profileData });

    try {
      // Update user profile and onboarding status by ID
      // Explicitly exclude email from the update to avoid unique constraint errors
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          isOnboarded: true,
          profileCompleteness: profileCompleteness || 100,
          firstName: profileData.firstName || undefined,
          lastName: profileData.lastName || undefined,
          phone: profileData.phone || undefined,
          designation: profileData.designation || undefined,
          specialization: profileData.specialization || undefined,
          hospital: profileData.hospital || undefined,
          membershipType: profileData.membershipType || undefined,
        },
      });

      return NextResponse.json({ success: true, user: updatedUser });
    } catch (dbError: any) {
      console.error("Database error updating user:", dbError);
      return new NextResponse(`Database error: ${dbError.message}`, { status: 500 });
    }
  } catch (error: any) {
    console.error("Error updating onboarding status:", error);
    return new NextResponse(`Error updating onboarding status: ${error.message}`, { status: 500 });
  }
} 