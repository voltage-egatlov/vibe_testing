import fs from 'fs';
import path from 'path';
import { FileMetadata, parseFileContent } from './parseFileContent';

export interface FileTreeNode {
  type: 'file' | 'folder';
  name: string;
  path: string;
  id: string; // Unique identifier (e.g., 'about', 'projects', 'project_001')
  label: string; // Display name
  content?: string; // Raw file content
  metadata?: FileMetadata; // Parsed metadata from file
  children?: FileTreeNode[];
  parent?: string; // Parent folder ID
  icon?: string; // Icon name for rendering
}

export interface FileTreeMap {
  nodes: Record<string, FileTreeNode>; // Map of id -> node
  root: FileTreeNode; // Root folder node
  flatList: FileTreeNode[]; // Flat array of all nodes
}

/**
 * Recursively scan the filetree directory and build a structured map
 * This runs at build time (server-side only)
 */
export function getFiletreeMap(): FileTreeMap {
  const filetreePath = path.join(process.cwd(), 'src', 'filetree');
  const nodes: Record<string, FileTreeNode> = {};
  const flatList: FileTreeNode[] = [];

  if (!fs.existsSync(filetreePath)) {
    // Return empty structure if filetree doesn't exist yet
    const emptyRoot: FileTreeNode = {
      type: 'folder',
      name: 'root',
      path: '',
      id: 'root',
      label: 'Root',
      children: []
    };
    return { nodes: { root: emptyRoot }, root: emptyRoot, flatList: [emptyRoot] };
  }

  /**
   * Recursively scan directory
   */
  function scanDirectory(dirPath: string, parentId?: string): FileTreeNode[] {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    const children: FileTreeNode[] = [];

    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);
      const relativePath = path.relative(filetreePath, fullPath);

      if (item.isDirectory()) {
        // This is a folder
        const folderId = path.basename(item.name);
        const folderNode: FileTreeNode = {
          type: 'folder',
          name: item.name,
          path: relativePath,
          id: folderId,
          label: capitalizeWords(item.name),
          children: [],
          parent: parentId,
          icon: 'Folder'
        };

        // Check if there's an index/overview file (e.g., projects.txt in projects/)
        const indexFilePath = path.join(fullPath, `${item.name}.txt`);
        if (fs.existsSync(indexFilePath)) {
          const content = fs.readFileSync(indexFilePath, 'utf-8');
          const parsed = parseFileContent(content, indexFilePath);
          folderNode.content = content;
          folderNode.metadata = parsed.metadata;
        }

        // Scan children
        folderNode.children = scanDirectory(fullPath, folderId);

        nodes[folderId] = folderNode;
        flatList.push(folderNode);
        children.push(folderNode);

      } else if (item.isFile() && item.name.endsWith('.txt')) {
        // Skip if this is the folder's index file (already handled above)
        const parentFolderName = path.basename(dirPath);
        if (item.name === `${parentFolderName}.txt`) {
          continue;
        }

        // This is a regular file
        const fileId = path.basename(item.name, '.txt');
        const content = fs.readFileSync(fullPath, 'utf-8');
        const parsed = parseFileContent(content, fullPath);

        const fileNode: FileTreeNode = {
          type: 'file',
          name: item.name,
          path: relativePath,
          id: fileId,
          label: parsed.metadata.title || capitalizeWords(fileId.replace(/_/g, ' ')),
          content,
          metadata: parsed.metadata,
          parent: parentId,
          icon: getFileIcon(item.name)
        };

        nodes[fileId] = fileNode;
        flatList.push(fileNode);
        children.push(fileNode);
      }
    }

    return children;
  }

  // Build the tree starting from root
  const rootNode: FileTreeNode = {
    type: 'folder',
    name: 'root',
    path: '',
    id: 'root',
    label: 'Root',
    children: scanDirectory(filetreePath),
    icon: 'Folder'
  };

  nodes['root'] = rootNode;
  flatList.unshift(rootNode);

  return { nodes, root: rootNode, flatList };
}

/**
 * Get appropriate icon based on file extension
 */
function getFileIcon(filename: string): string {
  if (filename.endsWith('.txt')) return 'FileText';
  if (filename.endsWith('.sys')) return 'Mail';
  if (filename.endsWith('.dat')) return 'Database';
  if (filename.endsWith('.log')) return 'ScrollText';
  return 'File';
}

/**
 * Capitalize words for display labels
 */
function capitalizeWords(str: string): string {
  return str
    .split(/[\s_-]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Get all nodes of a specific type
 */
export function getNodesByType(map: FileTreeMap, type: 'file' | 'folder'): FileTreeNode[] {
  return map.flatList.filter(node => node.type === type);
}

/**
 * Get all children of a folder
 */
export function getChildren(map: FileTreeMap, folderId: string): FileTreeNode[] {
  const folder = map.nodes[folderId];
  return folder && folder.type === 'folder' ? (folder.children || []) : [];
}

/**
 * Get node by ID
 */
export function getNode(map: FileTreeMap, nodeId: string): FileTreeNode | undefined {
  return map.nodes[nodeId];
}

/**
 * Build navigation structure for UI components
 */
export interface NavItem {
  id: string;
  label: string;
  path: string;
  children?: NavItem[];
}

export function buildNavStructure(map: FileTreeMap): NavItem[] {
  const rootChildren = map.root.children || [];

  return rootChildren.map(node => {
    const navItem: NavItem = {
      id: node.id,
      label: node.label,
      path: node.path
    };

    if (node.type === 'folder' && node.children && node.children.length > 0) {
      navItem.children = node.children.map(child => ({
        id: child.id,
        label: child.label,
        path: child.path
      }));
    }

    return navItem;
  });
}
