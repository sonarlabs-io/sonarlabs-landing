import { ArtistDetails } from './artist';

export interface ProjectArtist {
  id: string;
  project_id: string;
  artist_id: string;
  artist_name: string | null;
  artist_details: ArtistDetails | null;
  added_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  user_id: string;
  artists: ProjectArtist[];
  created_at: string;
  updated_at: string;
}