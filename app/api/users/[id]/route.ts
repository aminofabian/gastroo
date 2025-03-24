export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if user has admin role or is requesting their own data
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true, id: true }
    });

    const isAdmin = currentUser?.role === "ADMIN";
    const isSelf = currentUser?.id === params.id;

    if (!isAdmin && !isSelf) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
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
        profileCompleteness: true,
        phone: true,
        address: true,
        city: true,
        county: true,
        postalCode: true,
        approvalStatus: true,
        approvedAt: true,
        approvedBy: true,
        cvUrl: true,
        licenseUrl: true,
        otherDocumentsUrls: true,
        isMember: true,
        membershipType: true,
        membershipNumber: true,
        lastPaymentDate: true,
        lastPaymentAmount: true,
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

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return new NextResponse(`Error fetching user: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}
