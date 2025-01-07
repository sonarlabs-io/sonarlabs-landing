import { API_URL } from '@/config';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    if (response.status === 401) {
      // Clear auth state
      localStorage.removeItem('auth_token');
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      // Immediate redirect
      window.location.replace('/auth');
      return null;
    }
    throw new Error(error.detail || 'API request failed');
  }
  return response.json();
};

export const api = {
  get: async (endpoint: string) => {
    const token = localStorage.getItem('auth_token');
    if (!token && window.location.pathname !== '/auth') {
      window.location.replace('/auth');
      return null;
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  post: async (endpoint: string, data: any) => {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};