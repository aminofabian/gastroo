"use client";

import React, { useEffect, useRef } from 'react';
import { Dialog as ShadcnDialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function CustomDialog({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  children,
  className = ""
}: CustomDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Ensure input fields are clickable
  useEffect(() => {
    if (open && dialogRef.current) {
      const inputs = dialogRef.current.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        if (input instanceof HTMLInputElement) {
          input.style.pointerEvents = 'auto';
        } else if (input instanceof HTMLTextAreaElement) {
          input.style.pointerEvents = 'auto';
        } else if (input instanceof HTMLSelectElement) {
          input.style.pointerEvents = 'auto';
        }
      });
    }
  }, [open]);

  return (
    <ShadcnDialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent 
        ref={dialogRef}
        className={`sm:max-w-[800px] max-h-[90vh] overflow-y-auto z-[100] bg-white border-2 border-[#c22f63]/20 shadow-2xl rounded-xl ${className}`}
        style={{ pointerEvents: 'auto' }}
        onClick={(e) => e.stopPropagation()}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="space-y-3 mb-6 sticky top-0 bg-[#c22f63] text-white p-6 rounded-t-lg z-[101]">
          <DialogTitle className="text-2xl font-bold">
            {title}
          </DialogTitle>
          {description && (
            <p className="text-white/80">
              {description}
            </p>
          )}
        </DialogHeader>
        <div className="px-8 pb-8">
          {children}
        </div>
      </DialogContent>
    </ShadcnDialog>
  );
}
