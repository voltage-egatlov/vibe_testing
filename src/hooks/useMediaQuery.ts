'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive media queries
 * Consolidates mobile/tablet detection logic
 *
 * @param query - CSS media query string (e.g., '(max-width: 768px)')
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Initial check
    const media = window.matchMedia(query);
    setMatches(media.matches);

    // Listen for changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
    // Fallback for older browsers
    else {
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [query]);

  return matches;
}

/**
 * Hook to detect mobile viewport
 * @param breakpoint - Mobile breakpoint in pixels (default: 768)
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  return useMediaQuery(`(max-width: ${breakpoint}px)`);
}

/**
 * Hook to detect tablet viewport
 * @param minWidth - Minimum width for tablet (default: 768)
 * @param maxWidth - Maximum width for tablet (default: 1200)
 */
export function useIsTablet(minWidth: number = 768, maxWidth: number = 1200): boolean {
  return useMediaQuery(`(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`);
}
