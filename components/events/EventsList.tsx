"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { 
  CalendarDays, 
  MapPin, 
  Users, 
  Clock, 
  Award, 
  FileText, 
  UserCheck,
  Download,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import EventRegistrationModal from "./EventRegistrationModal";

interface Event {
  id: string;
  title: string;
  description: string;
  type: "CONFERENCE" | "WORKSHOP" | "SEMINAR" | "MEETING";
  startDate: string;
  endDate: string;
  venue: string;
  objectives: string[];
  cpdPoints: number;
  speakers: string[];
  moderators: string[];
  capacity?: number | null;
  registrationDeadline?: string | null;
  materials?: Record<string, string> | null;
  memberPrice?: number | null;
  nonMemberPrice?: number | null;
  attendees: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }>;
}

export default function EventsList() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  const handleRegister = async (eventId: string) => {
    if (!session) {
      setSelectedEventId(eventId);
      setShowRegistrationModal(true);
      return;
    }

    await registerSignedInUser(eventId);
  };

  const registerSignedInUser = async (eventId: string) => {
    try {
      setIsLoading(eventId);
      console.log("[EVENT_REGISTRATION] Sending registration request for event:", eventId);
      
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to register for event");
      }

      toast({
        title: "Success",
        description: data.message || "Successfully registered for the event",
      });

      fetchEvents();
    } catch (error) {
      console.error("[EVENT_REGISTRATION_ERROR]", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to register for event",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleGuestRegistration = async (formData: any) => {
    if (!selectedEventId) return;

    try {
      setIsLoading(selectedEventId);
      const response = await fetch("/api/events/register-guest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: selectedEventId,
          ...formData
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      toast({
        title: "Success",
        description: "Successfully registered for the event. Please check your email for payment instructions.",
      });

      setShowRegistrationModal(false);
      fetchEvents();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to register for event",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const fetchEvents = async () => {
    try {
      console.log("[EventsList] Starting to fetch events");
      const response = await fetch("/api/events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache"
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("[EventsList] API response not ok:", response.status, errorText);
        throw new Error(`Failed to fetch events: ${errorText}`);
      }

      const data = await response.json();
      console.log("[EventsList] Received events:", data?.length, "events");
      console.log("[EventsList] Response headers:", Object.fromEntries(response.headers.entries()));
      console.log("[EventsList] First event (if any):", data?.[0]);
      setEvents(data || []);
    } catch (error) {
      console.error("[EventsList] Error fetching events:", error);
      toast({
        title: "Error",
        description: "Failed to fetch events. Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const getEventTypeColor = (type: Event["type"]) => {
    const colors = {
      CONFERENCE: "bg-emerald-100 text-emerald-800 border-emerald-200",
      WORKSHOP: "bg-green-100 text-green-800 border-green-200",
      SEMINAR: "bg-purple-100 text-purple-800 border-purple-200",
      MEETING: "bg-orange-100 text-orange-800 border-orange-200",
    };
    return colors[type];
  };

  if (isInitialLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border rounded-lg p-6">
            <Skeleton className="h-8 w-2/3 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {events.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-gray-500">No upcoming events at the moment.</p>
        </div>
      ) : (
        events.map((event) => {
          const isRegistered = session ? event.attendees?.some(
            (attendee) => attendee.id === session?.user?.id
          ) : false;
          const isExpanded = expandedEvent === event.id;
          const isRegistrationClosed = event.registrationDeadline 
            ? new Date(event.registrationDeadline) < new Date() 
            : false;
          const isFull = event.capacity 
            ? event.attendees?.length >= event.capacity 
            : false;

          return (
            <div key={event.id}>
              <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-[#003366]">
                          {event.title}
                        </h2>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="secondary" className="whitespace-nowrap">
                              <Award className="w-4 h-4 mr-1" />
                              {event.cpdPoints} CPD Points
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Continuing Professional Development Points</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="flex flex-col items-end gap-2 mt-1">
                        <span className="text-sm font-medium text-gray-600">Registration Fee</span>
                        <div className="flex flex-col gap-1.5">
                          <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 px-3 py-1.5 text-sm font-medium">
                            <span className="opacity-75 mr-2">Members:</span>
                            KES {event.memberPrice?.toLocaleString() ?? '0'}
                          </Badge>
                          <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700 px-3 py-1.5 text-sm font-medium">
                            <span className="opacity-75 mr-2">Non-Members:</span>
                            KES {event.nonMemberPrice?.toLocaleString() ?? '0'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <CalendarDays className="w-5 h-5 mr-2 text-[#003366]" />
                        <span>
                          {format(new Date(event.startDate), "PPP")} - {format(new Date(event.endDate), "PPP")}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-5 h-5 mr-2 text-[#003366]" />
                        <span>
                          {format(new Date(event.startDate), "p")} - {format(new Date(event.endDate), "p")}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-2 text-[#003366]" />
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Users className="w-5 h-5 mr-2 text-[#003366]" />
                        <span>
                          {event.attendees?.length || 0} attendees
                          {event.capacity && ` / ${event.capacity} capacity`}
                        </span>
                      </div>
                      {event.registrationDeadline && (
                        <div className="flex items-center text-gray-600">
                          <FileText className="w-5 h-5 mr-2 text-[#003366]" />
                          <span>
                            Registration deadline: {format(new Date(event.registrationDeadline), "PPP")}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center text-gray-600">
                        <UserCheck className="w-5 h-5 mr-2 text-[#003366]" />
                        <span>{event.speakers.length} speakers</span>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Objectives</h3>
                          <ul className="list-disc list-inside space-y-1 text-gray-600">
                            {event.objectives.map((objective, index) => (
                              <li key={index}>{objective}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Event Details</h3>
                          <div className="space-y-2 text-gray-600">
                            <p><strong>Speakers:</strong> {event.speakers.join(", ")}</p>
                            <p><strong>Moderators:</strong> {event.moderators.join(", ")}</p>
                            {event.materials && Object.keys(event.materials).length > 0 && (
                              <div>
                                <strong>Materials:</strong>
                                <div className="mt-2 space-y-2">
                                  {Object.entries(event.materials).map(([name, url]) => (
                                    <Button
                                      key={name}
                                      variant="outline"
                                      size="sm"
                                      className="w-full"
                                      onClick={() => window.open(url, "_blank")}
                                    >
                                      <Download className="w-4 h-4 mr-2" />
                                      {name}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between">
                    <Button
                      onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                      variant="ghost"
                      className="text-[#003366]"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-2" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-2" />
                          Show More
                        </>
                      )}
                    </Button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <Button
                              onClick={() => handleRegister(event.id)}
                              disabled={isLoading === event.id || isRegistered || isRegistrationClosed || isFull}
                              className={`${
                                isRegistered 
                                  ? "bg-green-600 hover:bg-green-700"
                                  : "bg-[#003366] hover:bg-[#004488]"
                              }`}
                            >
                              {isLoading === event.id ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                  Registering...
                                </>
                              ) : isRegistered ? (
                                "Already Registered"
                              ) : isRegistrationClosed ? (
                                "Registration Closed"
                              ) : isFull ? (
                                "Event Full"
                              ) : (
                                "Register Now"
                              )}
                            </Button>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          {isRegistered ? (
                            "You're already registered for this event"
                          ) : isRegistrationClosed ? (
                            "Registration deadline has passed"
                          ) : isFull ? (
                            "Event has reached maximum capacity"
                          ) : (
                            "Click to register for this event"
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
              {selectedEventId === event.id && (
                <EventRegistrationModal
                  isOpen={showRegistrationModal}
                  onClose={() => {
                    setShowRegistrationModal(false);
                    setSelectedEventId(null);
                  }}
                  onSubmit={handleGuestRegistration}
                  isLoading={isLoading === event.id}
                  eventTitle={event.title}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
} 