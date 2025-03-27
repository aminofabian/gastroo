import { Metadata } from "next";
import EventsList from "@/components/events/EventsList";

export const metadata: Metadata = {
  title: "Events | GSK",
  description: "Upcoming events and conferences",
};

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#003366] mb-2">Upcoming Events</h1>
        <p className="text-gray-600 mb-8">Join us at our upcoming conferences and workshops</p>
        <EventsList />
      </div>
    </div>
  );
} 