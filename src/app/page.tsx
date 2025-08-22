"use client";

import Image from "next/image";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "../components/Header";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Journey from '../components/Journey'
import Impacts from '../components/Impacts'
import Gallery from '../components/Gallery'
import VideoGallery from '../components/VedioGallery'
import { ThreeDMarqueeDemo } from '../components/ThreeDMarqueeDemo'
import Footer from '../components/Footer'
import About from '../components/About'
import Example from '../components/CircularGallery'

const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 60,
    transform: "translate3d(0, 60px, 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    transform: "translate3d(0, 0, 0)",
  },
};

const fadeInLeft = {
  hidden: {
    opacity: 0,
    x: -60,
    transform: "translate3d(-60px, 0, 0)",
  },
  visible: {
    opacity: 1,
    x: 0,
    transform: "translate3d(0, 0, 0)",
  },
};

const fadeInRight = {
  hidden: {
    opacity: 0,
    x: 60,
    transform: "translate3d(60px, 0, 0)",
  },
  visible: {
    opacity: 1,
    x: 0,
    transform: "translate3d(0, 0, 0)",
  },
};

const images = [
  {
    image: "/banner/വർഗ്ഗീയതയ്_ക്കെതിരെ യൂത്ത് കോൺഗ്രസ്_ ക്യാമ്പയിൻ[1].jpg"
  },
  {
    image: "/banner/വർഗ്ഗീയതയ്_ക്കെതിരെ യൂത്ത് കോൺഗ്രസ്_ ക്യാമ്പയിൻ[1].jpg"
  },
  {
    image: "/banner/വർഗ്ഗീയതയ്_ക്കെതിരെ യൂത്ത് കോൺഗ്രസ്_ ക്യാമ്പയിൻ[1].jpg"
  },
  {
    image: "/banner/വർഗ്ഗീയതയ്_ക്കെതിരെ യൂത്ത് കോൺഗ്രസ്_ ക്യാമ്പയിൻ[1].jpg"
  },
  {
    image: "/banner/വർഗ്ഗീയതയ്_ക്കെതിരെ യൂത്ത് കോൺഗ്രസ്_ ക്യാമ്പയിൻ[1].jpg"
  },
  {
    image: "/banner/വർഗ്ഗീയതയ്_ക്കെതിരെ യൂത്ത് കോൺഗ്രസ്_ ക്യാമ്പയിൻ[1].jpg"
  },
  {
    image: "/banner/വർഗ്ഗീയതയ്_ക്കെതിരെ യൂത്ത് കോൺഗ്രസ്_ ക്യാമ്പയിൻ[1].jpg"
  },
  {
    image: "/banner/വർഗ്ഗീയതയ്_ക്കെതിരെ യൂത്ത് കോൺഗ്രസ്_ ക്യാമ്പയിൻ[1].jpg"
  },

];

const AnimatedSection = ({
  children,
  variants = fadeInUp,
  delay = 0,
  className = "",
}: any) => {
  const ref = useRef(null);




  const isInView = useInView(ref, {
    margin: "-10% 0px -10% 0px",
    amount: 0.3,
    once: true,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      style={{
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
      }}
    >
      {children}
    </motion.div>
  );
};
export default function Home() {

  useEffect(() => {
    // Check if we're coming from a section link click
    const fromSectionLink = sessionStorage.getItem("fromSectionLink");
    const sectionId = sessionStorage.getItem("sectionToScroll");

    if (fromSectionLink && sectionId) {
      // Clear the flags immediately
      sessionStorage.removeItem("fromSectionLink");
      sessionStorage.removeItem("sectionToScroll");

      // Scroll to the section after a brief delay
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          // First scroll to top to ensure proper positioning
          window.scrollTo(0, 0);
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      // Normal page load - scroll to top
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <div className=" relative w-full flex flex-col">
      <Header />
      <main className="relative w-full mt-20  bg-black">
        <div className="relative w-full h-60 md:h-[calc(100vh-5rem)]">
          <Image
            src="/banner/shafi[1].png"
            alt="Background"
            fill
            className="object-fill"
            quality={100}
            priority
          />
        </div>
        <About />



      </main>


      <div className="md:h-auto flex h-auto flex-col py-10 antialiased bg-black  dark:bg-grid-white/[0.05] md:items-center  md:justify-center relative overflow-hidden">
        <ThreeDMarqueeDemo />

        {/* <InfiniteMovingCards
          items={images}
          direction="right"
          speed="normal"
        />

        <InfiniteMovingCards
          items={images}
          direction="left"
          speed="normal"
        /> */}
      </div>
      <Journey />
      <div >
        <Example />
      </div>
      {/* <Impacts /> */}
      {/* <Gallery /> */}
      <VideoGallery />
      <Footer />
      <SpeedInsights />

      <div className="h-auto relative">

      </div>
    </div>
  );
}
