import React from 'react';
import { tileGrid as generatedTileGrid } from '@/data/contentData';

const tileGrid = generatedTileGrid.tiles;

interface TileConnectionsProps {
  isZoomedOut?: boolean;
}

const TileConnections = React.memo<TileConnectionsProps>(({ isZoomedOut = false }) => {
  // Generate lines connecting neighboring tiles
  const generateConnections = () => {
    const lines: React.ReactElement[] = [];

    Object.values(tileGrid).forEach((tile) => {
      // Calculate center of current tile
      const x1 = (tile.coords.x * 100) + 50; // Center of tile in vw
      const y1 = (tile.coords.y * 100) + 50; // Center of tile in vh

      // Draw line to right neighbor (to avoid duplicates)
      if (tile.neighbors.right) {
        const rightTile = tileGrid[tile.neighbors.right];
        if (rightTile) {
          const x2 = (rightTile.coords.x * 100) + 50;
          const y2 = (rightTile.coords.y * 100) + 50;

          lines.push(
            <line
              key={`${tile.id}-right`}
              x1={`${x1}vw`}
              y1={`${y1}vh`}
              x2={`${x2}vw`}
              y2={`${y2}vh`}
              stroke="rgba(0, 0, 0, 0.2)"
              strokeWidth={isZoomedOut ? "8" : "2"}
              strokeLinecap="round"
            />
          );
        }
      }

      // Draw line to down neighbor (to avoid duplicates)
      if (tile.neighbors.down) {
        const downTile = tileGrid[tile.neighbors.down];
        if (downTile) {
          const x2 = (downTile.coords.x * 100) + 50;
          const y2 = (downTile.coords.y * 100) + 50;

          lines.push(
            <line
              key={`${tile.id}-down`}
              x1={`${x1}vw`}
              y1={`${y1}vh`}
              x2={`${x2}vw`}
              y2={`${y2}vh`}
              stroke="rgba(0, 0, 0, 0.2)"
              strokeWidth={isZoomedOut ? "8" : "2"}
              strokeLinecap="round"
            />
          );
        }
      }
    });

    return lines;
  };

  return (
    <svg
      className="tile-connections"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '600vw', // 6 tiles wide
        height: '400vh', // 4 tiles tall
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {generateConnections()}
    </svg>
  );
});

TileConnections.displayName = 'TileConnections';

export default TileConnections;
