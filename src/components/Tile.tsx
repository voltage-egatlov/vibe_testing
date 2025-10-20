import React from 'react';
import { TileCoords } from '@/data/tileGrid';

interface TileProps {
  id: string;
  coords: TileCoords;
  isActive: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  isClickable?: boolean;
  label?: string;
  isZoomedOut?: boolean;
}

const Tile = React.memo<TileProps>(({ id, coords, isActive, children, onClick, isClickable, label, isZoomedOut }) => {
  // Calculate position based on coordinates
  // Each tile is 100vw x 100vh
  const left = coords.x * 100;
  const top = coords.y * 100;

  return (
    <div
      className={`web-tile ${isClickable ? 'tile-clickable' : ''} ${isZoomedOut ? 'tile-zoomed-out' : ''}`}
      data-tile-id={id}
      data-active={isActive}
      style={{
        left: `${left}vw`,
        top: `${top}vh`
      }}
      onClick={onClick}
    >
      {isZoomedOut && label ? (
        <div className="tile-map-title">
          <h2>{label}</h2>
        </div>
      ) : (
        <div className="web-content">
          {children}
        </div>
      )}
    </div>
  );
});

Tile.displayName = 'Tile';

export default Tile;
