"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TestPaymentButton from "@/components/membership/TestPaymentButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

export default function PesapalTestPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch('/api/user/me');
        const data = await response.json();
        setIsAdmin(data.user?.role === 'ADMIN');
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdminStatus();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (isAdmin === false) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You need administrator privileges to access this page.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">PesaPal Integration Test</h1>
      
      <Tabs defaultValue="credentials">
        <TabsList className="mb-4">
          <TabsTrigger value="credentials">Credentials Test</TabsTrigger>
          <TabsTrigger value="env">Environment Variables</TabsTrigger>
        </TabsList>
        
        <TabsContent value="credentials">
          <Card>
            <CardHeader>
              <CardTitle>Test PesaPal Credentials</CardTitle>
              <CardDescription>
                Verify that your PesaPal API credentials are working correctly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TestPaymentButton />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="env">
          <Card>
            <CardHeader>
              <CardTitle>Environment Variables</CardTitle>
              <CardDescription>
                Check the status of your PesaPal environment variables.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EnvChecker />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EnvChecker() {
  const [envData, setEnvData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const checkEnv = async () => {
      try {
        const response = await fetch('/api/debug/env');
        
        if (!response.ok) {
          throw new Error('Failed to fetch environment data');
        }
        
        const data = await response.json();
        setEnvData(data);
      } catch (error: any) {
        console.error('Error checking environment:', error);
        setError(error.message || 'Failed to check environment variables');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkEnv();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }
  
  if (!envData) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-700">No environment data available.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">PesaPal Configuration</h3>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Environment:</div>
            <div className="text-sm">{envData.pesapal?.env || 'Not set'}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Consumer Key:</div>
            <div className="text-sm">
              {envData.pesapal?.keyExists ? '✅ Set' : '❌ Not set'}
              {envData.pesapal?.keyLength && ` (${envData.pesapal.keyLength} chars)`}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Consumer Secret:</div>
            <div className="text-sm">
              {envData.pesapal?.secretExists ? '✅ Set' : '❌ Not set'}
              {envData.pesapal?.secretLength && ` (${envData.pesapal.secretLength} chars)`}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">API URL:</div>
            <div className="text-sm">{envData.pesapal?.apiUrl || 'Not set'}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">IPN ID:</div>
            <div className="text-sm">{envData.pesapal?.ipnId || 'Not set'}</div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Application Configuration</h3>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Node Environment:</div>
            <div className="text-sm">{envData.app?.nodeEnv || 'Not set'}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">App URL:</div>
            <div className="text-sm">{envData.app?.appUrl || 'Not set'}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 