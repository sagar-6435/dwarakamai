"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-14 md:py-24 bg-brand-white relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-orange/8 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 border border-brand-orange/30 rounded-full text-brand-orange text-xs font-semibold uppercase tracking-widest mb-6"
        >
          <CalendarCheck size={14} />
          Limited Slots Available
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-black mb-6 leading-tight"
        >
          Ready to Make Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-light via-brand-orange to-brand-orange-dark">
            Moment Unforgettable?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto"
        >
          Whether it&apos;s a wedding, birthday, corporate event, or a thoughtful gift — we deliver premium quality with a personal touch. Book your consultation today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
        >
          <Link href="/services" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-10 py-4 bg-brand-orange text-brand-white font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-brand-orange-light hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2">
              Book Now <ArrowRight size={18} />
            </button>
          </Link>
          <Link href="/shop" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-10 py-4 bg-transparent text-black font-bold uppercase tracking-widest text-sm rounded-sm border border-brand-gray-light hover:border-brand-orange hover:text-brand-orange transition-all">
              Shop Now
            </button>
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mt-14 text-gray-500 text-xs uppercase tracking-widest"
        >
          {["500+ Events Completed", "2000+ Happy Clients", "Premium Quality Guaranteed", "Fast Turnaround"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span className="w-1 h-1 bg-brand-orange rounded-full"></span>
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
