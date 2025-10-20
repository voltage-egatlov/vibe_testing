'use client';

import { useState, useCallback, useRef } from 'react';
import { tileGrid as generatedTileGrid, getTile } from '@/data/contentData';
import { navStructure } from '@/data/contentData';
import { Grid2x2, Maximize2 } from 'lucide-react';
import TileGrid from '../TileGrid';
import MobileNav from '../MobileNav';
import SlideMenu from '../SlideMenu';
import TileContent from '../content/TileContent';
import NavigationDropdown from '../navigation/NavigationDropdown';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useKeyboardNav } from '@/hooks/useKeyboardNav';
import {
  SPACING,
  getTotalHorizontalPadding,
  getTotalVerticalPadding,
  getGridDimensions,
} from '@/constants/layout';

/**
 * Calculate zoom scale to fit entire grid in viewport
 */
function calculateZoomScale(): number {
  if (typeof window === 'undefined') return 1;

  const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;

  const totalHorizontalPadding = getTotalHorizontalPadding();
  const totalVerticalPadding = getTotalVerticalPadding();

  const availableWidth = viewportWidth - totalHorizontalPadding;
  const availableHeight = viewportHeight - totalVerticalPadding - SPACING.NAV_BAR_HEIGHT;

  const { widthVW, heightVH } = getGridDimensions();

  const gridWidthPx = (widthVW / 100) * viewportWidth;
  const gridHeightPx = (heightVH / 100) * viewportHeight;

  const scaleForWidth = availableWidth / gridWidthPx;
  const scaleForHeight = availableHeight / gridHeightPx;

  return Math.min(scaleForWidth, scaleForHeight);
}

export default function WebView() {
  const [currentTile, setCurrentTile] = useState('about');
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const [isZoomedOut, setIsZoomedOut] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Use custom hooks
  const isMobile = useIsMobile();

  // Toggle dropdown - only one can be open at a time
  const toggleDropdown = useCallback((id: string) => {
    setOpenDropdowns((prev) => (prev.has(id) ? new Set() : new Set([id])));
  }, []);

  // Navigate to tile
  const navigateToTile = useCallback((tileId: string) => {
    if (getTile(generatedTileGrid, tileId)) {
      setCurrentTile(tileId);
      setIsZoomedOut(false);
      setZoomScale(1);
      setOpenDropdowns(new Set());
    }
  }, []);

  // Toggle view (zoom in/out)
  const toggleView = useCallback(() => {
    if (isZoomedOut) {
      setIsZoomedOut(false);
      setZoomScale(1);
    } else {
      const scale = calculateZoomScale();
      setZoomScale(scale);
      setIsZoomedOut(true);
    }
  }, [isZoomedOut]);

  // Get current page title
  const getCurrentPageTitle = useCallback(() => {
    const tile = getTile(generatedTileGrid, currentTile);
    return tile?.label || 'Portfolio';
  }, [currentTile]);

  // Click outside to close dropdowns
  useClickOutside(
    navRef,
    useCallback(() => setOpenDropdowns(new Set()), []),
    !isMobile
  );

  // Keyboard navigation
  useKeyboardNav({
    currentTile,
    tileGrid: generatedTileGrid,
    onNavigate: navigateToTile,
    enabled: !isMobile,
  });

  // Mobile View
  if (isMobile) {
    return (
      <div className="web-view mobile-view">
        <div className="mobile-content">
          <TileContent tileId={currentTile} isMobile={true} />
        </div>

        <MobileNav
          currentPageTitle={getCurrentPageTitle()}
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        <SlideMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          currentPage={currentTile}
          onNavigate={navigateToTile}
        />
      </div>
    );
  }

  // Desktop View
  return (
    <div className="web-view">
      <TileGrid
        currentTile={currentTile}
        isZoomedOut={isZoomedOut}
        zoomScale={zoomScale}
        onTileClick={navigateToTile}
      />

      {/* Bottom Navigation Container */}
      <div className="bottom-nav-container" ref={navRef}>
        <nav className="web-nav">
          <div className="web-nav-content">
            {navStructure.map((navItem) => {
              if (navItem.children && navItem.children.length > 0) {
                const isOpen = openDropdowns.has(navItem.id);
                const isChildActive = navItem.children.some(
                  (child) => child.id === currentTile
                );
                const isActive = currentTile === navItem.id || isChildActive;

                return (
                  <NavigationDropdown
                    key={navItem.id}
                    navItem={navItem}
                    isOpen={isOpen}
                    isActive={isActive}
                    currentTile={currentTile}
                    onToggle={toggleDropdown}
                    onNavigate={navigateToTile}
                  />
                );
              }

              // Simple nav item without dropdown
              return (
                <button
                  key={navItem.id}
                  onClick={() => navigateToTile(navItem.id)}
                  className={`web-nav-item ${currentTile === navItem.id ? 'active' : ''}`}
                >
                  {navItem.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* View Toggle Button */}
        <button
          onClick={toggleView}
          className="view-toggle-button"
          aria-label={isZoomedOut ? 'Zoom in to tile' : 'Zoom out to see all tiles'}
        >
          {isZoomedOut ? <Maximize2 className="w-5 h-5" /> : <Grid2x2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
