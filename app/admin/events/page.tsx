import { Metadata } from "next";
import EventManagement from "@/components/admin/EventManagement";

export const metadata: Metadata = {
  title: "Event Management | Admin Dashboard",
  description: "Manage events and conferences",
};

export default function EventsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Events</h2>
      </div>
      <div className="flex-1 space-y-4">
        <EventManagement />
      </div>
    </div>
  );
} 