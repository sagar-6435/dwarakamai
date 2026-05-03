"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Camera, Send } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-brand-black relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">
              Let's <span className="text-brand-gold">Connect</span>
            </h2>
            <p className="text-gray-400 mb-12 max-w-md text-lg">
              Ready to capture memories or plan your next event? Reach out to us for bookings, inquiries, or personalized gift requests.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-brand-charcoal flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                  <Phone className="text-brand-gold" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Phone / WhatsApp</h4>
                  <p className="text-gray-400 group-hover:text-white transition-colors">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-brand-charcoal flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                  <Mail className="text-brand-gold" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email</h4>
                  <p className="text-gray-400 group-hover:text-white transition-colors">hello@dwarakamaistudio.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-brand-charcoal flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                  <Camera className="text-brand-gold" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Instagram</h4>
                  <p className="text-gray-400 group-hover:text-white transition-colors">@dwarakamai_studio</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-brand-charcoal flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                  <MapPin className="text-brand-gold" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Studio Address</h4>
                  <p className="text-gray-400 group-hover:text-white transition-colors">123 Luxury Avenue, Cinema Road,<br/>Hyderabad, India 500001</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-10 rounded-xl border border-brand-gold/20 relative"
          >
            <h3 className="font-heading text-2xl font-bold text-white mb-6">Send an Inquiry</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-brand-black/50 border border-brand-charcoal-light rounded-sm px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full bg-brand-black/50 border border-brand-charcoal-light rounded-sm px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Service Needed</label>
                <select className="w-full bg-brand-black/50 border border-brand-charcoal-light rounded-sm px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none">
                  <option>Photography & Videography</option>
                  <option>Event Decoration</option>
                  <option>Personalized Gifts</option>
                  <option>Cakes & Bouquets</option>
                  <option>Interior Redecor</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-brand-black/50 border border-brand-charcoal-light rounded-sm px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none"
                  placeholder="Tell us about your event or requirements..."
                />
              </div>
              <button className="w-full py-4 bg-brand-gold text-brand-black font-bold uppercase tracking-wider text-sm rounded-sm hover:bg-brand-gold-light transition-all duration-300 flex items-center justify-center gap-2 mt-4 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                Send Message <Send size={16} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
