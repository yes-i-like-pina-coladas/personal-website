import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const springValues = {
  damping: 35,
  stiffness: 120,
  mass: 2,
};

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  glowClassName?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  roundedClassName?: string;
}

export default function TiltedCard({
  children,
  className = "",
  containerClassName = "",
  glowClassName = "bg-blue-500/20",
  scaleOnHover = 1.04,
  rotateAmplitude = 14,
  roundedClassName = "rounded-[16px] sm:rounded-[20px]",
}: TiltedCardProps) {
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
      className={`relative w-full [perspective:700px] ${containerClassName}`}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative group">
        <motion.div
          className={`absolute inset-0 ${roundedClassName} ${glowClassName} pointer-events-none`}
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
        <motion.div
          className={`relative ${roundedClassName} [transform-style:preserve-3d] ${className}`}
          style={{
            rotateX,
            rotateY,
            scale,
          }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}


