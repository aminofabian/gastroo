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
        image: true,
        title: true,
        bio: true,
        specialization: true,
        hospital: true,
        profileSlug: true,
        namePrefix: true,
        fullName: true,
        designation: true,
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
          },
          orderBy: {
            startYear: 'desc'
          }
        },
        achievements: {
          select: {
            title: true,
            description: true,
            year: true,
          },
          orderBy: {
            year: 'desc'
          }
        }
      }
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Remove sensitive information
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return new NextResponse("Error fetching profile", { status: 500 });
  }
} 