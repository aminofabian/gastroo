export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("Approval API called with params:", params);
    
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

    const userId = params.id;
    const { status } = await request.json();
    
    console.log("Received status update request:", { userId, status });

    // Validate status
    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return new NextResponse("Invalid status value", { status: 400 });
    }

    // First, update the membership application if it exists
    // This is important to do first to ensure the application status is updated
    const membershipApplication = await prisma.membershipApplication.findFirst({
      where: { userId: userId }
    });

    if (membershipApplication) {
      try {
        console.log("Found membership application:", membershipApplication.id);
        
        // Use a transaction to ensure both updates succeed or fail together
        const result = await prisma.$transaction([
          // Update the membership application status
          prisma.membershipApplication.update({
            where: { id: membershipApplication.id },
            data: { 
              // Use explicit casting for the enum value
              status: status === "APPROVED" ? "APPROVED" : 
                     status === "REJECTED" ? "REJECTED" : 
                     "PENDING"
            }
          }),
          
          // Update the user's isMember status
          prisma.user.update({
            where: { id: userId },
            data: {
              isMember: status === "APPROVED"
            }
          })
        ]);
        
        console.log("Transaction result:", result);
        
        // Return the updated user from the transaction
        return NextResponse.json(result[1]);
      } catch (err) {
        console.error("Error in transaction:", err);
        return new NextResponse(`Error updating application: ${err instanceof Error ? err.message : 'Unknown error'}`, { status: 500 });
      }
    } else {
      // If no membership application exists, just update the user
      console.log("No membership application found for user:", userId);
      
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          isMember: status === "APPROVED"
        }
      });
      
      return NextResponse.json(updatedUser);
    }
  } catch (error) {
    console.error("Error updating user approval status:", error);
    return new NextResponse(`Error updating user approval status: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}
