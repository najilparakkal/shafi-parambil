"use client";

import { ThreeDMarquee } from "./infinite-moving-cards";

export function ThreeDMarqueeDemo() {
  const images = [
    "/gallery/20TVTVKSUMARCH (1).jpeg",
    "/gallery/20TVTVKSUMARCH.jpeg",
    "/gallery/At-Vadakara--Shafi-Parambil-was-up-against-KK-Shai_1720550386498.avif",
    " /gallery/congress-candidate-from-vatakara-constituency-shafi-parambil-300315193-16x9_0.avif",
    " /gallery/GJbJ9K_WkAAEU2d.jpg_large ",
    "/gallery/hq720.jpg",
    "/gallery/images (1).jpeg",
    "/gallery/images (2).jpeg",
    "/gallery/images (3).jpeg",
    " /gallery/images (4).jpeg",
    "/gallery/images (5).jpeg",
    " /gallery/images (6).jpeg",
    "/gallery/images (7).jpeg ",
    "/gallery/images (8).jpeg ",
    "/gallery/images.jpeg ",
    "/gallery/mla-eldho-shafi-cops.avif",
    "/gallery/mqdefault.jpg ",
    "/gallery/palakkad1.avif",
    "/gallery/PTI06_24_2024_000276B.jpg",
    " /gallery/Screenshot 2025-06-16 at 3.32.11 PM 1.png",
    "/gallery/Screenshot 2025-06-16 at 3.32.11 PM 3.png ",
    "/gallery/Screenshot 2025-06-16 at 3.32.11 PM 4.png",
    "/gallery/shafi-kalashakkottu-mob.webp",
    " /gallery/shafi-parambil-congress.1.3010840.webp",
    "/gallery/shafi-parambil-speech.jpg",
    "/gallery/shafi-parambil-speech.webp",
    " /gallery/shafi-parambil.1.2995720.webp",
    " /gallery/shafi-parambil.avif ",
    "/gallery/shafi-parambil.webp",
    "/gallery/Shafi-Sharjah1-1713932867.webp",
    
  ];
  return (
    <div className="mx-auto my-10 max-w-7xl rounded-3xl">
      <ThreeDMarquee images={images} />
    </div>
  );
}
