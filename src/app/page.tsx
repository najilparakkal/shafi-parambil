"use client";

import Image from "next/image";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "../components/Header";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { InfiniteMovingCards } from "@/components/infinite-moving-cards";
import Journey from '../components/Journey'
import Impacts from '../components/Impacts'
import Gallery from '../components/Gallery'
import VideoGallery from '../components/VedioGallery'
import Footer from '../components/Footer'
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
      <main className="relative w-full mt-20 rounded-b-xl bg-black">
        <div className="relative w-full h-40 md:h-[calc(100vh-5rem)]">
          <Image
            src="/banner/shafi[1].png"
            alt="Background"
            fill
            className="object-cover"
            quality={100}
            priority
          />
        </div>
        <div
          className="w-full md:px-16 px-5 md:py-24 py-10 h-auto "
          id="about"
          style={{
            willChange: "transform",
            transform: "translate3d(0, 0, 0)",
          }}
        >
          <div className="flex h-full md:justify-between items-center  gap-8  flex-col md:flex-row ">
            <div className="flex flex-col flex-1 w-full  h-full">
              <AnimatedSection
                variants={fadeInRight}
                delay={0.2}
                className="w-full max-w-full self-center md:self-auto"
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src="/banner/വർഗ്ഗീയതയ്_ക്കെതിരെ യൂത്ത് കോൺഗ്രസ്_ ക്യാമ്പയിൻ[1].jpg"
                    alt="വർഗ്ഗീയതയ്_ക്കെതിരെ യൂത്ത് കോൺഗ്രസ്_ ക്യാമ്പയിൻ"
                    width={600}
                    height={600}
                    className="rounded-2xl shadow-2xl object-cover w-full md:h-98 h-40"
                    quality={100}
                    style={{
                      willChange: "transform",
                      backfaceVisibility: "hidden",
                    }}
                  />
                </motion.div>
              </AnimatedSection>
            </div>
            <AnimatedSection

              variants={fadeInLeft}
              className="flex-1 w-full  h-full"
            >
              <div className="h-full flex flex-col justify-between  md:text-sm text-xs alumni-sans leading-relaxed  text-center md:text-left">
                <h2 className="md:text-3xl text-xl font-semibold mb-5 text-white">
                  About Shafi Parambil
                </h2>
                <p className="">
                  Shafi Parambil is a dynamic and forward-thinking Member of the Kerala Legislative Assembly, representing the vibrant constituency of Palakkad since 2011. A strong voice of the youth and a dedicated public servant, Shafi has consistently championed education, employment, social justice, and inclusive growth
                </p>
                <p>
                  With a background in student politics and leadership roles in the Kerala Students Union (KSU), Shafi rose to prominence as a passionate advocate for democratic values and the rights of the common people. His commitment to transparency, accessibility, and grassroots engagement has earned him immense respect among constituents and colleagues alike.
                </p>
                <p>
                  Known for his clarity of thought, powerful oratory, and progressive stance on key issues, Shafi stands as a beacon of hope for a new generation of political leadership. Whether it’s strengthening local infrastructure, ensuring quality education, promoting youth welfare, or standing up for secularism and equality, his work reflects a deep-rooted passion to serve.
                </p>
                <p>
                  As a modern politician with a people-first approach, Shafi Parambil combines vision with action — leading by example, listening to the voices of the people, and striving every day to build a better, inclusive Kerala.
                </p>

              </div>
            </AnimatedSection>


          </div>
        </div>


      </main>


      <div className="md:h-autoflex h-auto flex-col py-10 antialiased bg-white  dark:bg-grid-white/[0.05] md:items-center  md:justify-center relative overflow-hidden">

        <InfiniteMovingCards
          items={images}
          direction="right"
          speed="normal"
        />

        <InfiniteMovingCards
          items={images}
          direction="left"
          speed="normal"
        />
      </div>
      <Journey />
      <Impacts />
      <Gallery />
      <VideoGallery />
      <Footer />
      <SpeedInsights />
    </div>
  );
}
