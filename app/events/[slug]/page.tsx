import { Metadata } from "next";
import { notFound } from "next/navigation";
import EventDetails from "@/components/events/EventDetails";
import { serverFetch } from "@/lib/api-utils";

interface EventPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the event page
export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  try {
    console.log("[METADATA] Fetching event with slug:", params.slug);
    
    const response = await serverFetch(
      `/api/events/${params.slug}`,
      { cache: "no-store" }
    );
    
    if (!response.ok) {
      return {
        title: "Event Not Found | GSK",
        description: "The requested event could not be found.",
      };
    }

    const event = await response.json();

    return {
      title: `${event.title} | GSK`,
      description: event.description,
      openGraph: {
        title: event.title,
        description: event.description,
        type: "website",
        siteName: "GSK - Gastroenterological Society of Kenya",
      },
      twitter: {
        card: "summary_large_image",
        title: event.title,
        description: event.description,
      },
    };
  } catch (error) {
    return {
      title: "Event | GSK",
      description: "Event details",
    };
  }
}

export default async function EventPage({ params }: EventPageProps) {
  try {
    console.log("[EVENT_PAGE] Fetching event with slug:", params.slug);
    
    const response = await serverFetch(
      `/api/events/${params.slug}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      notFound();
    }

    const event = await response.json();

    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <EventDetails event={event} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching event:", error);
    notFound();
  }
}
