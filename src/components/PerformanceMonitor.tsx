"use client";

import { useEffect, useRef } from 'react';
import { performanceUtils } from '@/lib/performance';

interface PerformanceMonitorProps {
  componentName: string;
  children: React.ReactNode;
  trackRender?: boolean;
  trackLoad?: boolean;
}

export default function PerformanceMonitor({ 
  componentName, 
  children, 
  trackRender = true,
  trackLoad = true 
}: PerformanceMonitorProps) {
  const startTime = useRef<number>(0);
  const hasTracked = useRef<boolean>(false);

  useEffect(() => {
    if (trackLoad && !hasTracked.current) {
      startTime.current = window.performance.now();
      hasTracked.current = true;
    }
  }, [trackLoad]);

  useEffect(() => {
    if (trackRender && startTime.current > 0) {
      performanceUtils.trackComponentRender(componentName, startTime.current);
    }
  }, [componentName, trackRender]);

  return <>{children}</>;
}

// Hook for tracking specific performance metrics
export const usePerformanceMonitor = (componentName: string) => {
  const startTime = useRef<number>(0);

  const startTracking = () => {
    startTime.current = window.performance.now();
  };

  const endTracking = () => {
    if (startTime.current > 0) {
      performanceUtils.trackComponentRender(componentName, startTime.current);
    }
  };

  return { startTracking, endTracking };
}; 