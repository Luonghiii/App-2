import React, { FC } from 'react';

// GlowingBorderCard is now just a wrapper as the new theme uses csa-box or csa-acc-card styles directly.
// We keep it to avoid breaking other components if they use it, but render simpler content.
export const GlowingBorderCard: FC<{ children: React.ReactNode; className?: string, contentClassName?: string }> = ({
  children,
  className = '',
  contentClassName = ''
}) => {
  return (
    <div className={` ${className}`}>
      <div className={` ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

export const AnimatedSection: FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => {
    return (
        <div className={`${className}`}>
            {children}
        </div>
    );
};

export const AnimatedGradientBackground: FC = () => (
    // Background is now handled by global CSS
    null
);
