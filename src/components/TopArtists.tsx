// components/TopArtists.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from 'lucide-react';
import { ArtistCard } from '@/components/ArtistCard';
import { ArtistDetailsCard } from '@/components/ArtistDetailsCard';
import { CreateProjectModal } from '@/components/CreateProjectModal';
import { WatchlistAlertModal } from '@/components/WatchlistAlertModal';
import { SelectProjectModal } from '@/components/SelectProjectModal';
import { SuccessAlertModal } from '@/components/SuccessAlertModal';
import { useTheme } from '@/contexts/ThemeContext';
import { useArtistActions } from '@/hooks/useArtistActions';
import { getThemeStyles } from '@/styles/components';
import type { Artist } from '@/types/artist';
import { fetchTopArtists, fetchArtistDetails } from '@/utils/api';

export function TopArtists() {
  // Data State
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Theme and Shared Artist Actions
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);
  
  const {
    selectedArtist,
    isLoadingDetails,
    projects,
    isSelectProjectModalOpen,
    isCreateProjectModalOpen,
    isWatchlistModalOpen,
    isSuccessModalOpen,
    successMessage,
    handleOpenDetails,
    handleSaveToResearch,
    handleSelectProject,
    handleCreateProject,
    handleAddToWatchlist,
    handleCreateAlert,
    handleCloseDetails,
    setIsSelectProjectModalOpen,
    setIsCreateProjectModalOpen,
    setIsWatchlistModalOpen,
    setIsSuccessModalOpen,
  } = useArtistActions();

  useEffect(() => {
    loadTopArtists();
  }, []);

  const loadTopArtists = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await fetchTopArtists();
      setArtists(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load top artists');
      console.error('Error fetching top artists:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleArtistDetails = async (artist: Artist) => {
    try {
      await handleOpenDetails(artist, fetchArtistDetails);
    } catch (err) {
      setError('Failed to load artist details');
    }
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className={themeStyles.loading.container}>
        <Loader2 className={themeStyles.loading.spinner} />
      </div>
    );
  }

  return (
    <>
      <div className={themeStyles.layout.content.grid}>
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            // variant="top"
            onOpenDetails={handleArtistDetails}
          />
        ))}
      </div>

      {/* Modals */}
      {selectedArtist && (
        <ArtistDetailsCard
          artist={selectedArtist}
          isOpen={Boolean(selectedArtist)}
          onClose={handleCloseDetails}
          onSaveToResearch={handleSaveToResearch}
          onAddToWatchlist={handleAddToWatchlist}
          isLoading={isLoadingDetails}
        />
      )}

      <SelectProjectModal
        isOpen={isSelectProjectModalOpen}
        onClose={() => setIsSelectProjectModalOpen(false)}
        projects={projects}
        onSelectProject={handleSelectProject}
        onCreateNew={() => {
          setIsSelectProjectModalOpen(false);
          setIsCreateProjectModalOpen(true);
        }}
      />

      <CreateProjectModal
        isOpen={isCreateProjectModalOpen}
        onClose={() => setIsCreateProjectModalOpen(false)}
        onCreate={handleCreateProject}
      />

      <WatchlistAlertModal
        isOpen={isWatchlistModalOpen}
        onClose={() => setIsWatchlistModalOpen(false)}
        onCreate={handleCreateAlert}
        artistName={selectedArtist?.name}
        artistId={selectedArtist?.id || ''}
        isEditing={false}
      />

      <SuccessAlertModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message={successMessage}
      />
    </>
  );
}