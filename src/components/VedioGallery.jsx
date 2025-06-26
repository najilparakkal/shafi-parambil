"use client";

import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const imagesData = [
  {
    id: 1,
    src: "/gallery/Screenshot 2025-06-16 at 3.32.11 PM 1.png",
    thumbnail: "/gallery/Screenshot 2025-06-16 at 3.32.11 PM 1.png",
    views: "332K",
    title: "Campaign Rally",
  },
  {
    id: 2,
    src: "/gallery/Screenshot 2025-06-16 at 3.32.11 PM 3.png",
    thumbnail: "/gallery/Screenshot 2025-06-16 at 3.32.11 PM 3.png",
    views: "484K",
    title: "Community Meeting",
  },
  {
    id: 3,
    src: "/gallery/Screenshot 2025-06-16 at 3.32.11 PM 4.png",
    thumbnail: "/gallery/Screenshot 2025-06-16 at 3.32.11 PM 4.png",
    views: "256K",
    title: "Public Speech",
  },
  {
    id: 4,
    src: "/banner/E0ZctVlUUAMjLw6[1].jpg",
    thumbnail: "/banner/E0ZctVlUUAMjLw6[1].jpg",
    views: "189K",
    title: "Development Project",
  },
  {
    id: 5,
    src: "/gallery/Screenshot 2025-06-16 at 3.32.11 PM 4.png",
    thumbnail: "/gallery/Screenshot 2025-06-16 at 3.32.11 PM 4.png",
    views: "423K",
    title: "Educational Initiative",
  },
  {
    id: 6,
    src: "/gallery/Screenshot 2025-06-16 at 3.32.11 PM 3.png",
    thumbnail: "/gallery/Screenshot 2025-06-16 at 3.32.11 PM 3.png",
    views: "367K",
    title: "Healthcare Program",
  },
];

export default function ImageGallery() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: isMobile ? "60px" : "0px", // Increased padding for mobile to show half cards
    slidesToShow: isMobile ? 1 : 5,
    speed: 500,
    focusOnSelect: true,
    arrows: false,
    dots: false,
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "60px", // This creates the half cards on sides
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "40px", // Smaller padding for very small screens
        },
      },
    ],
  };

  const formatViews = (views) => {
    return views;
  };

  const getSlideClass = (index) => {
    if (isMobile) {
      return index === currentSlide ? "center-slide" : "side-slide";
    } else {
      const isCenter = index === currentSlide;
      const isAdjacent =
        Math.abs(index - currentSlide) === 1 ||
        (currentSlide === 0 && index === imagesData.length - 1) ||
        (currentSlide === imagesData.length - 1 && index === 0);

      return isCenter
        ? "center-slide"
        : isAdjacent
        ? "adjacent-slide"
        : "far-slide";
    }
  };

  return (
    <div className="w-full bg-black overflow-hidden flex flex-col">
      <div className="md:max-w-7xl w-80 mx-auto h-[400px] md:h-[500px] mt-10">
        <Slider {...settings} ref={sliderRef}>
          {imagesData.map((image, index) => {
            const slideClass = getSlideClass(index);
            const isCenter = slideClass === "center-slide";

            return (
              <div key={image.id} className={isMobile ? "px-1" : "px-2"}>
                <motion.div
                  className={`relative transition-all duration-500 ${
                    isMobile
                      ? slideClass === "center-slide"
                        ? "h-80 w-full" // Full height for center card on mobile
                        : "h-64 w-full opacity-60" // Reduced height and opacity for side cards
                      : slideClass === "center-slide"
                      ? "h-96 w-full"
                      : slideClass === "adjacent-slide"
                      ? "h-80 w-full opacity-70"
                      : "h-64 w-full opacity-40"
                  }`}
                  animate={{
                    scale: isMobile
                      ? slideClass === "center-slide"
                        ? 1
                        : 0.85 // Slightly smaller scale for side cards on mobile
                      : slideClass === "center-slide"
                      ? 1
                      : slideClass === "adjacent-slide"
                      ? 0.9
                      : 0.8,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-900 shadow-lg">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Gradient overlay for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Content overlay */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-2">
                        <div className="bg-black bg-opacity-60 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                          👁 {formatViews(image.views)}
                        </div>
                      </div>
                      {isCenter && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2"
                        >
                          <p className="text-sm font-medium drop-shadow-lg">
                            {image.title}
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {/* Center indicator for mobile */}
                    {isMobile && isCenter && (
                      <motion.div
                        className="absolute top-4 right-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          ACTIVE
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </Slider>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center items-end mb-10 gap-4 md:mt-6">
        <motion.button
          onClick={() => sliderRef.current?.slickPrev()}
          className="hover:bg-gray-200 hover:bg-opacity-20 text-black px-4 py-2 rounded-full transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaAngleLeft className="w-10 h-5 text-orange-500 font-bold" />
        </motion.button>
        <motion.button
          onClick={() => sliderRef.current?.slickNext()}
          className="hover:bg-gray-200 hover:bg-opacity-20 text-black px-4 py-2 rounded-full transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaAngleRight className="w-10 h-5 text-orange-500 font-bold" />
        </motion.button>
      </div>

      {/* Mobile slide indicator */}
      
    </div>
  );
}
