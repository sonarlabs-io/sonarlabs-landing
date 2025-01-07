"use client";

import React, { useState } from 'react';
import { TrendingUp, Disc, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GrowthIndicator } from '@/components/ui/growth-indicator';
import { getThemeStyles } from '@/styles/components';
import { formatDate, formatNumber } from '@/utils/format';
import { useTheme } from '@/contexts/ThemeContext';
import { useProject } from '@/contexts/ProjectContext';
import { useWatchlist } from '@/contexts/WatchlistContext';
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';
import type { ArtistDetailsCardProps } from '@/types/artist';
import { CreateProjectModal } from './CreateProjectModal';
import { WatchlistAlertModal } from './WatchlistAlertModal';
import { SelectProjectModal } from './SelectProjectModal';

function StatBlock({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col bg-muted/40 rounded-lg p-3 sm:p-4 hover:bg-muted/60 transition-colors">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-base sm:text-lg font-medium mt-1">{value}</span>
    </div>
  );
}

export function ArtistDetailsCard({
  artist,
  isOpen,
  onClose,
}: ArtistDetailsCardProps) {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isWatchlistModalOpen, setIsWatchlistModalOpen] = useState(false);
  const [isSelectProjectModalOpen, setIsSelectProjectModalOpen] = useState(false);
  
  const { projects, createProject, addArtistToProject } = useProject();
  const { addToWatchlist } = useWatchlist();
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);
  const { setAudioState } = useAudioPlayer();

  const handleSelectProject = (projectId: string, projectName?: string) => {
    if (projectId === 'temp-new' && projectName) {
      createProject(projectName, artist);
    } else {
      addArtistToProject(projectId, artist);
    }
    setIsSelectProjectModalOpen(false);
  };

  const handleCreateProject = (name: string) => {
    createProject(name, artist);
    setIsProjectModalOpen(false);
  };

  const handleCreateAlert = (alert?: string) => {
    addToWatchlist(artist, alert);
    setIsWatchlistModalOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-[calc(100%-2rem)] sm:max-w-4xl p-4 sm:p-6 mt-8 sm:mt-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <DialogHeader className={themeStyles.artistDetails.header}>
            <DialogTitle className="sr-only">Artist Details: {artist.name}</DialogTitle>
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 w-full pt-4">
              <img
                src={artist.image_url || "/api/placeholder/80/80"}
                alt={artist.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2">
                  <h2 className={themeStyles.artistDetails.title}>{artist.name}</h2>
                </div>
                <div className='flex flex-wrap gap-1 mt-3'>
                  {artist.genres.slice(0,3).map((genre, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-muted px-2 py-0.5 rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsSelectProjectModalOpen(true)}
                className={`${themeStyles.artistDetails.actionButton} w-full sm:w-auto`}
              >
                Save to Research
              </Button>
              <Button 
                variant="outline"
                onClick={() => setIsWatchlistModalOpen(true)}
                className={`${themeStyles.artistDetails.actionButton} w-full sm:w-auto`}
              >
                Add to Watchlist
              </Button>
            </div>
          </DialogHeader>

          <Tabs defaultValue="stats" className="mt-8">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="stats" className="flex items-center gap-2 px-2 sm:px-4">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Stats</span>
              </TabsTrigger>
              <TabsTrigger value="music" className="flex items-center gap-2 px-2 sm:px-4">
                <Disc className="h-4 w-4" />
                <span className="hidden sm:inline">Music</span>
              </TabsTrigger>
              <TabsTrigger value="audience" className="flex items-center gap-2 px-2 sm:px-4">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Audience</span>
              </TabsTrigger>
            </TabsList>

            {/* Stats Tab */}
            <TabsContent value="stats" className="mt-2 sm:mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {/* Spotify Stats */}
                <div className={`flex flex-col bg-muted/40 rounded-lg p-3 sm:p-4 hover:bg-muted/60 transition-colors ${themeStyles.artistDetails.stat}`}>
                  <span className="text-sm text-muted-foreground">
                    Monthly listeners
                  </span>
                  <div className="flex items-center mt-1">
                    <span className="text-base sm:text-lg font-medium">{formatNumber(artist.stats.monthly_listeners)}</span>
                    <GrowthIndicator growth={artist.stats.listeners_growth} />
                  </div>
                </div>

                <div className={`flex flex-col bg-muted/40 rounded-lg p-3 sm:p-4 hover:bg-muted/60 transition-colors ${themeStyles.artistDetails.stat}`}>
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    Fan engagement
                  </span>
                  <span className="text-base sm:text-lg font-medium mt-1">{(artist.stats.fan_engagement * 100).toFixed(0)}%</span>
                </div>

                <div className={`flex flex-col bg-muted/40 rounded-lg p-3 sm:p-4 hover:bg-muted/60 transition-colors ${themeStyles.artistDetails.stat}`}>
                  <span className="text-sm text-muted-foreground">
                    Editorial playlists
                  </span>
                  <div className="flex items-center mt-1">
                    <span className="text-base sm:text-lg font-medium">{formatNumber(artist.stats.playlist_count)}</span>
                    <GrowthIndicator growth={artist.stats.playlist_growth} />
                  </div>
                </div>

                {/* Social Stats */}
                <div className={`flex flex-col bg-muted/40 rounded-lg p-3 sm:p-4 hover:bg-muted/60 transition-colors ${themeStyles.artistDetails.stat}`}>
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    Instagram followers
                    {artist.stats.ig_handle && (
                      <a
                        href={`https://instagram.com/${artist.stats.ig_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E1306C] hover:opacity-80"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                      </a>
                    )}
                  </span>
                  <div className="flex items-center mt-1">
                    <span className="text-base sm:text-lg font-medium">{formatNumber(artist.stats.instagram_followers)}</span>
                    <GrowthIndicator growth={artist.stats.instagram_growth} />
                  </div>
                </div>

                <div className={`flex flex-col bg-muted/40 rounded-lg p-3 sm:p-4 hover:bg-muted/60 transition-colors ${themeStyles.artistDetails.stat}`}>
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    TikTok followers
                    {artist.stats.tt_handle && (
                      <a
                        href={`https://tiktok.com/@${artist.stats.tt_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black dark:text-white hover:opacity-80"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                      </a>
                    )}
                  </span>
                  <div className="flex items-center mt-1">
                    <span className="text-base sm:text-lg font-medium">{formatNumber(artist.stats.tiktok_followers)}</span>
                    <GrowthIndicator growth={artist.stats.tiktok_growth} />
                  </div>
                </div>

                <div className={`flex flex-col bg-muted/40 rounded-lg p-3 sm:p-4 hover:bg-muted/60 transition-colors ${themeStyles.artistDetails.stat}`}>
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    YouTube views
                    {artist.stats.yt_handle && (
                      <a
                        href={`https://youtube.com/@${artist.stats.yt_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF0000] hover:opacity-80"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </a>
                    )}
                  </span>
                  <div className="flex items-center mt-1">
                    <span className="text-base sm:text-lg font-medium">{formatNumber(artist.stats.youtube_views)}</span>
                    <GrowthIndicator growth={artist.stats.youtube_growth} />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Music Tab */}
            <TabsContent value="music" className="mt-2 sm:mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className={`flex flex-col bg-muted/40 rounded-lg p-3 sm:p-4 hover:bg-muted/60 transition-colors ${themeStyles.artistDetails.stat}`}>
                  <span className="text-sm text-muted-foreground">Total releases</span>
                  <span className="text-base sm:text-lg font-medium mt-1">{artist.releases.total_releases}</span>
                </div>
                
                <div className={`flex flex-col bg-muted/40 rounded-lg p-3 sm:p-4 hover:bg-muted/60 transition-colors ${themeStyles.artistDetails.stat}`}>
                  <span className="text-sm text-muted-foreground">Tracks per release</span>
                  <span className="text-base sm:text-lg font-medium mt-1">{artist.releases.tracks_per_release.toFixed(0)}</span>
                </div>
                
                <div className={`flex flex-col bg-muted/40 rounded-lg p-3 sm:p-4 hover:bg-muted/60 transition-colors ${themeStyles.artistDetails.stat}`}>
                  <span className="text-sm text-muted-foreground">Days between releases</span>
                  <span className="text-base sm:text-lg font-medium mt-1">{Math.round(artist.releases.days_between_releases)}</span>
                </div>
                
                <div className={`flex flex-col bg-muted/40 rounded-lg p-3 sm:p-4 hover:bg-muted/60 transition-colors ${themeStyles.artistDetails.stat}`}>
                  <span className="text-sm text-muted-foreground">Top track</span>
                  <span className="text-base sm:text-lg font-medium mt-1">{artist.releases.top_track}</span>
                </div>
                
                <div className={`flex flex-col bg-muted/40 rounded-lg p-3 sm:p-4 hover:bg-muted/60 transition-colors ${themeStyles.artistDetails.stat}`}>
                  <span className="text-sm text-muted-foreground">Top track plays</span>
                  <span className="text-base sm:text-lg font-medium mt-1">{formatNumber(artist.releases.top_track_plays)}</span>
                </div>
                
                <div className={`flex flex-col bg-muted/40 rounded-lg p-3 sm:p-4 hover:bg-muted/60 transition-colors ${themeStyles.artistDetails.stat}`}>
                  <span className="text-sm text-muted-foreground">Top track date</span>
                  <span className="text-base sm:text-lg font-medium mt-1">{formatDate(artist.releases.top_track_date)}</span>
                </div>
              </div>
            </TabsContent>

            {/* Audience Tab - Keeping the existing layout */}
            <TabsContent value="audience" className="mt-2 sm:mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-muted/40 rounded-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Demographics</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <StatBlock 
                      label="Top age group" 
                      value={`${artist.audience.age_group.toLowerCase()} (${(artist.audience.age_pct * 100).toFixed(0)}%)`} 
                    />
                    <StatBlock 
                      label="Top gender" 
                      value={`${artist.audience.gender_group.toLowerCase()} (${(artist.audience.gender_pct * 100).toFixed(0)}%)`} 
                    />
                  </div>
                </div>
                <div className="bg-muted/40 rounded-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Location</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <StatBlock 
                      // label="Top city" 
                      // value={artist.audience.top_city} 
                      label="Top cities" 
                      value={artist.location.slice(0, 5).join(' • ')} 
                    />
                    <StatBlock 
                      label="Top country" 
                      value={artist.location[artist.location.length - 1]}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <CreateProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onCreate={handleCreateProject}
      />

      <WatchlistAlertModal
        isOpen={isWatchlistModalOpen}
        onClose={() => setIsWatchlistModalOpen(false)}
        onCreate={handleCreateAlert}
        artistName={artist.name}
        artistId={artist?.id || ''}
        isEditing={false}
      />

      <SelectProjectModal
        isOpen={isSelectProjectModalOpen}
        onClose={() => setIsSelectProjectModalOpen(false)}
        projects={projects}
        onSelectProject={handleSelectProject}
        onCreateNew={() => setIsProjectModalOpen(true)}
      />
    </>
  );
}