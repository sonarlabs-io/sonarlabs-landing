declare global {
    interface Window {
      gtag: (
        command: 'event' | 'config' | 'set',
        action: string,
        params?: Record<string, any>
      ) => void;
    }
  }
  
  export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
  
  // Log page views
  export const pageview = (url: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', GA_MEASUREMENT_ID!, {
        page_path: url,
      });
    }
  };
  
  // Log specific events
  export const event = ({ 
    action, 
    category, 
    label, 
    value 
  }: { 
    action: string;
    category: string;
    label: string;
    value?: number;
  }) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };