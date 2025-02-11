import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function getUserStatistics() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const userId = session.user.id;
  const currentYear = new Date().getFullYear();
  const yearStart = new Date(currentYear, 0, 1);
  const yearEnd = new Date(currentYear, 11, 31);
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  // Get events attended in the last 12 months
  const eventsAttended = await prisma.event.count({
    where: {
      attendees: {
        some: {
          id: userId,
        },
      },
      startDate: {
        gte: twelveMonthsAgo,
      },
    },
  });

  // Calculate total CPD points from attended events this year
  const cpdPoints = await prisma.event.aggregate({
    where: {
      attendees: {
        some: {
          id: userId,
        },
      },
      startDate: {
        gte: yearStart,
        lte: yearEnd,
      },
    },
    _sum: {
      cpdPoints: true,
    },
  });

  // Get total achievements (certificates)
  const certificatesCount = await prisma.achievement.count({
    where: {
      userId,
      type: "CERTIFICATION",
    },
  });

  // Get total documents (publications)
  const documentsCount = await prisma.publication.count({
    where: {
      userId,
    },
  });

  return {
    cpdPoints: {
      value: cpdPoints._sum.cpdPoints || 0,
      target: 60, // Assuming target is 60 CPD points per year
    },
    eventsAttended: {
      value: eventsAttended,
      target: 20, // Assuming target is 20 events per year
    },
    certificates: {
      value: certificatesCount,
      target: 10, // Assuming target is 10 certificates
    },
    documents: {
      value: documentsCount,
      target: 15, // Assuming target is 15 documents
    },
  };
} 