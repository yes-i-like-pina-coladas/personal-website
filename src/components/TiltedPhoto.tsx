import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const springValues = {
  damping: 35,
  stiffness: 120,
  mass: 2,
};

interface TiltedPhotoProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}

export default function TiltedPhoto({
  src,
  alt,
  className = "",
  containerClassName = "",
  scaleOnHover = 1.08,
  rotateAmplitude = 14,
  overlayContent = null,
  displayOverlayContent = false,
}: TiltedPhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const glowOpacity = useSpring(0.5, springValues);

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    glowOpacity.set(0.8);
  }

  function handleMouseLeave() {
    scale.set(1);
    glowOpacity.set(0.5);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={`relative w-full max-w-[180px] sm:max-w-[220px] lg:max-w-[320px] lg:order-last mx-auto [perspective:700px] ${containerClassName}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative group">
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-blue-500/20 pointer-events-none"
          style={{
            filter: 'blur(60px)',
            willChange: 'transform, opacity, filter',
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            opacity: glowOpacity,
            rotateX: rotateX,
            rotateY: rotateY,
          }}
        />
        
        {/* Tilted image container */}
        <motion.div
          className="relative [transform-style:preserve-3d]"
          style={{
            rotateX,
            rotateY,
            scale,
          }}
        >
          <img
            alt={alt}
            className={`relative mx-auto aspect-square rounded-3xl object-cover shadow-2xl shadow-blue-500/10 transition-all duration-300 group-hover:shadow-blue-500/20 w-full z-10 will-change-transform [transform:translateZ(0)] ${className}`}
            src={src}
            style={{
              objectFit: "cover",
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
          />

          {/* Overlay content */}
          {displayOverlayContent && overlayContent && (
            <motion.div
              className="absolute bottom-4 left-4 sm:top-4 sm:bottom-auto z-[25] will-change-transform [transform:translateZ(30px)]"
            >
              {overlayContent}
            </motion.div>
          )}
          
          {/* Ring overlay */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-gray-700 group-hover:ring-gray-600 transition-all duration-300 z-20" />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20" />
        </motion.div>
      </div>
    </motion.div>
  );
} 