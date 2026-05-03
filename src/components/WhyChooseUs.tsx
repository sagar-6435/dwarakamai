"use client";

import { motion } from "framer-motion";
import { Star, Settings, DollarSign, Clock, PenTool, Users } from "lucide-react";

const features = [
  { icon: Star, title: "Premium Quality", description: "Uncompromising quality in every photograph, print, and decor item." },
  { icon: Settings, title: "Customization", description: "Tailor-made gifts and setups to perfectly match your unique vision." },
  { icon: DollarSign, title: "Affordable Pricing", description: "Luxury experiences and products without the exorbitant price tags." },
  { icon: Clock, title: "Fast Delivery", description: "Timely execution of events and prompt delivery of personalized items." },
  { icon: PenTool, title: "Creative Designs", description: "Innovative approaches to styling, photography, and digital art." },
  { icon: Users, title: "Professional Event Planning", description: "Expert team handling everything from concept to flawless execution." },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-24 bg-brand-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-brand-gold/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Why Choose <span className="text-brand-gold">Us</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            We blend creativity with professionalism to deliver experiences that exceed your expectations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 glass rounded-xl border border-brand-charcoal hover:border-brand-gold/30 transition-colors duration-300"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
                  <Icon size={100} className="text-brand-gold" />
                </div>
                
                <div className="w-14 h-14 bg-brand-charcoal rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors duration-300">
                  <Icon size={24} className="text-brand-gold" />
                </div>
                
                <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
