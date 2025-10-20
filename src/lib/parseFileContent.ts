import React from 'react';

export interface ParsedContent {
  elements: React.ReactNode[];
  metadata: FileMetadata;
  hasCustomTags: boolean;
}

export interface FileMetadata {
  title?: string;
  image?: string;
  tileX?: number;
  tileY?: number;
  [key: string]: string | number | undefined;
}

/**
 * Parse custom tags in file content and convert to React elements
 * Supported tags: [title], [h1], [h2], [p], [strong], [img], [link], [list], [item]
 */
export function parseFileContent(rawContent: string): ParsedContent {
  const lines = rawContent.split('\n');
  const elements: React.ReactNode[] = [];
  const metadata: FileMetadata = {};
  let hasCustomTags = false;

  let currentIndex = 0;
  let inMetadataBlock = false;
  let inListBlock = false;
  let listItems: React.ReactNode[] = [];

  // Helper to flush accumulated list items
  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        React.createElement('ul', {
          key: `list-${currentIndex}`,
          className: 'web-text',
          style: { paddingLeft: '1.5rem', marginTop: '0.5rem' }
        }, listItems)
      );
      listItems = [];
      currentIndex++;
    }
    inListBlock = false;
  };

  // Check if content uses custom tags
  if (/\[(title|h1|h2|p|strong|img|link|list|item)\]/.test(rawContent)) {
    hasCustomTags = true;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for metadata block at start of file (---metadata---...---end---)
    if (line.trim() === '---metadata---' && i === 0) {
      inMetadataBlock = true;
      continue;
    }
    if (inMetadataBlock && line.trim() === '---end---') {
      inMetadataBlock = false;
      continue;
    }
    if (inMetadataBlock) {
      // Parse key: value
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        // Try to parse as number if applicable
        metadata[key] = isNaN(Number(value)) ? value : Number(value);
      }
      continue;
    }

    // Skip empty lines outside of lists and metadata
    if (!line.trim() && !inListBlock && !inMetadataBlock) {
      continue;
    }

    // Parse [title] tag
    if (line.includes('[title]')) {
      flushList();
      const text = line.replace(/\[title\](.+?)\[\/title\]/g, '$1').trim();
      if (!metadata.title) {
        metadata.title = text;
      }
      elements.push(
        React.createElement('h1', { key: `title-${currentIndex}`, className: 'web-h1' }, text)
      );
      currentIndex++;
      continue;
    }

    // Parse [h1] tag
    if (line.includes('[h1]')) {
      flushList();
      const text = line.replace(/\[h1\](.+?)\[\/h1\]/g, '$1').trim();
      elements.push(
        React.createElement('h1', { key: `h1-${currentIndex}`, className: 'web-h1' }, text)
      );
      currentIndex++;
      continue;
    }

    // Parse [h2] tag
    if (line.includes('[h2]')) {
      flushList();
      const text = line.replace(/\[h2\](.+?)\[\/h2\]/g, '$1').trim();
      elements.push(
        React.createElement('h2', { key: `h2-${currentIndex}`, className: 'web-h2' }, text)
      );
      currentIndex++;
      continue;
    }

    // Parse [p] tag (with support for inline [strong] tags)
    if (line.includes('[p]')) {
      flushList();
      const text = line.replace(/\[p\](.+?)\[\/p\]/g, '$1').trim();

      // Handle inline [strong] tags
      if (text.includes('[strong]')) {
        const parts: React.ReactNode[] = [];
        const regex = /\[strong\](.+?)\[\/strong\]/g;
        let lastIndex = 0;
        let match;
        let partIndex = 0;

        while ((match = regex.exec(text)) !== null) {
          // Add text before the strong tag
          if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
          }
          // Add strong tag
          parts.push(
            React.createElement('strong', { key: `strong-${partIndex}` }, match[1])
          );
          lastIndex = regex.lastIndex;
          partIndex++;
        }
        // Add remaining text
        if (lastIndex < text.length) {
          parts.push(text.substring(lastIndex));
        }

        elements.push(
          React.createElement('p', { key: `p-${currentIndex}`, className: 'web-text' }, ...parts)
        );
      } else {
        elements.push(
          React.createElement('p', { key: `p-${currentIndex}`, className: 'web-text' }, text)
        );
      }
      currentIndex++;
      continue;
    }

    // Parse [img] tag
    if (line.includes('[img]')) {
      flushList();
      const imagePath = line.replace(/\[img\](.+?)\[\/img\]/g, '$1').trim();
      metadata.image = imagePath;
      currentIndex++;
      continue;
    }

    // Parse [link] tag
    if (line.includes('[link')) {
      flushList();
      const urlMatch = line.match(/url="([^"]+)"/);
      const textMatch = line.match(/\](.+?)\[\/link\]/);
      if (urlMatch && textMatch) {
        elements.push(
          React.createElement('a', {
            key: `link-${currentIndex}`,
            href: urlMatch[1],
            className: 'crt-link',
            target: '_blank',
            rel: 'noopener noreferrer',
            style: { color: '#00ffff', textDecoration: 'underline' }
          }, textMatch[1])
        );
        currentIndex++;
      }
      continue;
    }

    // Parse [list] tag
    if (line.includes('[list]')) {
      flushList();
      inListBlock = true;
      continue;
    }

    // Parse [/list] tag
    if (line.includes('[/list]')) {
      flushList();
      continue;
    }

    // Parse [item] tag
    if (line.includes('[item]') && inListBlock) {
      const text = line.replace(/\[item\](.+?)\[\/item\]/g, '$1').trim();
      listItems.push(
        React.createElement('li', { key: `item-${currentIndex}` }, text)
      );
      currentIndex++;
      continue;
    }

    // If no tags matched and we're not in a special block, this is plain text
    // Only render if the line has content
    if (line.trim() && !inMetadataBlock && !inListBlock) {
      // For plain text without tags, don't render (allows old format to coexist)
      continue;
    }
  }

  flushList();

  return { elements, metadata, hasCustomTags };
}

/**
 * Simple text-only parser for compatibility with existing content
 * Used when content doesn't have custom tags
 */
export function parseSimpleText(content: string): string {
  return content;
}

/**
 * Detect if content uses custom tag format
 */
export function hasCustomTags(content: string): boolean {
  return /\[(title|h1|h2|p|strong|img|link|list|item)\]/.test(content);
}
