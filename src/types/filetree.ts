/**
 * Shared type definitions for the filetree system
 * These types can be used both on the server (build scripts) and client (React components)
 */

import { FileMetadata } from '@/lib/parseFileContent';

export interface FileTreeNode {
  type: 'file' | 'folder';
  name: string;
  path: string;
  id: string;
  label: string;
  content?: string;
  metadata?: FileMetadata;
  children?: FileTreeNode[];
  parent?: string;
  icon?: string;
}

export interface FileTreeMap {
  nodes: Record<string, FileTreeNode>;
  root: FileTreeNode;
  flatList: FileTreeNode[];
}

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

export interface NavItem {
  id: string;
  label: string;
  path: string;
  children?: NavItem[];
}
