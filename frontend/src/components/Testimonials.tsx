"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Bride",
    text: "Dwaraka Mai transformed our wedding into a cinematic masterpiece. The photography and decor were beyond our wildest dreams. Highly professional team!",
  },
  {
    name: "Rahul Verma",
    role: "Corporate Client",
    text: "We ordered personalized corporate gifts for our annual event. The quality of the products and the elegant packaging impressed everyone. Will order again.",
  },
  {
    name: "Anjali Gupta",
    role: "Birthday Event",
    text: "From the custom cake to the stunning floral arrangements and photo frames, they handled my daughter's first birthday perfectly. A truly one-stop solution.",
  },
  {
    name: "Kiran Reddy",
    role: "Anniversary Celebration",
    text: "Booked them for our 10th anniversary party. The decor was absolutely breathtaking and the photos were like something out of a magazine. Worth every rupee!",
  },
  {
    name: "Meena Patel",
    role: "Gift Customer",
    text: "Ordered a customized photo pillow and mug combo for my husband's birthday. The quality was exceptional and it arrived on time. They really care about details!",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  const t = testimonials[current];

  return (
    <section className="py-14 md:py-24 bg-brand-charcoal border-t border-brand-charcoal-light overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Client <span className="text-brand-gold">Stories</span>
          </motion.h2>
          <p className="text-gray-400">What our customers say about us</p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-brand-black p-6 sm:p-8 md:p-10 rounded-2xl border border-brand-charcoal hover:border-brand-gold/20 transition-colors relative"
            >
              <Quote className="absolute top-6 right-6 text-brand-gold/15 w-12 h-12" />

              {/* Stars */}
              <div className="flex text-brand-gold mb-5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review text */}
              <p className="text-gray-300 text-base md:text-lg italic leading-relaxed mb-8 relative z-10">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-charcoal flex items-center justify-center font-heading font-bold text-brand-gold text-xl border border-brand-gold/30 flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-white font-heading">{t.name}</h4>
                  <p className="text-sm text-brand-gold">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 rounded-full bg-brand-charcoal border border-brand-charcoal-light text-gray-400 hover:text-brand-gold hover:border-brand-gold flex items-center justify-center transition-all"
            aria-label="Previous review"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 rounded-full bg-brand-charcoal border border-brand-charcoal-light text-gray-400 hover:text-brand-gold hover:border-brand-gold flex items-center justify-center transition-all"
            aria-label="Next review"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-6 h-2 bg-brand-gold"
                  : "w-2 h-2 bg-brand-charcoal-light hover:bg-brand-gold/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
