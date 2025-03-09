"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";

// Form Schema
const membershipSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  
  // Professional Information
  designation: z.enum(["MD", "PhD", "Other"]),
  specialization: z.string().min(2, "Specialization must be at least 2 characters"),
  licenseNumber: z.string().optional(),
  hospital: z.string().min(2, "Hospital/Institution name must be at least 2 characters"),
  
  // Contact Information
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  county: z.string().min(2, "County must be at least 2 characters"),
  postalCode: z.string().optional(),
  
  // Add payment information
  membershipType: z.enum(["new", "renewal"], {
    required_error: "Please select membership type",
  }),
}).refine((data) => {
  // Remove the password validation refine
  return true;
});

const steps = [
  {
    id: "personal",
    title: "Personal Information",
    description: "Start with your basic information",
    fields: ["firstName", "lastName", "email", "phone"],
  },
  {
    id: "professional",
    title: "Professional Details",
    description: "Tell us about your medical practice",
    fields: ["designation", "specialization", "licenseNumber", "hospital"],
  },
  {
    id: "contact",
    title: "Contact Information",
    description: "Where can we reach you?",
    fields: ["address", "city", "county", "postalCode"],
  },
  {
    id: "payment",
    title: "Payment Information",
    description: "Choose your membership type",
    fields: ["membershipType"],
  },
];

