import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    // Update the user to be an admin
    const updatedUser = await prisma.user.update({
      where: {
        email: email
      },
      data: {
        role: UserRole.ADMIN
      }
    });

    return NextResponse.json({
      message: "Successfully updated user to admin",
      user: {
        email: updatedUser.email,
        role: updatedUser.role
      }
    });
  } catch (error) {
    console.error("Error updating user to admin:", error);
    return new NextResponse("Error updating user to admin", { status: 500 });
  }
} 