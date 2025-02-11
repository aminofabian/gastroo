"use client";

import { motion } from "framer-motion";
import Logo from "@/components/homepage/Logo";
import MembershipForm from "@/components/membership/MembershipForm";

export default function MembershipPage() {
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
                  Join Our Community
                </h1>
                <p className="text-lg text-white/80 font-display leading-relaxed text-center">
                  Become a member of the Gastroenterology Society of Kenya and help advance digestive healthcare.
                </p>
                {/* Benefits List */}
                <div className="mt-8 space-y-4">
                  {[
                    "Access to exclusive resources and research",
                    "Network with fellow professionals",
                    "Participate in conferences and workshops",
                    "Contribute to medical guidelines",
                    "Professional development opportunities",
                    "Regular updates on latest developments"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center text-white/90">
                      <svg className="w-5 h-5 mr-3 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-display text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white -3xl p-6 sm:p-8 md:p-12 shadow-xl backdrop-blur-lg border border-white/20">
              <div className="w-full max-w-md mx-auto">
                {/* Logo - Show only on mobile */}
                <div className="flex justify-center w-full mb-8 lg:hidden">
                  <Logo variant="dark" />
                </div>

                <MembershipForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 