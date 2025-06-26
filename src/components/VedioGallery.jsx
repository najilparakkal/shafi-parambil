"use client"

import { useState, useRef, useEffect } from "react"
import Slider from "react-slick"
import { motion } from "framer-motion"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

const videosData = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dkwywjnqs/video/upload/v1750945028/Shafi_Parambil_Motivational_Speech_shafiparambil_shorts_trending_motivation_youtube_az7tpw.mp4",
    views: "332K",
    title: "Campaign Rally",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dkwywjnqs/video/upload/v1750945082/videoplayback_1_w4h5au.mp4",
    views: "484K",
    title: "Community Meeting",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dkwywjnqs/video/upload/v1750944817/videoplayback_gijlmr.mp4",
    views: "256K",
    title: "Public Speech",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dkwywjnqs/video/upload/v1750945082/videoplayback_1_w4h5au.mp4",
    views: "189K",
    title: "Development Project",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dkwywjnqs/video/upload/v1750944817/videoplayback_gijlmr.mp4",
    views: "423K",
    title: "Educational Initiative",
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dkwywjnqs/video/upload/v1750945028/Shafi_Parambil_Motivational_Speech_shafiparambil_shorts_trending_motivation_youtube_az7tpw.mp4",
    views: "367K",
    title: "Healthcare Program",
  },
]

export default function VideoGallery() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(new Array(videosData.length).fill(false))
  const sliderRef = useRef(null)
  const videoRefs = useRef([])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleSlideClick = (index) => {
    // If clicking the current slide, toggle play/pause
    if (index === currentSlide) {
      const video = videoRefs.current[index]
      if (video) {
        if (video.paused) {
          video.play()
            .then(() => setIsPlaying(true))
            .catch(console.error)
        } else {
          video.pause()
          setIsPlaying(false)
        }
      }
    } else {
      // If clicking a different slide, center it and pause current video
      sliderRef.current?.slickGoTo(index)
      setCurrentSlide(index)
      setIsPlaying(false)
    }
  }

  const handleVideoEnded = (index) => {
    if (index === currentSlide) {
      setIsPlaying(false)
    }
  }

  const handleVideoLoaded = (index) => {
    setVideoLoaded((prev) => {
      const newLoaded = [...prev]
      newLoaded[index] = true
      return newLoaded
    })
  }

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
      if (videoRefs.current[current]) {
        videoRefs.current[current].pause()
      }
      setCurrentSlide(next)
      setIsPlaying(false)
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
  }

  const formatViews = (views) => {
    return views
  }

  const getSlideClass = (index) => {
    if (isMobile) {
      return index === currentSlide ? "center-slide" : "side-slide"
    } else {
      const isCenter = index === currentSlide
      const isAdjacent =
        Math.abs(index - currentSlide) === 1 ||
        (currentSlide === 0 && index === videosData.length - 1) ||
        (currentSlide === videosData.length - 1 && index === 0)

      return isCenter ? "center-slide" : isAdjacent ? "adjacent-slide" : "far-slide"
    }
  }

  return (
    <div className="w-full bg-black overflow-hidden flex flex-col">
      <div className="md:max-w-7xl max-w-80 mx-auto h-[400px] md:h-[400px] mt-10">
        <Slider {...settings} ref={sliderRef}>
          {videosData.map((video, index) => {
            const slideClass = getSlideClass(index)
            const isCenter = slideClass === "center-slide"

            return (
              <div key={video.id} className={isMobile ? "px-1" : "px-2"}>
                <motion.div
                  className={`relative transition-all duration-500 ${
                    isMobile
                      ? slideClass === "center-slide"
                        ? "h-80 w-full"
                        : "h-64 w-full opacity-60"
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
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={video.src}
                      className="w-full h-full object-cover"
                    //   muted
                      playsInline
                      preload="metadata"
                      onLoadedData={() => handleVideoLoaded(index)}
                      onEnded={() => handleVideoEnded(index)}
                      onPlay={() => isCenter && setIsPlaying(true)}
                      onPause={() => isCenter && setIsPlaying(false)}
                      poster={`${video.src.replace(".mp4", ".jpg")}`}
                    />

                    {/* Loading indicator */}
                    {!videoLoaded[index] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                        <motion.div
                          className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Content overlay */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-2">
                        <div className="bg-black bg-opacity-60 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                          👁 {formatViews(video.views)}
                        </div>
                      </div>
                      {isCenter && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-2">
                          <p className="text-sm font-medium drop-shadow-lg">{video.title}</p>
                        </motion.div>
                      )}
                    </div>

                    {/* Play/Pause indicator */}
                    {isCenter && (
                      <motion.div
                        className="absolute top-4 right-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            isPlaying ? "bg-red-500 text-white" : "bg-gray-500 text-white"
                          }`}
                        >
                          {isPlaying ? "PLAYING" : "PAUSED"}
                        </div>
                      </motion.div>
                    )}

                    {/* Play button for non-playing center video */}
                    {isCenter && !isPlaying && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[12px] border-l-black border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            )
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
      {isMobile && (
        <div className="flex justify-center gap-2 mb-6">
          {videosData.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-orange-500 w-6" : "bg-gray-400"
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
  )
}