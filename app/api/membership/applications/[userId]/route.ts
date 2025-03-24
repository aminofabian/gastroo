export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if user has admin role
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true, id: true }
    });

    if (currentUser?.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const userId = params.userId;
    const { status } = await request.json();

    // Validate status
    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return new NextResponse("Invalid status value", { status: 400 });
    }

    // Find the user's membership application
    const application = await prisma.membershipApplication.findFirst({
      where: { userId: userId }
    });

    if (!application) {
      return new NextResponse("Membership application not found", { status: 404 });
    }

    // Update membership application status
    const updatedApplication = await prisma.membershipApplication.update({
      where: { id: application.id },
      data: {
        status: status,
        ...(status === "APPROVED" 
          ? { 
              approvedAt: new Date(),
              approvedBy: currentUser.id
            } 
          : {})
      }
    });

    // If approved, also update user's membership status
    if (status === "APPROVED") {
      await prisma.user.update({
        where: { id: userId },
        data: { isMember: true }
      });
    } else if (status === "REJECTED") {
      await prisma.user.update({
        where: { id: userId },
        data: { isMember: false }
      });
    }

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error("[MEMBERSHIP_APPLICATION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
