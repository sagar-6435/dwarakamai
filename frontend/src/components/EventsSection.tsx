"use client";

import { motion } from "framer-motion";
import { Calendar, Users, Music, Camera, Heart, PartyPopper, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const eventServices = [
  {
    title: "Grand Weddings",
    description: "From traditional ceremonies to modern celebrations, we handle every detail of your special day.",
    icon: <Heart className="text-brand-gold" size={24} />,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Traditional Functions",
    description: "Expert planning for housewarmings, naming ceremonies, and all cultural milestones.",
    icon: <Users className="text-brand-gold" size={24} />,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Birthday Bashes",
    description: "Creative themes and energetic management for kids and adult birthday parties.",
    icon: <PartyPopper className="text-brand-gold" size={24} />,
    image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Corporate Events",
    description: "Professional management for launches, meetings, and annual corporate gatherings.",
    icon: <Calendar className="text-brand-gold" size={24} />,
    image: "https://images.unsplash.com/photo-1505373633100-794e701a1667?q=80&w=800&auto=format&fit=crop"
  }
];

export default function EventsSection() {
  return (
    <section className="py-20 bg-brand-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-heading text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Elite <span className="text-brand-gold">Event Management</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg md:text-xl leading-relaxed"
            >
              We transform your vision into reality. From grand marriages to intimate family functions, our expert team ensures every moment is celebrated with perfection.
            </motion.p>
          </div>
          <Link href="/events">
            <motion.button 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="px-8 py-4 bg-transparent border border-brand-gold text-brand-gold font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-brand-gold hover:text-brand-black transition-all duration-300"
            >
              View All Events
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {eventServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[450px] rounded-3xl overflow-hidden border border-brand-charcoal"
            >
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                <Image 
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                <div className="mb-4 w-12 h-12 bg-brand-gold/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-brand-gold/20">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">{service.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  {service.description}
                </p>
                <div className="w-full h-1 bg-brand-charcoal rounded-full overflow-hidden">
                  <div className="h-full bg-brand-gold w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-12 border-t border-brand-charcoal pt-16">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-brand-charcoal rounded-full flex items-center justify-center mb-6 text-brand-gold">
              <Camera size={32} />
            </div>
            <h4 className="text-white font-bold text-xl mb-3">Live Photography</h4>
            <p className="text-gray-400 text-sm">Professional coverage to capture every smile and tear.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-brand-charcoal rounded-full flex items-center justify-center mb-6 text-brand-gold">
              <Music size={32} />
            </div>
            <h4 className="text-white font-bold text-xl mb-3">Sound & Entertainment</h4>
            <p className="text-gray-400 text-sm">Top-tier audio setups and curated performances.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-brand-charcoal rounded-full flex items-center justify-center mb-6 text-brand-gold">
              <Users size={32} />
            </div>
            <h4 className="text-white font-bold text-xl mb-3">Guest Management</h4>
            <p className="text-gray-400 text-sm">Seamless hospitality and coordination for all attendees.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
