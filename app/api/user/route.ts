export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        image: true,
        title: true,
        bio: true,
        specialization: true,
        hospital: true,
        profileSlug: true,
        namePrefix: true,
        fullName: true,
        designation: true,
        isOnboarded: true,
        isMember: true,
        profileCompleteness: true,
        membershipApplication: {
          select: {
            id: true,
            status: true,
            createdAt: true,
            specialization: true,
            licenseNumber: true,
            hospital: true,
            address: true,
            city: true,
            county: true,
            postalCode: true
          }
        },
        socialLinks: {
          select: {
            platform: true,
            url: true,
          }
        },
        education: {
          select: {
            institution: true,
            degree: true,
            field: true,
            startYear: true,
            endYear: true,
          }
        },
        achievements: {
          select: {
            title: true,
            description: true,
            year: true,
          }
        }
      }
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Log the user data for debugging
    console.log("User data from API:", {
      id: user.id,
      email: user.email,
      isMember: user.isMember,
      membershipApplication: user.membershipApplication
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return new NextResponse(`Error fetching user: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}