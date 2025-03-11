"use client";

import React, { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CustomDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
}

export function CustomDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: CustomDeleteDialogProps) {
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
        className="sm:max-w-[500px] z-[100] bg-white border-2 border-red-200 shadow-2xl rounded-xl pointer-events-auto"
        onClick={handleDialogClick}
      >
        {/* Header */}
        <div className="space-y-3 mb-6 bg-red-600 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{title}</h2>
            <Button 
              variant="ghost" 
              onClick={onClose} 
              className="h-8 w-8 p-0 text-white hover:bg-red-700 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          {description && <p className="text-red-100">{description}</p>}
        </div>
        
        {/* Content */}
        <div className="space-y-6 px-6 pb-6">
          <p className="text-gray-700">Are you sure you want to delete this event? All associated data will be permanently removed.</p>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 transition-all shadow-md"
              onClick={onConfirm}
            >
              Delete Event
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 