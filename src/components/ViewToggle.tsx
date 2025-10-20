'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function ViewToggle() {
  const router = useRouter();
  const pathname = usePathname();

  // Determine if we're in PC mode (alternativeview) or Web mode (home)
  const isPCMode = pathname === '/alternativeview';

  const handleToggle = () => {
    if (isPCMode) {
      router.push('/home');
    } else {
      router.push('/alternativeview');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="view-toggle-button"
      aria-label={isPCMode ? 'Switch to Web View' : 'Switch to PC View'}
    >
      <div className={`power-button ${isPCMode ? 'power-on' : 'power-off'}`}>
        <div className="power-icon">
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path
              d="M12 2v10M18.36 6.64a9 9 0 1 1-12.73 0"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="power-label">{isPCMode ? 'PC' : 'WEB'}</span>
      </div>
    </button>
  );
}
