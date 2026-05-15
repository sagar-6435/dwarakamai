"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

const backgrounds = [
  "/wedding-1.png",
  "/wedding-2.png",
  "/wedding-3.png"
];

export default function HeroSection() {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={currentBg}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${backgrounds[currentBg]}')`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-white/80 via-brand-white/60 to-brand-white" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-brand-orange uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm md:text-base font-semibold mb-4 block">
            Premium Digital Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-black max-w-4xl leading-tight mb-1"
        >
          Capture Memories. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-light via-brand-orange to-brand-orange-dark">
            Create Emotions.
          </span>{" "}
          <br />
          Celebrate Every Moment.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-700 text-base md:text-xl max-w-2xl mb-10 font-light px-2"
        >
          
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto"
        >
          <Link href="/shop" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-brand-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-brand-orange-light hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              Shop Now
              <ArrowRight size={18} />
            </button>
          </Link>
          
          <Link href="/services" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-transparent text-black font-semibold uppercase tracking-wider text-sm rounded-sm border border-brand-orange hover:bg-brand-orange/10 transition-colors duration-300">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-orange text-brand-white">
                <Play size={12} className="ml-0.5" />
              </span>
              Explore Services
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-brand-white to-transparent z-10" />
    </section>
  );
}
