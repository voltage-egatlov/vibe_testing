import { FileTreeMap, FileTreeNode } from './getFiletreeMap';

export interface TileCoords {
  x: number;
  y: number;
}

export interface TileNeighbors {
  left?: string;
  right?: string;
  up?: string;
  down?: string;
}

export interface TileData {
  id: string;
  label: string;
  coords: TileCoords;
  neighbors: TileNeighbors;
  category?: string;
  hasContent?: boolean;
}

export interface TileGrid {
  tiles: Record<string, TileData>;
  width: number;
  height: number;
}

/**
 * Generate a spatial tile grid from the filetree structure
 *
 * Layout strategy:
 * - Top-level items (files and folders) are arranged horizontally in row 0
 * - Nested items within folders are arranged vertically below their parent
 * - Grid is 6 tiles wide maximum
 */
export function generateTileGrid(filetreeMap: FileTreeMap): TileGrid {
  const tiles: Record<string, TileData> = {};
  const grid: (string | null)[][] = [];
  let maxX = 0;
  let maxY = 0;

  // Initialize grid
  for (let y = 0; y < 10; y++) {
    grid[y] = new Array(10).fill(null);
  }

  /**
   * Place a node in the grid
   */
  function placeNode(node: FileTreeNode, x: number, y: number): void {
    // Check for metadata override
    if (node.metadata?.tileX !== undefined && node.metadata?.tileY !== undefined) {
      x = node.metadata.tileX;
      y = node.metadata.tileY;
    }

    grid[y][x] = node.id;
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);

    tiles[node.id] = {
      id: node.id,
      label: node.label,
      coords: { x, y },
      neighbors: {}, // Will be calculated later
      category: node.parent,
      hasContent: !!node.content
    };
  }

  /**
   * Layout algorithm:
   * Row 0: Top-level items (files + folders with content)
   * Rows 1+: Nested items below their parent folder
   */
  let currentX = 0;
  const topLevelNodes = filetreeMap.root.children || [];

  for (const node of topLevelNodes) {
    // Place top-level node
    placeNode(node, currentX, 0);

    // If it's a folder with children, place them vertically below
    if (node.type === 'folder' && node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        placeNode(child, currentX, i + 1);
      }
    }

    currentX++;
  }

  /**
   * Calculate neighbors based on grid positions
   */
  for (const tileId in tiles) {
    const tile = tiles[tileId];
    const { x, y } = tile.coords;

    // Find left neighbor
    for (let checkX = x - 1; checkX >= 0; checkX--) {
      if (grid[y][checkX]) {
        tile.neighbors.left = grid[y][checkX]!;
        break;
      }
    }

    // Find right neighbor
    for (let checkX = x + 1; checkX <= maxX; checkX++) {
      if (grid[y][checkX]) {
        tile.neighbors.right = grid[y][checkX]!;
        break;
      }
    }

    // Find up neighbor
    for (let checkY = y - 1; checkY >= 0; checkY--) {
      if (grid[checkY][x]) {
        tile.neighbors.up = grid[checkY][x]!;
        break;
      }
    }

    // Find down neighbor
    for (let checkY = y + 1; checkY <= maxY; checkY++) {
      if (grid[checkY][x]) {
        tile.neighbors.down = grid[checkY][x]!;
        break;
      }
    }
  }

  return {
    tiles,
    width: maxX + 1,
    height: maxY + 1
  };
}

/**
 * Get tile by ID
 */
export function getTile(grid: TileGrid, tileId: string): TileData | null {
  return grid.tiles[tileId] || null;
}

/**
 * Get all tiles in a category
 */
export function getTilesByCategory(grid: TileGrid, category: string): TileData[] {
  return Object.values(grid.tiles).filter(tile => tile.category === category);
}

/**
 * Calculate transform for tile grid navigation
 */
export function calculateGridTransform(grid: TileGrid, currentTileId: string): string {
  const tile = getTile(grid, currentTileId);
  if (!tile) return 'translate3d(0, 0, 0)';

  const tileWidth = typeof window !== 'undefined' ? window.innerWidth : 1896;
  const tileHeight = typeof window !== 'undefined' ? window.innerHeight : 1046;

  const offsetX = -tile.coords.x * tileWidth;
  const offsetY = -tile.coords.y * tileHeight;

  return `translate3d(${offsetX}px, ${offsetY}px, 0)`;
}

/**
 * Export type-compatible interface for existing code
 */
export const getTileWidth = () => typeof window !== 'undefined' ? window.innerWidth : 1896;
export const getTileHeight = () => typeof window !== 'undefined' ? window.innerHeight : 1046;