export default function MembershipForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [paymentMessage, setPaymentMessage] = useState('');

  const form = useForm<z.infer<typeof membershipSchema>>({
    resolver: zodResolver(membershipSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      designation: "MD",
      specialization: "",
      licenseNumber: "",
      hospital: "",
      address: "",
      city: "",
      county: "",
      postalCode: "",
      membershipType: "new",
    },
  });

  const onSubmit = async (values: z.infer<typeof membershipSchema>) => {
    setIsSubmitting(true);
    try {
      const amount = values.membershipType === "new" ? 6500 : 5000;
      
      // First, update the user's onboarding status
      const onboardingResponse = await fetch("/api/user/onboarding", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          isOnboarded: true,
          membershipType: values.membershipType,
        }),
      });

      if (!onboardingResponse.ok) {
        throw new Error("Failed to update onboarding status");
      }

      // Initialize PesaPal payment
      const paymentResponse = await fetch("/api/pesapal/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          membershipType: values.membershipType,
          phone: values.phone
        }),
      });

      const paymentData = await paymentResponse.json();
      
      if (paymentData.error) {
        throw new Error(paymentData.error);
      }

      // Redirect to PesaPal payment page
      window.location.href = paymentData.redirect_url;

    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to process payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentFields = steps[currentStep].fields;
  const isLastStep = currentStep === steps.length - 1;

  const next = async () => {
    const fieldsToValidate = steps[currentStep].fields;
    const output = await form.trigger(fieldsToValidate as any[]);
    
    if (output) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handlePayment = async (type: "new" | "renewal", amount: number) => {
    setPaymentStatus('processing');
    setPaymentMessage('Initiating payment...');
    
    try {
      const response = await fetch("/api/pesapal/stk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          membershipType: type,
          phone: form.getValues("phone"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment failed');
      }

      setPaymentMessage('Please check your phone to complete the payment');

      // Start polling for payment status
      const checkPaymentStatus = async () => {
        const statusResponse = await fetch(`/api/pesapal/status/${data.checkoutRequestId}`);
        const statusData = await statusResponse.json();

        if (statusData.status === 'COMPLETED') {
          setPaymentStatus('success');
          setPaymentMessage('Payment completed successfully!');
          return true;
        } else if (statusData.status === 'FAILED') {
          setPaymentStatus('error');
          setPaymentMessage('Payment failed. Please try again.');
          return true;
        }
        return false;
      };

      // Poll every 5 seconds for 2 minutes
      let attempts = 0;
      const maxAttempts = 24; // 2 minutes
      
      const pollInterval = setInterval(async () => {
        attempts++;
        const isDone = await checkPaymentStatus();
        
        if (isDone || attempts >= maxAttempts) {
          clearInterval(pollInterval);
          if (!isDone && attempts >= maxAttempts) {
            setPaymentStatus('error');
            setPaymentMessage('Payment timeout. Please try again.');
          }
        }
      }, 5000);

    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      setPaymentMessage(error instanceof Error ? error.message : 'Payment failed');
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.id} className="md:flex-1">
              <div
                className={`group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 ${
                  index <= currentStep
                    ? "border-[#c22f61]"
                    : "border-gray-200"
                }`}
              >
                <span className="text-sm font-medium text-[#c22f61]">
                  Step {index + 1}
                </span>
                <span className="text-sm font-medium">{step.title}</span>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step Title */}
          <div className="space-y-2">
            <h2 className="text-2xl font-display font-bold text-gray-900">
              {steps[currentStep].title}
            </h2>
            <p className="text-sm text-gray-500">
              {steps[currentStep].description}
            </p>
          </div>

          {/* Form Fields */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {currentFields.includes("firstName") && (
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentFields.includes("lastName") && (
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentFields.includes("email") && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentFields.includes("phone") && (
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentFields.includes("designation") && (
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Designation</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select your designation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MD">MD - Medical Doctor</SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentFields.includes("specialization") && (
              <FormField
                control={form.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization/Primary Professional Activity</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentFields.includes("licenseNumber") && (
              <FormField
                control={form.control}
                name="licenseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Number (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentFields.includes("hospital") && (
              <FormField
                control={form.control}
                name="hospital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital/Institution</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentFields.includes("address") && (
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentFields.includes("city") && (
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentFields.includes("county") && (
              <FormField
                control={form.control}
                name="county"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>County</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentFields.includes("postalCode") && (
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentFields.includes("membershipType") && (
              <FormField
                control={form.control}
                name="membershipType"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel>Select Membership Type</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        type="button"
                        disabled={paymentStatus === 'processing'}
                        className={`h-24 flex flex-col items-center justify-center space-y-2 relative ${
                          field.value === "new" ? "bg-[#c22f61] text-white" : "bg-gray-100"
                        }`}
                        onClick={async () => {
                          field.onChange("new");
                          await handlePayment("new", 6500);
                        }}
                      >
                        <div className="flex flex-col items-center">
                          <span className="font-bold">New Membership</span>
                          <span className="text-sm">KES 6,500/=</span>
                        </div>
                        {paymentStatus === 'processing' && field.value === 'new' && (
                          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                            <Loader2 className="w-6 h-6 animate-spin text-white" />
                          </div>
                        )}
                        {paymentStatus === 'success' && field.value === 'new' && (
                          <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center">
                            <Check className="w-8 h-8 text-white" />
                          </div>
                        )}
                      </Button>
                      <Button
                        type="button"
                        disabled={paymentStatus === 'processing'}
                        className={`h-24 flex flex-col items-center justify-center space-y-2 relative ${
                          field.value === "renewal" ? "bg-[#c22f61] text-white" : "bg-gray-100"
                        }`}
                        onClick={async () => {
                          field.onChange("renewal");
                          await handlePayment("renewal", 5000);
                        }}
                      >
                        <div className="flex flex-col items-center">
                          <span className="font-bold">Membership Renewal</span>
                          <span className="text-sm">KES 5,000/=</span>
                        </div>
                        {paymentStatus === 'processing' && field.value === 'renewal' && (
                          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                            <Loader2 className="w-6 h-6 animate-spin text-white" />
                          </div>
                        )}
                        {paymentStatus === 'success' && field.value === 'renewal' && (
                          <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center">
                            <Check className="w-8 h-8 text-white" />
                          </div>
                        )}
                      </Button>
                    </div>
                    {paymentMessage && (
                      <p className={`text-sm ${
                        paymentStatus === 'error' ? 'text-red-500' : 
                        paymentStatus === 'success' ? 'text-green-500' : 
                        'text-gray-500'
                      }`}>
                        {paymentMessage}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={prev}
              disabled={currentStep === 0}
              className="h-12"
            >
              Previous
            </Button>
            
            {isLastStep ? (
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="h-12 bg-[#c22f61] hover:bg-[#004488] text-white font-display font-bold transition-colors"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={next}
                className="h-12 bg-[#c22f61] hover:bg-[#004488] text-white font-display font-bold transition-colors"
              >
                Next
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
} 