"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import { toast } from "sonner";

export default function DashboardClient() {
  const router = useRouter();
  const { user, fetchUserData } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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

  // If user data is loaded and user is not onboarded, redirect to membership page
  useEffect(() => {
    if (!isLoading && user && !isUserOnboarded) {
      toast.info("Please complete your profile to access the dashboard");
      router.push('/membership?from=dashboard');
    }
  }, [isLoading, user, isUserOnboarded, router]);

  // Return null as this component doesn't render anything visible
  return null;
} 