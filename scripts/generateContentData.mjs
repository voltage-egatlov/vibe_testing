/**
 * Build-time script to generate content data from the filetree
 * This runs during the build process and outputs a JSON file
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File tree structure
const filetreePath = path.join(__dirname, '..', 'src', 'filetree');
const outputPath = path.join(__dirname, '..', 'src', 'data', 'generated');

// Ensure output directory exists
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

/**
 * Parse file content metadata
 */
function parseFileMetadata(content) {
  const metadata = {};
  const lines = content.split('\n');

  let inMetadataBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim() === '---metadata---') {
      inMetadataBlock = true;
      continue;
    }

    if (line.trim() === '---end---') {
      break;
    }

    if (inMetadataBlock) {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        metadata[key] = isNaN(Number(value)) ? value : Number(value);
      }
    }
  }

  return metadata;
}

/**
 * Recursively scan directory
 */
function scanDirectory(dirPath, parentId) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  const children = [];

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    const relativePath = path.relative(filetreePath, fullPath);

    if (item.isDirectory()) {
      // This is a folder
      const folderId = path.basename(item.name);
      const folderNode = {
        type: 'folder',
        name: item.name,
        path: relativePath,
        id: folderId,
        label: capitalizeWords(item.name),
        children: [],
        parent: parentId,
        icon: 'Folder'
      };

      // Check if there's an index/overview file
      const indexFilePath = path.join(fullPath, `${item.name}.txt`);
      if (fs.existsSync(indexFilePath)) {
        const content = fs.readFileSync(indexFilePath, 'utf-8');
        const metadata = parseFileMetadata(content);
        folderNode.content = content;
        folderNode.metadata = metadata;
      }

      // Scan children
      folderNode.children = scanDirectory(fullPath, folderId);
      children.push(folderNode);

    } else if (item.isFile() && item.name.endsWith('.txt')) {
      // Skip if this is the folder's index file
      const parentFolderName = path.basename(dirPath);
      if (item.name === `${parentFolderName}.txt`) {
        continue;
      }

      // This is a regular file
      const fileId = path.basename(item.name, '.txt');
      const content = fs.readFileSync(fullPath, 'utf-8');
      const metadata = parseFileMetadata(content);

      const fileNode = {
        type: 'file',
        name: item.name,
        path: relativePath,
        id: fileId,
        label: metadata.title || capitalizeWords(fileId.replace(/_/g, ' ')),
        content,
        metadata,
        parent: parentId,
        icon: getFileIcon(item.name)
      };

      children.push(fileNode);
    }
  }

  return children;
}

/**
 * Get file icon based on extension
 */
function getFileIcon(filename) {
  if (filename.endsWith('.txt')) return 'FileText';
  if (filename.endsWith('.sys')) return 'Mail';
  if (filename.endsWith('.dat')) return 'Database';
  if (filename.endsWith('.log')) return 'ScrollText';
  return 'File';
}

/**
 * Capitalize words
 */
function capitalizeWords(str) {
  return str
    .split(/[\s_-]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Generate tile grid from filetree
 */
function generateTileGrid(filetreeMap) {
  const tiles = {};
  const grid = [];
  let maxX = 0;
  let maxY = 0;

  // Initialize grid
  for (let y = 0; y < 10; y++) {
    grid[y] = new Array(10).fill(null);
  }

  function placeNode(node, x, y) {
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
      neighbors: {},
      category: node.parent,
      hasContent: !!node.content
    };
  }

  let currentX = 0;
  const topLevelNodes = filetreeMap.root.children || [];

  for (const node of topLevelNodes) {
    placeNode(node, currentX, 0);

    if (node.type === 'folder' && node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        placeNode(child, currentX, i + 1);
      }
    }

    currentX++;
  }

  // Calculate neighbors based on tree structure
  // Only connect: top-level items horizontally, and parent-child vertically
  for (let i = 0; i < topLevelNodes.length; i++) {
    const node = topLevelNodes[i];
    const nodeTile = tiles[node.id];

    if (!nodeTile) continue;

    // Connect to left/right top-level siblings
    if (i > 0) {
      const leftNode = topLevelNodes[i - 1];
      nodeTile.neighbors.left = leftNode.id;
    }
    if (i < topLevelNodes.length - 1) {
      const rightNode = topLevelNodes[i + 1];
      nodeTile.neighbors.right = rightNode.id;
    }

    // Connect parent to first child
    if (node.type === 'folder' && node.children && node.children.length > 0) {
      nodeTile.neighbors.down = node.children[0].id;

      // Connect children
      for (let j = 0; j < node.children.length; j++) {
        const child = node.children[j];
        const childTile = tiles[child.id];

        if (!childTile) continue;

        // Connect child to parent
        childTile.neighbors.up = node.id;

        // Connect to sibling below
        if (j < node.children.length - 1) {
          childTile.neighbors.down = node.children[j + 1].id;
        }

        // Connect to sibling above
        if (j > 0) {
          childTile.neighbors.up = node.children[j - 1].id;
        } else {
          // First child connects up to parent
          childTile.neighbors.up = node.id;
        }
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
 * Build navigation structure
 */
function buildNavStructure(filetreeMap) {
  const rootChildren = filetreeMap.root.children || [];

  return rootChildren.map(node => {
    const navItem = {
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

/**
 * Main execution
 */
console.log('Generating content data from filetree...');

if (!fs.existsSync(filetreePath)) {
  console.error('Error: filetree directory not found at:', filetreePath);
  process.exit(1);
}

// Build filetree map
const rootNode = {
  type: 'folder',
  name: 'root',
  path: '',
  id: 'root',
  label: 'Root',
  children: scanDirectory(filetreePath),
  icon: 'Folder'
};

const nodes = {};
const flatList = [rootNode];

function collectNodes(node) {
  nodes[node.id] = node;
  flatList.push(node);
  if (node.children) {
    node.children.forEach(collectNodes);
  }
}

rootNode.children.forEach(collectNodes);

const filetreeMap = {
  nodes,
  root: rootNode,
  flatList
};

// Generate tile grid
const tileGrid = generateTileGrid(filetreeMap);

// Generate nav structure
const navStructure = buildNavStructure(filetreeMap);

// Write output
const output = {
  filetreeMap,
  tileGrid,
  navStructure
};

fs.writeFileSync(
  path.join(outputPath, 'contentData.json'),
  JSON.stringify(output, null, 2)
);

console.log('✓ Content data generated successfully!');
console.log(`  - ${flatList.length} nodes in filetree`);
console.log(`  - ${Object.keys(tileGrid.tiles).length} tiles generated`);
console.log(`  - ${navStructure.length} top-level navigation items`);
