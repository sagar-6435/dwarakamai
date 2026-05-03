"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const products = [
  { name: "Custom Mug", price: "₹299", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=500&auto=format&fit=crop" },
  { name: "Photo Pillow", price: "₹499", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=500&auto=format&fit=crop" },
  { name: "Wooden Frame", price: "₹899", image: "https://images.unsplash.com/photo-1583847268964-b28ce8f30e92?q=80&w=500&auto=format&fit=crop" },
  { name: "Wedding Album", price: "₹2,500", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=500&auto=format&fit=crop" },
  { name: "Passport Photos", price: "₹100", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=500&auto=format&fit=crop" },
  { name: "Instant Prints", price: "₹50", image: "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?q=80&w=500&auto=format&fit=crop" },
];

export default function ProductCarousel() {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (ref.current) ref.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-brand-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-3xl md:text-5xl font-bold text-white mb-3"
            >
              Popular <span className="text-brand-gold">Products</span>
            </motion.h2>
            <p className="text-gray-400">Bestsellers from our collection</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border border-brand-charcoal-light text-gray-400 hover:border-brand-gold hover:text-brand-gold flex items-center justify-center transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border border-brand-charcoal-light text-gray-400 hover:border-brand-gold hover:text-brand-gold flex items-center justify-center transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={ref}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[260px] glass rounded-xl overflow-hidden group border border-brand-charcoal hover:border-brand-gold/30 transition-all flex-shrink-0"
            >
              <div className="aspect-square overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold mb-1">{product.name}</h3>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-brand-gold font-bold">{product.price}</span>
                  <button className="px-3 py-1.5 bg-brand-charcoal text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-brand-gold hover:text-brand-black transition-colors">
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/shop">
            <button className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold-light text-sm font-semibold uppercase tracking-wider transition-colors">
              View All Products <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
