// contexts/WatchlistContext.tsx
"use client";

import React, { createContext, useContext, useState } from 'react';
import type { ArtistDetails } from '@/types/artist';
import type { EventName, EventProperties } from '@/types/analytics';
import { useAnalytics } from '@/hooks/useAnalytics';

export interface WatchlistItem {
  id: string;
  artist: ArtistDetails;
  alert?: string;
  createdAt: string;
}

interface WatchlistContextType {
  watchlistItems: WatchlistItem[];
  addToWatchlist: (artist: ArtistDetails, alert?: string) => void;
  removeFromWatchlist: (id: string) => void;
  updateWatchlistAlert: (id: string, newAlert: string) => void;
  isInWatchlist: (artistId: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([]);
  const { logEvent } = useAnalytics();

  const isInWatchlist = (artistId: string) => {
    return watchlistItems.some(item => item.artist.id === artistId);
  };

  const addToWatchlist = (artist: ArtistDetails, alert?: string) => {
    if (isInWatchlist(artist.id)) {
      return;
    }
    const timestamp = new Date().toISOString();
    const newItem: WatchlistItem = {
      id: Date.now().toString(),
      artist,
      ...(alert && { alert }),
      createdAt: timestamp
    };
    
    setWatchlistItems(prev => [...prev, newItem]);
    
    const eventProperties: EventProperties = {
      artist_id: artist.id,
      artist_name: artist.name,
      alert,
      timestamp
    };
    // logEvent('artist_added_to_watchlist', eventProperties);
  };

  const removeFromWatchlist = (id: string) => {
    const itemToRemove = watchlistItems.find(item => item.id === id);
    if (itemToRemove) {
      const eventProperties: EventProperties = {
        artist_id: itemToRemove.artist.id,
        artist_name: itemToRemove.artist.name,
        timestamp: new Date().toISOString()
      };
      // logEvent('artist_removed_from_watchlist', eventProperties);
    }
    
    setWatchlistItems(prev => prev.filter(item => item.id !== id));
  };

  const updateWatchlistAlert = (id: string, newAlert: string) => {
    setWatchlistItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, alert: newAlert } : item
      )
    );

    const itemToUpdate = watchlistItems.find(item => item.id === id);
    if (itemToUpdate) {
      const eventProperties: EventProperties = {
        artist_id: itemToUpdate.artist.id,
        artist_name: itemToUpdate.artist.name,
        old_alert: itemToUpdate.alert,
        new_alert: newAlert,
        timestamp: new Date().toISOString()
      };
      // logEvent('artist_alert_updated', eventProperties);
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlistItems, addToWatchlist, removeFromWatchlist, updateWatchlistAlert, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) throw new Error('useWatchlist must be used within a WatchlistProvider');
  return context;
};