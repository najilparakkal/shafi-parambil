"use client";

import { cn } from "../lib/util";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const ThreeDMarquee = ({
  images,
  className,
  centerText = "SHAFI PARAMBIL",
}) => {
  // Split the images array into 5 equal parts for 5 columns
  const chunkSize = Math.ceil(images.length / 5);
  const chunks = Array.from({ length: 5 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <div
      className={cn(
        "mx-auto block md:h-[900px] h-[500px] p-4 md:p-10 overflow-hidden relative",
        className
      )}
    >
      {/* Centered Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="relative">
          {/* Simple gradient text without any additional effects */}
          <motion.h2
            className="text-4xl md:text-8xl font-bold text-center alumni-sans text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {centerText}
          </motion.h2>

          <motion.div
            className="absolute inset-0 blur-xl opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            style={{
              background:
                "linear-gradient(45deg, rgba(255,255,255,0.8), rgba(128,70,145,0.6))",
              zIndex: -1,
            }}
          />
        </div>
      </div>

      <div className="flex size-full items-center justify-center">
        <div className="size-full md:size-[1720px] shrink-0 scale-50 md:scale-75 lg:scale-100">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative md:top-[500px] top-[300px] md:right-[55%] right-[75%] grid size-full origin-top-left grid-cols-3 md:grid-cols-5 gap-4 md:gap-8 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ y: colIndex % 2 === 0 ? 100 : -100 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 5 : 7.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-4 md:gap-8"
              >
                <GridLineVertical className="-left-2 md:-left-4" offset="40px md:80px" />

                {/* Double the images for seamless infinite loop */}
                {[...subarray, ...subarray].map((image, imageIndex) => (
                  <div className="relative" key={imageIndex + image}>
                    <GridLineHorizontal className="-top-2 md:-top-4" offset="10px md:20px" />

                    {/* Wrapper for image and overlay */}
                    <div className="relative">
                      <motion.img
                        transition={{
                          duration: 0.15,
                          ease: "easeOut",
                        }}
                        src={image}
                        alt={`Image ${(imageIndex % subarray.length) + 1}`}
                        className="aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl hover:ring-2 hover:ring-gray-950/10 transition-all duration-150"
                        width={970}
                        height={700}
                      />

                      {/* Black overlay */}
                      <div className="absolute inset-0 bg-black/80 rounded-lg pointer-events-none"></div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Alternative infinite scrolling version with keyframes for smoother loop
export const ThreeDMarqueeInfinite = ({ images, className }) => {
  // Split the images array into 5 equal parts for 5 columns
  const chunkSize = Math.ceil(images.length / 5);
  const chunks = Array.from({ length: 5 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <div
      className={cn(
        "mx-auto block h-[500px] md:h-[900px] overflow-hidden",
        className
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div className="size-full md:size-[1720px] shrink-0 scale-50 md:scale-75 lg:scale-100">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative md:top-[500px] top-[300px] md:right-[55%] right-[75%] grid size-full origin-top-left grid-cols-3 md:grid-cols-5 gap-4 md:gap-8 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <div
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-4 md:gap-8 overflow-hidden"
              >
                <GridLineVertical className="-left-2 md:-left-4" offset="40px md:80px" />

                {/* Double the content for seamless looping */}
                <motion.div
                  animate={{
                    y: colIndex % 2 === 0 ? [-100, -300] : [100, -100],
                  }}
                  transition={{
                    duration: colIndex % 2 === 0 ? 2.5 : 3,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  }}
                  className="flex flex-col gap-4 md:gap-8"
                >
                  {[...subarray, ...subarray].map((image, imageIndex) => (
                    <div className="relative" key={imageIndex + image}>
                      <GridLineHorizontal className="-top-2 md:-top-4" offset="10px md:20px" />
                      <motion.img
                        whileHover={{
                          y: -25,
                          scale: 1.08,
                          rotateZ: 2,
                        }}
                        transition={{
                          duration: 0.1,
                          ease: "easeOut",
                        }}
                        src={image}
                        alt={`Image ${(imageIndex % subarray.length) + 1}`}
                        className="aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl hover:ring-2 hover:ring-gray-950/10 transition-all duration-100"
                        width={970}
                        height={700}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({ className, offset }) => {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(0, 0, 0, 0.2)",
        "--height": "1px",
        "--width": "5px",
        "--fade-stop": "90%",
        "--offset": offset || "200px",
        "--color-dark": "rgba(255, 255, 255, 0.2)",
      }}
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    ></div>
  );
};

const GridLineVertical = ({ className, offset }) => {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(0, 0, 0, 0.2)",
        "--height": "5px",
        "--width": "1px",
        "--fade-stop": "90%",
        "--offset": offset || "150px",
        "--color-dark": "rgba(255, 255, 255, 0.2)",
      }}
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    ></div>
  );
};