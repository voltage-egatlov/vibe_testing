/**
 * This file loads the pre-generated content data from the build script
 * It provides the data to both PCView and WebView at runtime
 */

import generatedData from './generated/contentData.json';
import type { FileTreeNode, FileTreeMap, TileGrid, TileData, NavItem } from '@/types/filetree';

// Re-export types for convenience
export type { FileTreeNode, FileTreeMap, TileGrid, TileData, NavItem };

// Load the generated data
export const filetreeMap: FileTreeMap = generatedData.filetreeMap as FileTreeMap;
export const tileGrid: TileGrid = generatedData.tileGrid as TileGrid;
export const navStructure: NavItem[] = generatedData.navStructure as NavItem[];

// Helper functions

/**
 * Get tile by ID
 */
export function getTile(grid: TileGrid, tileId: string): TileData | null {
  return grid.tiles[tileId] || null;
}


/**
 * Get node by ID from filetree
 */
export function getNode(map: FileTreeMap, nodeId: string): FileTreeNode | undefined {
  return map.nodes[nodeId];
}


/**
 * Get content by ID
 */
export function getContentById(id: string): string | undefined {
  const node = filetreeMap.nodes[id];
  return node?.content;
}

/**
 * Check if a node has children
 */
export function hasChildren(id: string): boolean {
  const node = filetreeMap.nodes[id];
  return node?.type === 'folder' && (node.children?.length || 0) > 0;
}

/**
 * Get children IDs
 */
export function getChildrenIds(id: string): string[] {
  const node = filetreeMap.nodes[id];
  if (node?.type === 'folder' && node.children) {
    return node.children.map(child => child.id);
  }
  return [];
}

/**
 * Get display label
 */
export function getLabel(id: string): string {
  const node = filetreeMap.nodes[id];
  return node?.label || id;
}
