// components/SuccessAlertModal.tsx
"use client";

import React from 'react';
import { CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

interface SuccessAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export function SuccessAlertModal({ isOpen, onClose, message }: SuccessAlertModalProps) {
  // Auto-close after 2 seconds
  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800">
        <div className="flex items-center gap-4 p-4">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <p className="text-lg font-medium text-gray-900 dark:text-white">{message}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}