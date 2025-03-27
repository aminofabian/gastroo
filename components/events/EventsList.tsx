"use client";

import { useState, useEffect, useRef } from "react";
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
import PesapalPaymentModal from "./PesapalPaymentModal";

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
  registrations: Array<{
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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [userRegistrations, setUserRegistrations] = useState<Set<string>>(new Set());
  const [pollingEventId, setPollingEventId] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    userId?: string;
    registrationId?: string;
  } | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  const handleRegister = async (eventId: string) => {
    // Find the selected event
    const selectedEvent = events.find(e => e.id === eventId);
    
    if (!selectedEvent) {
      toast({
        title: "Error",
        description: "Event not found",
        variant: "destructive",
      });
      return;
    }
    
    // Check if user is already registered
    if (isUserRegistered(eventId)) {
      toast({
        title: "Already Registered",
        description: "You are already registered for this event.",
      });
      return;
    }
    
    // Check if the event is free (no price or price is 0)
    const isFreeEvent = !selectedEvent.memberPrice || selectedEvent.memberPrice <= 0;
    
    if (isFreeEvent && session?.user) {
      // For free events with logged-in users, directly register without showing modal
      try {
        setIsLoading(eventId);
        
        // Make sure we have all required fields
        if (!session.user.firstName || !session.user.lastName || !session.user.email) {
          toast({
            title: "Error",
            description: "Your profile is incomplete. Please update your profile first.",
            variant: "destructive",
          });
          setIsLoading(null);
          return;
        }
        
        const response = await fetch("/api/events/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId: eventId,
            firstName: session.user.firstName,
            lastName: session.user.lastName,
            email: session.user.email,
            phone: (session.user as any).phone || "N/A", // Use type assertion for phone property
            paymentMethod: "FREE"
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to register for event");
        }

        toast({
          title: "Success",
          description: "You have been successfully registered for this event.",
        });
        
        // Update the local state to mark this event as registered
        setUserRegistrations(prev => {
          const newSet = new Set(prev);
          newSet.add(eventId);
          return newSet;
        });
        
        fetchEvents(); // Refresh the events list
      } catch (error) {
        console.error("Registration error:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to register for event",
          variant: "destructive",
        });
      } finally {
        setIsLoading(null);
      }
    } else {
      // For paid events or non-logged-in users, show the registration modal
      setSelectedEventId(eventId);
      setShowRegistrationModal(true);
    }
  };

  const handleRegistrationSubmit = async (formData: any): Promise<string> => {
    if (!selectedEventId) return '';
    
    try {
      setIsLoading(selectedEventId);
      
      const selectedEvent = events.find(e => e.id === selectedEventId);
      if (!selectedEvent) {
        throw new Error("Event not found");
      }
      
      // Determine if this is a guest registration or a logged-in user
      const isGuestRegistration = !session?.user;
      
      console.log(`Processing ${isGuestRegistration ? 'guest' : 'user'} registration for event: ${selectedEventId}`);
      
      // If this is a guest registration, check if they're already registered
      if (isGuestRegistration) {
        console.log(`Checking if guest with email ${formData.email} is already registered`);
        const isAlreadyRegistered = await checkGuestRegistration(selectedEventId, formData.email);
        if (isAlreadyRegistered) {
          console.log(`Guest with email ${formData.email} is already registered for event ${selectedEventId}`);
          toast({
            title: "Already Registered",
            description: "This email is already registered for this event.",
          });
          setShowRegistrationModal(false);
          setSelectedEventId(null);
          return '';
        }
      }
      
      // Set up user details for payment or registration
      const userDetails = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        userId: session?.user?.id
      };
      
      setUserDetails(userDetails);
      
      // Check if the event is free
      const isFreeEvent = !selectedEvent.memberPrice || selectedEvent.memberPrice <= 0;
      
      if (isFreeEvent) {
        console.log(`Processing free event registration for ${isGuestRegistration ? 'guest' : 'user'}`);
        // For free events, directly register the user
        const endpoint = isGuestRegistration ? "/api/events/register-guest" : "/api/events/register";
        
        console.log(`Sending registration request to ${endpoint}`);
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId: selectedEventId,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            paymentMethod: "FREE"
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error(`Registration failed: ${data.error || "Unknown error"}`);
          throw new Error(data.error || "Failed to register for event");
        }

        console.log(`Registration successful: ${JSON.stringify(data)}`);
        
        toast({
          title: "Success",
          description: "You have been successfully registered for this event.",
        });
        
        // If it's a logged-in user, update the local state
        if (!isGuestRegistration) {
          setUserRegistrations(prev => {
            const newSet = new Set(prev);
            newSet.add(selectedEventId);
            return newSet;
          });
          console.log(`Updated local state for user registration: ${selectedEventId}`);
        }
        
        // Close the modal
        setShowRegistrationModal(false);
        setSelectedEventId(null);
        
        // Refresh the events list
        fetchEvents();
        
        // Return the registration ID
        return data.registrationId || '';
      } else {
        console.log(`Processing paid event registration for ${isGuestRegistration ? 'guest' : 'user'}`);
        // For paid events, show the payment modal
        setShowRegistrationModal(false);
        setShowPaymentModal(true);
        
        // Return an empty string as we'll create the registration after payment
        return '';
      }
    } catch (error) {
      console.error("Registration submission error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process registration",
        variant: "destructive",
      });
      return '';
    } finally {
      setIsLoading(null);
    }
  };

  // Start polling for registration status
  const startPollingRegistrationStatus = (eventId: string) => {
    setPollingEventId(eventId);
  };

  // Stop polling for registration status
  const stopPollingRegistrationStatus = () => {
    setPollingEventId(null);
  };

  // Effect for polling registration status
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (pollingEventId && session?.user) {
      // Check immediately
      checkAndUpdateRegistrationStatus(pollingEventId);
      
      // Then set up interval
      intervalId = setInterval(async () => {
        const isRegistered = await checkAndUpdateRegistrationStatus(pollingEventId);
        if (isRegistered) {
          // If registered, stop polling
          stopPollingRegistrationStatus();
        }
      }, 5000); // Check every 5 seconds
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [pollingEventId, session]);

  // Modify handlePaymentComplete to start polling
  const handlePaymentComplete = async (paymentData: { paid: boolean; orderTrackingId?: string; merchantReference?: string; }) => {
    if (!selectedEventId || !paymentData.paid) return;
    
    console.log("Payment completed:", paymentData);
    
    // Update the local state if the user is logged in
    if (session?.user) {
      // First, try to fetch the latest registration status
      console.log(`Checking registration status for event ${selectedEventId} after payment`);
      const isRegistered = await checkAndUpdateRegistrationStatus(selectedEventId);
      
      if (!isRegistered) {
        console.log("Not registered yet, starting polling");
        // If not registered yet, start polling
        startPollingRegistrationStatus(selectedEventId);
        
        // Also update manually for immediate feedback
        setUserRegistrations(prev => {
          const newSet = new Set(prev);
          newSet.add(selectedEventId);
          return newSet;
        });
      } else {
        console.log("Already registered, no need to poll");
      }
    } else {
      // For guest users, we don't have a way to track registration status in local state
      // But we can show a success message
      console.log("Guest payment completed, showing success message");
      toast({
        title: "Registration Successful",
        description: "Your payment was successful and you are now registered for this event.",
      });
    }
    
    // Refresh events list
    console.log("Refreshing events list after payment");
    fetchEvents();
    
    // Force refresh user registrations
    if (session?.user) {
      try {
        console.log("Forcing refresh of user registrations after payment");
        const registrationsResponse = await fetch(`/api/events/user-registrations`);
        
        if (!registrationsResponse.ok) {
          throw new Error("Failed to fetch user registrations");
        }
        
        const registrationsData = await registrationsResponse.json();
        
        // Extract event IDs as strings
        const eventIds: string[] = registrationsData.map(
          (registration: { eventId: string }) => registration.eventId
        );
        
        console.log("Refreshed user registrations after payment:", eventIds);
        
        // Create a new Set with the correct type
        setUserRegistrations(new Set<string>(eventIds));
      } catch (error) {
        console.error("Error fetching user registrations after payment:", error);
      }
    }
  };

  // Function to check and update registration status
  const checkAndUpdateRegistrationStatus = async (eventId: string) => {
    if (!session?.user) return false;
    
    try {
      const response = await fetch(`/api/events/check-registration?eventId=${eventId}`);
      const data = await response.json();
      
      if (response.ok && data.isRegistered) {
        // Update the local state
        setUserRegistrations(prev => {
          const newSet = new Set(prev);
          newSet.add(eventId);
          return newSet;
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking registration status:", error);
      return false;
    }
  };

  const fetchEvents = async () => {
    try {
      setIsInitialLoading(true);
      
      // Fetch events
      const response = await fetch("/api/events");
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch events");
      }
      
      setEvents(data);
      
      // If user is logged in, fetch their registrations
      if (session?.user?.id) {
        try {
          const registrationsResponse = await fetch(`/api/events/user-registrations`);
          
          if (!registrationsResponse.ok) {
            throw new Error("Failed to fetch user registrations");
          }
          
          const registrationsData = await registrationsResponse.json();
          
          // Extract event IDs as strings
          const eventIds: string[] = registrationsData.map(
            (registration: { eventId: string }) => registration.eventId
          );
          
          console.log("Fetched user registrations:", eventIds);
          
          // Create a new Set with the correct type
          setUserRegistrations(new Set<string>(eventIds));
        } catch (registrationError) {
          console.error("Error fetching user registrations:", registrationError);
          toast({
            title: "Warning",
            description: "Failed to fetch your event registrations. Some events may not show correct registration status.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive",
      });
    } finally {
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Add a useEffect to refresh registrations when session changes
  useEffect(() => {
    if (session?.user) {
      // If user is logged in, fetch their registrations
      const fetchUserRegistrations = async () => {
        try {
          const registrationsResponse = await fetch(`/api/events/user-registrations`);
          
          if (!registrationsResponse.ok) {
            throw new Error("Failed to fetch user registrations");
          }
          
          const registrationsData = await registrationsResponse.json();
          
          // Extract event IDs as strings
          const eventIds: string[] = registrationsData.map(
            (registration: { eventId: string }) => registration.eventId
          );
          
          console.log("Refreshed user registrations:", eventIds);
          
          // Create a new Set with the correct type
          setUserRegistrations(new Set<string>(eventIds));
        } catch (error) {
          console.error("Error fetching user registrations:", error);
        }
      };
      
      fetchUserRegistrations();
    } else {
      // If user is not logged in, clear registrations
      setUserRegistrations(new Set<string>());
    }
  }, [session]);

  const getEventTypeColor = (type: Event["type"]) => {
    const colors = {
      CONFERENCE: "bg-emerald-100 text-emerald-800 border-emerald-200",
      WORKSHOP: "bg-green-100 text-green-800 border-green-200",
      SEMINAR: "bg-purple-100 text-purple-800 border-purple-200",
      MEETING: "bg-orange-100 text-orange-800 border-orange-200",
    };
    return colors[type];
  };

  // Check if user is registered for a specific event
  const isUserRegistered = (eventId: string) => {
    return userRegistrations.has(eventId);
  };

  // Function to check if a guest is registered for an event
  const checkGuestRegistration = async (eventId: string, email: string) => {
    try {
      const response = await fetch(`/api/events/check-guest-registration?eventId=${eventId}&email=${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        throw new Error("Failed to check guest registration");
      }
      
      const data = await response.json();
      return data.isRegistered;
    } catch (error) {
      console.error("Error checking guest registration:", error);
      return false;
    }
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
    <div className="space-y-8">
      {events.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-gray-500">No upcoming events at the moment.</p>
        </div>
      ) : (
        events.map((event) => {
          const isRegistrationClosed = event.registrationDeadline
            ? new Date(event.registrationDeadline) < new Date()
            : false;
          
          const isFull = event.capacity
            ? event.registrations.length >= event.capacity
            : false;
          
          // Check if user is registered for this event
          const isRegistered = isUserRegistered(event.id);

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
                          {event.registrations?.length || 0} attendees
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

                  {isRegistered && (
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
                      onClick={() => setExpandedEvent(isRegistered ? null : event.id)}
                      variant="ghost"
                      className="text-[#003366]"
                    >
                      {isRegistered ? (
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
                    <div className="flex justify-end mt-4">
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
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Render registration modal outside the map function */}
      {showRegistrationModal && selectedEventId && (
        <EventRegistrationModal
          isOpen={showRegistrationModal}
          onClose={() => {
            setShowRegistrationModal(false);
            // Refresh events list after modal is closed (in case registration was successful)
            fetchEvents();
          }}
          onSubmit={async (data: { firstName: string; lastName: string; email: string; phone: string; }) => {
            const registrationId = await handleRegistrationSubmit(data);
            return { registrationId: registrationId || '' };
          }}
          event={events.find(e => e.id === selectedEventId)}
        />
      )}
      
      {/* Render payment modal */}
      {showPaymentModal && selectedEventId && userDetails && (
        <PesapalPaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setUserDetails(null);
          }}
          onPaymentComplete={(paymentData) => {
            handlePaymentComplete(paymentData);
            // Close the modal after payment is complete
            setShowPaymentModal(false);
            setUserDetails(null);
          }}
          event={events.find(e => e.id === selectedEventId)}
          userDetails={userDetails}
        />
      )}
    </div>
  );
} 