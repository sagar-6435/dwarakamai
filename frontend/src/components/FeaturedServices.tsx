"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Photography & Videography",
    description: "Professional coverage for weddings, birthdays, and special events with cinematic editing.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Event Decor & Management",
    description: "Premium decoration and end-to-end management for your most important celebrations.",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Home & Shop Redecor",
    description: "Transform your living or workspace with our luxury interior decoration services.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
  },
];

export default function FeaturedServices() {
  return (
    <section id="services" className="py-14 md:py-24 bg-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative rounded-xl overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/3] sm:aspect-[4/4] md:aspect-[4/5] overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-white via-brand-white/50 to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-heading text-2xl font-bold text-black mb-2">{service.title}</h3>
                <p className="text-gray-700 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 mb-4">
                  {service.description}
                </p>
                <button className="text-brand-orange uppercase tracking-wider text-xs font-semibold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                  Explore More <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
