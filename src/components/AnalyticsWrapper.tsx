"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/lib/analytics';

interface AnalyticsWrapperProps {
  children: React.ReactNode;
  section?: string;
}

export default function AnalyticsWrapper({ children, section }: AnalyticsWrapperProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view
    analytics.trackPageView(pathname);
    
    // Track section access if provided
    if (section) {
      analytics.trackDashboardAccess(section);
    }
  }, [pathname, section]);

  return <>{children}</>;
} 