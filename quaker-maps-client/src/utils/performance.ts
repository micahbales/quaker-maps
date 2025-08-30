/**
 * Performance testing utilities for React 18 upgrade
 */

export interface PerformanceMetrics {
  initialLoadTime: number;
  mapRenderTime: number;
  bundleSize: number;
  memoryUsage: number;
}

/**
 * Measure initial page load time using Performance API
 */
export const measureInitialLoadTime = (): number => {
  if (typeof window !== 'undefined' && window.performance) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return navigation.loadEventEnd - navigation.fetchStart;
  }
  return 0;
};

/**
 * Measure map rendering performance
 */
export const measureMapRenderTime = (startTime: number): number => {
  return performance.now() - startTime;
};

/**
 * Get current memory usage (if available)
 */
export const getMemoryUsage = (): number => {
  if (typeof window !== 'undefined' && (window.performance as any).memory) {
    return (window.performance as any).memory.usedJSHeapSize;
  }
  return 0;
};

/**
 * Log performance metrics to console for testing
 */
export const logPerformanceMetrics = (metrics: Partial<PerformanceMetrics>): void => {
  console.group('🚀 Performance Metrics');
  if (metrics.initialLoadTime) {
    console.log(`📊 Initial Load Time: ${metrics.initialLoadTime.toFixed(2)}ms`);
  }
  if (metrics.mapRenderTime) {
    console.log(`🗺️ Map Render Time: ${metrics.mapRenderTime.toFixed(2)}ms`);
  }
  if (metrics.bundleSize) {
    console.log(`📦 Bundle Size: ${(metrics.bundleSize / 1024).toFixed(2)}KB`);
  }
  if (metrics.memoryUsage) {
    console.log(`💾 Memory Usage: ${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB`);
  }
  console.groupEnd();
};

/**
 * Create a performance observer for measuring specific metrics
 */
export const createPerformanceObserver = (callback: (metrics: PerformanceMetrics) => void): void => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'measure') {
          console.log(`📏 ${entry.name}: ${entry.duration.toFixed(2)}ms`);
        }
      });
    });
    
    observer.observe({ entryTypes: ['measure', 'navigation'] });
  }
};