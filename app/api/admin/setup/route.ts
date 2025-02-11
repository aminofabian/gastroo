import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if there are any admin users
    const adminCount = await prisma.user.count({
      where: {
        role: UserRole.ADMIN
      }
    });

    // Only allow setting up the first admin
    if (adminCount > 0) {
      return new NextResponse("Admin already exists", { status: 403 });
    }

    // Update the current user to be an admin
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email
      },
      data: {
        role: UserRole.ADMIN
      }
    });

    return NextResponse.json({
      message: "Successfully set up admin user",
      user: {
        email: updatedUser.email,
        role: updatedUser.role
      }
    });
  } catch (error) {
    console.error("Error setting up admin:", error);
    return new NextResponse("Error setting up admin", { status: 500 });
  }
} 