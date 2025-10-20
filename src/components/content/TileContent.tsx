'use client';

import React, { useMemo } from 'react';
import { filetreeMap } from '@/data/contentData';
import { parseFileContent } from '@/lib/parseFileContent';
import ScrollableCard from './ScrollableCard';
import FadeInBlock from '../common/FadeInBlock';
import ProjectImage from '../common/ProjectImage';

interface TileContentProps {
  tileId: string;
  isMobile?: boolean;
}

/**
 * Mobile content wrapper with consistent padding
 */
const MobileContentWrapper = React.memo<{ children: React.ReactNode }>(({ children }) => (
  <div className="mobile-card">{children}</div>
));

MobileContentWrapper.displayName = 'MobileContentWrapper';

/**
 * Conditionally wraps content in FadeInBlock for mobile
 */
const ContentBlock = React.memo<{ children: React.ReactNode; isMobile?: boolean }>(
  ({ children, isMobile }) => {
    if (isMobile) {
      return <FadeInBlock>{children}</FadeInBlock>;
    }
    return <>{children}</>;
  }
);

ContentBlock.displayName = 'ContentBlock';

/**
 * Extracts title element from parsed content elements
 */
function extractTitleElement(elements: React.ReactNode[]): React.ReactNode | undefined {
  return elements.find((el) => {
    return (
      el &&
      typeof el === 'object' &&
      'key' in el &&
      typeof el.key === 'string' &&
      el.key.startsWith('title-')
    );
  });
}

/**
 * Filters out title elements from content
 */
function filterContentElements(elements: React.ReactNode[]): React.ReactNode[] {
  return elements.filter((el) => {
    return !(
      el &&
      typeof el === 'object' &&
      'key' in el &&
      typeof el.key === 'string' &&
      el.key.startsWith('title-')
    );
  });
}

/**
 * Main tile content component
 * Renders content from filetree with support for custom tags, images, and responsive layouts
 */
const TileContent = React.memo<TileContentProps>(({ tileId, isMobile = false }) => {
  const node = filetreeMap.nodes[tileId];

  // Always call useMemo (hooks must be unconditional)
  const parsed = useMemo(() => {
    if (!node || !node.content) return null;
    return parseFileContent(node.content);
  }, [node]);

  // Memoize plain text sections
  const sections = useMemo(() => {
    if (!node || !node.content || (parsed && parsed.hasCustomTags)) return [];

    const contentLines = node.content.split('\n');
    const result: string[][] = [];
    let currentSection: string[] = [];

    for (const line of contentLines) {
      if (line.trim() === '' && currentSection.length > 0) {
        result.push([...currentSection]);
        currentSection = [];
      } else if (line.trim() !== '') {
        currentSection.push(line);
      }
    }

    if (currentSection.length > 0) {
      result.push(currentSection);
    }

    return result;
  }, [node, parsed]);

  // Handle missing node
  if (!node) {
    const Wrapper = isMobile ? MobileContentWrapper : ScrollableCard;
    return (
      <Wrapper>
        <p className="web-text">Content not found</p>
      </Wrapper>
    );
  }

  // Handle empty content
  if (!node.content) {
    if (isMobile) {
      return (
        <MobileContentWrapper>
          <ContentBlock isMobile={isMobile}>
            <h1 className="web-h1">{node.label}</h1>
            <p className="web-text">Content coming soon...</p>
          </ContentBlock>
        </MobileContentWrapper>
      );
    }

    return (
      <ScrollableCard title={<h1 className="web-h1">{node.label}</h1>}>
        <p className="web-text">Content coming soon...</p>
      </ScrollableCard>
    );
  }

  // Render content with custom tags
  if (parsed && parsed.hasCustomTags && parsed.elements.length > 0) {
    const titleElement = extractTitleElement(parsed.elements);
    const contentElements = filterContentElements(parsed.elements);

    if (isMobile) {
      return (
        <MobileContentWrapper>
          <ContentBlock isMobile={isMobile}>
            <div className="web-content-block">{parsed.elements}</div>
          </ContentBlock>

          {parsed.metadata.image && (
            <ContentBlock isMobile={isMobile}>
              <ProjectImage imagePath={parsed.metadata.image} />
            </ContentBlock>
          )}
        </MobileContentWrapper>
      );
    }

    return (
      <ScrollableCard title={titleElement}>
        <div className="web-content-block">{contentElements}</div>
        {parsed.metadata.image && <ProjectImage imagePath={parsed.metadata.image} />}
      </ScrollableCard>
    );
  }

  // Fallback: Plain text rendering
  if (isMobile) {
    return (
      <MobileContentWrapper>
        {sections.map((section, idx) => (
          <ContentBlock key={idx} isMobile={isMobile}>
            <div className={idx > 0 ? 'web-content-block' : ''}>
              <pre
                className="web-text"
                style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}
              >
                {section.join('\n')}
              </pre>
            </div>
          </ContentBlock>
        ))}

        {parsed?.metadata.image && (
          <ContentBlock isMobile={isMobile}>
            <ProjectImage imagePath={parsed.metadata.image} />
          </ContentBlock>
        )}
      </MobileContentWrapper>
    );
  }

  const title = parsed?.metadata.title || node.label;
  return (
    <ScrollableCard title={<h1 className="web-h1">{title}</h1>}>
      {sections.map((section, idx) => (
        <div key={idx} className={idx > 0 ? 'web-content-block' : ''}>
          <pre
            className="web-text"
            style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}
          >
            {section.join('\n')}
          </pre>
        </div>
      ))}

      {parsed?.metadata.image && <ProjectImage imagePath={parsed.metadata.image} />}
    </ScrollableCard>
  );
});

TileContent.displayName = 'TileContent';

export default TileContent;
