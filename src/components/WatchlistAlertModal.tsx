"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeStyles } from '@/styles/components';
import { useWatchlist } from '@/contexts/WatchlistContext';

interface WatchlistAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (alert?: string) => void;
  artistName?: string;
  artistId: string;
  isEditing?: boolean;
}

export function WatchlistAlertModal({ 
  isOpen, 
  onClose, 
  onCreate, 
  artistName,
  artistId,
  isEditing = false
}: WatchlistAlertModalProps) {
  const [alertText, setAlertText] = useState('');
  const { theme } = useTheme();
  const { isInWatchlist } = useWatchlist();
  const themeStyles = getThemeStyles(theme);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(alertText.trim() || undefined);
    setAlertText('');
    onClose();
  };

  if (!isEditing && isInWatchlist(artistId)) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className={`${themeStyles.modal.container} w-[calc(100%-2rem)] sm:w-full`}>
          <DialogHeader>
            <DialogTitle className={themeStyles.modal.title}>
              Already in Watchlist
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 text-center">
            <p className={`${themeStyles.modal.text}`}>
              {artistName} is already in your watchlist
            </p>
          </div>

          <DialogFooter>
            <Button
              onClick={onClose}
              className={`${themeStyles.modal.submitButton} w-full sm:w-auto min-h-[44px]`}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${themeStyles.modal.container} w-[calc(100%-2rem)] sm:w-full max-h-[calc(100vh-2rem)] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle className={themeStyles.modal.title}>
            Save to Watchlist
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className={`${themeStyles.modal.label} block text-base`}>
              Artist
            </Label>
            <p className={`${themeStyles.modal.text} text-lg font-medium`}>{artistName}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="alertText" className={`${themeStyles.modal.label} block text-base`}>
              Alert
            </Label>
            <Textarea
              id="alertText"
              value={alertText}
              onChange={(e) => setAlertText(e.target.value)}
              placeholder="What would you like to track? (optional)"
              className={`${themeStyles.modal.textarea} min-h-[100px]`}
              rows={4}
            />
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className={`${themeStyles.modal.cancelButton} w-full sm:w-auto min-h-[44px]`}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className={`${themeStyles.modal.submitButton} w-full sm:w-auto min-h-[44px]`}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}