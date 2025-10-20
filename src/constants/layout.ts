/**
 * Layout constants for the portfolio application
 * Centralizes all magic numbers for consistency and maintainability
 */

// Grid dimensions
export const GRID_CONSTANTS = {
  /** Number of tiles horizontally */
  WIDTH_TILES: 6,
  /** Number of tiles vertically */
  HEIGHT_TILES: 4,
  /** Each tile width in viewport units */
  TILE_WIDTH_VW: 100,
  /** Each tile height in viewport units */
  TILE_HEIGHT_VH: 100,
} as const;

// Responsive breakpoints
export const BREAKPOINTS = {
  /** Mobile breakpoint in pixels */
  MOBILE: 768,
  /** Tablet breakpoint in pixels */
  TABLET: 1200,
} as const;

// Padding and spacing
export const SPACING = {
  /** Padding around zoomed-out grid in rem */
  GRID_PADDING_REM: 4,
  /** Base rem to pixels conversion */
  REM_IN_PIXELS: 16,
  /** Navigation bar approximate height in pixels */
  NAV_BAR_HEIGHT: 100,
} as const;

// Scroll behavior
export const SCROLL_CONSTANTS = {
  /** Scroll amount as percentage of viewport height */
  SCROLL_PERCENTAGE: 0.8,
  /** Intersection observer threshold for fade-in */
  INTERSECTION_THRESHOLD: 0.2,
  /** Root margin for intersection observer */
  INTERSECTION_ROOT_MARGIN: '0px 0px -50px 0px',
} as const;

// Animation timing
export const ANIMATION = {
  /** Grid transform transition duration */
  GRID_TRANSITION: '0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
  /** Fade-in transition duration */
  FADE_DURATION: '0.6s ease-out',
} as const;

// Z-index layers
export const Z_INDEX = {
  TILE_CONNECTIONS: 0,
  SCROLL_INDICATORS: 10,
  NAVIGATION: 100,
} as const;

/**
 * Calculate total horizontal padding in pixels
 */
export const getTotalHorizontalPadding = () =>
  SPACING.GRID_PADDING_REM * SPACING.REM_IN_PIXELS * 2;

/**
 * Calculate total vertical padding in pixels
 */
export const getTotalVerticalPadding = () =>
  SPACING.GRID_PADDING_REM * SPACING.REM_IN_PIXELS * 2;

/**
 * Calculate grid dimensions in viewport units
 */
export const getGridDimensions = () => ({
  widthVW: GRID_CONSTANTS.WIDTH_TILES * GRID_CONSTANTS.TILE_WIDTH_VW,
  heightVH: GRID_CONSTANTS.HEIGHT_TILES * GRID_CONSTANTS.TILE_HEIGHT_VH,
});
