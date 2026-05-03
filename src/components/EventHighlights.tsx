"use client";

import { motion } from "framer-motion";
import { ArrowRight, Camera, Cake, Paintbrush } from "lucide-react";
import Link from "next/link";

const highlights = [
  {
    label: "Wedding",
    title: "Magical Wedding Photography",
    description: "Cinematic moments that last forever. Our wedding packages cover every emotion of your special day.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop",
    icon: Camera,
    href: "/events",
  },
  {
    label: "Birthday",
    title: "Birthday Celebration Packages",
    description: "From balloon arches to custom cakes and floral backdrops — make every birthday unforgettable.",
    image: "https://images.unsplash.com/photo-1530103862676-de8892ebe819?q=80&w=900&auto=format&fit=crop",
    icon: Cake,
    href: "/events",
  },
  {
    label: "Decor",
    title: "Luxury Event Decoration",
    description: "Transform any venue into a dreamlike setting. Our decor team crafts stunning floral and theme setups.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=900&auto=format&fit=crop",
    icon: Paintbrush,
    href: "/events",
  },
];

export default function EventHighlights() {
  return (
    <section className="py-24 bg-brand-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Event <span className="text-brand-gold">Highlights</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto"
          >
            We don&apos;t just capture events — we craft entire experiences.
          </motion.p>
        </div>

        <div className="space-y-16">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            const isEven = i % 2 === 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`flex flex-col ${isEven ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-16 items-center`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2 rounded-2xl overflow-hidden aspect-[4/3] group relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-brand-black/70 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-widest rounded-full">
                    {item.label}
                  </span>
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center">
                    <Icon className="text-brand-gold" size={22} />
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  <Link href={item.href}>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold text-brand-black text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-brand-gold-light transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                      Book Now <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
