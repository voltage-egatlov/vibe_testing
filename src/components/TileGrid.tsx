import React, { useMemo } from 'react';
import { tileGrid as generatedTileGrid, getTile } from '@/data/contentData';
import { SPACING } from '@/constants/layout';
import Tile from './Tile';
import TileContent from './content/TileContent';
import TileConnections from './TileConnections';

const tileGrid = generatedTileGrid.tiles;

interface TileGridProps {
  currentTile: string;
  isZoomedOut?: boolean;
  zoomScale?: number;
  onTileClick?: (tileId: string) => void;
}

const TileGrid = React.memo<TileGridProps>(({ currentTile, isZoomedOut = false, zoomScale = 1, onTileClick }) => {
  // Memoize grid transform calculation
  const gridTransform = useMemo((): string => {
    const tile = getTile(generatedTileGrid, currentTile);
    if (!tile) return 'translate3d(0, 0, 0)';

    if (isZoomedOut) {
      const paddingPx = SPACING.GRID_PADDING_REM * SPACING.REM_IN_PIXELS;

      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
      const paddingVW = (paddingPx / viewportWidth) * 100;
      const paddingVH = (paddingPx / viewportHeight) * 100;

      return `translate3d(${paddingVW}vw, ${paddingVH}vh, 0) scale(${zoomScale})`;
    }

    const offsetX = -tile.coords.x * 100;
    const offsetY = -tile.coords.y * 100;
    return `translate3d(${offsetX}vw, ${offsetY}vh, 0)`;
  }, [currentTile, isZoomedOut, zoomScale]);

  return (
    <div
      className={`web-tiles-container tile-view ${isZoomedOut ? 'zoomed-out' : ''}`}
      style={{
        transform: gridTransform,
        transition: 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)'
      }}
    >
      {/* Connection lines between tiles */}
      <TileConnections isZoomedOut={isZoomedOut} />

      {Object.keys(tileGrid).map((tileId) => {
        const tileData = tileGrid[tileId];
        const isActive = tileId === currentTile;

        return (
          <Tile
            key={tileId}
            id={tileId}
            coords={tileData.coords}
            isActive={isActive}
            onClick={() => isZoomedOut && onTileClick && onTileClick(tileId)}
            isClickable={isZoomedOut}
            label={tileData.label}
            isZoomedOut={isZoomedOut}
          >
            <TileContent tileId={tileId} />
          </Tile>
        );
      })}
    </div>
  );
});

TileGrid.displayName = 'TileGrid';

export default TileGrid;
