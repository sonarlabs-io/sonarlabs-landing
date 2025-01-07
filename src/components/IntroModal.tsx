// components/InfoModal.tsx
"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function IntroModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Welcome to SONAR</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-sm">
          <p>We're excited to release the first version of SONAR, where you can search for rising music artists with your own words and inspirations.</p>
          <p>A few disclaimers:</p>

          <ul className="list-disc pl-4 space-y-2">
            <p>🚀  The current sample includes a limited group of emerging artists for testing. Future updates will expand to all artists predicted by our model, making searches more precise.</p>
            <p>👀  Explore all features: search modes, artist pages, etc. There's more than meets the eye!</p>
            <p>⛓️‍💥  This is an MVP, so if something breaks or looks off, just let us know and we'll address it promptly.</p>
            <p>🎙️  Your feedback is invaluable! Use the form at the top-right of the screen to share your thoughts—  they'll directly shape our product's future.</p>
          </ul>

          <p>Have fun!</p>
        </div>

        <Button onClick={onClose} className="w-full mt-4">Got it</Button>
      </DialogContent>
    </Dialog>
  );
}