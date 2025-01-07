// utils/artistConversion.ts
import type { Artist, ArtistDetails } from '@/types/artist';
import type { ProjectArtist } from '@/types/project';

export const DEFAULT_AVATAR = "/api/placeholder/64/64";

export const convertProjectArtistToArtist = (projectArtist: ProjectArtist): Artist => {
  const artistDetails = projectArtist.artist_details as ArtistDetails;
  
  return {
    ...artistDetails,
    id: projectArtist.artist_id,
    name: projectArtist.artist_name || '',
    score: 0 // Default score for display
  };
};