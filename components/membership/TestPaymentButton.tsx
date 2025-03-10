"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function TestPaymentButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const testPayment = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Call the test endpoint
      const response = await fetch("/api/pesapal/test");
      const data = await response.json();
      
      if (data.success) {
        setSuccess(true);
        toast.success("PesaPal credentials are working correctly!");
      } else {
        setError(data.error || "Unknown error occurred");
        toast.error("PesaPal credentials test failed");
      }
    } catch (error: any) {
      setError(error.message || "Failed to test PesaPal credentials");
      toast.error("Failed to test PesaPal credentials");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <Button
        onClick={testPayment}
        disabled={isLoading}
        className="w-full bg-[#c22f61] hover:bg-[#a02550] text-white"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Testing PesaPal Credentials...
          </div>
        ) : success ? (
          <div className="flex items-center justify-center">
            <Check className="w-5 h-5 mr-2" />
            PesaPal Credentials Working
          </div>
        ) : (
          "Test PesaPal Credentials"
        )}
      </Button>
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">Error Testing PesaPal Credentials</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start">
            <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
            <div>
              <p className="font-medium text-green-800">PesaPal Credentials Working</p>
              <p className="text-sm text-green-700 mt-1">
                Your PesaPal integration is configured correctly.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 