import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ScrollIndicatorsProps {
  showTop: boolean;
  showBottom: boolean;
  onScrollUp: () => void;
  onScrollDown: () => void;
}

/**
 * Scroll indicator buttons (up/down arrows)
 * Shows when content is scrollable and not at top/bottom
 */
const ScrollIndicators = React.memo<ScrollIndicatorsProps>(({
  showTop,
  showBottom,
  onScrollUp,
  onScrollDown,
}) => {
  return (
    <>
      {showTop && (
        <button
          className="scroll-indicator scroll-indicator-top visible"
          onClick={onScrollUp}
          aria-label="Scroll up"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
      {showBottom && (
        <button
          className="scroll-indicator scroll-indicator-bottom visible"
          onClick={onScrollDown}
          aria-label="Scroll down"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      )}
    </>
  );
});

ScrollIndicators.displayName = 'ScrollIndicators';

export default ScrollIndicators;
