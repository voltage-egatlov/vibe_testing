'use client';

import React from 'react';
import { Menu } from 'lucide-react';

interface MobileNavProps {
  currentPageTitle: string;
  onMenuClick: () => void;
}

const MobileNav = React.memo<MobileNavProps>(({ currentPageTitle, onMenuClick }) => {
  return (
    <nav className="mobile-nav">
      <div className="mobile-nav-content">
        <h1 className="mobile-nav-title">{currentPageTitle}</h1>
        <button
          className="mobile-hamburger"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
});

MobileNav.displayName = 'MobileNav';

export default MobileNav;
