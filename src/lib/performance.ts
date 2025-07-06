// Performance monitoring utilities
export const performanceUtils = {
  // Track page load performance
  trackPageLoad: (pageName: string) => {
    if (typeof window !== 'undefined') {
      const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const metrics = {
          page: pageName,
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          firstPaint: 0,
          firstContentfulPaint: 0,
        };

        // Get paint timing if available
        const paintEntries = window.performance.getEntriesByType('paint');
        paintEntries.forEach((entry: PerformanceEntry) => {
          if (entry.name === 'first-paint') {
            metrics.firstPaint = entry.startTime;
          }
          if (entry.name === 'first-contentful-paint') {
            metrics.firstContentfulPaint = entry.startTime;
          }
        });

        console.log('Performance Metrics:', metrics);
        return metrics;
      }
    }
    return null;
  },

  // Track component render time
  trackComponentRender: (componentName: string, startTime: number) => {
    const renderTime = window.performance.now() - startTime;
    console.log(`${componentName} render time:`, renderTime.toFixed(2), 'ms');
    return renderTime;
  },

  // Track API call performance
  trackApiCall: (endpoint: string, startTime: number) => {
    const duration = window.performance.now() - startTime;
    console.log(`API call to ${endpoint}:`, duration.toFixed(2), 'ms');
    return duration;
  },

  // Check if page is loading slowly
  isSlowLoad: (loadTime: number) => {
    return loadTime > 3000; // 3 seconds threshold
  },

  // Get performance budget recommendations
  getPerformanceBudget: () => {
    return {
      firstContentfulPaint: 1800, // 1.8 seconds
      largestContentfulPaint: 2500, // 2.5 seconds
      firstInputDelay: 100, // 100ms
      cumulativeLayoutShift: 0.1, // 0.1
      timeToFirstByte: 600, // 600ms
    };
  },

  // Monitor Core Web Vitals
  monitorCoreWebVitals: () => {
    if (typeof window !== 'undefined') {
      // Monitor Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime, 'ms');
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEventTiming;
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime, 'ms');
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Monitor Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
          if (!layoutShiftEntry.hadRecentInput && layoutShiftEntry.value) {
            clsValue += layoutShiftEntry.value;
          }
        });
        console.log('CLS:', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  },
};

// Performance hook for React components
export const usePerformance = (componentName: string) => {
  const startTime = window.performance.now();
  
  return {
    trackRender: () => performanceUtils.trackComponentRender(componentName, startTime),
    trackApiCall: (endpoint: string) => performanceUtils.trackApiCall(endpoint, startTime),
  };
}; 