import { prisma } from "@/lib/prisma";

export type RecentUpdate = {
  id: string;
  title: string;
  date: Date;
  type: "Event" | "Publication" | "Resource";
  link: string;
};

export const getRecentUpdates = async (): Promise<RecentUpdate[]> => {
  const [events, publications, resources] = await Promise.all([
    prisma.event.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    }),
    prisma.publication.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    }),
    prisma.resource.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    }),
  ]);

  const updates: RecentUpdate[] = [
    ...events.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.createdAt,
      type: "Event" as const,
      link: `/events/${event.id}`,
    })),
    ...publications.map((pub) => ({
      id: pub.id,
      title: pub.title,
      date: pub.createdAt,
      type: "Publication" as const,
      link: `/publications/${pub.id}`,
    })),
    ...resources.map((resource) => ({
      id: resource.id,
      title: resource.title,
      date: resource.createdAt,
      type: "Resource" as const,
      link: `/dashboard/resources/${resource.id}`,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  return updates;
}; 