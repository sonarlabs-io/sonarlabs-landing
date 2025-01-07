// Base artist information
export interface BaseArtist {
  id: string;
  name: string;
  image_url: string | null;
  genres: string[];
  score: number;
  spotify_url?: string;
}

// Extended artist information including demographic data
export interface Artist extends BaseArtist {
  demographics: string[];
  location: string[];
  gender: string[];
  band: string[];
}

// Detailed statistics for an artist
export interface ArtistStats {
  monthly_listeners: number;
  listeners_growth: number;
  playlist_count: number;
  playlist_growth: number;
  fan_engagement: number;
  instagram_followers: number;
  tiktok_followers: number;
  youtube_views: number;
  instagram_growth: number;
  tiktok_growth: number;
  youtube_growth: number;
  ig_handle: string;
  tt_handle: string;
  yt_handle: string;
}

// Release information for an artist
export interface ArtistReleases {
  total_releases: number;
  tracks_per_release: number;
  days_between_releases: number;
  top_track: string;
  top_track_plays: number;
  top_track_date: string;
}

// Audience demographics and location data
export interface ArtistAudience {
  age_name: string;
  age_group: string;
  age_pct: number;
  gender_group: string;
  gender_pct: number;
  top_city: string;
  top_country: string;
}

// Complete artist details including all metadata
export interface ArtistDetails extends Artist {
  prediction_date: string;
  stats: ArtistStats;
  releases: ArtistReleases;
  audience: ArtistAudience;
}

// New interfaces for the scoring feature
export interface ArtistScore {
  score: number;
  confidence: number;
  prediction_date: string;
  factors: ScoreFactor[];
}

export interface ScoreFactor {
  name: string;
  impact: number;
  description: string;
}

// Response interfaces for API calls
export interface ScoringResponse {
  artist: ArtistDetails;
  score?: ArtistScore;
  similar_artists: Artist[];
  in_dataset: boolean;
  message?: string;
}

// Component Props
export interface ArtistScoringProps {
  onScoreCalculated?: (response: ScoringResponse) => void;
  onError?: (error: Error) => void;
}

export interface ArtistCardProps {
  artist: Artist;
  isPinned?: boolean;
  onOpenDetails: (artist: ArtistDetails) => Promise<void>;
  onRemove?: (artist: Artist) => void;
}

export interface ArtistDetailsCardProps {
  artist: ArtistDetails;
  isOpen: boolean;
  onClose: () => void;
  onSaveToResearch: () => void;
  onAddToWatchlist: () => void;
  isLoading?: boolean;
}

// Utility types
export interface StatItemProps {
  label: string;
  value: string | number;
  className?: string;
}

export interface SpotifyTrack {
  uri: string;
  name: string;
  duration: number;
}

export interface PlayerState {
  isPlaying: boolean;
  artist: BaseArtist | null;
  showModal: boolean;
  currentTrack: SpotifyTrack | null;
}