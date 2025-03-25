export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
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

    // Get all users with their membership applications
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        title: true,
        specialization: true,
        hospital: true,
        profileSlug: true,
        namePrefix: true,
        fullName: true,
        designation: true,
        lastActive: true,
        profileCompleteness: true,
        isProfilePublic: true,
        hasActiveSubscription: true,
        subscriptionEndDate: true,
        phone: true,
        isMember: true,
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
        }
      },
      orderBy: {
        lastActive: 'desc'
      }
    });

    // Convert the data to ensure the status is properly formatted
    const formattedUsers = users.map(user => {
      // If the user has membership applications, ensure the status is properly formatted
      if (user.membershipApplication && user.membershipApplication.length > 0) {
        // Log the raw application data for debugging
        console.log(`Raw application data for user ${user.id}:`, 
          JSON.stringify(user.membershipApplication[0], null, 2));
          
        return {
          ...user,
          membershipApplication: user.membershipApplication.map(app => {
            // Log the status value
            console.log(`Status value for application ${app.id}:`, app.status);
            
            return {
              ...app,
              // Ensure status is one of the expected values
              status: app.status === 'APPROVED' ? 'APPROVED' :
                     app.status === 'REJECTED' ? 'REJECTED' : 'PENDING'
            };
          })
        };
      }
      return user;
    });

    console.log("Returning users with formatted status:", 
      formattedUsers.map(u => ({ 
        id: u.id, 
        email: u.email, 
        isMember: u.isMember, 
        appStatus: u.membershipApplication && u.membershipApplication.length > 0 ? u.membershipApplication[0].status : null 
      }))
    );

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Error fetching users", { status: 500 });
  }
}