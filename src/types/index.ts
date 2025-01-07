// Base data interfaces
export interface RawArtist {
    id: string;
    name: string;
    'Tag 1': string;
    'Tag 2': string;
    'Tag 3': string;
    'Genre 1': string;
    'Genre 2': string;
    'Genre 3': string;
    genres_cm: string;
    image_url: string;
    sp_monthly_listeners: number;
    sp_followers: number;
    num_sp_playlists: number;
    sp_monthly_listeners_30d_growth: string;
    sp_followers_30d_growth: string;
    num_sp_playlists_30d_growth: string;
    sp_followers_to_listeners_ratio: string;
    'KPI1 name': string;
    popularity: string;
    'KPI2 name': string;
    fan_ratio_stat: string;
    platform: string;
    platform_stat: string;
    top_track: string;
    top_track_plays: string;
    top_track_date: string;
    total_releases: number;
    avg_days: number;
    avg_tracks: number;
    total_tracks: number;
    top_city: string;
    top_country: string;
    ig_handle: string;
    ig_followers: string;
    tt_handle: string;
    tt_followers: string;
    yt_handle: string;
    yt_views: string;
    age_pct: string;
    age_group: string;
    age_name: string;
    gender_pct: string;
    gender_group: string;
    genres: string;
    demographics: string;
    location: string;
    gender: string;
    band: string;
    spotify_url: string;
    prediction_date: string;
  }
  
  // Processed/Display interfaces
  export interface Artist {
    id: string;
    name: string;
    genres: string[];
    score: number;
    spotify_url: string;
    image_url: string;
    demographics: string[];
    location: string[];
    // Additional processed fields
    monthlyListeners?: number;
    monthlyListenersGrowth?: string;
    followers?: number;
    followersGrowth?: string;
    totalReleases?: number;
    topTrack?: string;
    socialStats?: {
      instagram?: string;
      tiktok?: string;
      youtube?: string;
    };
  }
  
  export interface DemoSearch {
    query: string;
    results: {
      name: string;
      genres: string[];
      score: number;
      spotify_url: string;
      image: string;
    }[];
  }
  
  export interface DemoArtist {
    name: string;
    genres: string[];
    score: number;
    spotify_url: string;
    image: string;
    drivers: string[];
  }
  
  // Analytical interfaces
  export interface ArtistGrowthMetrics {
    monthly_listeners_growth: number;
    followers_growth: number;
    playlists_growth: number;
    engagement_ratio: number;
  }
  
  export interface ArtistDemographics {
    age_group: string;
    age_percentage: number;
    gender_group: string;
    gender_percentage: number;
    top_locations: string[];
  }
  
  export interface ArtistPerformance {
    total_releases: number;
    avg_release_interval: number;
    avg_tracks_per_release: number;
    top_track: {
      name: string;
      plays: number;
      release_date: string;
    };
  }
  
  // Component prop interfaces
  export interface ArtistCardProps {
    artist: Artist;
    onClick?: (url: string) => void;
    className?: string;
  }
  
  export interface SearchResultProps {
    result: DemoSearch['results'][0];
    onClick?: (url: string) => void;
  }
  
  export interface FilterOptions {
    genres?: string[];
    demographics?: string[];
    locations?: string[];
    minScore?: number;
    maxScore?: number;
  }