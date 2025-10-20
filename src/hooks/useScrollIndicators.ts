'use client';

import { useState, useEffect, useCallback, RefObject } from 'react';

interface ScrollIndicators {
  showTop: boolean;
  showBottom: boolean;
}

interface ScrollToParams {
  direction: 'up' | 'down';
  percentage?: number;
}

interface UseScrollIndicatorsReturn {
  indicators: ScrollIndicators;
  scrollTo: (params: ScrollToParams) => void;
}

/**
 * Custom hook to manage scroll indicators (up/down arrows)
 * Detects overflow and scroll position to show/hide indicators
 *
 * @param scrollRef - Ref to the scrollable element
 * @param dependencies - Array of dependencies that should trigger re-check
 * @returns Object with indicator visibility state and scroll function
 */
export function useScrollIndicators(
  scrollRef: RefObject<HTMLDivElement | null>,
  dependencies: React.DependencyList = []
): UseScrollIndicatorsReturn {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(false);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const hasOverflow = scrollHeight > clientHeight;

    if (!hasOverflow) {
      setShowTop(false);
      setShowBottom(false);
      return;
    }

    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    setShowTop(!isAtTop && hasOverflow);
    setShowBottom(!isAtBottom && hasOverflow);
  }, [scrollRef]);

  const scrollTo = useCallback(
    ({ direction, percentage = 0.8 }: ScrollToParams) => {
      if (!scrollRef.current) return;

      const scrollAmount = scrollRef.current.clientHeight * percentage;
      scrollRef.current.scrollBy({
        top: direction === 'down' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    },
    [scrollRef]
  );

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    // Initial check
    checkScroll();

    // Listen for scroll events
    element.addEventListener('scroll', checkScroll);

    // Check on resize or content changes
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(element);

    return () => {
      element.removeEventListener('scroll', checkScroll);
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkScroll, ...dependencies]);

  return {
    indicators: { showTop, showBottom },
    scrollTo,
  };
}
