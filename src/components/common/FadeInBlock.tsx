'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SCROLL_CONSTANTS } from '@/constants/layout';

interface FadeInBlockProps {
  children: React.ReactNode;
  delay?: number;
}

/**
 * Fade-in animation wrapper using Intersection Observer
 * Triggers fade-in when element enters viewport
 */
const FadeInBlock = React.memo<FadeInBlockProps>(({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => setIsVisible(true), delay);
            } else {
              setIsVisible(true);
            }
          }
        });
      },
      {
        threshold: SCROLL_CONSTANTS.INTERSECTION_THRESHOLD,
        rootMargin: SCROLL_CONSTANTS.INTERSECTION_ROOT_MARGIN,
      }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay]);

  return (
    <div ref={elementRef} className={`fade-in-block ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
});

FadeInBlock.displayName = 'FadeInBlock';

export default FadeInBlock;
