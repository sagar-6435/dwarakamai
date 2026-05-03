import { Camera, Share2, MessageCircle, Video } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#020202] pt-20 pb-10 border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/logo.png"
                alt="Dwaraka Mai Digital Studio Logo"
                width={40}
                height={40}
                className="rounded-sm"
              />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl tracking-wider text-white">
                  DWARAKA MAI
                </span>
                <span className="text-[10px] tracking-[0.2em] text-brand-gold uppercase">
                  Digital Studio
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Capturing memories, creating emotions, and celebrating every moment with premium photography, decor, and personalized gifting solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-brand-charcoal flex items-center justify-center text-gray-400 hover:text-brand-gold hover:bg-brand-charcoal-light transition-all">
                <Camera size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-charcoal flex items-center justify-center text-gray-400 hover:text-brand-gold hover:bg-brand-charcoal-light transition-all">
                <Share2 size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-charcoal flex items-center justify-center text-gray-400 hover:text-brand-gold hover:bg-brand-charcoal-light transition-all">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-charcoal flex items-center justify-center text-gray-400 hover:text-brand-gold hover:bg-brand-charcoal-light transition-all">
                <Video size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Portfolio', 'Services', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {['Photography', 'Videography', 'Event Decor', 'Personalized Gifts', 'Home Redecor'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-lg mb-6">Products</h4>
            <ul className="space-y-3">
              {['Couple Gifts', 'Photo Frames', 'Custom T-Shirts', 'Cakes & Bouquets', 'Printing Works'].map((product) => (
                <li key={product}>
                  <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-brand-charcoal-light flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Dwaraka Mai Digital Studio. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
