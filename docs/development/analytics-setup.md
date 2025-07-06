# Analytics & Performance Monitoring Setup Guide

## Overview

MapleAI uses Vercel Analytics and Speed Insights to track user behavior, page views, custom events, and performance metrics. This comprehensive monitoring helps us understand user interactions and optimize application performance.

## What's Tracked

### Analytics (Vercel Analytics)
- **Page Views**: All page visits are automatically tracked
- **User Sessions**: Session duration and engagement metrics
- **Geographic Data**: User location and country information
- **Device Information**: Browser, operating system, and device type

### Performance (Vercel Speed Insights)
- **Real Experience Score (RES)**: Overall user experience metric
- **First Contentful Paint (FCP)**: Time to first content display
- **Largest Contentful Paint (LCP)**: Time to largest content display
- **Interaction to Next Paint (INP)**: Responsiveness to user interactions
- **Cumulative Layout Shift (CLS)**: Visual stability metric
- **First Input Delay (FID)**: Time to first user interaction
- **Time to First Byte (TTFB)**: Server response time

### Custom Events
- **Authentication Events**:
  - `user_login` - When users successfully log in
  - `user_logout` - When users log out
  - `user_registration` - When new users register
  - `login_failed` - Failed login attempts
  - `login_error` - Network or system errors during login

- **Dashboard Interactions**:
  - `dashboard_access` - When users access different dashboard sections
  - `page_view` - Custom page view tracking with context

- **Feature Usage**:
  - `feature_usage` - When users interact with specific features
  - `error_occurred` - Application errors with context

## Implementation

### 1. Analytics & Speed Insights Components
Both components are added to the root layout:

```tsx
// src/app/layout.tsx
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### 2. Custom Analytics Utility
Custom tracking functions are available in `src/lib/analytics.ts`:

```tsx
import { analytics } from "@/lib/analytics";

// Track login
analytics.trackLogin("credentials");

// Track dashboard access
analytics.trackDashboardAccess("financial_compliance");

// Track feature usage
analytics.trackFeatureUsage("workflow_automation", "create");

// Track errors
analytics.trackError("database_connection_failed", "auth_service");
```

### 3. Performance Monitoring Utility
Performance tracking functions are available in `src/lib/performance.ts`:

```tsx
import { performanceUtils } from "@/lib/performance";

// Track page load performance
const metrics = performanceUtils.trackPageLoad("dashboard");

// Track component render time
performanceUtils.trackComponentRender("DashboardComponent", startTime);

// Check if page is loading slowly
if (performanceUtils.isSlowLoad(loadTime)) {
  console.warn("Page is loading slowly");
}

// Get performance budget recommendations
const budget = performanceUtils.getPerformanceBudget();
```

### 4. Performance Monitor Component
Use the PerformanceMonitor component to track specific components:

```tsx
import PerformanceMonitor from "@/components/PerformanceMonitor";

<PerformanceMonitor componentName="DashboardSection" trackRender={true}>
  <DashboardSection />
</PerformanceMonitor>
```

### 5. Performance Hook
Use the performance hook for custom tracking:

```tsx
import { usePerformance } from "@/lib/performance";

const { trackRender, trackApiCall } = usePerformance("MyComponent");

useEffect(() => {
  trackRender();
}, []);
```

## Viewing Data

### Analytics Dashboard
1. **Vercel Dashboard**: Go to your project → Analytics tab
2. **Real-time Data**: Data appears within 30 seconds of user interaction
3. **Custom Events**: Available in the Events section of analytics dashboard

### Speed Insights Dashboard
1. **Vercel Dashboard**: Go to your project → Speed Insights tab
2. **Performance Metrics**: View Core Web Vitals and performance scores
3. **Route Analysis**: See performance breakdown by page/route
4. **Device Comparison**: Compare desktop vs mobile performance

## Performance Budget

Our target performance metrics:
- **First Contentful Paint**: < 1.8 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1
- **Time to First Byte**: < 600ms
- **Real Experience Score**: > 90

## Privacy Considerations

- No personally identifiable information (PII) is tracked
- All tracking is anonymous and aggregated
- Users can opt out via browser settings
- Compliant with GDPR and privacy regulations
- Performance data is anonymized

## Adding New Events

To add new tracking events:

1. Add the event function to `src/lib/analytics.ts`
2. Use the function in your component
3. Document the event in this guide
4. Test the tracking in development

Example:
```tsx
// In analytics.ts
trackNewFeature: (feature: string, action: string) => {
  track('new_feature_used', { feature, action });
}

// In component
analytics.trackNewFeature("ai_agent", "deploy");
```

## Performance Optimization Tips

1. **Code Splitting**: Use dynamic imports for large components
2. **Image Optimization**: Use Next.js Image component
3. **Bundle Analysis**: Monitor bundle size with `@next/bundle-analyzer`
4. **Caching**: Implement proper caching strategies
5. **Lazy Loading**: Load components and data on demand

## Troubleshooting

### No Analytics Data Appearing
1. Check that `@vercel/analytics` is installed
2. Verify the `<Analytics />` component is in the layout
3. Ensure the site is deployed to Vercel
4. Wait 30 seconds for data to appear
5. Check for ad blockers or privacy extensions

### No Performance Data Appearing
1. Check that `@vercel/speed-insights` is installed
2. Verify the `<SpeedInsights />` component is in the layout
3. Ensure the site is deployed to Vercel
4. Wait for real user data to be collected
5. Check that pages are being visited by real users

### Custom Events Not Showing
1. Verify the event name is correct
2. Check that properties are valid (string, number, boolean)
3. Ensure the component is client-side rendered
4. Check browser console for errors

## Best Practices

1. **Consistent Naming**: Use snake_case for event names
2. **Meaningful Properties**: Include relevant context in event properties
3. **Performance**: Don't track too frequently to avoid performance impact
4. **Testing**: Always test tracking in development before deploying
5. **Documentation**: Keep this guide updated with new events
6. **Performance Budget**: Monitor and maintain performance targets
7. **Core Web Vitals**: Focus on LCP, FID, and CLS metrics 