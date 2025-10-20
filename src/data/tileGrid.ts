// Tile grid navigation structure

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
  category?: string; // For grouping in nav (e.g., 'projects', 'skills')
}

// Main navigation row (y = 0)
const ROW_MAIN = 0;

// Project tiles (under Projects)
const ROW_PROJECTS_START = 1;

// Skills tiles (under Skills)
const ROW_SKILLS_START = 1;

// Tile size now uses full viewport dimensions
export const getTileWidth = () => typeof window !== 'undefined' ? window.innerWidth : 1896;
export const getTileHeight = () => typeof window !== 'undefined' ? window.innerHeight : 1046;

export const tileGrid: Record<string, TileData> = {
  // Main row (left to right): About → Education → Projects → Skills → Experience → Contact
  about: {
    id: 'about',
    label: 'About',
    coords: { x: 0, y: ROW_MAIN },
    neighbors: { right: 'education' }
  },

  education: {
    id: 'education',
    label: 'Education',
    coords: { x: 1, y: ROW_MAIN },
    neighbors: { left: 'about', right: 'projects' }
  },

  projects: {
    id: 'projects',
    label: 'Projects',
    coords: { x: 2, y: ROW_MAIN },
    neighbors: { left: 'education', right: 'skills', down: 'project_001' },
    category: 'projects'
  },

  skills: {
    id: 'skills',
    label: 'Skills',
    coords: { x: 3, y: ROW_MAIN },
    neighbors: { left: 'projects', right: 'experience', down: 'skills_consulting' },
    category: 'skills'
  },

  experience: {
    id: 'experience',
    label: 'Experience',
    coords: { x: 4, y: ROW_MAIN },
    neighbors: { left: 'skills', right: 'contact' }
  },

  contact: {
    id: 'contact',
    label: 'Contact',
    coords: { x: 5, y: ROW_MAIN },
    neighbors: { left: 'experience' }
  },

  // Projects column (top to bottom)
  project_001: {
    id: 'project_001',
    label: 'Dynatrace Executive Sponsor Program',
    coords: { x: 2, y: ROW_PROJECTS_START },
    neighbors: { up: 'projects', down: 'project_002' },
    category: 'projects'
  },

  project_002: {
    id: 'project_002',
    label: 'Evolv Digital Product Development',
    coords: { x: 2, y: ROW_PROJECTS_START + 1 },
    neighbors: { up: 'project_001', down: 'project_003' },
    category: 'projects'
  },

  project_003: {
    id: 'project_003',
    label: 'Tufts Gaming Hub Leadership',
    coords: { x: 2, y: ROW_PROJECTS_START + 2 },
    neighbors: { up: 'project_002' },
    category: 'projects'
  },

  // Skills column (top to bottom)
  skills_consulting: {
    id: 'skills_consulting',
    label: 'Consulting Skills',
    coords: { x: 3, y: ROW_SKILLS_START },
    neighbors: { up: 'skills', down: 'skills_development' },
    category: 'skills'
  },

  skills_development: {
    id: 'skills_development',
    label: 'Development Skills',
    coords: { x: 3, y: ROW_SKILLS_START + 1 },
    neighbors: { up: 'skills_consulting', down: 'skills_business' },
    category: 'skills'
  },

  skills_business: {
    id: 'skills_business',
    label: 'Business Skills',
    coords: { x: 3, y: ROW_SKILLS_START + 2 },
    neighbors: { up: 'skills_development' },
    category: 'skills'
  }
};

// Helper function to get tile by ID
export function getTile(tileId: string): TileData | null {
  return tileGrid[tileId] || null;
}

// Helper function to get all tiles in a category
export function getTilesByCategory(category: string): TileData[] {
  return Object.values(tileGrid).filter(tile => tile.category === category);
}

// Helper function to calculate transform for tile grid
export function calculateGridTransform(currentTileId: string): string {
  const tile = getTile(currentTileId);
  if (!tile) return 'translate3d(0, 0, 0)';

  const tileWidth = getTileWidth();
  const tileHeight = getTileHeight();
  const offsetX = -tile.coords.x * tileWidth;
  const offsetY = -tile.coords.y * tileHeight;

  return `translate3d(${offsetX}px, ${offsetY}px, 0)`;
}
