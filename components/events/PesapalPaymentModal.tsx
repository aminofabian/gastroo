import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { submitPayment, checkPaymentStatus } from "@/lib/pesapal";
import { AlertCircle, CheckCircle, ExternalLink } from "lucide-react";

interface PaymentStatus {
  paid: boolean;
  orderTrackingId?: string;
  merchantReference?: string;
}

interface PesapalPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: (paymentData: PaymentStatus) => void;
  event: any;
  userDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    userId?: string;
  };
}

export default function PesapalPaymentModal({
  isOpen,
  onClose,
  onPaymentComplete,
  event,
  userDetails,
}: PesapalPaymentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({ paid: false });
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Check payment status periodically if payment has been initiated
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isPaymentInitiated && paymentStatus.orderTrackingId && !paymentStatus.paid) {
      intervalId = setInterval(async () => {
        await verifyPayment();
      }, 5000); // Check every 5 seconds
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPaymentInitiated, paymentStatus]);

  // Initiate payment when the modal opens
  useEffect(() => {
    if (isOpen && !isPaymentInitiated && !isSubmitting) {
      initiatePayment();
    }
  }, [isOpen]);

  const verifyPayment = async () => {
    if (!paymentStatus.orderTrackingId) return;
    
    try {
      setIsCheckingPayment(true);
      const result = await checkPaymentStatus(paymentStatus.orderTrackingId);
      
      if (result.status === "COMPLETED") {
        const updatedStatus = { 
          ...paymentStatus, 
          paid: true 
        };
        
        setPaymentStatus(updatedStatus);
        
        // Automatically register the user with payment details
        try {
          // Determine if user is logged in or guest
          const endpoint = userDetails.userId ? "/api/events/register" : "/api/events/register-guest";
          
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...userDetails,
              eventId: event.id,
              paymentMethod: "PESAPAL",
              paymentReference: paymentStatus.merchantReference,
              paymentTrackingId: paymentStatus.orderTrackingId,
              paymentStatus: "COMPLETED"
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Failed to register for event");
          }
          
          toast({
            title: "Registration Successful",
            description: "Payment confirmed. You have been successfully registered for this event.",
          });
          
          // Notify parent component that payment is complete and registration is successful
          onPaymentComplete(updatedStatus);
          
          // Close modal after successful payment and registration
          setTimeout(() => {
            onClose();
          }, 2000);
        } catch (registrationError) {
          console.error("Registration after payment error:", registrationError);
          
          // Even if registration fails, check if the user is already registered
          // This could happen if the payment callback already registered the user
          try {
            const checkRegistrationResponse = await fetch(`/api/events/check-registration?eventId=${event.id}`);
            const checkData = await checkRegistrationResponse.json();
            
            if (checkRegistrationResponse.ok && checkData.isRegistered) {
              // User is already registered, so consider this a success
              toast({
                title: "Already Registered",
                description: "Your payment was successful and you are registered for this event.",
              });
              
              // Notify parent component that payment is complete
              onPaymentComplete(updatedStatus);
              
              // Close modal
              setTimeout(() => {
                onClose();
              }, 2000);
              
              return;
            }
          } catch (checkError) {
            console.error("Error checking registration status:", checkError);
          }
          
          // If we get here, the registration truly failed
          toast({
            title: "Payment Successful, Registration Failed",
            description: "Your payment was successful, but we couldn't complete your registration. Please contact support.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Payment verification error:", error);
    } finally {
      setIsCheckingPayment(false);
    }
  };

  const initiatePayment = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Calculate the correct price based on membership status
      // This would need to be determined based on the user's membership status
      const amount = event.memberPrice || event.nonMemberPrice || 0;
      
      if (amount <= 0) {
        throw new Error("Invalid event price");
      }
      
      // Initiate payment with Pesapal
      const paymentResponse = await submitPayment({
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        phone: userDetails.phone,
        membershipType: 'event', // Using 'event' as the type for event payments
        amount: amount
      });

      if (!paymentResponse.redirectUrl) {
        throw new Error("Failed to initialize payment");
      }

      // Open payment window in new tab
      window.open(paymentResponse.redirectUrl, '_blank');

      // Store payment reference for verification
      setPaymentStatus({
        paid: false,
        orderTrackingId: paymentResponse.orderTrackingId,
        merchantReference: paymentResponse.merchantReference
      });
      
      setIsPaymentInitiated(true);
      
      toast({
        title: "Payment Initiated",
        description: "Please complete your payment in the opened window.",
      });
    } catch (error) {
      console.error("Payment initiation error:", error);
      setError(error instanceof Error ? error.message : "Failed to initiate payment");
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to initiate payment",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open: boolean) => {
        if (!open) onClose();
      }}
      modal={true}
    >
      <DialogContent className="sm:max-w-[500px] p-0 bg-white border-0 shadow-2xl">
        <div className="bg-blue-600 p-6 text-white">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-bold text-white">Complete Payment</DialogTitle>
            <DialogDescription className="text-base text-blue-50">
              Please complete payment to register for {event?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-blue-400/30">
            <p className="text-lg font-semibold text-white">
              Registration Fee: KES {event.memberPrice?.toLocaleString() || event.nonMemberPrice?.toLocaleString()}
            </p>
            <div className="flex items-center gap-2 mt-2 text-sm text-blue-50">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Secure payment processing via PesaPal
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <div className={`p-4 rounded-lg ${paymentStatus.paid ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
              <div className="flex items-start gap-3">
                {paymentStatus.paid ? (
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-blue-500 mt-0.5" />
                )}
                <div>
                  <h3 className={`font-semibold ${paymentStatus.paid ? 'text-green-800' : 'text-blue-800'}`}>
                    {paymentStatus.paid ? 'Payment Successful' : 'Payment Pending'}
                  </h3>
                  <p className={`text-sm ${paymentStatus.paid ? 'text-green-700' : 'text-blue-700'}`}>
                    {paymentStatus.paid 
                      ? 'Your payment has been processed successfully. You are now registered for this event.'
                      : 'Please complete your payment in the opened window. This page will update automatically once payment is confirmed.'}
                  </p>
                  {!paymentStatus.paid && isPaymentInitiated && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 h-8"
                        onClick={verifyPayment}
                        disabled={isCheckingPayment}
                      >
                        {isCheckingPayment ? 'Checking...' : 'Check Payment Status'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-blue-200 text-blue-700 hover:bg-blue-50 text-sm px-3 py-1 h-8"
                        onClick={initiatePayment}
                        disabled={isSubmitting}
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-1" />
                        Reopen Payment Window
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800">Error</h3>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-600"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 