"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const photosData = [
  {
    id: 1,
    src: "/gallery/Screenshot 2025-06-16 at 3.32.11 PM 1.png",
    alt: "Campaign event",
    thumbnail: "/gallery/Screenshot 2025-06-16 at 3.32.11 PM 1.png",
  },
  {
    id: 2,
    src: "/gallery/Screenshot 2025-06-16 at 3.32.11 PM 3.png",
    alt: "Public speech",
    thumbnail: "/gallery/Screenshot 2025-06-16 at 3.32.11 PM 3.png",
  },
  {
    id: 3,
    src: "/gallery/Screenshot 2025-06-16 at 3.32.11 PM 4.png",
    alt: "Team meeting",
    thumbnail: "/gallery/Screenshot 2025-06-16 at 3.32.11 PM 4.png",
  },
];

const videosData = [
  {
    id: 1,
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Political Speech 2023",
  },
  {
    id: 2,
    youtubeUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    title: "Community Development",
  },
  {
    id: 3,
    youtubeUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    title: "Educational Initiative",
  },
  {
    id: 4,
    youtubeUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    title: "Healthcare Program",
  },
  {
    id: 5,
    youtubeUrl: "https://www.youtube.com/watch?v=tgbNymZ7vqY",
    title: "Infrastructure Development",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const tabVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

const mainContentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const thumbnailVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.9,
    transition: { duration: 0.1 },
  },
};

