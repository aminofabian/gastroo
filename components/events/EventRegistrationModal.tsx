import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  event: any;
}

export default function EventRegistrationModal({
  isOpen,
  onClose,
  onSubmit,
  event,
}: EventRegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();

  // If no event or the event is free, don't show the modal
  if (!event || !event.memberPrice || event.memberPrice <= 0) {
    return null;
  }

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: session?.user?.firstName || "",
      lastName: session?.user?.lastName || "",
      email: session?.user?.email || "",
      phone: "",
    },
  });

  // Update form values when session changes
  useEffect(() => {
    if (session?.user) {
      form.setValue("firstName", session.user.firstName || "");
      form.setValue("lastName", session.user.lastName || "");
      form.setValue("email", session.user.email || "");
    }
  }, [session, form]);

  const handleSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to register for event",
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
        <div className="bg-emerald-600 p-6 text-white">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-bold text-white">Register for Event</DialogTitle>
            <DialogDescription className="text-base text-emerald-50">
              Please fill in your details to register for {event?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-emerald-400/30">
            <p className="text-lg font-semibold text-white">
              Registration Fee: KES {event.memberPrice.toLocaleString()}
            </p>
            <div className="flex items-center gap-2 mt-2 text-sm text-emerald-50">
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">First Name</FormLabel>
                      <FormControl>
                        <Input className="h-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500" placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Last Name</FormLabel>
                      <FormControl>
                        <Input className="h-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500" placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input className="h-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500" placeholder="john@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Phone Number</FormLabel>
                    <FormControl>
                      <Input className="h-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500" placeholder="+254..." {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-600"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 min-w-[160px] shadow-sm" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg 
                        className="w-5 h-5" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Proceed to Payment
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
} 