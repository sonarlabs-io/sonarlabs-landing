"use client";

import React, { useState } from 'react';
import { Info, Search, Loader2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArtistDetailsCard } from './ArtistDetailsCard';
import { CreateProjectModal } from './CreateProjectModal';
import { WatchlistAlertModal } from './WatchlistAlertModal';
import { SelectProjectModal } from './SelectProjectModal';
import { SuccessAlertModal } from './SuccessAlertModal';
import { useTheme } from '@/contexts/ThemeContext';
import { useArtistActions } from '@/hooks/useArtistActions';
import { getThemeStyles } from '@/styles/components';
import { styles } from '@/styles/components';
import type { Artist } from '@/types/artist';
import { fetchSimilarArtists, fetchArtistDetails } from '@/utils/api';
import SimilarityInfoModal from './SimilarityInfoModal';

interface ArtistSimilaritySearchProps {
  onViewChange?: (artists: Artist[]) => void;
  placeholder?: string;
}

export function ArtistSimilaritySearch({ onViewChange, placeholder }: ArtistSimilaritySearchProps) {
  // Search-specific state
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
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

  const handleSearch = async () => {
    if (!inputValue.trim()) {
      setError('Please enter a valid artist name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetchSimilarArtists(inputValue);
      if (onViewChange) {
        onViewChange(response.similar_artists);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const resetSearch = () => {
    setInputValue('');
    setError('');
  };

  return (
    <div className={`${themeStyles.search.container} w-full`}>
      {/* Search Input */}
      <div className={`${themeStyles.search.inputGroup} flex-col sm:flex-row gap-2`}>
        <div className={`${themeStyles.search.inputWrapper} w-full`}>
          <Input
            placeholder={placeholder || "Search for artists..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSearch()}
            className={`${themeStyles.search.input} w-full`}
            disabled={isLoading}
          />
          {inputValue && (
            <button
              onClick={resetSearch}
              className={themeStyles.search.clearButton}
              aria-label="Clear search"
            >
              <X className={styles.icon} />
            </button>
          )}
        </div>
        <Button 
          onClick={handleSearch}
          disabled={isLoading}
          className={`${themeStyles.search.searchButton} w-full sm:w-24`}
        >
          {isLoading ? (
            <Loader2 className={`${styles.icon} animate-spin`} />
          ) : (
            <>
              <Search className={styles.iconWithSpace} />
              <span>Search</span>
            </>
          )}
        </Button>
      </div>

      {/* Info Button */}
      <div className="mt-2 flex items-center justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsInfoModalOpen(true)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Info className="h-4 w-4 mr-2" />
          <span className="text-sm">About Artist Similarity Search</span>
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

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

      <SimilarityInfoModal 
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </div>
  );
}