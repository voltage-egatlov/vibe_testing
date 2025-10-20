'use client';

import React, { useState } from 'react';
import { X, ChevronRight, ChevronDown } from 'lucide-react';
import { navStructure } from '@/data/contentData';

interface SlideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (pageId: string) => void;
}

const SlideMenu = React.memo<SlideMenuProps>(({ isOpen, onClose, currentPage, onNavigate }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleNavigate = (pageId: string) => {
    onNavigate(pageId);
    onClose();
  };

  const isExpanded = (sectionId: string) => expandedSections.has(sectionId);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="menu-backdrop"
          onClick={onClose}
        />
      )}

      {/* Slide-in Menu */}
      <div className={`slide-menu ${isOpen ? 'open' : ''}`}>
        <div className="slide-menu-header">
          <h2 className="slide-menu-title">Navigation</h2>
          <button
            className="slide-menu-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="slide-menu-nav">
          {navStructure.map((navItem) => {
            // Check if item has children (expandable)
            if (navItem.children && navItem.children.length > 0) {
              const isActive = currentPage === navItem.id || currentPage.startsWith(navItem.id);

              return (
                <div key={navItem.id} className="menu-section">
                  <div className={`menu-item with-chevron ${isActive ? 'active' : ''}`}>
                    <span onClick={() => handleNavigate(navItem.id)}>{navItem.label}</span>
                    <button
                      className="chevron-button"
                      onClick={() => toggleSection(navItem.id)}
                      aria-label={`Expand ${navItem.label}`}
                    >
                      {isExpanded(navItem.id) ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {isExpanded(navItem.id) && (
                    <div className="menu-subsection">
                      {navItem.children.map((child) => (
                        <button
                          key={child.id}
                          className={`menu-subitem ${currentPage === child.id ? 'active' : ''}`}
                          onClick={() => handleNavigate(child.id)}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            } else {
              // Simple menu item without children
              return (
                <button
                  key={navItem.id}
                  className={`menu-item ${currentPage === navItem.id ? 'active' : ''}`}
                  onClick={() => handleNavigate(navItem.id)}
                >
                  <span>{navItem.label}</span>
                </button>
              );
            }
          })}
        </nav>
      </div>
    </>
  );
});

SlideMenu.displayName = 'SlideMenu';

export default SlideMenu;
