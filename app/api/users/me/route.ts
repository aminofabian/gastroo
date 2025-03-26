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
        // Include document URLs
        cvUrl: true,
        licenseUrl: true,
        otherDocumentsUrls: true,
        // Include membership application
        membershipApplication: {
          select: {
            id: true,
            status: true,
            createdAt: true,
            cvUrl: true,
            licenseUrl: true,
            otherDocumentsUrls: true
          }
        }
      }
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return new NextResponse(`Error fetching user: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
} 