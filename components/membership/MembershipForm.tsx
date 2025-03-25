"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { submitPayment } from '@/lib/pesapal';
import { usePaymentStatus } from '@/lib/hooks/usePaymentStatus';
import TestPaymentButton from './TestPaymentButton';
import { uploadToS3 } from "@/lib/s3-upload";

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
  
  // Document URLs
  cvUrl: z.string().optional(),
  licenseUrl: z.string().optional(),
  otherDocumentsUrls: z.array(z.string()).optional(),
  
  // Add payment information
  membershipType: z.enum(["new", "renewal"], {
    required_error: "Please select membership type",
  }),
  customAmount: z.string().optional(),
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
    id: "documents",
    title: "Required Documents",
    description: "Upload your required documentation",
    fields: ["cvUrl", "licenseUrl", "otherDocumentsUrls"],
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

interface PaymentStatus {
  paid: boolean;
  orderTrackingId?: string;
  merchantReference?: string;
}

export default function MembershipForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({ paid: false });
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasExistingPayment, setHasExistingPayment] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);

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
      customAmount: "",
      cvUrl: "",
      licenseUrl: "",
      otherDocumentsUrls: [],
    },
  });

  const { isPaid, isChecking, error: paymentStatusError, status: paymentStatusText } = usePaymentStatus(paymentStatus.orderTrackingId);

  // Function to handle redirection to dashboard
  const redirectToDashboard = (message: string = "Profile completed successfully!") => {
    toast.success(message);
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  useEffect(() => {
    if (isPaid) {
      setPaymentStatus(prev => ({ ...prev, paid: true }));
      toast.success("Payment completed successfully!");
      
      // Update onboarding status after payment is completed
      const updateOnboardingStatus = async () => {
        try {
          // Get form values
          const formValues = form.getValues();
          
          // Create a copy of form values without the email field
          const { email, ...dataWithoutEmail } = formValues;
          
          // Prepare onboarding data without email
          const onboardingData = {
            ...dataWithoutEmail,
            isOnboarded: true,
            profileCompleteness: 100, // Set profile completeness to 100%
            membershipType: formValues.membershipType,
          };
          
          // Update user profile with membership details and mark as onboarded
          const response = await fetch("/api/user/onboarding", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(onboardingData),
          });
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error("Error updating profile after payment:", errorText);
            throw new Error(`Failed to update profile: ${errorText}`);
          }
          
          redirectToDashboard("Payment completed and profile updated successfully!");
          
        } catch (error) {
          console.error("Error updating profile after payment:", error);
        }
      };
      
      updateOnboardingStatus();
    }
  }, [isPaid, form, router]);

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch('/api/user/me');
        const data = await response.json();
        setIsAdmin(data.user?.role === 'ADMIN');
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };
    
    checkAdminStatus();
  }, []);

  // Check if user has existing payments
  useEffect(() => {
    const checkExistingPayments = async () => {
      try {
        const response = await fetch('/api/payments/user');
        const data = await response.json();
        
        // If user has any successful payments, set hasExistingPayment to true
        if (data.payments && data.payments.length > 0) {
          const successfulPayments = data.payments.filter(
            (payment: any) => payment.status === 'COMPLETED'
          );
          setHasExistingPayment(successfulPayments.length > 0);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    };
    
    checkExistingPayments();
  }, []);

  const onSubmit = async (values: z.infer<typeof membershipSchema>) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const amount = values.membershipType === "new" ? 6500 : 5000;
      
      // First, update the user's onboarding status
      try {
        // Create a copy of values without the email field
        const { email, ...dataWithoutEmail } = values;
        
        // Prepare onboarding data without email
        const onboardingData = {
          ...dataWithoutEmail,
          isOnboarded: true,
          profileCompleteness: 100, // Set profile completeness to 100%
          membershipType: values.membershipType,
        };
        
        const onboardingResponse = await fetch("/api/user/onboarding", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(onboardingData),
        });

        if (!onboardingResponse.ok) {
          const errorData = await onboardingResponse.text();
          console.error("Onboarding error:", errorData);
          throw new Error(`Failed to update onboarding status: ${errorData}`);
        }
        
        // Log success
        console.log("Onboarding status updated successfully");
      } catch (onboardingError: any) {
        console.error("Error updating onboarding status:", onboardingError);
        toast.error(`Onboarding error: ${onboardingError.message}`);
        // Continue with payment even if onboarding fails
      }

      // Skip payment if user already has a successful payment
      if (hasExistingPayment) {
        toast.success("Profile updated successfully!");
        setPaymentStatus({ paid: true });
        
        redirectToDashboard("Profile updated successfully!");
        
        return;
      }

      // Initialize PesaPal payment
      const paymentResponse = await submitPayment({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        membershipType: values.membershipType,
        amount: amount
      });

      if (!paymentResponse.redirectUrl) {
        throw new Error("Failed to initialize payment");
      }

      // Redirect to PesaPal payment page
      window.open(paymentResponse.redirectUrl, '_blank');

      // Store payment reference for verification
      setPaymentStatus({
        paid: false,
        orderTrackingId: paymentResponse.orderTrackingId,
        merchantReference: paymentResponse.merchantReference
      });

      // Refresh user data to update UI
      router.refresh();

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

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const membershipType = form.getValues("membershipType");
      const customAmount = form.getValues("customAmount");
      
      // Calculate amount based on membership type or use custom amount if provided
      let amount;
      if (customAmount && parseInt(customAmount) > 0) {
        amount = parseInt(customAmount);
      } else {
        amount = membershipType === "new" ? 6500 : 5000;
      }

      const response = await submitPayment({
        email: form.getValues("email"),
        firstName: form.getValues("firstName"),
        lastName: form.getValues("lastName"),
        phone: form.getValues("phone"),
        membershipType: membershipType,
        amount: amount
      });

      // Open payment window in new tab
      window.open(response.redirectUrl, '_blank');

      // Store payment reference for verification
      setPaymentStatus({
        paid: false,
        orderTrackingId: response.orderTrackingId,
        merchantReference: response.merchantReference
      });

    } catch (error: any) {
      setError(error.message || 'Payment initiation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentStatus.paid) {
      setError('Please complete payment before submitting application');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Get form values
      const formValues = form.getValues();
      
      // Create a copy of form values without the email field
      const { email, ...dataWithoutEmail } = formValues;
      
      // Prepare onboarding data without email
      const onboardingData = {
        ...dataWithoutEmail,
        isOnboarded: true,
        profileCompleteness: 100, // Set profile completeness to 100%
        membershipType: formValues.membershipType,
      };
      
      // Update user profile with membership details and mark as onboarded
      const response = await fetch("/api/user/onboarding", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(onboardingData),
      });
      
      const responseText = await response.text();
      
      if (!response.ok) {
        console.error("Error response:", responseText);
        throw new Error(`Failed to update profile: ${responseText}`);
      }
      
      redirectToDashboard("Membership application submitted successfully!");
    } catch (error: any) {
      console.error("Submit error:", error);
      setError(error.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = async (file: File, type: 'doc1' | 'doc2' | 'doc3') => {
    try {
      setUploadingFiles(true);
      console.log(`Starting upload for ${type}:`, { fileName: file.name, fileType: file.type, fileSize: file.size });
      
      const url = await uploadToS3(file, file.name, file.type);
      console.log(`Upload successful for ${type}:`, url);
      
      switch (type) {
        case 'doc1':
          form.setValue('cvUrl', url);
          console.log('Set cvUrl in form:', url);
          break;
        case 'doc2':
          form.setValue('licenseUrl', url);
          console.log('Set licenseUrl in form:', url);
          break;
        case 'doc3':
          const currentUrls = form.getValues('otherDocumentsUrls') || [];
          form.setValue('otherDocumentsUrls', [...currentUrls, url]);
          console.log('Updated otherDocumentsUrls in form:', [...currentUrls, url]);
          break;
      }
      
      toast.success(`Document ${type === 'doc1' ? '1' : type === 'doc2' ? '2' : '3'} uploaded successfully`);
    } catch (error) {
      console.error(`Upload error for ${type}:`, error);
      toast.error('Failed to upload file');
    } finally {
      setUploadingFiles(false);
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
        <form onSubmit={handleSubmit} className="space-y-6">
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

            {currentFields.includes("cvUrl") && (
              <FormField
                control={form.control}
                name="cvUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document 1</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, 'doc1');
                            }
                          }}
                          className="h-12"
                          disabled={uploadingFiles}
                        />
                        {field.value && (
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Check className="w-4 h-4 text-green-500" />
                            <span>Document 1 uploaded successfully</span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Please upload your document in PDF, Word, or image format
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentFields.includes("licenseUrl") && (
              <FormField
                control={form.control}
                name="licenseUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document 2</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, 'doc2');
                            }
                          }}
                          className="h-12"
                          disabled={uploadingFiles}
                        />
                        {field.value && (
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Check className="w-4 h-4 text-green-500" />
                            <span>Document 2 uploaded successfully</span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Upload any required document in PDF, Word, or image format
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentFields.includes("otherDocumentsUrls") && (
              <FormField
                control={form.control}
                name="otherDocumentsUrls"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document 3 (Optional)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, 'doc3');
                            }
                          }}
                          className="h-12"
                          disabled={uploadingFiles}
                        />
                        {field.value && field.value.length > 0 && (
                          <div className="space-y-2">
                            {field.value.map((url, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm text-gray-500">
                                <Check className="w-4 h-4 text-green-500" />
                                <span>Document 3 uploaded successfully</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Upload any additional supporting document
                    </FormDescription>
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
                        disabled={isSubmitting}
                        className={`h-24 flex flex-col items-center justify-center space-y-2 relative ${
                          field.value === "new" ? "bg-[#c22f61] text-white" : "bg-gray-100"
                        }`}
                        onClick={(e) => {
                          field.onChange("new");
                        }}
                      >
                        <div className="flex flex-col items-center">
                          <span className="font-bold">New Membership</span>
                          <span className="text-sm">KES 10,000/=</span>
                        </div>
                        {paymentStatus.paid && field.value === 'new' && (
                          <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center">
                            <Check className="w-8 h-8 text-white" />
                          </div>
                        )}
                      </Button>
                      <Button
                        type="button"
                        disabled={isSubmitting}
                        className={`h-24 flex flex-col items-center justify-center space-y-2 relative ${
                          field.value === "renewal" ? "bg-[#c22f61] text-white" : "bg-gray-100"
                        }`}
                        onClick={(e) => {
                          field.onChange("renewal");
                        }}
                      >
                        <div className="flex flex-col items-center">
                          <span className="font-bold">Membership Renewal</span>
                          <span className="text-sm">KES 20,000/=</span>
                        </div>
                        {paymentStatus.paid && field.value === 'renewal' && (
                          <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center">
                            <Check className="w-8 h-8 text-white" />
                          </div>
                        )}
                      </Button>
                    </div>
                    
                    {/* Custom Amount Input */}
                    <FormField
                      control={form.control}
                      name="customAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom Amount (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Enter custom amount in KES"
                              className="h-12"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                // Don't automatically trigger payment on input change
                                // Let the user click the payment button instead
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter a custom amount if you wish to contribute more than the standard fee.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Payment Button */}
                    <Button
                      type="button"
                      onClick={handlePayment}
                      disabled={isSubmitting || paymentStatus.paid}
                      className="w-full h-12 mt-4 bg-[#c22f61] hover:bg-[#a02550] text-white"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing Payment...
                        </div>
                      ) : paymentStatus.paid ? (
                        <div className="flex items-center justify-center">
                          <Check className="w-5 h-5 mr-2" />
                          Payment Completed
                        </div>
                      ) : (
                        "Proceed to Payment"
                      )}
                    </Button>
                    
                    {/* Payment Status Information */}
                    {paymentStatus.orderTrackingId && !paymentStatus.paid && (
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          {isChecking ? (
                            <Loader2 className="w-4 h-4 animate-spin text-yellow-700" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-yellow-700" />
                          )}
                          <p className="text-sm text-yellow-700">
                            {isChecking 
                              ? "Checking payment status..." 
                              : "Please complete the payment in the new window. Your payment status will be updated automatically once completed."}
                          </p>
                        </div>
                        {paymentStatusText && !isPaid && (
                          <p className="mt-2 text-xs text-yellow-700">
                            Current status: {paymentStatusText}
                          </p>
                        )}
                      </div>
                    )}
                    
                    {paymentStatusError && !paymentStatus.paid && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">
                          Error checking payment status: {paymentStatusError}
                        </p>
                      </div>
                    )}
                    
                    {error && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    )}
                    
                    {/* Admin Test Button */}
                    {isAdmin && (
                      <div className="mt-6 border-t pt-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-4">Admin Tools</h3>
                        <TestPaymentButton />
                      </div>
                    )}
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
                disabled={isSubmitting || !paymentStatus.paid}
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

          {/* Payment Section */}
          {!paymentStatus.paid && (
            <div className="mt-6">
              <button
                type="button"
                onClick={handlePayment}
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-white bg-primary hover:bg-primary/90 rounded-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Pay Membership Fee'}
              </button>
            </div>
          )}

          {paymentStatus.orderTrackingId && !paymentStatus.paid && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-700">
                Please complete the payment in the new window. Your application will be enabled once payment is confirmed.
              </p>
            </div>
          )}

          {!paymentStatus.paid && (
            <p className="mt-2 text-sm text-gray-600 text-center">
              Please complete payment to enable application submission
            </p>
          )}
        </form>
      </Form>
    </div>
  );
} 