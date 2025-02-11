import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { isAllowedAdmin } from "@/lib/admin";

interface Activity {
  id: string;
  type: "user" | "donation" | "partner";
  message: string;
  time: string;
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if user is an allowed admin
    if (!isAllowedAdmin(session.user.email)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Get total members count
    const totalMembers = await prisma.user.count();
    
    // Get active partners count
    const activePartners = await prisma.user.count({
      where: {
        role: UserRole.VERIFIED_USER,
        hasActiveSubscription: true
      }
    });

    // Get recent activities
    const recentActivities: Activity[] = [];

    // Get recent user registrations
    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: {
        id: 'desc'
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        namePrefix: true
      }
    });

    // Add user registrations to activities
    recentUsers.forEach(user => {
      recentActivities.push({
        id: `user-${user.id}`,
        type: "user",
        message: `New member registration: ${[user.namePrefix, user.firstName, user.lastName].filter(Boolean).join(" ")}`,
        time: "recently"
      });
    });

    // Get recent membership applications
    const recentApplications = await prisma.membershipApplication.findMany({
      take: 5,
      orderBy: {
        id: 'desc'
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            namePrefix: true
          }
        }
      }
    });

    // Add applications to activities
    recentApplications.forEach(application => {
      recentActivities.push({
        id: `application-${application.id}`,
        type: "partner",
        message: `New membership application from ${[
          application.user.namePrefix,
          application.user.firstName,
          application.user.lastName
        ].filter(Boolean).join(" ")}`,
        time: formatDistanceToNow(application.createdAt, { addSuffix: true })
      });
    });

    return NextResponse.json({
      stats: [
        {
          label: "Total Members",
          value: totalMembers.toString(),
          change: "N/A",
          trend: "up",
          icon: "FaUsers",
          color: "emerald",
        },
        {
          label: "Active Partners",
          value: activePartners.toString(),
          change: "N/A",
          trend: "up",
          icon: "FaHandshake",
          color: "green",
        },
        {
          label: "Total Donations",
          value: "Coming Soon",
          change: "N/A",
          trend: "up",
          icon: "FaDonate",
          color: "purple",
        },
        {
          label: "News Articles",
          value: "Coming Soon",
          change: "N/A",
          trend: "up",
          icon: "FaNewspaper",
          color: "orange",
        },
      ],
      recentActivities: recentActivities.slice(0, 5) // Get only the 5 most recent activities
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return new NextResponse("Error fetching dashboard data", { status: 500 });
  }
} 