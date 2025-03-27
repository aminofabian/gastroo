"use client";

import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../common/FormError";
import FormSuccess from "../common/FormSuccess";
import { login } from "@/actions/login";
import { useState, useTransition, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../homepage/Logo";
import { signIn } from "next-auth/react";

import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
  FormMessage,
} from "../ui/form";

// Success Message Component - Extracted to solve hooks ordering issue
const SuccessMessage = ({ successData }: { successData: string }) => {
  const successInfo = JSON.parse(successData);
  const [countdown, setCountdown] = useState(successInfo.countdownFrom);
  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  
  return (
    <div className="rounded-lg overflow-hidden border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50">
      <div className="p-4 flex items-center space-x-3">
        <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-8 w-8 text-emerald-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-display text-xl font-semibold text-emerald-700">
            {successInfo.title}
          </h3>
          <p className="mt-1 text-sm text-emerald-600">
            {successInfo.message}
          </p>
        </div>
      </div>
      
      {/* Loading bar */}
      <div className="relative h-1 bg-emerald-100">
        <div 
          className="absolute left-0 top-0 h-full bg-emerald-500 transition-all duration-300 ease-in-out"
          style={{ width: `${((successInfo.countdownFrom - countdown) / successInfo.countdownFrom) * 100}%` }}
        />
      </div>
      
      {/* Footer with countdown */}
      <div className="p-3 bg-emerald-50 text-center text-sm text-emerald-600 font-medium border-t border-emerald-100">
        Redirecting to dashboard in {countdown} second{countdown !== 1 ? 's' : ''}...
      </div>
    </div>
  );
};

interface LoginFormProps {
  callbackUrl?: string | null;
}

const LoginForm = ({ callbackUrl }: LoginFormProps) => {
  const searchParams = useSearchParams();
  const urLError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email Already in Use with a Different Provider"
      : "";

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (response?.error) {
        form.reset();
        // Map the error code to a user-friendly message with additional styling info
        const errorMessages = {
          CredentialsSignin: { 
            message: "The email or password you entered doesn't match our records. Let's try again!", 
            icon: "🔐", 
            variant: "auth" 
          },
          OAuthAccountNotLinked: { 
            message: "This email is already associated with a different sign-in method", 
            icon: "🔄", 
            variant: "warning" 
          },
          default: { 
            message: "Oops! Something unexpected happened", 
            icon: "⚠️", 
            variant: "error" 
          },
        };
        
        const errorInfo = errorMessages[response.error as keyof typeof errorMessages] || errorMessages.default;
        setError(JSON.stringify(errorInfo));
      }

      if (!response?.error) {
        form.reset();
        setSuccess(JSON.stringify({ 
          title: "Welcome back! 🎉", 
          message: "Preparing your dashboard experience...", 
          countdownFrom: 3 
        }));
        
        // Add a small delay for the success message to be visible
        setTimeout(() => {
          router.push(callbackUrl || "/dashboard");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setError(JSON.stringify({ 
        message: "Our servers are feeling a bit shy right now. Please try again soon!", 
        icon: "🤖", 
        variant: "error" 
      }));
    } finally {
      setIsLoading(false);
    }
  };

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
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#003366]/10  blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#003366]/10  blur-3xl transform -translate-x-1/2 translate-y-1/2" />

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-6xl mx-auto">
          {/* Left Side - Hidden on mobile */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
            <div className="relative w-full max-w-md">
              {/* Background Card Effect */}
              <div className="absolute -inset-2">
                <div className="w-full h-full mx-auto rotate-6 bg-gradient-to-r from-[#003366] to-[#004488] blur-xl opacity-30 -3xl" />
              </div>
              
              {/* Content Card */}
              <div className="relative bg-[#003366]  p-8 shadow-xl">
                <div className="flex justify-center mb-8">
                  <Logo variant="light" />
                </div>
                <h1 className="text-3xl xl:text-4xl font-display font-bold text-white mb-6 text-center">
                  Gastroenterology Society of Kenya
                </h1>
                <p className="text-lg text-white/80 font-display leading-relaxed text-center">
                  Advancing Digestive Health Care in Kenya through Research, Education, and Excellence
                </p>
                {/* Feature List */}
                <div className="mt-8 space-y-4">
                  {[
                    "Access exclusive medical resources",
                    "Join professional networks",
                    "Track your CPD points",
                    "Register for upcoming events"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center text-white/90">
                      <svg className="w-5 h-5 mr-3 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-display text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white -3xl p-6 sm:p-8 md:p-12 shadow-xl backdrop-blur-lg border border-white/20">
              <div className="w-full max-w-md mx-auto">
                {/* Logo - Show only on mobile */}
                <div className="flex justify-center w-full mb-8 lg:hidden">
                  <Logo variant="dark" />
                </div>

                <CardWrapper
                  headerLabel="Welcome Back"
                  backButtonLabel="Don't Have an Account?"
                  backButtonHref="/auth/register"
                  showSocial
                >
                  <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-display">Email</FormLabel>
                              <FormControl>
                                <Input
                                  disabled={isPending}
                                  {...field}
                                  placeholder="john.doe@example.com"
                                  type="email"
                                  className="h-12 bg-gray-50/50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#003366] focus:ring-[#003366]/20"
                                />
                              </FormControl>
                              <FormMessage className="text-sm text-red-500 font-light" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-display">Password</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your password"
                                  disabled={isPending}
                                  type="password"
                                  className="h-12 bg-gray-50/50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#003366] focus:ring-[#003366]/20"
                                />
                              </FormControl>
                              <FormMessage className="text-sm text-red-500 font-light" />
                            </FormItem>
                          )}
                        />
                      </div>
                      {error && (() => {
                        const errorInfo = JSON.parse(error);
                        const variantStyles = {
                          auth: "bg-rose-50 border-rose-200 text-rose-700",
                          warning: "bg-amber-50 border-amber-200 text-amber-700",
                          error: "bg-red-50 border-red-200 text-red-700"
                        };
                        const style = variantStyles[errorInfo.variant as keyof typeof variantStyles];
                        
                        return (
                          <div className={`animate-pulse rounded-lg p-4 flex items-center space-x-3 ${style} border`}>
                            <div className="text-2xl">{errorInfo.icon}</div>
                            <p className="text-sm font-medium">{errorInfo.message}</p>
                          </div>
                        );
                      })()}
                      {urLError && (
                        <div className="animate-pulse rounded-lg p-4 flex items-center space-x-3 bg-amber-50 border border-amber-200 text-amber-700">
                          <div className="text-2xl">🔄</div>
                          <p className="text-sm font-medium">{urLError}</p>
                        </div>
                      )}
                      {success && <SuccessMessage successData={success} />}
                      <div className="flex items-center justify-between">
                        <Button 
                          size="sm" 
                          variant="link" 
                          className="px-0 font-display text-[#003366]/80 hover:text-[#003366]"
                          asChild
                        >
                          <Link href='/auth/reset'>
                            Forgot Password?
                          </Link>
                        </Button>
                      </div>
                      <Button
                        variant="default"
                        type="submit"
                        className="w-full h-12 bg-[#003366] hover:bg-[#004488] text-white font-display font-bold transition-colors"
                        disabled={isPending}
                      >
                        {isPending ? "Signing in..." : "Sign in to your account"}
                      </Button>
                    </form>
                  </Form>
                </CardWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
