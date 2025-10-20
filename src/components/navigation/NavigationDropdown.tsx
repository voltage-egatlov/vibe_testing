import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { NavItem } from '@/types/filetree';

interface NavigationDropdownProps {
  navItem: NavItem;
  isOpen: boolean;
  isActive: boolean;
  currentTile: string;
  onToggle: (id: string) => void;
  onNavigate: (tileId: string) => void;
}

/**
 * Navigation dropdown component for parent items with children
 * Handles rendering of dropdown menu with sub-items
 */
const NavigationDropdown = React.memo<NavigationDropdownProps>(
  ({ navItem, isOpen, isActive, currentTile, onToggle, onNavigate }) => {
    if (!navItem.children || navItem.children.length === 0) {
      return null;
    }

    return (
      <div className="web-nav-dropdown">
        <button className={`web-nav-item ${isActive ? 'active' : ''}`}>
          <span onClick={() => onNavigate(navItem.id)}>{navItem.label}</span>
          <ChevronRight
            className={`w-5 h-5 inline dropdown-chevron ${isOpen ? 'open' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(navItem.id);
            }}
          />
        </button>

        {isOpen && (
          <div className="web-nav-dropdown-menu">
            {navItem.children.map((child) => (
              <button
                key={child.id}
                onClick={() => onNavigate(child.id)}
                className={`web-nav-dropdown-item ${
                  currentTile === child.id ? 'active' : ''
                }`}
              >
                {child.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

NavigationDropdown.displayName = 'NavigationDropdown';

export default NavigationDropdown;
