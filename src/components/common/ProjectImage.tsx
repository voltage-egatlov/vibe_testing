import React from 'react';

interface ProjectImageProps {
  imagePath: string;
  className?: string;
}

/**
 * Project image placeholder component
 * Displays placeholder for project screenshots
 */
const ProjectImage = React.memo<ProjectImageProps>(({ imagePath, className = '' }) => {
  return (
    <div className={`crt-image-container ${className}`} style={{ marginTop: '2rem' }}>
      <div className="text-center text-lg mb-2" style={{ color: '#00ffff' }}>
        [ PROJECT SCREENSHOT ]
      </div>
      <div className="relative w-full h-64" style={{ background: '#1a1a1a' }}>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ color: '#00ff00' }}
        >
          [Image placeholder: {imagePath}]
        </div>
      </div>
    </div>
  );
});

ProjectImage.displayName = 'ProjectImage';

export default ProjectImage;
