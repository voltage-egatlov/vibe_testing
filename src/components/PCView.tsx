'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Folder, File, FileText, Database, ScrollText, Mail } from 'lucide-react';
import { filetreeMap } from '@/data/contentData';
import type { FileTreeNode } from '@/types/filetree';
import { parseFileContent } from '@/lib/parseFileContent';

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Folder,
  File,
  FileText,
  Database,
  ScrollText,
  Mail
};

export default function PCView() {
  const [selectedFile, setSelectedFile] = useState<string>('about');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['projects', 'skills']));

  // Toggle folder expansion
  const toggleFolder = (id: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedFolders(newExpanded);
  };

  // Render file tree recursively
  const renderFileTree = (node: FileTreeNode, depth: number = 0): React.ReactElement | null => {
    if (!node) return null;

    const isExpanded = expandedFolders.has(node.id);
    const isSelected = selectedFile === node.id;
    const IconComponent = iconMap[node.icon || 'File'] || File;

    if (node.type === 'folder') {
      return (
        <div key={node.id}>
          <div
            className={`file-tree-item ${isSelected ? 'selected' : ''} phosphor-text`}
            style={{ paddingLeft: `${depth * 1.5}rem` }}
            onClick={() => {
              toggleFolder(node.id);
              // If folder has content, allow selecting it
              if (node.content) {
                setSelectedFile(node.id);
              }
            }}
          >
            <div className="flex items-center gap-2">
              {isExpanded ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
              <Folder className="w-6 h-6" />
              <span className="text-3xl">{node.name}</span>
            </div>
          </div>
          {isExpanded && node.children && (
            <div>
              {node.children.map((child) => renderFileTree(child, depth + 1))}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div
          key={node.id}
          className={`file-tree-item ${isSelected ? 'selected' : ''} phosphor-text`}
          style={{ paddingLeft: `${depth * 1.5 + 0.5}rem` }}
          onClick={() => setSelectedFile(node.id)}
        >
          <div className="flex items-center gap-2">
            <IconComponent className="w-6 h-6" />
            <span className="text-3xl">{node.name}</span>
          </div>
        </div>
      );
    }
  };

  // Render content viewer
  const renderContent = () => {
    const node = filetreeMap.nodes[selectedFile];

    if (!node || !node.content) {
      return (
        <div className="content-viewer phosphor-text">
          <h1 className="phosphor-amber">File Not Found</h1>
          <pre>The selected file could not be loaded.</pre>
        </div>
      );
    }

    // Parse the content
    const parsed = parseFileContent(node.content);

    // Check if this is a project with an image
    const hasImage = parsed.metadata.image;

    // If content has custom tags, render the parsed elements
    if (parsed.hasCustomTags && parsed.elements.length > 0) {
      return (
        <div className="content-viewer phosphor-text">
          {parsed.elements}
          {hasImage && (
            <div className="crt-image-container" style={{ marginTop: '2rem' }}>
              <div className="text-center phosphor-cyan text-lg mb-2">
                [ PROJECT SCREENSHOT ]
              </div>
              <div className="relative w-full h-64 bg-gray-900">
                <div className="absolute inset-0 flex items-center justify-center phosphor-text">
                  [Image placeholder: {hasImage}]
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Fallback: render as plain text (for old format compatibility)
    const title = parsed.metadata.title || node.label;
    return (
      <div className="content-viewer">
        {title && <h1 className="phosphor-amber">{title}</h1>}
        <pre className="phosphor-text" style={{ whiteSpace: 'pre-wrap' }}>{node.content}</pre>
        {hasImage && (
          <div className="crt-image-container">
            <div className="text-center phosphor-cyan text-lg mb-2">
              [ PROJECT SCREENSHOT ]
            </div>
            <div className="relative w-full h-64 bg-gray-900">
              <div className="absolute inset-0 flex items-center justify-center phosphor-text">
                [Image placeholder: {hasImage}]
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="monitor-frame">
      <div className="crt-screen">
        <div className="crt-vignette" />
        <div className="crt-content flex flex-col">
          {/* Header */}
          <div className="border-b-2 border-green-500 px-6 py-4">
            <h1 className="phosphor-amber text-5xl">TEJ CHHABRA // PORTFOLIO</h1>
            <p className="phosphor-cyan text-3xl mt-1">Associate Consultant @ Mars & Co.</p>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Panel - File Tree */}
            <div className="w-80 border-r-2 border-green-500 overflow-y-auto custom-scroll">
              <div className="p-4">
                <div className="phosphor-amber text-3xl mb-4 flex items-center gap-2">
                  <Folder className="w-8 h-8" />
                  FILE SYSTEM
                </div>
                {filetreeMap.root.children?.map(child => renderFileTree(child))}
              </div>
            </div>

            {/* Right Panel - Content Viewer */}
            <div className="flex-1 overflow-y-auto custom-scroll">
              {renderContent()}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-green-500 px-6 py-2">
            <div className="flex justify-between items-center phosphor-text text-xl">
              <span>SYSTEM READY</span>
              <span>{filetreeMap.nodes[selectedFile]?.name || selectedFile}</span>
              <span className="phosphor-cyan">CLICK TO NAVIGATE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
