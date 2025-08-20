import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";

const TiltCard = ({ 
  imageSrc, 
  altText = "Image",
  cardClassName = "h-96 w-80",
  imageClassName = "object-contain p-4"
}) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const ROTATION_RANGE = 32.5;
  const HALF_ROTATION_RANGE = 32.5 / 2;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className={`relative rounded-xl border border-gray-800 shadow-2xl bg-gradient-to-br from-gray-900 to-black ${cardClassName}`}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-800/20 to-black/0 backdrop-blur-md" />
      
      {/* Reflective border effect */}
      <div className="absolute inset-0 rounded-xl border border-gray-800/30 pointer-events-none" />
      
      {/* Shadow layer */}
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="absolute h-full w-full"
          style={{
            transform: "translateY(35px) scale(0.50)",
            filter: "blur(50px) brightness(0.7) opacity(0.8)",
            zIndex: -1,
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Main image */}
      <div
        style={{
          transform: "translateZ(100px)",
        }}
        className="relative h-full w-full flex items-center justify-center"
      >
        <Image
          src={imageSrc}
          alt={altText}
          fill
          className={imageClassName}
          style={{
            filter: "drop-shadow(0 10px 15px rgba(255, 255, 255, 0.1))",
          }}
        />
      </div>

      {/* Subtle glow dots */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default TiltCard;