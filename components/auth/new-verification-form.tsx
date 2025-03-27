"use client"

import CardWrapper from "./CardWrapper"
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import FormError from "../common/FormError";
import FormSuccess from "../common/FormSuccess";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const onSubmit = useCallback(() => {
    if (success || error) return;
    
    if (!token) {
      setError("Missing token");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong")
      })
  }, [token, success, error])
  
  useEffect(() => {
    onSubmit();
  }, [onSubmit])
  
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#003366]/5 to-transparent" />
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 35c5.5 0 10-4.5 10-10s-4.5-10-10-10S5 19.5 5 25s4.5 10 10 10zm30 0c5.5 0 10-4.5 10-10s-4.5-10-10-10-10 4.5-10 10 4.5 10 10 10zM30 50c5.5 0 10-4.5 10-10s-4.5-10-10-10-10 4.5-10 10 4.5 10 10 10z' fill='%23003366' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} 
      />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#003366]/10 blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#003366]/10 blur-3xl transform -translate-x-1/2 translate-y-1/2" />

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-lg border border-white/20">
            <CardWrapper
              headerLabel="Confirming Your Verification"
              backButtonLabel="Back to Login"
              backButtonHref="/auth/login"
            >
              <div className="flex flex-col items-center w-full justify-center space-y-4 min-h-[120px]">
                {!success && !error && (
                  <div className="py-4">
                    <BeatLoader color="#003366" />
                  </div>
                )}
                <FormSuccess message={success} />
                {!success && (
                  <FormError message={error} />
                )}
              </div>
            </CardWrapper>
          </div>
        </div>
      </div>
    </div>
  )
}