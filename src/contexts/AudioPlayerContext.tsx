import React, { createContext, useContext, useState } from 'react';
import type { BaseArtist } from '@/types/artist';

interface AudioState {
  isPlaying: boolean;
  artist: BaseArtist | null;
}

interface AudioPlayerContextType {
  currentArtist: BaseArtist | null;
  setAudioState: (state: AudioState) => void;
  forceReload: number; // Add a forceReload flag
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    artist: null
  });
  const [forceReload, setForceReload] = useState(0);

  const enhancedSetAudioState = (state: AudioState) => {
    setAudioState(state);
    // Force reload to trigger a new iframe
    if (state.isPlaying) {
      setForceReload(prev => prev + 1);
    }
  };

  return (
    <AudioPlayerContext.Provider value={{
      currentArtist: audioState.isPlaying ? audioState.artist : null,
      setAudioState: enhancedSetAudioState,
      forceReload
    }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
}