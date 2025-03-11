"use client";

import React, { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CustomEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

export function CustomEventDialog({
  isOpen,
  onClose,
  title,
  description,
  children,
}: CustomEventDialogProps) {
  if (!isOpen) return null;

  // Prevent closing when clicking inside the dialog
  const handleDialogClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div 
        className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto z-[100] bg-white border-2 border-[#c22f63]/20 shadow-2xl rounded-xl pointer-events-auto"
        onClick={handleDialogClick}
      >
        {/* Header */}
        <div className="space-y-3 mb-6 sticky top-0 bg-[#c22f63] text-white p-6 rounded-t-lg z-[101]">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{title}</h2>
            <Button 
              variant="ghost" 
              onClick={onClose} 
              className="h-8 w-8 p-0 text-white hover:bg-[#b02a57] rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          {description && <p className="text-white/80">{description}</p>}
        </div>
        
        {/* Content */}
        <div className="px-8 pb-8 pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  );
} 