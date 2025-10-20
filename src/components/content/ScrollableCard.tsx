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
  const { indicators, scrollTo } = useScrollIndicators(cardRef, [children]);

  return (
    <div className="scrollable-card-wrapper">
      <div className="web-card">
        {/* Static title at top */}
        {title && (
          <div className="tile-title-wrapper">
            <div className="tile-title">{title}</div>
            <div className="tile-title-separator" />
          </div>
        )}

        {/* Scrollable content area */}
        <div className="tile-content-scroll" ref={cardRef}>
          {children}
        </div>
      </div>

      <ScrollIndicators
        showTop={indicators.showTop}
        showBottom={indicators.showBottom}
        onScrollUp={() => scrollTo({ direction: 'up' })}
        onScrollDown={() => scrollTo({ direction: 'down' })}
      />
    </div>
  );
});

ScrollableCard.displayName = 'ScrollableCard';

export default ScrollableCard;
