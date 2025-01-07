import React, { useEffect } from 'react';
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AudioPlayer() {
  const { currentArtist, setAudioState, forceReload } = useAudioPlayer();
  
  if (!currentArtist) return null;

  const getEmbedUrl = (spotifyUrl: string | undefined) => {
    if (!spotifyUrl) return '';
    const artistId = spotifyUrl.split('/artist/')[1]?.split('?')[0];
    return artistId ? `https://open.spotify.com/embed/artist/${artistId}?autoplay=1&${forceReload}` : '';
  };

  const embedUrl = getEmbedUrl(currentArtist.spotify_url);
  if (!embedUrl) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t z-50 transition-all duration-300">
      <div className="container max-w-7xl mx-auto py-3 px-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left section: Controls & Artist Info */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={() => setAudioState({ isPlaying: false, artist: null })}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Now Playing</span>
              <span className="text-sm font-medium">{currentArtist.name}</span>
            </div>
          </div>

          {/* Center section: Player */}
          <div className="flex-1 max-w-2xl mx-4">
            <iframe
              src={embedUrl}
              width="100%"
              height="80"
              frameBorder="0"
              allow="encrypted-media; autoplay"
              className="rounded-lg"
            />
          </div>

          {/* Right section: Actions */}
          {currentArtist.spotify_url && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => window.open(currentArtist.spotify_url, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}