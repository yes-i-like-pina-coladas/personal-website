import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OrganizationLogoProps {
  src: string;
  alt: string;
  description: string;
  className?: string;
  customSize?: string;
}

const OrganizationLogo = ({ src, alt, description, className = '', customSize }: OrganizationLogoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  // Split description into title and details
  const [titlePart, detailsPart] = description.split('\n');

  const showTooltip = isHovered || isTouched;

  const handleTouch = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsTouched(!isTouched);
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

  return (
    <div 
      className={`relative group ${customSize}`} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => {
        setIsHovered(false);
        setIsTouched(false);
      }}
      onTouchStart={handleTouch}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`${className} grayscale group-hover:grayscale-0 transition-all duration-300`}
        initial={{ opacity: 0.7 }}
        whileHover={{ opacity: 1 }}
      />
      {/* Tooltip for both mobile and desktop */}
      {showTooltip && (
        <motion.div
          className="fixed sm:absolute left-1/2 top-[40vh] sm:top-0 -translate-x-1/2 sm:-translate-y-full mb-2 p-3 sm:p-4 bg-gray-900/90 backdrop-blur-lg rounded-lg border border-gray-800 text-white text-sm w-[min(280px,90vw)] sm:w-[320px] shadow-xl z-50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative">
            <p className="font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">{titlePart}</p>
            <p className="text-gray-300 text-xs sm:text-sm">{detailsPart}</p>
            <div className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900/90 border-b border-r border-gray-800 transform rotate-45 hidden sm:block" />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default OrganizationLogo; 