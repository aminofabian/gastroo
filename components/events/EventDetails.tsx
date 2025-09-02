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
  Calendar,
  Info,
  Star,
  Check,
  X,
  AlertCircle,
  Ticket,
  ChevronsRight,
  ArrowLeft,
  Share2,
  BookOpen,
  DollarSign
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipProvider as TooltipProviderBase,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EventRegistrationModal from "./EventRegistrationModal";
import PesapalPaymentModal from "./PesapalPaymentModal";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  description: string;
  type: "CONFERENCE" | "WORKSHOP" | "SEMINAR" | "MEETING";
  startDate: string;
  endDate: string;
  venue: string;
  slug: string;
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
    paymentStatus?: string;
    isAttended?: boolean;
    createdAt?: string;
  }>;
}

interface EventDetailsProps {
  event: Event;
}

export default function EventDetails({ event }: EventDetailsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
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

  // Check if user is registered for this event
  const isUserRegistered = (eventId: string) => {
    return userRegistrations.has(eventId);
  };

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

  // Handle registration logic (similar to EventsList)
  const handleRegister = async (eventId: string) => {
    // Check if user is already registered
    if (isUserRegistered(eventId)) {
      toast({
        title: "Already Registered",
        description: "You are already registered for this event.",
      });
      return;
    }
    
    // Check if the event is free (no price or price is 0)
    const isFreeEvent = !event.memberPrice || event.memberPrice <= 0;
    
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
            phone: (session.user as any).phone || "N/A",
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
      setShowRegistrationModal(true);
    }
  };

  const handleRegistrationSubmit = async (formData: any): Promise<string> => {
    try {
      setIsLoading(event.id);
      
      // Determine if this is a guest registration or a logged-in user
      const isGuestRegistration = !session?.user;
      
      // If this is a guest registration, check if they're already registered
      if (isGuestRegistration) {
        const isAlreadyRegistered = await checkGuestRegistration(event.id, formData.email);
        if (isAlreadyRegistered) {
          toast({
            title: "Already Registered",
            description: "This email is already registered for this event.",
          });
          setShowRegistrationModal(false);
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
      const isFreeEvent = !event.memberPrice || event.memberPrice <= 0;
      
      if (isFreeEvent) {
        // For free events, directly register the user
        const endpoint = isGuestRegistration ? "/api/events/register-guest" : "/api/events/register";
        
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId: event.id,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
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
        
        // If it's a logged-in user, update the local state
        if (!isGuestRegistration) {
          setUserRegistrations(prev => {
            const newSet = new Set(prev);
            newSet.add(event.id);
            return newSet;
          });
        }
        
        // Close the modal
        setShowRegistrationModal(false);
        
        // Return the registration ID
        return data.registrationId || '';
      } else {
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

  const handlePaymentComplete = async (paymentData: { paid: boolean; orderTrackingId?: string; merchantReference?: string; }) => {
    if (!paymentData.paid) return;
    
    // Update the local state if the user is logged in
    if (session?.user) {
      setUserRegistrations(prev => {
        const newSet = new Set(prev);
        newSet.add(event.id);
        return newSet;
      });
    }
    
    toast({
      title: "Registration Successful",
      description: "Your payment was successful and you are now registered for this event.",
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: event.title,
      text: event.description,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // Fallback to copying URL
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "Event link has been copied to clipboard.",
        });
      }
    } else {
      // Fallback to copying URL
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Event link has been copied to clipboard.",
      });
    }
  };

  // Fetch user registrations on component mount
  useEffect(() => {
    const fetchUserRegistrations = async () => {
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
          
          // Create a new Set with the correct type
          setUserRegistrations(new Set<string>(eventIds));
        } catch (error) {
          console.error("Error fetching user registrations:", error);
        }
      }
    };
    
    fetchUserRegistrations();
  }, [session]);

  // Calculate derived values
  const isRegistrationClosed = event.registrationDeadline
    ? new Date(event.registrationDeadline) < new Date()
    : false;
  
  const isFull = event.capacity
    ? event.registrations.length >= event.capacity
    : false;
  
  const isRegistered = isUserRegistered(event.id);
  
  const capacityPercentage = event.capacity
    ? (event.registrations.length / event.capacity) * 100
    : null;
  
  const isSoon = isStartingSoon(event);
  const isToday = isHappeningToday(event);
  const isPast = isPastEvent(event);

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="text-[#003366] hover:text-[#004488] hover:bg-blue-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          className="text-[#003366] border-[#003366] hover:bg-[#003366] hover:text-white"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Event
        </Button>
      </div>

      {/* Main Event Card */}
      <div className={cn(
        "rounded-xl overflow-hidden shadow-xl",
        getEventTypeGradient(event.type),
        isRegistered ? "ring-2 ring-green-500 ring-offset-2" : ""
      )}>
        <div className="p-8">
          {/* Event Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
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
                    You're Registered
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
                <Badge className={`text-lg px-4 py-2 rounded-full bg-gradient-to-r ${getEventTypeColor(event.type)}`}>
                  {event.type}
                </Badge>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#003366] mb-4">
                {event.title}
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>
            
            {/* CPD Points and Registration */}
            <div className="lg:w-80 flex flex-col gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center bg-blue-50 rounded-xl p-6 border border-blue-100">
                      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                        <Award className="w-10 h-10" />
                      </div>
                      <div className="ml-6">
                        <div className="text-4xl font-bold text-blue-700">{event.cpdPoints}</div>
                        <div className="text-sm text-blue-600">CPD Points</div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-blue-50 border border-blue-200">
                    <p className="text-blue-700">Continuing Professional Development Points</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {/* Registration Fee */}
              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  Registration Fee
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-blue-700 font-medium">Members</span>
                    <span className="text-blue-800 font-bold text-lg">
                      KES {event.memberPrice?.toLocaleString() ?? '0'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <span className="text-orange-700 font-medium">Non-Members</span>
                    <span className="text-orange-800 font-bold text-lg">
                      KES {event.nonMemberPrice?.toLocaleString() ?? '0'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Registration Button */}
              <Button
                onClick={() => handleRegister(event.id)}
                disabled={isLoading === event.id || isRegistered || isRegistrationClosed || isFull || isPast}
                size="lg"
                className={cn(
                  "w-full text-lg py-6 transition-all",
                  isRegistered 
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    : "bg-gradient-to-r from-[#003366] to-[#004488] hover:from-[#004488] hover:to-[#005599] text-white",
                  (isRegistrationClosed || isFull || isPast) ? "opacity-60" : ""
                )}
              >
                {isLoading === event.id ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Registering...
                  </>
                ) : isRegistered ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    You're Registered
                  </>
                ) : isRegistrationClosed ? (
                  "Registration Closed"
                ) : isFull ? (
                  "Event Full"
                ) : isPast ? (
                  "Event Ended"
                ) : (
                  <>
                    <Ticket className="w-5 h-5 mr-2" />
                    Register Now
                  </>
                )}
              </Button>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Calendar className="w-6 h-6 mr-2 text-blue-600" />
                  Event Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-100 p-3 mr-4">
                    <CalendarDays className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Date</div>
                    <span className="font-semibold text-lg">
                      {format(new Date(event.startDate), "PPP")}
                      {event.startDate !== event.endDate && <> - {format(new Date(event.endDate), "PPP")}</>}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="rounded-full bg-purple-100 p-3 mr-4">
                    <Clock className="w-6 h-6 text-purple-700" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Time</div>
                    <span className="font-semibold text-lg">
                      {format(new Date(event.startDate), "p")} - {format(new Date(event.endDate), "p")}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="rounded-full bg-red-100 p-3 mr-4">
                    <MapPin className="w-6 h-6 text-red-700" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Venue</div>
                    <span className="font-semibold text-lg">{event.venue}</span>
                  </div>
                </div>
                
                {event.registrationDeadline && (
                  <div className="flex items-center">
                    <div className="rounded-full bg-orange-100 p-3 mr-4">
                      <FileText className="w-6 h-6 text-orange-700" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Registration Deadline</div>
                      <span className="font-semibold text-lg">
                        {format(new Date(event.registrationDeadline), "PPP")}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Attendance Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Users className="w-6 h-6 mr-2 text-green-600" />
                  Attendance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Current Registrations</div>
                    <span className="font-bold text-2xl text-green-700">
                      {event.registrations?.length || 0}
                      {event.capacity && <span className="text-gray-500">/{event.capacity}</span>}
                    </span>
                  </div>
                  {event.capacity && (
                    <div className="w-32">
                      <Progress 
                        value={capacityPercentage as number} 
                        className="h-3 bg-gray-200" 
                        indicatorClassName={capacityPercentage as number > 90 ? "bg-red-500" : "bg-green-500"}
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.round(capacityPercentage as number)}% full
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center">
                  <div className="rounded-full bg-indigo-100 p-3 mr-4">
                    <UserCheck className="w-6 h-6 text-indigo-700" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Event Staff</div>
                    <span className="font-semibold text-lg">
                      {event.speakers.length} speakers, {event.moderators.length} moderators
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Objectives */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn("p-6 rounded-lg", getEventLightBg(event.type))}>
                <ul className="space-y-4 text-gray-700">
                  {event.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <div className="rounded-full bg-blue-100 p-1.5 mr-3 mt-0.5">
                        <ChevronsRight className="w-4 h-4 text-blue-700" />
                      </div>
                      <span className="text-lg leading-relaxed">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Event Staff and Materials */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Speakers and Moderators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Star className="w-6 h-6 mr-2 text-amber-500" />
                  Event Staff
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center mb-3">
                    <div className="rounded-full bg-amber-100 p-2 mr-3">
                      <UserCheck className="w-5 h-5 text-amber-700" />
                    </div>
                    <h4 className="font-semibold text-lg">Speakers</h4>
                  </div>
                  <div className="space-y-2">
                    {event.speakers.map((speaker, index) => (
                      <div key={index} className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <span className="font-medium text-amber-800">{speaker}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-3">
                    <div className="rounded-full bg-purple-100 p-2 mr-3">
                      <Users className="w-5 h-5 text-purple-700" />
                    </div>
                    <h4 className="font-semibold text-lg">Moderators</h4>
                  </div>
                  <div className="space-y-2">
                    {event.moderators.map((moderator, index) => (
                      <div key={index} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <span className="font-medium text-purple-800">{moderator}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Materials */}
            {event.materials && Object.keys(event.materials).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <FileText className="w-6 h-6 mr-2 text-green-600" />
                    Event Materials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(event.materials).map(([name, url]) => (
                      <Button
                        key={name}
                        variant="outline"
                        className="w-full justify-start h-auto p-4 border-gray-300 hover:bg-gray-50 hover:text-[#003366] hover:border-[#003366] transition-colors"
                        onClick={() => window.open(url, "_blank")}
                      >
                        <Download className="w-5 h-5 mr-3" />
                        <span className="text-left">
                          <div className="font-semibold">{name}</div>
                          <div className="text-sm text-gray-500">Click to download</div>
                        </span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Registration and payment modals */}
      {showRegistrationModal && (
        <EventRegistrationModal
          isOpen={showRegistrationModal}
          onClose={() => setShowRegistrationModal(false)}
          onSubmit={async (data: { firstName: string; lastName: string; email: string; phone: string; }) => {
            const registrationId = await handleRegistrationSubmit(data);
            return { registrationId: registrationId || '' };
          }}
          event={event}
        />
      )}
      
      {showPaymentModal && userDetails && (
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
          event={event}
          userDetails={userDetails}
        />
      )}
    </div>
  );
}
