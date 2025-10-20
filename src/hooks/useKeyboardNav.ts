'use client';

import { useEffect, useCallback } from 'react';
import type { TileGrid } from '@/types/filetree';
import { getTile } from '@/data/contentData';

type Direction = 'left' | 'right' | 'up' | 'down';

interface UseKeyboardNavParams {
  currentTile: string;
  tileGrid: TileGrid;
  onNavigate: (tileId: string) => void;
  enabled?: boolean;
}

/**
 * Custom hook for keyboard-based tile navigation
 * Handles arrow key navigation between tiles
 *
 * @param currentTile - ID of currently selected tile
 * @param tileGrid - Grid data structure with tile information
 * @param onNavigate - Callback when navigating to a new tile
 * @param enabled - Whether keyboard navigation is active (default: true)
 */
export function useKeyboardNav({
  currentTile,
  tileGrid,
  onNavigate,
  enabled = true,
}: UseKeyboardNavParams): void {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      const tile = getTile(tileGrid, currentTile);
      if (!tile) return;

      const directionMap: Record<string, Direction | null> = {
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowUp: 'up',
        ArrowDown: 'down',
      };

      const direction = directionMap[e.key];
      if (!direction) return;

      const neighborId = tile.neighbors[direction];
      if (neighborId) {
        e.preventDefault();
        onNavigate(neighborId);
      }
    },
    [currentTile, tileGrid, onNavigate, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
}
