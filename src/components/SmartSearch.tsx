import React, { useState, useEffect } from 'react';
import { Info, Search, Loader2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import InfoModal from '@/components/InfoModal';
import type { Artist } from '@/types/artist';
import { useTheme } from '@/contexts/ThemeContext';
import { useArtistActions } from '@/hooks/useArtistActions';
import { getThemeStyles } from '@/styles/components';
import { styles } from '@/styles/components';
import { fetchArtistDetails, fetchSearchResults } from '@/utils/api';
import { ARTIST_FILTERS, FilterKey } from '@/shared/filters';

interface SmartSearchProps {
  onViewChange?: (artists: Artist[]) => void;
  placeholder?: string;
}

type ActiveFilters = {
    [K in FilterKey]: boolean;
  };

const filterKeywords: { [K in FilterKey]: string[] } = Object.entries(ARTIST_FILTERS).reduce(
(acc, [key, config]) => ({
    ...acc,
    [key]: config.values
}), 
{} as { [K in FilterKey]: string[] }
);

export function SmartSearch({ onViewChange, placeholder }: SmartSearchProps) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    genres: false,
    demographics: false,
    location: false,
    gender: false,
    band: false,
  });

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

  const handleArtistDetails = async (artist: Artist) => {
    try {
      await handleOpenDetails(artist, fetchArtistDetails);
    } catch (err) {
      setError('Failed to load artist details');
    }
  };
  
  useEffect(() => {
    const input = inputValue.toLowerCase();
    
    const newFilters = Object.entries(filterKeywords).reduce(
        (acc, [key, values]) => ({
          ...acc,
          [key]: values.some(keyword => input.includes(keyword))
        }), 
        {} as ActiveFilters
    );
    
    setActiveFilters(newFilters);
  }, [inputValue]);

  const handleSearch = async () => {
    if (!inputValue.trim()) {
      setError('Please enter search criteria');
      return;
    }
  
    setIsLoading(true);
    setError('');
  
    try {
      const response = await fetchSearchResults(inputValue);
      console.log('Search response:', response);
      if (onViewChange && response.similar_artists) {
        console.log('Passing to onViewChange:', response.similar_artists);
        onViewChange(response.similar_artists);
      }
      if (response.message) {
        setError(response.message);
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
    <>
      <div className="w-full space-y-4">
      <div className={`${themeStyles.search.inputGroup} flex-col sm:flex-row gap-2`}>
        <div className={`${themeStyles.search.inputWrapper} w-full`}>
          <Input
            placeholder={placeholder || "Search for artists by genre, audience, location..."}
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

      <div className="flex items-center gap-2">
          <div className="flex gap-2 flex-wrap">
            {Object.entries(activeFilters).map(([key, active]) => (
              <FilterTag 
                key={key} 
                label={ARTIST_FILTERS[key as FilterKey].label}
                active={active}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-auto"
            onClick={() => setIsInfoModalOpen(true)}
          >
            <Info className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
          </Button>
        </div>

      {error && (
        <div className="mt-4 p-4 text-center text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50">
          <AlertDescription>{error}</AlertDescription>
        </div>
      )}
    </div>
    {/* Add the InfoModal */}
      <InfoModal 
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
      />
    </>
  );
}

const FilterTag = ({ label, active }: { label: string; active: boolean }) => (
  <div
    className={`px-3 py-1 rounded-full text-sm ${
      active 
        ? 'bg-blue-100 text-blue-800 border-blue-300' 
        : 'bg-gray-100 text-gray-600 border-gray-200'
    } border transition-colors duration-200`}
  >
    {label}
  </div>
);

export default SmartSearch;