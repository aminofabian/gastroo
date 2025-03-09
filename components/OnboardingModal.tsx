"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaLock, FaUserPlus, FaBell } from "react-icons/fa";

export function OnboardingModal({ isOnboarded }: { isOnboarded: boolean }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isOnboarded) {
      setOpen(true);
    }
  }, [isOnboarded]);

  const benefits = [
    {
      icon: <FaLock className="w-6 h-6 text-[#c22f61]" />,
      title: "Exclusive Content",
      description: "Access premium medical resources and research papers"
    },
    {
      icon: <FaUserPlus className="w-6 h-6 text-[#c22f61]" />,
      title: "Professional Network",
      description: "Connect with leading gastroenterologists across Kenya"
    },
    {
      icon: <FaBell className="w-6 h-6 text-[#c22f61]" />,
      title: "Priority Updates",
      description: "Stay informed about latest developments and events"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] bg-white p-6">
        <DialogHeader className="text-center">
          <DialogTitle className="text-3xl font-display font-bold text-gray-900 mb-2">
            Complete Your Profile
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-600">
            Welcome to GSK! Join Kenya's premier gastroenterology community.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-8 space-y-8">
          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center text-center space-y-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="p-3 bg-white rounded-full shadow-sm">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-gray-900">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Profile Completion</span>
              <span>0%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-full w-0 bg-[#c22f61] rounded-full transition-all duration-500"></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="h-12 px-6 text-gray-600 hover:text-gray-900"
            >
              Remind Me Later
            </Button>
            <Button 
              onClick={() => router.push('/membership')}
              className="h-12 px-8 bg-[#c22f61] hover:bg-[#004488] text-white font-bold transition-colors"
            >
              Complete Profile Now
            </Button>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-center text-gray-500 pt-4">
            By completing your profile, you'll unlock all member benefits and contribute to our growing community.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
} 