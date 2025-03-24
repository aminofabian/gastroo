export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if user has admin role
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true }
    });

    if (currentUser?.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Get all membership applications with user information
    const applications = await prisma.membershipApplication.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            title: true,
            specialization: true,
            hospital: true,
            fullName: true,
            isMember: true,
            phone: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("[MEMBERSHIP_APPLICATIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
