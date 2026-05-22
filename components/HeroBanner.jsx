import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info } from "lucide-react";

const HeroBanner = ({ trendingAnime }) => {
  const [index, setIndex] = useState(0);

  // Prevent crash before data loads
  if (!trendingAnime || trendingAnime.length === 0) {
    return null;
  }

  // Auto-scroll slides
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % trendingAnime.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [trendingAnime.length]);

  const current = trendingAnime[index];

  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 h-full w-full"
        >
          {/* Background */}
          <img
            src={current.bannerImage || current.coverImage.extraLarge}
            alt={current.title.english || current.title.romaji}
            className="h-full w-full object-cover object-top"
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-16 md:bottom-28 left-4 md:left-12 max-w-2xl z-10">
            
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-7xl font-black tracking-tight leading-none mb-5"
            >
              {current.title.english || current.title.romaji}
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-xl"
            >
              <p
                className="text-sm md:text-base text-neutral-300 line-clamp-3 leading-relaxed bg-black/20 backdrop-blur-md p-3 rounded-xl"
                dangerouslySetInnerHTML={{
                  __html: current.description || "",
                }}
              />
            </motion.div>

            {/* Genres */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-2 mt-5"
            >
              {current.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1 text-xs font-semibold text-purple-300 backdrop-blur-md"
                >
                  {genre}
                </span>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4 mt-8"
            >
              <button className="flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-bold text-black hover:scale-105 active:scale-95 transition">
                <Play className="h-5 w-5 fill-black" />
                Play
              </button>

              <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 backdrop-blur-md px-7 py-3 font-semibold text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition">
                <Info className="h-5 w-5" />
                More Info
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroBanner;