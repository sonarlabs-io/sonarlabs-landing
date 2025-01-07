// types/analytics.ts
export type EventName = 
  | 'project_created'
  | 'project_deleted'
  | 'project_resumed'
  | 'artist_added_to_project'
  | 'artist_removed_from_project'
  | 'project_name_updated'
  | 'artist_added_to_watchlist'
  | 'artist_removed_from_watchlist'
  | 'artist_alert_updated'
  | 'artist_details_viewed';

export interface EventProperties {
  project_id?: string;
  project_name?: string;
  artist_id?: string;
  artist_name?: string;
  alert?: string;
  timestamp: string;
  [key: string]: any;
}