"use client";

import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, MapPin, Clock, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";

const majorEvents = [
  {
    title: "Dream Weddings",
    highlight: "End-to-End Elegance",
    description: "We specialize in creating breathtaking weddings. From the 'Mandap' decoration to premium catering and live photography, we handle it all so you can focus on the joy.",
    features: ["Custom Decor Themes", "Groom/Bride Entry Concepts", "Catering & Hospitality", "Traditional & Candid Photography"],
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Grand Functions",
    highlight: "Tradition Meets Style",
    description: "Celebrate your housewarmings, naming ceremonies, and half-saree functions with a touch of luxury. We bring traditional aesthetics with modern comfort.",
    features: ["Floral Art & Stage Decor", "Traditional Music Setup", "Guest Attendance Management", "Event Lighting Designs"],
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop"
  }
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-brand-black">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles size={14} /> Professional Event Management
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-7xl font-bold text-white mb-6"
          >
            Celebrate Life's <span className="text-brand-gold">Greatest Moments</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Dwaraka Mai Digital Studio isn't just about products; we are creators of experiences. From grand weddings to intimate celebrations, we bring elite planning to every function.
          </motion.p>
        </div>

        <div className="space-y-32">
          {majorEvents.map((event, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center`}>
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1 relative w-full aspect-[4/3] md:aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-brand-charcoal"
              >
                <Image 
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1 space-y-8"
              >
                <div>
                  <span className="text-brand-gold font-bold tracking-widest text-sm uppercase">{event.highlight}</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">{event.title}</h2>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed">{event.description}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle2 className="text-brand-gold" size={20} />
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-6">
                  <button className="px-8 py-4 bg-brand-gold text-brand-black font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-brand-gold-light hover:scale-105 transition-all shadow-xl shadow-brand-gold/10">
                    Inquire Now
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Trust Factors */}
        <div className="mt-32 glass p-12 rounded-3xl border border-brand-charcoal grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center md:text-left">
            <ShieldCheck className="text-brand-gold mb-6 mx-auto md:mx-0" size={40} />
            <h4 className="text-white font-bold text-xl mb-3">End-to-End Planning</h4>
            <p className="text-gray-400 text-sm">We take care of everything, from venue selection to guest management.</p>
          </div>
          <div className="text-center md:text-left">
            <MapPin className="text-brand-gold mb-6 mx-auto md:mx-0" size={40} />
            <h4 className="text-white font-bold text-xl mb-3">Anywhere Management</h4>
            <p className="text-gray-400 text-sm">Available for events across the region with seamless local coordination.</p>
          </div>
          <div className="text-center md:text-left">
            <Clock className="text-brand-gold mb-6 mx-auto md:mx-0" size={40} />
            <h4 className="text-white font-bold text-xl mb-3">Timely Execution</h4>
            <p className="text-gray-400 text-sm">Punctuality and perfection are the core values of our management team.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
