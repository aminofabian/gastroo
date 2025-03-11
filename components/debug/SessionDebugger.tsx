"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export default function SessionDebugger() {
  const router = useRouter();
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchSessionData();
  }, []);

  const fetchSessionData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/debug/session');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch session data');
      }
      
      setSessionData(data);
    } catch (err: any) {
      console.error('Error fetching session data:', err);
      setError(err.message || 'An error occurred while fetching session data');
    } finally {
      setLoading(false);
    }
  };

  const refreshSession = async () => {
    setRefreshing(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to refresh session');
      }
      
      alert('Session refreshed. You will now be redirected to the login page.');
      router.push('/auth/login?callbackUrl=/dashboard');
    } catch (err: any) {
      console.error('Error refreshing session:', err);
      setError(err.message || 'An error occurred while refreshing session');
      setRefreshing(false);
    }
  };

  const updateOnboardingStatus = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/user/onboarding', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isOnboarded: true,
          profileCompleteness: 100,
          firstName: sessionData?.dbUser?.firstName || 'User',
          lastName: sessionData?.dbUser?.lastName || '',
          membershipType: 'new',
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update onboarding status');
      }
      
      alert('Onboarding status updated. Refreshing session data...');
      fetchSessionData();
    } catch (err: any) {
      console.error('Error updating onboarding status:', err);
      setError(err.message || 'An error occurred while updating onboarding status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Session Debugger</CardTitle>
        <CardDescription>
          Debug and fix issues with your session and onboarding status
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Session Status</h3>
              <div className="mt-2 p-4 bg-gray-50 rounded-md">
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(sessionData, null, 2)}
                </pre>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <h4 className="font-medium">Session Onboarded Status</h4>
                <p className="mt-1">
                  {sessionData?.comparison?.sessionOnboarded ? (
                    <span className="text-green-600">Onboarded ✓</span>
                  ) : (
                    <span className="text-red-600">Not Onboarded ✗</span>
                  )}
                </p>
              </div>
              
              <div className="p-4 border rounded-md">
                <h4 className="font-medium">Database Onboarded Status</h4>
                <p className="mt-1">
                  {sessionData?.comparison?.dbOnboarded ? (
                    <span className="text-green-600">Onboarded ✓</span>
                  ) : (
                    <span className="text-red-600">Not Onboarded ✗</span>
                  )}
                </p>
              </div>
            </div>
            
            {!sessionData?.comparison?.match && (
              <Alert>
                <AlertTitle>Session Mismatch</AlertTitle>
                <AlertDescription>
                  Your session data doesn't match the database. This could be why you're being redirected.
                  Try refreshing your session.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-4">
        <Button onClick={fetchSessionData} disabled={loading}>
          Refresh Data
        </Button>
        
        {sessionData?.dbUser?.isOnboarded === false && (
          <Button onClick={updateOnboardingStatus} disabled={loading} variant="outline">
            Force Update Onboarding Status
          </Button>
        )}
        
        <Button 
          onClick={refreshSession} 
          disabled={refreshing} 
          variant="destructive"
        >
          {refreshing ? 'Refreshing...' : 'Refresh Session (Logout)'}
        </Button>
      </CardFooter>
    </Card>
  );
} 