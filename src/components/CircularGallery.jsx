import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const Example = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="flex pt-10 items-center justify-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-bold text-3xl md:text-5xl uppercase text-white tracking-wider"
        >
          Innovations Gallery
        </motion.span>
      </div>
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-62%"]);

  return (
    <section
      ref={targetRef}
      className="relative h-[300vh] bg-black"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 md:gap-12 pl-4 md:pl-8">
          {cards.map((card, index) => {
            return <Card card={card} index={index} key={card.id} />;
          })}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      
    </section>
  );
};

const Card = ({ card, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative h-[350px] w-[300px] md:h-[350px] md:w-[450px] overflow-hidden rounded-2xl cursor-pointer"
      whileHover={{ scale: 1.03 }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={card.url}
          alt={card.title}
          className="w-full h-full object-center"
          initial={{ scale: 1.1 }}
          whileHover={{
            scale: 1.15,
            transition: { duration: 0.5, ease: "easeOut" },
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Subtle shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%", transition: { duration: 0.8 } }}
        />
      </div>

      <motion.div
        className="absolute inset-0 z-10 flex flex-col justify-end p-6 text-white"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
      >
        <motion.h3
          className="text-3xl md:text-4xl font-bold uppercase mb-2 tracking-tight"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          viewport={{ once: true }}
        >
          {card.title}
        </motion.h3>

        <motion.p className="text-sm md:text-base opacity-0 group-hover:opacity-90 transition-opacity duration-500 mb-4 font-light">
          {card.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Example;

const cards = [
  {
    url: "/gallery/mla-eldho-shafi-cops.avif",
    title: "PROTEST",
    description:
      "A powerful visual narrative of social movement and collective voice.",
    id: 1,
  },
  {
    url: "/gallery/37162888491.png",
    title: "determination",
    description:
      "carrying the fire of determination in  hands",
    id: 2,
  },
  {
    url: "/gallery/shafi-parambil-speech (1).webp",
    title: "Leader",
    description:
      "A voice that inspires, a vision that leads.",
    id: 3,
  },
  {
    url: "/gallery/vt-balram-and-shafi-parambil.jpg",
    title: "victory",
    description:
      "Victory belongs to those who never give up.",
    id: 4,
  },
  {
    url: "/gallery/2025_8$LargePhoto20_Aug_2025_20082025141243.png",
    title: "with the leader",
    description: "When great leaders unite, vision turns into power",
    id: 5,
  },
  {
    url: "/gallery/shafi-parambil-vadakara.webp",
    title: "Love",
    description: "A leader’s greatest power is the people’s love.",
    id: 6,
  },
  {
    url: "/gallery/shafi.1709998994.png",
    title: "FUTURE",
    description: "The journey goes on, the spirit never stops.",
    id: 7,
  },
];
