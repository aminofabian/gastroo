"use server";

import { auth } from "@/auth";
import db from "@/lib/db";

export async function getDashboardData() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: {
        membershipApplication: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        eventsAttending: {
          where: {
            startDate: { gte: new Date() }
          },
          orderBy: { startDate: 'asc' },
          take: 3,
        }
      }
    });

    if (!user) {
      return { error: "User not found" };
    }

    // Generate notifications based on user data
    const notifications = [];

    // Add membership-related notifications
    if (user.membershipApplication?.[0]) {
      const application = user.membershipApplication[0];
      if (application.status === 'PENDING') {
        notifications.push({
          id: `membership-${application.id}`,
          title: "Membership Application",
          message: "Your membership application is under review",
          time: application.createdAt.toISOString(),
        });
      }
    }

    // Add upcoming event notifications
    user.eventsAttending.forEach(event => {
      const daysUntilEvent = Math.ceil((event.startDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      if (daysUntilEvent <= 7) {
        notifications.push({
          id: `event-${event.id}`,
          title: "Upcoming Event",
          message: `${event.title} starts in ${daysUntilEvent} days`,
          time: new Date().toISOString(),
        });
      }
    });

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        image: user.image,
      },
      notifications: notifications.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()),
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return { error: "Failed to fetch dashboard data" };
  }
} 