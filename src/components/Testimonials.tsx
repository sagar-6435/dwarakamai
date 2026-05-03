"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

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
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-brand-charcoal border-t border-brand-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Client <span className="text-brand-gold">Stories</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-brand-black p-8 rounded-xl relative border border-transparent hover:border-brand-gold/20 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <Quote className="absolute top-6 right-6 text-brand-gold/20 w-12 h-12" />
              <div className="flex text-brand-gold mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-8 italic leading-relaxed relative z-10">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-charcoal-light flex items-center justify-center font-heading font-bold text-brand-gold text-xl border border-brand-gold/30">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-white font-heading">{testimonial.name}</h4>
                  <p className="text-sm text-brand-gold">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
