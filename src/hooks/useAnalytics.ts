// hooks/useAnalytics.ts
import { useCallback } from 'react';
import type { EventName, EventProperties } from '@/types/analytics';

export const useAnalytics = () => {
  const logEvent = useCallback(async (eventName: EventName, properties: EventProperties) => {
    try {
      const payload = {
        event: eventName,
        properties: {
          ...properties,
          timestamp: new Date().toISOString(),
        },
      };

      console.log('Logging event:', payload); // Debug log

      const response = await fetch('/api/analytics/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error logging event:', error);
      // Don't throw the error - we don't want analytics failures to break the app
    }
  }, []);

  return { logEvent };
};