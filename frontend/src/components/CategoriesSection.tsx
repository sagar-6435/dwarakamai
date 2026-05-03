"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Gift, 
  Shirt, 
  Leaf, 
  Image as ImageIcon, 
  Printer, 
  Paintbrush, 
  Cake, 
  Flower2, 
  Heart 
} from "lucide-react";

const categories = [
  { name: "Personalised Gifts", icon: Gift, color: "text-brand-gold" },
  { name: "Couple Gifts", icon: Heart, color: "text-red-400" },
  { name: "T-Shirts", icon: Shirt, color: "text-blue-400" },
  { name: "Plants", icon: Leaf, color: "text-green-400" },
  { name: "Photo Frames", icon: ImageIcon, color: "text-purple-400" },
  { name: "Printing Works", icon: Printer, color: "text-gray-300" },
  { name: "Decor Items", icon: Paintbrush, color: "text-brand-gold-light" },
  { name: "Cakes", icon: Cake, color: "text-pink-400" },
  { name: "Bouquets", icon: Flower2, color: "text-rose-400" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-14 md:py-24 bg-brand-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Our <span className="text-brand-gold">Products</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Explore our wide range of premium gifts, decor, and specialized items tailored to make every occasion memorable.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link href="/shop" key={index}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass p-3 sm:p-4 md:p-6 rounded-lg flex flex-col items-center justify-center text-center group cursor-pointer hover:border-brand-gold/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                >
                  <div className={`p-2 sm:p-3 md:p-4 rounded-full bg-brand-black/50 mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 ${category.color}`}>
                    <Icon size={22} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  </div>
                  <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-200 group-hover:text-brand-gold transition-colors duration-300 leading-tight">
                    {category.name}
                  </h3>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
