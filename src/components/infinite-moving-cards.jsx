"use client";

import { cn } from "../lib/util";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef < HTMLDivElement > null;
  const scrollerRef = React.useRef < HTMLUListElement > null;

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden ",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-1 py-1",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[350px] md:h-atuo h-40  max-w-full shrink-0  border border-b-0 border-zinc-200 bg-white md:w-[350px] dark:border-zinc-700 dark:bg-[#18181b]"
            key={idx}
          >
            <div className="relative h-full w-full">
              <Image
                src={item.image}
                alt=""
                width={450}
                height={300}
                className="rounded-xl object-cover w-full h-full"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

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
        " md:h-[900px] h-[500px]  overflow-hidden  ",
        className
      )}
    >
      {/* Centered Text Overlay */}
      <div className="absolute inset-0  w-screen flex items-center justify-center z-10 pointer-events-none">
        <div className="relative">
          {/* Simple gradient text without any additional effects */}
          <motion.h2
            className="text-7xl md:text-8xl font-bold text-center alumni-sans text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-100"
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

      <div className="flex size-full items-center justify-center  w-screen">
        <div className="size-[1720px] shrink-0 scale-48 sm:scale-75 lg:scale-100">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative top-[500px] md:right-[50%] right-[50%] grid size-full origin-top-left grid-cols-5 gap-8 transform-3d"
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
                className="flex flex-col items-start gap-8"
              >
                <GridLineVertical className="-left-4" offset="80px" />

                {/* Double the images for seamless infinite loop */}
                {[...subarray, ...subarray].map((image, imageIndex) => (
                  <div className="relative" key={imageIndex + image}>
                    <GridLineHorizontal className="-top-4" offset="20px" />

                    {/* Wrapper for image and overlay */}
                    <div className="relative">
                      <motion.img
                        // whileHover={{
                        //   y: -15,
                        //   scale: 1.00,
                        // }}
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
                      <div  className="absolute inset-0 bg-black/80 rounded-lg pointer-events-none"></div>
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
        "mx-auto block h-[900px] overflow-hidden max-sm:h-100",
        className
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div className="size-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative top-[500px] right-[55%] grid size-full origin-top-left grid-cols-5 gap-8 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <div
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-8 overflow-hidden"
              >
                <GridLineVertical className="-left-4" offset="80px" />

                {/* Double the content for seamless looping */}
                <motion.div
                  animate={{
                    y: colIndex % 2 === 0 ? [-100, -300] : [100, -100],
                  }}
                  transition={{
                    duration: colIndex % 2 === 0 ? 2.5 : 3, // Even faster: 2.5s for even, 3s for odd
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  }}
                  className="flex flex-col gap-8"
                >
                  {[...subarray, ...subarray].map((image, imageIndex) => (
                    <div className="relative" key={imageIndex + image}>
                      <GridLineHorizontal className="-top-4" offset="20px" />
                      <motion.img
                        whileHover={{
                          y: -25, // Even more dramatic hover
                          scale: 1.08,
                          rotateZ: 2,
                        }}
                        transition={{
                          duration: 0.1, // Super fast hover
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
















// import {
//   useEffect,
//   useLayoutEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { gsap } from "gsap";

// const useMedia = (
//   queries,
//   values,
//   defaultValue
// ) => {
//   const get = () =>
//     values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

//   const [value, setValue] = useState(get);

//   useEffect(() => {
//     const handler = () => setValue(get);
//     queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
//     return () =>
//       queries.forEach((q) =>
//         matchMedia(q).removeEventListener("change", handler)
//       );
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [queries]);

//   return value;
// };

// const useMeasure = () => {
//   const ref = useRef(null);
//   const [size, setSize] = useState({ width: 0, height: 0 });

//   useLayoutEffect(() => {
//     if (!ref.current) return;
//     const ro = new ResizeObserver(([entry]) => {
//       const { width, height } = entry.contentRect;
//       setSize({ width, height });
//     });
//     ro.observe(ref.current);
//     return () => ro.disconnect();
//   }, []);

//   return [ref, size];
// };

// const preloadImages = async (urls) => {
//   await Promise.all(
//     urls.map(
//       (src) =>
//         new Promise((resolve) => {
//           const img = new Image();
//           img.src = src;
//           img.onload = img.onerror = () => resolve();
//         })
//     )
//   );
// };

// const Masonry = ({
//   items,
//   ease = "power3.out",
//   duration = 0.6,
//   stagger = 0.05,
//   animateFrom = "bottom",
//   scaleOnHover = true,
//   hoverScale = 0.95,
//   blurToFocus = true,
//   colorShiftOnHover = false,
// }) => {
//   const columns = useMedia(
//     [
//       "(min-width:1500px)",
//       "(min-width:1000px)",
//       "(min-width:600px)",
//       "(min-width:400px)",
//     ],
//     [5, 4, 3, 2],
//     1
//   );

//   const [containerRef, { width }] = useMeasure();
//   const [imagesReady, setImagesReady] = useState(false);

//   const getInitialPosition = (item) => {
//     const containerRect = containerRef.current?.getBoundingClientRect();
//     if (!containerRect) return { x: item.x, y: item.y };

//     let direction = animateFrom;
//     if (animateFrom === "random") {
//       const dirs = ["top", "bottom", "left", "right"];
//       direction = dirs[
//         Math.floor(Math.random() * dirs.length)
//       ];
//     }

//     switch (direction) {
//       case "top":
//         return { x: item.x, y: -200 };
//       case "bottom":
//         return { x: item.x, y: window.innerHeight + 200 };
//       case "left":
//         return { x: -200, y: item.y };
//       case "right":
//         return { x: window.innerWidth + 200, y: item.y };
//       case "center":
//         return {
//           x: containerRect.width / 2 - item.w / 2,
//           y: containerRect.height / 2 - item.h / 2,
//         };
//       default:
//         return { x: item.x, y: item.y + 100 };
//     }
//   };

//   useEffect(() => {
//     preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
//   }, [items]);

//   const grid = useMemo(() => {
//     if (!width) return [];
//     const colHeights = new Array(columns).fill(0);
//     const gap = 16;
//     const totalGaps = (columns - 1) * gap;
//     const columnWidth = (width - totalGaps) / columns;

//     return items.map((child) => {
//       const col = colHeights.indexOf(Math.min(...colHeights));
//       const x = col * (columnWidth + gap);
//       const height = child.height / 2;
//       const y = colHeights[col];

//       colHeights[col] += height + gap;
//       return { ...child, x, y, w: columnWidth, h: height };
//     });
//   }, [columns, items, width]);

//   const hasMounted = useRef(false);

//   useLayoutEffect(() => {
//     if (!imagesReady) return;

//     grid.forEach((item, index) => {
//       const selector = `[data-key="${item.id}"]`;
//       const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

//       if (!hasMounted.current) {
//         const start = getInitialPosition(item);
//         gsap.fromTo(
//           selector,
//           {
//             opacity: 0,
//             x: start.x,
//             y: start.y,
//             width: item.w,
//             height: item.h,
//             ...(blurToFocus && { filter: "blur(10px)" }),
//           },
//           {
//             opacity: 1,
//             ...animProps,
//             ...(blurToFocus && { filter: "blur(0px)" }),
//             duration: 0.8,
//             ease: "power3.out",
//             delay: index * stagger,
//           }
//         );
//       } else {
//         gsap.to(selector, {
//           ...animProps,
//           duration,
//           ease,
//           overwrite: "auto",
//         });
//       }
//     });

//     hasMounted.current = true;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

//   const handleMouseEnter = (id, element) => {
//     if (scaleOnHover) {
//       gsap.to(`[data-key="${id}"]`, {
//         scale: hoverScale,
//         duration: 0.3,
//         ease: "power2.out"
//       });
//     }
//     if (colorShiftOnHover) {
//       const overlay = element.querySelector(".color-overlay");
//       if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
//     }
//   };

//   const handleMouseLeave = (id, element) => {
//     if (scaleOnHover) {
//       gsap.to(`[data-key="${id}"]`, {
//         scale: 1,
//         duration: 0.3,
//         ease: "power2.out"
//       });
//     }
//     if (colorShiftOnHover) {
//       const overlay = element.querySelector(".color-overlay");
//       if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
//     }
//   };

//   return (
//     <div ref={containerRef} className="relative w-full h-full">
//       {grid.map((item) => (
//         <div
//           key={item.id}
//           data-key={item.id}
//           className="absolute box-content"
//           style={{ willChange: "transform, width, height, opacity" }}
//           onClick={() => window.open(item.url, "_blank", "noopener")}
//           onMouseEnter={(e) => handleMouseEnter(item.id, e.currentTarget)}
//           onMouseLeave={(e) => handleMouseLeave(item.id, e.currentTarget)}
//         >
//           <div
//             className="relative w-full h-full bg-cover bg-center rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] uppercase text-[10px] leading-[10px]"
//             style={{ backgroundImage: `url(${item.img})` }}
//           >
//             {colorShiftOnHover && (
//               <div className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Masonry;
