'use client';

import { useEffect, RefObject } from 'react';

/**
 * Custom hook to detect clicks outside a referenced element
 * Useful for closing dropdowns, modals, and menus
 *
 * @param ref - React ref to the element to detect outside clicks for
 * @param handler - Callback function to execute when clicking outside
 * @param enabled - Whether the hook is active (default: true)
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    // Listen for both mouse and touch events
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler, enabled]);
}
