import { track } from '@vercel/analytics';

// Custom event tracking functions
export const analytics = {
  // User authentication events
  trackLogin: (method: string = 'credentials') => {
    track('user_login', { method });
  },
  
  trackLogout: () => {
    track('user_logout');
  },
  
  trackRegistration: () => {
    track('user_registration');
  },
  
  // Page navigation events
  trackPageView: (page: string) => {
    track('page_view', { page });
  },
  
  // Dashboard interactions
  trackDashboardAccess: (section: string) => {
    track('dashboard_access', { section });
  },
  
  // Feature usage
  trackFeatureUsage: (feature: string, action: string = '') => {
    track('feature_usage', { feature, action });
  },
  
  // Error tracking
  trackError: (error: string, context: string = '') => {
    track('error_occurred', { error, context });
  },
  
  // Custom events
  trackCustom: (event: string, properties?: Record<string, string | number | boolean>) => {
    track(event, properties);
  }
};

// Hook for easy usage in components
export const useAnalytics = () => {
  return analytics;
}; 