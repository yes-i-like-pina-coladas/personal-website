import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OrganizationLogoProps {
  src: string;
  alt: string;
  description: string;
  className?: string;
  customSize?: string;
  link?: string;
}

const OrganizationLogo = ({ src, alt, description, className = '', customSize, link }: OrganizationLogoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{top: number, left: number} | null>(null);

  // Split description into title and details
  const [titlePart, detailsPart] = description.split('\n');

  const showTooltip = isHovered || isTouched;

  const handleTouch = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // close other tooltips first so only one is open
    document.dispatchEvent(new CustomEvent('orglogo:closeAll'));
    // position tooltip above the touched icon
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top - 12,
      left: rect.left + rect.width / 2
    });
    setIsTouched(true);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top - 12,
      left: rect.left + rect.width / 2
    });
    setIsHovered(true);
  };

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsHovered(false);
      setIsTouched(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // No dependencies needed since we're just resetting state

  // Ensure only one tooltip is open at a time across instances (mobile)
  useEffect(() => {
    const handleCloseAll = () => {
      setIsTouched(false);
      setIsHovered(false);
    };
    document.addEventListener('orglogo:closeAll', handleCloseAll as EventListener);
    return () => document.removeEventListener('orglogo:closeAll', handleCloseAll as EventListener);
  }, []);

  return (
    <div 
      className={`relative group ${customSize} h-20 sm:h-24 md:h-28 flex items-center justify-center`} 
      onTouchStart={handleTouch}
    >
      {/* Desktop: clickable image */}
      <motion.img
        src={src}
        alt={alt}
        className={`${className} grayscale hover:grayscale-0 transition-all duration-300 max-h-full w-auto hidden sm:block cursor-pointer`}
        initial={{ opacity: 0.7 }}
        whileHover={{ opacity: 1 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (link) {
            const newWindow = window.open(link, '_blank');
            if (!newWindow) {
              // Fallback if popup blocked
              window.location.href = link;
            }
          }
        }}
      />
      
      {/* Mobile: non-clickable image (tooltip handles link) */}
      <motion.img
        src={src}
        alt={alt}
        className={`${className} grayscale transition-all duration-300 max-h-full w-auto block sm:hidden`}
        initial={{ opacity: 0.7 }}
      />
      {/* Tooltip for both mobile and desktop */}
      {showTooltip && tooltipPosition && (
        <motion.div
          className="fixed -translate-x-1/2 -translate-y-full p-3 sm:p-4 bg-gray-900/95 backdrop-blur-lg rounded-lg border border-gray-800 text-white text-sm w-[min(280px,90vw)] sm:w-[320px] shadow-2xl pointer-events-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{ 
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            zIndex: 999999
          }}
          onTouchStart={(e) => {
            // allow interacting with the tooltip without toggling the parent
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="relative">
            <p className="font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">{titlePart}</p>
            <p className="text-gray-300 text-xs sm:text-sm">{detailsPart}</p>
            <div className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900/90 border-b border-r border-gray-800 transform rotate-45 hidden sm:block" />
            {link && (
              <div className="mt-3 block sm:hidden text-center">
                <a 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsTouched(false);
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default OrganizationLogo; 