// Helper function to extract YouTube ID from URL
const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function Gallery() {
    const [activeTab, setActiveTab] = useState("photos");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const sliderRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1024);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    const currentData =
      activeTab === "photos"
        ? photosData
        : videosData.map((video) => ({
            ...video,
            youtubeId: getYouTubeId(video.youtubeUrl),
            thumbnail: `https://img.youtube.com/vi/${getYouTubeId(
              video.youtubeUrl
            )}/mqdefault.jpg`,
          }));
  
    useEffect(() => {
      setSelectedIndex(0);
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0);
      }
    }, [activeTab]);
  
    const handleThumbnailClick = (index) => {
      setSelectedIndex(index);
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(index);
      }
    };
  
    const handleSlidePrev = () => {
      if (sliderRef.current) {
        sliderRef.current.slickPrev();
      }
    };
  
    const handleSlideNext = () => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    };
  
    const renderMainContent = () => {
      const selectedItem = currentData[selectedIndex];
      if (!selectedItem)
        return <div className="w-full h-full bg-gray-200 rounded-2xl"></div>;
  
      if (activeTab === "photos") {
        return (
          <AnimatePresence mode="wait">
            <motion.div
              key={`photo-${selectedItem.id}`}
              variants={mainContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full h-full rounded-2xl overflow-hidden bg-gray-100"
            >
              <Image
                src={selectedItem.src || "/placeholder.svg"}
                alt={selectedItem.alt}
                width={600}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        );
      } else {
        return (
          <AnimatePresence mode="wait">
            <motion.div
              key={`video-${selectedItem.id}`}
              variants={mainContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full h-full rounded-2xl overflow-hidden bg-black"
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedItem.youtubeId}?autoplay=0`}
                title={selectedItem.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </AnimatePresence>
        );
      }
    };
  
    const desktopSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      arrows: false,
      centerMode: true,
      centerPadding: "0px",
      focusOnSelect: true,
      beforeChange: (current, next) => setSelectedIndex(next),
    };
  
    const mobileSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      vertical: false,
      arrows: false,
      centerMode: true,
      centerPadding: "0px",
      focusOnSelect: true,
      beforeChange: (current, next) => setSelectedIndex(next),
      responsive: [
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
            centerMode: true,
          },
        },
      ],
    };
  
    return (
      <motion.div
        className="w-full px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-10">
          <motion.h2
            className="text-3xl font-bold text-[#7C7C7C] mb-4"
            variants={headingVariants}
          >
            Gallery
          </motion.h2>
          <motion.div
            className="flex justify-center text-sm font-semibold gap-0"
            variants={tabVariants}
          >
            <motion.button
              onClick={() => setActiveTab("videos")}
              className={`px-10 py-2 rounded-l-xl transition-colors ${
                activeTab === "videos"
                  ? "bg-[#575757] text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Videos
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("photos")}
              className={`px-10 py-2 rounded-r-xl transition-colors ${
                activeTab === "photos"
                  ? "bg-[#575757] text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Photos
            </motion.button>
          </motion.div>
        </div>
  
        {isMobile ? (
          // Mobile layout - vertical stack
          <div className="flex flex-col gap-6 max-w-6xl mx-auto">
            {/* Main content on top */}
            <div className="h-64 sm:h-80 w-full">{renderMainContent()}</div>
  
            {/* Slider at bottom with horizontal navigation */}
            <div className="relative">
              <motion.button
                onClick={handleSlidePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-1 rounded-full hover:bg-gray-300 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaAngleLeft className="w-5 h-5 text-orange-500 font-bold" />
              </motion.button>
  
              <div className="px-8">
                <Slider {...mobileSettings} ref={sliderRef}>
                  {currentData.map((item, index) => (
                    <div key={item.id} className="px-2">
                      <motion.div
                        className={`relative cursor-pointer transition-all duration-300 rounded-xl overflow-hidden ${
                          selectedIndex === index
                            ? "ring-3 ring-[#7C7C7C] md:scale-105"
                            : "hover:scale-102"
                        }`}
                        onClick={() => handleThumbnailClick(index)}
                        variants={thumbnailVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        whileTap="tap"
                        transition={{ delay: index * 0.1 }}
                      >
                        {activeTab === "photos" ? (
                          <Image
                            src={item.thumbnail || item.src}
                            alt={item.alt}
                            width={160}
                            height={120}
                            className="w-full md:h-24 h-20 object-cover"
                          />
                        ) : (
                          <img
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full md:h-24 h-20 object-cover"
                            loading="lazy"
                          />
                        )}
                      </motion.div>
                    </div>
                  ))}
                </Slider>
              </div>
  
              <motion.button
                onClick={handleSlideNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-1 rounded-full hover:bg-gray-300 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaAngleRight className="w-5 h-5 text-orange-500 font-bold" />
              </motion.button>
            </div>
          </div>
        ) : (
          // Desktop layout - side by side
          <motion.div
            className="flex gap-6 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex-1 h-96">{renderMainContent()}</div>
  
            <motion.div
              className="w-48 h-96 flex flex-col justify-between"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.button
                onClick={handleSlidePrev}
                className="self-center p-1 rounded-full hover:bg-gray-300 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaAngleUp className="w-10 h-5 text-orange-500 font-bold" />
              </motion.button>
  
              <motion.div
                className="flex-1 my-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Slider {...desktopSettings} ref={sliderRef}>
                  {currentData.map((item, index) => (
                    <div key={item.id} className="px-2">
                      <motion.div
                        className={`relative cursor-pointer transition-all duration-300 rounded-xl overflow-hidden ${
                          selectedIndex === index
                            ? "ring-3 ring-[#7C7C7C] scale-105"
                            : "hover:scale-102"
                        }`}
                        onClick={() => handleThumbnailClick(index)}
                        variants={thumbnailVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        whileTap="tap"
                        transition={{ delay: index * 0.1 }}
                      >
                        {activeTab === "photos" ? (
                          <Image
                            src={item.thumbnail || item.src}
                            alt={item.alt}
                            width={160}
                            height={120}
                            className="w-full h-24 object-cover"
                          />
                        ) : (
                          <img
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-24 object-cover"
                            loading="lazy"
                          />
                        )}
                      </motion.div>
                    </div>
                  ))}
                </Slider>
              </motion.div>
  
              <motion.button
                onClick={handleSlideNext}
                className="self-center p-1 rounded-full hover:bg-gray-300 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaAngleDown className="w-10 h-5 text-orange-500 font-bold" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    );
  }