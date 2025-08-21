"use client";

import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

// YouTube Shorts data with thumbnail support
const videosData = [
  {
    id: 1,
    youtubeId: "pdI-yQlOMbk",
    views: "332K",
    title: "Campaign Rally",
    thumbnail: "https://img.youtube.com/vi/pdI-yQlOMbk/maxresdefault.jpg",
  },
  {
    id: 2,
    youtubeId: "Hwwx4ALKeqw",
    views: "484K",
    title: "Community Meeting",
    thumbnail: "https://img.youtube.com/vi/Hwwx4ALKeqw/maxresdefault.jpg",
  },
  {
    id: 3,
    youtubeId: "nPDnaIZ9_kU",
    views: "256K",
    title: "Public Speech",
    thumbnail: "https://img.youtube.com/vi/nPDnaIZ9_kU/maxresdefault.jpg",
  },
  {
    id: 4,
    youtubeId: "SvDQGeVxCLc",
    views: "189K",
    title: "Development Project",
    thumbnail: "https://img.youtube.com/vi/SvDQGeVxCLc/maxresdefault.jpg",
  },
  {
    id: 5,
    youtubeId: "k2AXuUgTMiY",
    views: "423K",
    title: "Educational Initiative",
    thumbnail: "https://img.youtube.com/vi/k2AXuUgTMiY/maxresdefault.jpg",
  },
  {
    id: 6,
    youtubeId: "YNLlUDhWfMU",
    views: "367K",
    title: "Healthcare Program",
    thumbnail: "https://img.youtube.com/vi/YNLlUDhWfMU/maxresdefault.jpg",
  },
];

export default function YouTubeShortsGallery() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const sliderRef = useRef(null);
  const iframeRefs = useRef([]);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Set up Intersection Observer to detect when component is in view
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsComponentVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // YouTube iframe API functions
  const postMessageToIframe = (iframe, action) => {
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        `{"event":"command","func":"${action}","args":""}`,
        "*"
      );
    }
  };

  const playVideo = (index) => {
    const iframe = iframeRefs.current[index];
    if (iframe) {
      // Change src to autoplay
      const newSrc = iframe.src.replace("autoplay=0", "autoplay=1");
      iframe.src = newSrc;

      // Also use YouTube API to play
      postMessageToIframe(iframe, "playVideo");
      setIsPlaying(true);
    }
  };

  const pauseVideo = (index) => {
    const iframe = iframeRefs.current[index];
    if (iframe) {
      // Change src to not autoplay
      const newSrc = iframe.src.replace("autoplay=1", "autoplay=0");
      iframe.src = newSrc;

      // Also use YouTube API to pause
      postMessageToIframe(iframe, "pauseVideo");
      setIsPlaying(false);
    }
  };

  // Auto-play/pause based on component visibility
  useEffect(() => {
    if (isComponentVisible && isPlaying) {
      playVideo(currentSlide);
    } else {
      pauseVideo(currentSlide);
    }
  }, [isComponentVisible, currentSlide]);

  const handleSlideClick = (index) => {
    // If clicking the current slide, toggle play/pause
    if (index === currentSlide) {
      if (isPlaying) {
        pauseVideo(index);
      } else {
        playVideo(index);
      }
    } else {
      // If clicking a different slide, center it and pause current video
      pauseVideo(currentSlide);
      sliderRef.current?.slickGoTo(index);
      setCurrentSlide(index);
      // Auto-play when switching to new slide
      setTimeout(() => playVideo(index), 500);
    }
  };

  const getYouTubeEmbedUrl = (youtubeId, autoplay = 0) => {
    return `https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplay}&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;
  };

  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: isMobile ? "60px" : "0px",
    slidesToShow: isMobile ? 1 : 5,
    speed: 500,
    focusOnSelect: true,
    arrows: false,
    dots: false,
    beforeChange: (current, next) => {
      // Pause the current video when sliding
      pauseVideo(current);
      setCurrentSlide(next);
    },
    afterChange: (current) => {
      // Auto-play the new slide after change completes
      setTimeout(() => playVideo(current), 300);
    },
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
          centerPadding: "60px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  };

  const getSlideClass = (index) => {
    if (isMobile) {
      return index === currentSlide ? "center-slide" : "side-slide";
    } else {
      const isCenter = index === currentSlide;
      const isAdjacent =
        Math.abs(index - currentSlide) === 1 ||
        (currentSlide === 0 && index === videosData.length - 1) ||
        (currentSlide === videosData.length - 1 && index === 0);

      return isCenter
        ? "center-slide"
        : isAdjacent
        ? "adjacent-slide"
        : "far-slide";
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full bg-black overflow-hidden md:py-10 flex flex-col pb-12"
    >
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Shorts</h2>
        <p className="text-gray-400 mt-2">Watch the latest News Clips</p>
      </div>

      <div className=" h-[400px] md:h-[400px]">
        <Slider {...settings} ref={sliderRef}>
          {videosData.map((video, index) => {
            const slideClass = getSlideClass(index);
            const isCenter = slideClass === "center-slide";

            return (
              <div key={video.id} className={isMobile ? "px-1" : "px-2"}>
                <motion.div
                  className={`relative transition-all duration-500 ${
                    isMobile
                      ? slideClass === "center-slide"
                        ? "h-80 w-full"
                        : "h-64  w-full opacity-60"
                      : slideClass === "center-slide"
                      ? "h-96 w-full"
                      : slideClass === "adjacent-slide"
                      ? "h-80 mt-8 w-full opacity-30"
                      : "h-64 mt-10 w-full opacity-10"
                  }`}
                  animate={{
                    scale: isMobile
                      ? slideClass === "center-slide"
                        ? 1
                        : 0.85
                      : slideClass === "center-slide"
                      ? 1
                      : slideClass === "adjacent-slide"
                      ? 0.9
                      : 0.8,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onClick={() => handleSlideClick(index)}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-900 shadow-lg">
                    {/* YouTube iframe for center slide */}
                    {isCenter ? (
                      <iframe
                        ref={(el) => (iframeRefs.current[index] = el)}
                        src={getYouTubeEmbedUrl(
                          video.youtubeId,
                          isPlaying ? 1 : 0
                        )}
                        className="absolute top-0 left-0 w-full h-full z-20"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video.title}
                      />
                    ) : (
                      // Thumbnail for non-center slides
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="absolute top-0 left-0 w-full h-full object-cover z-10"
                        loading="lazy"
                      />
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Pause button overlay for center slide */}
                    {isCenter && isPlaying && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center z-30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          pauseVideo(index);
                        }}
                      ></motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </Slider>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center items-center mt-8 gap-4">
        <motion.button
          onClick={() => sliderRef.current?.slickPrev()}
          className="bg-gray-900 h text-gray-700 p-3 rounded-full transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaAngleLeft className="w-5 h-5" />
        </motion.button>

        <motion.button
          onClick={() => sliderRef.current?.slickNext()}
          className="bg-gray-900 h text-gray-700 p-3 rounded-full transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaAngleRight className="w-5 h-5" />
        </motion.button>
      </div>

      {isMobile && (
        <div className="flex justify-center gap-2 mt-6">
          {videosData.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-red-500 w-6" : "bg-gray-600"
              }`}
              animate={{
                scale: index === currentSlide ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
