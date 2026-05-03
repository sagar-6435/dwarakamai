import { Camera, Share2, MessageCircle, Video } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#020202] pt-20 pb-10 border-t border-brand-orange/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand — full width on mobile */}
        <div className="mb-10 md:hidden">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Image src="/logo.png" alt="Dwaraka Mai Digital Studio Logo" width={36} height={36} className="rounded-sm" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg tracking-wider text-black">DWARAKAMAI</span>
              <span className="text-[10px] tracking-[0.2em] text-brand-orange uppercase">Digital Studio</span>
            </div>
          </Link>
          <p className="text-gray-600 text-sm leading-relaxed">
            Capturing memories, creating emotions, and celebrating every moment.
          </p>
        </div>

        {/* Desktop: 4-col grid | Mobile: brand col + 2×2 grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand — desktop only */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image src="/logo.png" alt="Dwaraka Mai Digital Studio Logo" width={40} height={40} className="rounded-sm" />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl tracking-wider text-black">DWARAKAMAI</span>
                <span className="text-[10px] tracking-[0.2em] text-brand-orange uppercase">Digital Studio</span>
              </div>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Capturing memories, creating emotions, and celebrating every moment with premium photography, decor, and personalized gifting solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-brand-gray flex items-center justify-center text-gray-600 hover:text-brand-orange hover:bg-brand-gray-light transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-gray flex items-center justify-center text-gray-600 hover:text-brand-orange hover:bg-brand-gray-light transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://wa.me/+918897536435" className="w-10 h-10 rounded-full bg-brand-gray flex items-center justify-center text-gray-600 hover:text-brand-orange hover:bg-brand-gray-light transition-all">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-gray flex items-center justify-center text-gray-600 hover:text-brand-orange hover:bg-brand-gray-light transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-black text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/services' },
                { name: 'Portfolio', href: '/gallery' },
                { name: 'Services', href: '/services' },
                { name: 'Contact', href: 'https://wa.me/+918897536435' }
              ].map((link) => (
                <li key={link.name}><Link href={link.href} className="text-gray-600 hover:text-brand-orange transition-colors text-sm">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-black text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {['Photography', 'Videography', 'Event Decor', 'Personalized Gifts', 'Home Redecor'].map((s) => (
                <li key={s}><a href="/services" className="text-gray-600 hover:text-brand-orange transition-colors text-sm">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-bold text-black text-lg mb-6">Products</h4>
            <ul className="space-y-3">
              {['Couple Gifts', 'Photo Frames', 'Custom T-Shirts', 'Cakes & Bouquets', 'Printing Works'].map((p) => (
                <li key={p}><a href="/shop" className="text-gray-600 hover:text-brand-orange transition-colors text-sm">{p}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile-only 2×2 grid */}
        <div className="grid grid-cols-2 gap-8 mb-10 md:hidden">
          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-black text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/services' },
                { name: 'Portfolio', href: '/gallery' },
                { name: 'Services', href: '/services' },
                { name: 'Contact', href: 'https://wa.me/+918897536435' }
              ].map((link) => (
                <li key={link.name}><Link href={link.href} className="text-gray-600 hover:text-brand-orange transition-colors text-xs">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-black text-sm mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              {['Photography', 'Videography', 'Event Decor', 'Personalized Gifts', 'Home Redecor'].map((s) => (
                <li key={s}><a href="/services" className="text-gray-600 hover:text-brand-orange transition-colors text-xs">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-bold text-black text-sm mb-4 uppercase tracking-wider">Products</h4>
            <ul className="space-y-2">
              {['Couple Gifts', 'Photo Frames', 'Custom T-Shirts', 'Cakes & Bouquets', 'Printing Works'].map((p) => (
                <li key={p}><a href="/shop" className="text-gray-600 hover:text-brand-orange transition-colors text-xs">{p}</a></li>
              ))}
            </ul>
          </div>

          {/* Social Handles */}
          <div>
            <h4 className="font-heading font-bold text-black text-sm mb-4 uppercase tracking-wider">Follow Us</h4>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-brand-orange transition-colors text-xs">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                Instagram
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-brand-orange transition-colors text-xs">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                Facebook
              </a>
              <a href="https://wa.me/+918897536435" className="flex items-center gap-2 text-gray-600 hover:text-brand-orange transition-colors text-xs">
                <MessageCircle size={14} /> WhatsApp
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-brand-orange transition-colors text-xs">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-gray-light flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Dwaraka Mai Digital Studio. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="/privacy-policy" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-brand-orange transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
