"use client";

import { useRef } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const impactData = [
  {
    id: 1,
    title: "Enter to political",
    description: "Constituency of Palakkad since 2016. ",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    title: "Enter to political",
    description: "Constituency of Palakkad since 2016. ",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    title: "Enter to political",
    description: "Constituency of Palakkad since 2016. ",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    title: "Educational Reform",
    description: "Implemented comprehensive educational policies ",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    title: "Healthcare Initiative",
    description: "Launched mobile health units reaching remote areas ",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 6,
    title: "Infrastructure Development",
    description: "Spearheaded major infrastructure projects ",
    image: "/placeholder.svg?height=80&width=80",
  },
];

export default function Impacts() {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true, // ← enable auto sliding
    autoplaySpeed: 2000, // ← time in ms between slides (3 seconds)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div className="w-full  py-8">
      <div className="flex items-center justify-center w-full md:mb-5 mb-4 relative">
        <div className="h-[1px] bg-[#282D27] w-full"></div>
        <h2 className="absolute bg-[#282D27] text-white md:px-12 px-9  py-2 md:py-3 rounded-t-3xl md:text-lg text-sm font-semibold">
          Impacts
        </h2>

        <div className="absolute md:right-4 right-2  flex gap-2">
          <button
            onClick={handlePrevious}
            className="w-8 h-8 bg-[#282D27] hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8  bg-[#282D27] hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="px-4">
        <div className="bg-[#282D27] rounded-2xl md:p-8 p-4 relative">
          <div className="md:px-4">
            <Slider ref={sliderRef} {...settings}>
              {impactData.map((impact) => (
                <div key={impact.id} className="px-3">
                  <div className="bg-[linear-gradient(to_right,white_50%,#282D27_50%)] rounded-[9999px_0.75rem_0.75rem_9999px] pl-1 md:h-28 h-20 flex items-start md:gap-4 gap-2 shadow-sm">
                    <div className="flex h-full justify-center items-center">
                      <div className="md:w-24 w-16 h-16 md:h-24 bg-[#282D27] rounded-full flex items-center justify-center overflow-hidden">
                        <Image
                          src={impact.image || "/placeholder.svg"}
                          alt={impact.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-r-2xl min-w-0 justify-center h-full flex flex-col ">
                      <h3 className="md:text-base text-sm font-semibold text-gray-900 md:mb-2">
                        {impact.title}
                      </h3>
                      <p className="text-xs text-gray-600 ">
                        {impact.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className="w-full md:mt-8  mt-4" id="gallery">
        <div className="md:h-[1px] h-[0.5px] bg-[#282D27] w-full"></div>
      </div>
    </div>
  );
}
