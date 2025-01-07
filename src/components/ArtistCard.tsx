"use client";

import React from 'react';
import { PlayCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeStyles } from '@/styles/components';
import type { ArtistCardProps, Artist } from '@/types/artist';
import { X, Star } from 'lucide-react';
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';

export function ArtistCard({ artist, isPinned, onOpenDetails, onRemove }: ArtistCardProps) {
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);
  const { setAudioState } = useAudioPlayer();
  
  const genres = artist.genres?.slice(0, 3) || [];
  const topCity = artist.location?.[0] || '';
  const topCountry = artist.location?.[artist.location?.length - 1] || '';
  const mainDemographic = artist.demographics?.[1] || '';
  const ageGroup = artist.demographics?.[0] || '';

  const handleOpenDetails = async () => {
    try {
      // Create a minimal ArtistDetails object from the Artist object
      const artistDetails = {
        ...artist,
        prediction_date: new Date().toISOString(), // Current date as fallback
        stats: {
          monthly_listeners: 0,
          listeners_growth: 0,
          playlist_count: 0,
          playlist_growth: 0,
          fan_engagement: 0,
          instagram_followers: 0,
          tiktok_followers: 0,
          youtube_views: 0,
          instagram_growth: 0,
          tiktok_growth: 0,
          youtube_growth: 0,
          ig_handle: '',
          tt_handle: '',
          yt_handle: ''
        },
        releases: {
          total_releases: 0,
          tracks_per_release: 0,
          days_between_releases: 0,
          top_track: '',
          top_track_plays: 0,
          top_track_date: ''
        },
        audience: {
          age_name: ageGroup,
          age_group: ageGroup,
          age_pct: 0,
          gender_group: mainDemographic,
          gender_pct: 0,
          top_city: topCity,
          top_country: topCountry
        }
      };
      await onOpenDetails(artistDetails);
    } catch (error) {
      console.error('Error opening artist details:', error);
    }
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (artist.spotify_url) {
      setAudioState({ 
        isPlaying: true, 
        artist: { 
          id: artist.id, 
          name: artist.name, 
          spotify_url: artist.spotify_url,
          image_url: artist.image_url || '',
          genres: artist.genres,
          score: 0
        }
      });
    }
  };

  return (
    <Card 
      className={`
        ${themeStyles.artistCard.wrapper} 
        ${isPinned ? 'ring-2 ring-primary' : ''} 
        cursor-pointer 
        transition-transform 
        hover:scale-[1.02] 
        h-full
        relative
      `}
      onClick={handleOpenDetails}
    >
      {artist.spotify_url && (
        <button
          onClick={handlePlay}
          className="absolute top-2 right-2 z-10 p-1 rounded-full bg-background/80 hover:bg-background shadow-sm hover:shadow transition-all"
        >
          <PlayCircle 
            className={`h-6 w-6 ${artist.spotify_url ? 'text-primary' : 'text-muted-foreground'}`} 
          />
        </button>
      )}

      {isPinned && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(artist);
          }}
          className="absolute top-2 left-2 z-10 p-1 rounded-full bg-background/80 hover:bg-background shadow-sm hover:shadow transition-all"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      <CardContent className="p-0 flex flex-col h-full">
        {/* Rest of the component remains the same */}
        <div className="relative w-full pt-[75%]">
          <img 
            src={artist.image_url || "/api/placeholder/400/320"} 
            alt={artist.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/api/placeholder/400/320";
            }}
          />
        </div>
        
        {/* Content section */}
        <div className="p-4 flex-1 flex flex-col space-y-2">
          <h3 className={`${themeStyles.artistCard.title} line-clamp-1`}>
            {artist.name}
          </h3>
          
          {/* Genres as tags */}
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {genres.map((genre, index) => (
                <span 
                  key={index}
                  className="text-xs bg-muted px-2 py-0.5 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
          
          {/* Cities */}
          {(topCity || topCountry) && (
            <p className="text-sm text-muted-foreground line-clamp-1">
              {[topCity, topCountry].filter(Boolean).join(' • ')}
            </p>
          )}
          
          {/* Demographics with star */}
          {(mainDemographic || ageGroup) && (
            <p className="text-sm text-muted-foreground line-clamp-1 flex items-center gap-1">
              <Star className="h-4 w-4 flex-shrink-0" />
              <span>{mainDemographic} {ageGroup && `(${ageGroup})`}</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}