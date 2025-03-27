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
  ChevronUp,
  Calendar,
  Info,
  Star,
  Check,
  X,
  AlertCircle,
  Ticket,
  ChevronsRight
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
import { Progress } from "@/components/ui/progress";
import EventRegistrationModal from "./EventRegistrationModal";
import PesapalPaymentModal from "./PesapalPaymentModal";
import { cn } from "@/lib/utils";

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
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
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

  // Function to check if an event happened in the past
  const isPastEvent = (event: Event) => {
    return new Date(event.endDate) < new Date();
  };

  // Function to check if an event is starting soon (within next 7 days)
  const isStartingSoon = (event: Event) => {
    const today = new Date();
    const eventStart = new Date(event.startDate);
    const differenceInDays = Math.ceil((eventStart.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return differenceInDays > 0 && differenceInDays <= 7;
  };

  // Function to check if an event is happening today
  const isHappeningToday = (event: Event) => {
    const today = new Date();
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    return today >= eventStart && today <= eventEnd;
  };

  // Get filtered events
  const getFilteredEvents = () => {
    let filteredEvents = events;
    
    // Filter by search term
    if (searchTerm) {
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    switch(filter) {
      case "registered":
        filteredEvents = filteredEvents.filter(event => isUserRegistered(event.id));
        break;
      case "upcoming":
        filteredEvents = filteredEvents.filter(event => !isPastEvent(event));
        break;
      case "today":
        filteredEvents = filteredEvents.filter(event => isHappeningToday(event));
        break;
      case "starting-soon":
        filteredEvents = filteredEvents.filter(event => isStartingSoon(event));
        break;
      default:
        // "all" - no additional filtering
        break;
    }
    
    return filteredEvents;
  };

  const getEventTypeColor = (type: Event["type"]) => {
    const colors = {
      CONFERENCE: "from-emerald-500 to-teal-600 text-white border-emerald-600",
      WORKSHOP: "from-blue-500 to-cyan-600 text-white border-blue-600",
      SEMINAR: "from-purple-500 to-indigo-600 text-white border-purple-600",
      MEETING: "from-orange-500 to-amber-600 text-white border-orange-600",
    };
    return colors[type];
  };

  const getEventTypeGradient = (type: Event["type"]) => {
    const gradients = {
      CONFERENCE: "bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500",
      WORKSHOP: "bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500",
      SEMINAR: "bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500",
      MEETING: "bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500",
    };
    return gradients[type];
  };

  // Function to generate a lighter background color based on event type
  const getEventLightBg = (type: Event["type"]) => {
    const colors = {
      CONFERENCE: "bg-emerald-50",
      WORKSHOP: "bg-blue-50",
      SEMINAR: "bg-purple-50",
      MEETING: "bg-orange-50",
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
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex gap-4">
              <Skeleton className="h-20 w-20 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-8 w-2/3 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex gap-2 mt-4">
                  <Skeleton className="h-8 w-24 rounded-full" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const filteredEvents = getFilteredEvents();

  return (
    <div className="space-y-8">
      {/* Filter and search controls */}
      <div className="bg-white rounded-xl p-4 shadow-sm border flex flex-col sm:flex-row gap-4 items-center justify-between sticky top-16 z-10">
        <div className="flex overflow-x-auto pb-2 gap-2 w-full sm:w-auto">
          <Badge 
            onClick={() => setFilter("all")}
            className={`cursor-pointer px-4 py-2 rounded-full ${filter === "all" ? "bg-[#003366]" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            All Events
          </Badge>
          <Badge 
            onClick={() => setFilter("upcoming")}
            className={`cursor-pointer px-4 py-2 rounded-full ${filter === "upcoming" ? "bg-[#003366]" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            <Calendar className="w-4 h-4 mr-1" />
            Upcoming
          </Badge>
          <Badge 
            onClick={() => setFilter("today")}
            className={`cursor-pointer px-4 py-2 rounded-full ${filter === "today" ? "bg-[#003366]" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            <Clock className="w-4 h-4 mr-1" />
            Today
          </Badge>
          <Badge 
            onClick={() => setFilter("starting-soon")}
            className={`cursor-pointer px-4 py-2 rounded-full ${filter === "starting-soon" ? "bg-[#003366]" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            Starting Soon
          </Badge>
          <Badge 
            onClick={() => setFilter("registered")}
            className={`cursor-pointer px-4 py-2 rounded-full ${filter === "registered" ? "bg-[#003366]" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            <Ticket className="w-4 h-4 mr-1" />
            My Events
          </Badge>
        </div>
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 border rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border">
          <div className="flex flex-col items-center">
            <Calendar className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No events found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {filter !== "all" 
                ? "Try changing your filters or search criteria."
                : "There are no upcoming events at the moment. Please check back later."}
            </p>
          </div>
        </div>
      ) : (
        filteredEvents.map((event) => {
          const isRegistrationClosed = event.registrationDeadline
            ? new Date(event.registrationDeadline) < new Date()
            : false;
          
          const isFull = event.capacity
            ? event.registrations.length >= event.capacity
            : false;
          
          // Check if user is registered for this event
          const isRegistered = isUserRegistered(event.id);
          
          // Calculate capacity percentage if available
          const capacityPercentage = event.capacity
            ? (event.registrations.length / event.capacity) * 100
            : null;
          
          // Check if event is starting soon
          const isSoon = isStartingSoon(event);
          
          // Check if event is happening today
          const isToday = isHappeningToday(event);
          
          // Check if event is past
          const isPast = isPastEvent(event);

          return (
            <div key={event.id}>
              <div className={cn(
                "rounded-xl overflow-hidden transition-all duration-300 group",
                getEventTypeGradient(event.type),
                isRegistered ? "ring-2 ring-green-500 ring-offset-2" : "",
                (expandedEvent === event.id) ? "shadow-xl transform scale-[1.02]" : "shadow-sm hover:shadow-md"
              )}>
                <div className="p-6">
                  {/* Event header with status indicators */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {isPast && (
                          <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-300">
                            Past Event
                          </Badge>
                        )}
                        {isToday && (
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white animate-pulse">
                            Happening Today
                          </Badge>
                        )}
                        {isSoon && !isToday && (
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                            Starting Soon
                          </Badge>
                        )}
                        {isRegistered && (
                          <Badge className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
                            <Check className="w-3 h-3 mr-1" />
                            Registered
                          </Badge>
                        )}
                        {isFull && !isRegistered && (
                          <Badge variant="destructive">
                            <X className="w-3 h-3 mr-1" />
                            Fully Booked
                          </Badge>
                        )}
                        {isRegistrationClosed && !isFull && !isRegistered && (
                          <Badge variant="destructive">
                            Registration Closed
                          </Badge>
                        )}
                      </div>
                      <h2 className="text-2xl font-bold text-[#003366]">
                        {event.title}
                      </h2>
                    </div>
                    <Badge className={`text-sm px-3 py-1.5 rounded-full whitespace-nowrap bg-gradient-to-r ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </Badge>
                  </div>

                  {/* Event card body */}
                  <div className="grid sm:grid-cols-3 gap-6 mt-4">
                    <div className="sm:col-span-2">
                      <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center text-gray-700">
                            <div className="rounded-full bg-blue-100 p-2 mr-3">
                              <CalendarDays className="w-5 h-5 text-blue-700" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Date</div>
                              <span className="font-medium">
                                {format(new Date(event.startDate), "PPP")}
                                {event.startDate !== event.endDate && <> - {format(new Date(event.endDate), "PPP")}</>}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <div className="rounded-full bg-purple-100 p-2 mr-3">
                              <Clock className="w-5 h-5 text-purple-700" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Time</div>
                              <span className="font-medium">
                                {format(new Date(event.startDate), "p")} - {format(new Date(event.endDate), "p")}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <div className="rounded-full bg-red-100 p-2 mr-3">
                              <MapPin className="w-5 h-5 text-red-700" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Venue</div>
                              <span className="font-medium">{event.venue}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center text-gray-700">
                            <div className="rounded-full bg-green-100 p-2 mr-3">
                              <Users className="w-5 h-5 text-green-700" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">
                                Attendees
                                {event.capacity && <> ({event.registrations?.length || 0}/{event.capacity})</>}
                              </div>
                              {event.capacity && (
                                <div className="w-36 mt-1">
                                  <Progress 
                                    value={capacityPercentage as number} 
                                    className="h-2 bg-gray-200" 
                                    indicatorClassName={capacityPercentage as number > 90 ? "bg-red-500" : "bg-[#003366]"}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {event.registrationDeadline && (
                            <div className="flex items-center text-gray-700">
                              <div className="rounded-full bg-orange-100 p-2 mr-3">
                                <FileText className="w-5 h-5 text-orange-700" />
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Deadline</div>
                                <span className="font-medium">
                                  {format(new Date(event.registrationDeadline), "PPP")}
                                </span>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center text-gray-700">
                            <div className="rounded-full bg-indigo-100 p-2 mr-3">
                              <UserCheck className="w-5 h-5 text-indigo-700" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Event Staff</div>
                              <span className="font-medium">
                                {event.speakers.length} speakers, {event.moderators.length} moderators
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-between border-l border-gray-200 pl-6">
                      <div>
                        <div className="flex flex-col gap-2 mb-6">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center justify-center bg-blue-50 rounded-lg p-3 border border-blue-100">
                                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                    <Award className="w-8 h-8" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-3xl font-bold text-blue-700">{event.cpdPoints}</div>
                                    <div className="text-xs text-blue-600">CPD Points</div>
                                  </div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-blue-50 border border-blue-200">
                                <p className="text-blue-700">Continuing Professional Development Points</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <div className="mt-3">
                            <span className="text-sm font-medium text-gray-600">Registration Fee</span>
                            <div className="flex flex-col gap-1.5 mt-1">
                              <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 px-3 py-2 text-sm font-medium">
                                <span className="opacity-75 mr-2">Members:</span>
                                KES {event.memberPrice?.toLocaleString() ?? '0'}
                              </Badge>
                              <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700 px-3 py-2 text-sm font-medium">
                                <span className="opacity-75 mr-2">Non-Members:</span>
                                KES {event.nonMemberPrice?.toLocaleString() ?? '0'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => handleRegister(event.id)}
                        disabled={isLoading === event.id || isRegistered || isRegistrationClosed || isFull || isPast}
                        className={cn(
                          "w-full transition-all",
                          isRegistered 
                            ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                            : "bg-gradient-to-r from-[#003366] to-[#004488] hover:from-[#004488] hover:to-[#005599] text-white",
                          (isRegistrationClosed || isFull || isPast) ? "opacity-60" : ""
                        )}
                      >
                        {isLoading === event.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Registering...
                          </>
                        ) : isRegistered ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Registered
                          </>
                        ) : isRegistrationClosed ? (
                          "Registration Closed"
                        ) : isFull ? (
                          "Event Full"
                        ) : isPast ? (
                          "Event Ended"
                        ) : (
                          <>
                            <Ticket className="w-4 h-4 mr-2" />
                            Register Now
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Expandable content section */}
                  {(expandedEvent === event.id || isRegistered) && (
                    <div className="mt-6 pt-6 border-t border-gray-200 animate-fadeIn">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={getEventLightBg(event.type) + " p-4 rounded-lg"}>
                          <h3 className="font-semibold text-lg mb-3 flex items-center">
                            <Info className="w-5 h-5 mr-2 text-blue-500" />
                            Objectives
                          </h3>
                          <ul className="space-y-2 text-gray-700">
                            {event.objectives.map((objective, index) => (
                              <li key={index} className="flex items-start">
                                <div className="rounded-full bg-blue-100 p-1 mr-2 mt-0.5">
                                  <ChevronsRight className="w-3 h-3 text-blue-700" />
                                </div>
                                {objective}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-3 flex items-center">
                            <Star className="w-5 h-5 mr-2 text-amber-500" />
                            Event Details
                          </h3>
                          <div className="space-y-3 text-gray-700">
                            <div className="flex items-start">
                              <div className="rounded-full bg-amber-100 p-1 mr-2 mt-0.5">
                                <UserCheck className="w-4 h-4 text-amber-700" />
                              </div>
                              <div>
                                <strong>Speakers:</strong> {event.speakers.join(", ")}
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="rounded-full bg-purple-100 p-1 mr-2 mt-0.5">
                                <Users className="w-4 h-4 text-purple-700" />
                              </div>
                              <div>
                                <strong>Moderators:</strong> {event.moderators.join(", ")}
                              </div>
                            </div>
                            {event.materials && Object.keys(event.materials).length > 0 && (
                              <div>
                                <div className="flex items-center mb-2">
                                  <div className="rounded-full bg-green-100 p-1 mr-2">
                                    <FileText className="w-4 h-4 text-green-700" />
                                  </div>
                                  <strong>Materials:</strong>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                  {Object.entries(event.materials).map(([name, url]) => (
                                    <Button
                                      key={name}
                                      variant="outline"
                                      size="sm"
                                      className="w-full border-gray-300 hover:bg-gray-50 hover:text-[#003366] hover:border-[#003366] transition-colors"
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

                  {/* Footer with show more/less button */}
                  <div className="mt-6 flex items-center justify-between">
                    <Button
                      onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                      variant="ghost"
                      className="text-[#003366] hover:text-[#004488] hover:bg-blue-50"
                    >
                      {expandedEvent === event.id ? (
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
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Registration and payment modals (unchanged) */}
      {showRegistrationModal && selectedEventId && (
        <EventRegistrationModal
          isOpen={showRegistrationModal}
          onClose={() => {
            setShowRegistrationModal(false);
            fetchEvents();
          }}
          onSubmit={async (data: { firstName: string; lastName: string; email: string; phone: string; }) => {
            const registrationId = await handleRegistrationSubmit(data);
            return { registrationId: registrationId || '' };
          }}
          event={events.find(e => e.id === selectedEventId)}
        />
      )}
      
      {showPaymentModal && selectedEventId && userDetails && (
        <PesapalPaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setUserDetails(null);
          }}
          onPaymentComplete={(paymentData) => {
            handlePaymentComplete(paymentData);
            setShowPaymentModal(false);
            setUserDetails(null);
          }}
          event={events.find(e => e.id === selectedEventId)}
          userDetails={userDetails}
        />
      )}

      {/* Create styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
} 