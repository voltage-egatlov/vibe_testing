'use client';

import React, { useRef } from 'react';
import { useScrollIndicators } from '@/hooks/useScrollIndicators';
import ScrollIndicators from '../common/ScrollIndicators';

interface ScrollableCardProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Scrollable card with static title and scroll indicators
 * Used in desktop tile view for content display
 */
const ScrollableCard = React.memo<ScrollableCardProps>(({ title, children }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { indicators } = useScrollIndicators(cardRef, [children]);

  // Build dynamic class names for scroll shadows
  const scrollClasses = [
    'tile-content-scroll',
    indicators.showTop && 'has-scroll-top',
    indicators.showBottom && 'has-scroll-bottom'
  ].filter(Boolean).join(' ');

  return (
    <div className="scrollable-card-wrapper">
      <div className="web-card">
        {/* Static title at top */}
        {title && (
          <div className="tile-title-wrapper">
            <div className="tile-title">{title}</div>
          </div>
        )}

        {/* Separator line below title */}
        {title && <div className="tile-title-separator" />}

        {/* Scrollable content area with dynamic shadow classes */}
        <div className={scrollClasses} ref={cardRef}>
          {children}
        </div>

        {/* Separator line below content */}
        <div className="tile-content-separator" />
      </div>
    </div>
  );
});

ScrollableCard.displayName = 'ScrollableCard';

export default ScrollableCard;
