"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/60 to-brand-black z-10" />
        <img
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop"
          alt="Professional Camera Setup"
          className="w-full h-full object-cover scale-105"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-brand-gold uppercase tracking-[0.3em] text-sm md:text-base font-semibold mb-4 block">
            Premium Digital Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl leading-tight mb-6"
        >
          Capture Memories. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-dark">
            Create Emotions.
          </span>{" "}
          <br />
          Celebrate Every Moment.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10 font-light"
        >
          Your one-stop destination for personalized gifting, exquisite event decor, professional photography, and unforgettable experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <button className="flex items-center gap-2 px-8 py-4 bg-brand-gold text-brand-black font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-brand-gold-light hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            <a href="/shop">Shop Now</a>
            <ArrowRight size={18} />
          </button>
          
          <button className="flex items-center gap-3 px-8 py-4 bg-transparent text-white font-semibold uppercase tracking-wider text-sm rounded-sm border border-brand-gold hover:bg-brand-gold/10 transition-colors duration-300">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-gold text-brand-black">
              <Play size={12} className="ml-0.5" />
            </span>
            <a href="/services">Explore Services</a>
          </button>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-black to-transparent z-10" />
    </section>
  );
}
