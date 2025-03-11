"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import { OnboardingModal } from "@/components/OnboardingModal";
import { toast } from "sonner";

export default function DashboardClient() {
  const searchParams = useSearchParams();
  const { user, fetchUserData } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Check if we should show the onboarding modal based on URL parameter
  const showOnboarding = searchParams.get("showOnboarding") === "true";
  
  useEffect(() => {
    // Fetch the latest user data to ensure we have the current onboarding status
    const loadUserData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        await fetchUserData();
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        setError(error.message || "Failed to load user data");
        toast.error("Failed to load user data. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [fetchUserData]);

  // Check if user is onboarded using type assertion
  const isUserOnboarded = user ? (user as any).isOnboarded === true : false;

  // Show loading state
  if (isLoading) {
    return null; // Don't show anything while loading
  }

  // Show error state
  if (error) {
    console.log("Error loading user data:", error);
    // Don't show the modal if there's an error
    return null;
  }

  // Only render the modal if needed
  if (showOnboarding && !isUserOnboarded) {
    return <OnboardingModal />;
  }

  // Return null if no modal is needed
  return null;
} 