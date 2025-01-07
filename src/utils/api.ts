import { API_URL } from '@/config';
import type { Artist, ArtistDetails, ScoringResponse } from '@/types/artist';
import type { Project, ProjectArtist } from '@/types/project';

// Response interfaces
interface SimilarArtistsResponse {
  similar_artists: Artist[];
}

interface SearchResponse {
  similar_artists: Artist[];
  message?: string;
}

interface FeedbackResponse {
  message: string;
}
 
interface ProjectCreate {
  name: string;
  description?: string;
}

// API functions
export async function fetchSimilarArtists(artistName: string): Promise<SimilarArtistsResponse> {
  const token = localStorage.getItem('auth_token');
  const response = await fetch(`${API_URL}/api/v1/artists/similar?artist_name=${artistName}&top_n=3`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ artistName: artistName }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch similar artists');
  }

  return response.json();
}

export async function fetchTopArtists(): Promise<Artist[]> {
  const token = localStorage.getItem('auth_token');
  const response = await fetch(`${API_URL}/api/v1/artists/top`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch top artists');
  }

  return response.json();
}

export async function fetchArtistDetails(artistId: string): Promise<ArtistDetails> {
  const token = localStorage.getItem('auth_token');
  const response = await fetch(`${API_URL}/api/v1/artists/${artistId}/details`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch artist details');
  }

  return response.json();
}

export async function fetchSearchResults(searchText: string): Promise<SearchResponse> {
  const token = localStorage.getItem('auth_token');
  const response = await fetch(`${API_URL}/api/v1/artists/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ search_text: searchText }),
  });

  if (!response.ok) {
    throw new Error('Failed to search artists');
  }

  return response.json();
}

export async function submitFeedback(content: string): Promise<FeedbackResponse> {
  const token = localStorage.getItem('auth_token');
  const response = await fetch(`${API_URL}/api/v1/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  });
 
  if (!response.ok) throw new Error('Failed to submit feedback');
  return response.json();
}
 
export async function createProject(project: ProjectCreate): Promise<Project> {
  const token = localStorage.getItem('auth_token');
  const response = await fetch(`${API_URL}/api/v1/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(project)
  });

  if (!response.ok) throw new Error('Failed to create project');
  return response.json();
}

export async function deleteProject(projectId: string): Promise<void> {
  const token = localStorage.getItem('auth_token');
  const response = await fetch(`${API_URL}/api/v1/projects/${projectId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Failed to delete project');
}

export async function addArtistToProject(projectId: string, artist: ArtistDetails): Promise<void> {
  const token = localStorage.getItem('auth_token');
  const response = await fetch(`${API_URL}/api/v1/projects/${projectId}/artists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      artist_id: artist.id,
      artist_name: artist.name,
      artist_details: artist
    })
  });

  if (!response.ok) throw new Error('Failed to add artist to project');
}

export async function removeArtistFromProject(projectId: string, artistId: string): Promise<void> {
  const token = localStorage.getItem('auth_token');
  const response = await fetch(`${API_URL}/api/v1/projects/${projectId}/artists/${artistId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Failed to remove artist from project');
}

export async function updateProjectName(projectId: string, newName: string): Promise<Project> {
  const token = localStorage.getItem('auth_token');
  const response = await fetch(`${API_URL}/api/v1/projects/${projectId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name: newName })
  });

  if (!response.ok) throw new Error('Failed to update project name');
  return response.json();
}

export async function getUserProjects(): Promise<Project[]> {
  const token = localStorage.getItem('auth_token');
  const response = await fetch(`${API_URL}/api/v1/projects`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Failed to fetch user projects');
  return response.json();
}

export async function fetchArtistScore(artistName: string): Promise<ScoringResponse> {
  const token = localStorage.getItem('auth_token');
  const response = await fetch(`${API_URL}/api/v1/artists/score?artist_name=${encodeURIComponent(artistName)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to fetch artist score');
  }

  return response.json();
}