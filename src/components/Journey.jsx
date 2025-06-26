"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const journeyData = {
  2007: {
    title: "Enter to political",
    image: "/banner/E0ZctVlUUAMjLw6[1].jpg",
    content: `Jyoti Basu was a dynamic and forward-thinking Member of the Kerala Legislative Assembly, representing the Ollur constituency of Thrissur since 2016. A true daughter of the land, she was born and brought up in Ollur, where she developed a deep connection with the local community and culture.

With a background in student politics and leadership roles in the Kerala Students Union (KSU), Jyoti brought a fresh perspective to governance. Her commitment to transparency, accessibility, and grassroots engagement has helped her connect with people across constituencies and communities alike.

Known for her proactive approach to addressing local issues, Jyoti has been instrumental in bringing development projects to her constituency. Whether it's strengthening infrastructure, improving healthcare facilities, or enhancing educational opportunities, she has consistently worked to improve the lives of her constituents.

Looking to the future, Jyoti is committed to building a better tomorrow for the people of Kerala, focusing on the needs of the people, and driving every day to build a better Kerala State.`,
  },
  2008: {
    title: "Educational Initiatives",
    image: "/banner/E0ZctVlUUAMjLw6[1].jpg",
    content:
      "In 2008, focus shifted to educational reforms and initiatives. Major programs were launched to improve literacy rates and educational infrastructure across the constituency. New schools were established and existing facilities were upgraded to provide better learning environments for students.",
  },
  2009: {
    title: "Healthcare Development",
    image: "/banner/E0ZctVlUUAMjLw6[1].jpg",
    content:
      "2009 marked significant progress in healthcare development. New medical facilities were established and existing hospitals were modernized. Mobile health units were introduced to reach remote areas, ensuring healthcare accessibility for all residents.",
  },
  2010: {
    title: "Infrastructure Growth",
    image: "/banner/E0ZctVlUUAMjLw6[1].jpg",
    content:
      "Infrastructure development took center stage in 2010. Major road construction projects were initiated, bridges were built to connect remote areas, and public transportation systems were improved to enhance connectivity across the region.",
  },
  2011: {
    title: "Economic Empowerment",
    image: "/banner/E0ZctVlUUAMjLw6[1].jpg",
    content:
      "2011 focused on economic empowerment initiatives. Small business support programs were launched, skill development centers were established, and microfinance schemes were introduced to promote entrepreneurship and self-employment opportunities.",
  },
  2012: {
    title: "Environmental Conservation",
    image: "/banner/E0ZctVlUUAMjLw6[1].jpg",
    content:
      "Environmental conservation became a priority in 2012. Tree plantation drives were organized, waste management systems were improved, and renewable energy projects were initiated to promote sustainable development and environmental protection.",
  },
  2013: {
    title: "Digital Transformation",
    image: "/banner/E0ZctVlUUAMjLw6[1].jpg",
    content:
      "2013 witnessed the beginning of digital transformation initiatives. E-governance systems were implemented, digital literacy programs were launched, and technology centers were established to bridge the digital divide and improve service delivery.",
  },
};

const years = Object.keys(journeyData).map(Number);

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const imageVariants = {
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

const dotVariants = {
  inactive: {
    scale: 1,
    backgroundColor: "#00520E",
    transition: { duration: 0.2 },
  },
  active: {
    scale: 1.2,
    backgroundColor: "#FBFF00",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const textVariants = {
  inactive: {
    color: "#ffffff",
    transition: { duration: 0.2 },
  },
  active: {
    color: "#FBFF00",
    transition: { duration: 0.3 },
  },
};

export default function Journey() {
  const [selectedYear, setSelectedYear] = useState(2007);

  const currentData = journeyData[selectedYear];

  return (
    <motion.div
      id="journey"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex md:pr-0 pr-10 items-top w-full mt-8">
        <div className="w-full flex">
          <motion.div
            className="h-[2px] bg-black w-[80%]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.h2
            className="text-white bg-black text-lg font-bold px-8 py-1.5 rounded-l-xl rounded-br-xl -ml-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Journey
          </motion.h2>
        </div>
      </div>

      <div className="md:py-10 py-5 px-4">
        <motion.div
          className="bg-[#00520E] rounded-lg  md:p-6 max-h-[500px]  overflow-auto custom-scrollbar"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="md:px-8 px-0 pb-6">
            <div className="relative">
              <motion.div
                className="absolute md:top-4 top-4.5 left-0 right-0 h-0.5 bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              />

              {/* Horizontal scroll container */}
              <div className="mt-4 relative overflow-x-auto scrollbar-hidden custom-scrollbar">
                <div className="flex   h-16  justify-center items-center space-x-6 w-max mx-auto px-2 md:w-full md:justify-between">
                  {years.map((year, index) => (
                    <motion.div
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className="flex cursor-pointer flex-col items-center"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    >
                      <motion.button
                        className="w-3 h-3 rounded-full border-2 border-white relative z-10"
                        variants={dotVariants}
                        animate={selectedYear === year ? "active" : "inactive"}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      />
                      <motion.span
                        className="mt-2 md:text-sm text-xs font-medium whitespace-nowrap text-white"
                        variants={textVariants}
                        animate={selectedYear === year ? "active" : "inactive"}
                      >
                        {year}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:px-8 px-3 pb-8 h-full">
            <div className="md:flex md:flex-row flex flex-col  items-center md:gap-8 gap-3 md:items-start w-full h-full">
              <div className="flex-shrink-0 md:w-[40%] w-[80%] h-60 md:h-88 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`image-${selectedYear}`}
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full h-full"
                  >
                    <Image
                      src={currentData.image || "/placeholder.svg"}
                      alt={`${selectedYear} - ${currentData.title}`}
                      width={320}
                      height={240}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex-1 flex flex-col md:items-center md:text-start text-center text-white md:w-[60%] w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${selectedYear}`}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center"
                  >
                    <motion.h2
                      className="md:text-2xl text-base font-bold md:py-6 py-3"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      {currentData.title}
                    </motion.h2>
                    <motion.div
                      className="text-xs leading-relaxed md:space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {currentData.content
                        .split("\n\n")
                        .map((paragraph, index) => (
                          <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.3 + index * 0.1,
                            }}
                          >
                            {paragraph}
                          </motion.p>
                        ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
