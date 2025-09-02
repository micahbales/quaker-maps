/**
 * React 18 optimization utilities
 */
import { startTransition, useDeferredValue, useMemo } from 'react';

/**
 * Wrapper for React 18's startTransition to optimize non-urgent updates
 */
export const optimizeStateUpdate = (updateFn: () => void): void => {
  startTransition(() => {
    updateFn();
  });
};

/**
 * Hook to defer expensive computations using React 18's useDeferredValue
 */
export const useDeferredSearch = <T>(value: T): T => {
  return useDeferredValue(value);
};

/**
 * Memoized filter function for meetings to leverage React 18's automatic batching
 */
export const useMemoizedMeetingFilter = (
  meetings: any[],
  searchTerm: string,
  filters: any
) => {
  return useMemo(() => {
    if (!meetings.length) return [];
    
    return meetings.filter(meeting => {
      // Apply search term filter
      if (searchTerm && !meeting.title?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Apply other filters
      if (filters.branch && meeting.branch !== filters.branch) {
        return false;
      }
      
      if (filters.worship_style && meeting.worship_style !== filters.worship_style) {
        return false;
      }
      
      return true;
    });
  }, [meetings, searchTerm, filters]);
};

/**
 * Batch multiple state updates to leverage React 18's automatic batching
 */
export const batchStateUpdates = (updates: Array<() => void>): void => {
  // React 18 automatically batches these updates
  updates.forEach(update => update());
};