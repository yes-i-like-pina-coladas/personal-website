import { useRef } from "react";
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
    glowOpacity.set(1);
  }

  function handleMouseLeave() {
    scale.set(1);
    glowOpacity.set(0.4);
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
          className="absolute -inset-8 rounded-3xl bg-orange-500/30 pointer-events-none"
          style={{
            filter: 'blur(80px)',
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
            className={`relative mx-auto aspect-square rounded-3xl object-cover shadow-2xl shadow-orange-500/10 transition-all duration-300 group-hover:shadow-orange-500/20 w-full z-10 will-change-transform [transform:translateZ(0)] ${className}`}
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
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-stone-300 group-hover:ring-stone-400 transition-all duration-300 z-20" />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-orange-500/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20" />

          {/* Decorative hover shapes */}
          <div className="absolute -top-5 -right-5 w-20 h-20 sm:w-28 sm:h-28 rounded-full ring-[3px] ring-orange-500 opacity-0 scale-50 group-hover:opacity-90 group-hover:scale-100 transition-all duration-500 delay-75 z-30 pointer-events-none [transform:translateZ(20px)]" />
          <div className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-orange-500/50 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 delay-150 z-30 pointer-events-none [transform:translateZ(15px)]" />
          <div className="absolute top-8 -left-6 sm:-left-8 w-14 h-14 sm:w-16 sm:h-16 rounded-xl ring-[3px] ring-orange-500/80 rotate-45 opacity-0 -translate-x-3 group-hover:opacity-90 group-hover:translate-x-0 transition-all duration-500 delay-100 z-30 pointer-events-none [transform:translateZ(25px)_rotate(45deg)]" />
          <div className="absolute -bottom-6 right-10 sm:right-16 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-500/45 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200 z-30 pointer-events-none [transform:translateZ(18px)]" />
          <div className="absolute -top-3 left-12 sm:left-16 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-500/50 opacity-0 -translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-[250ms] z-30 pointer-events-none [transform:translateZ(22px)]" />
        </motion.div>
      </div>
    </motion.div>
  );
} 