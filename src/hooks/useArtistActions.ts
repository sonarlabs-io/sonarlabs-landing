// hooks/useArtistActions.ts
import { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { useWatchlist } from '@/contexts/WatchlistContext';
import type { ArtistDetails } from '@/types/artist';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { EventName, EventProperties } from '@/types/analytics';

export const useArtistActions = () => {
  // State for artist and loading
  const [selectedArtist, setSelectedArtist] = useState<ArtistDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // State for modals
  const [isSelectProjectModalOpen, setIsSelectProjectModalOpen] = useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [isWatchlistModalOpen, setIsWatchlistModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Contexts
  const { projects, createProject, addArtistToProject } = useProject();
  const { addToWatchlist } = useWatchlist();
  const { logEvent } = useAnalytics();

  // Show success message helper
  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setIsSuccessModalOpen(true);
  };

  const handleOpenDetails = async (artist: any, fetchDetailsFunc: (id: string) => Promise<ArtistDetails>) => {
    setIsLoadingDetails(true);
    try {
      const details = await fetchDetailsFunc(artist.id);
      setSelectedArtist(details);

      const eventProperties: EventProperties = {
        artist_id: artist.id,
        artist_name: artist.name,
        timestamp: new Date().toISOString()
      };
      // logEvent('artist_details_viewed' as EventName, eventProperties);
    } catch (error) {
      console.error('Error fetching artist details:', error);
      throw new Error('Failed to load artist details');
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Handler for the "Save to Research" button in ArtistDetailsCard
  const handleSaveToResearch = () => {
    if (!selectedArtist) return;
    if (projects.length > 0) {
      setIsSelectProjectModalOpen(true);
    } else {
      setIsCreateProjectModalOpen(true);
    }
  };

  // Handler for selecting existing project
  const handleSelectProject = (projectId: string) => {
    if (!selectedArtist) return;
    
    addArtistToProject(projectId, selectedArtist);
    setIsSelectProjectModalOpen(false);
    const project = projects.find(p => p.id === projectId);
    showSuccessMessage(`${selectedArtist.name} added to ${project?.name}`);

    const eventProperties: EventProperties = {
      project_id: projectId,
      project_name: project?.name,
      artist_id: selectedArtist.id,
      artist_name: selectedArtist.name,
      timestamp: new Date().toISOString()
    };
    // logEvent('artist_added_to_project' as EventName, eventProperties);
    
    setSelectedArtist(null);
  };

  // Handler for creating new project
  const handleCreateProject = (name: string) => {
    if (!selectedArtist) return;
    
    createProject(name, selectedArtist);
    setIsCreateProjectModalOpen(false);
    showSuccessMessage(`${selectedArtist.name} added to new project: ${name}`);
    
    const eventProperties: EventProperties = {
      project_name: name,
      artist_id: selectedArtist.id,
      artist_name: selectedArtist.name,
      timestamp: new Date().toISOString()
    };
    // logEvent('project_created' as EventName, eventProperties);
    
    setSelectedArtist(null);
  };

  // Handler for adding to watchlist
  const handleAddToWatchlist = () => {
    if (!selectedArtist) return;
    setIsWatchlistModalOpen(true);
  };

  // Handler for creating watchlist alert
  const handleCreateAlert = (alert?: string) => {
    if (!selectedArtist) return;
    
    addToWatchlist(selectedArtist, alert);
    setIsWatchlistModalOpen(false);
    showSuccessMessage(`${selectedArtist.name} added to watchlist`);

    const eventProperties: EventProperties = {
      artist_id: selectedArtist.id,
      artist_name: selectedArtist.name,
      alert: alert,
      timestamp: new Date().toISOString()
    };
    // logEvent('artist_added_to_watchlist' as EventName, eventProperties);
    
    setSelectedArtist(null);
  };

  const handleCloseDetails = () => {
    setSelectedArtist(null);
  };

  return {
    // State
    selectedArtist,
    isLoadingDetails,
    projects,
    
    // Modal states
    isSelectProjectModalOpen,
    isCreateProjectModalOpen,
    isWatchlistModalOpen,
    isSuccessModalOpen,
    successMessage,
    
    // Actions
    handleOpenDetails,
    handleSaveToResearch,
    handleSelectProject,
    handleCreateProject,
    handleAddToWatchlist,
    handleCreateAlert,
    handleCloseDetails,
    
    // Modal controls
    setIsSelectProjectModalOpen,
    setIsCreateProjectModalOpen,
    setIsWatchlistModalOpen,
    setIsSuccessModalOpen,
  };
};