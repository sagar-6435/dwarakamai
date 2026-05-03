"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, User, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Don't show navbar on admin pages
  if (pathname?.startsWith("/admin")) return null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 bg-brand-black py-4 shadow-lg border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Dwaraka Mai Digital Studio Logo"
              width={40}
              height={40}
              className="rounded-sm group-hover:scale-110 transition-transform duration-300"
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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm uppercase tracking-wider text-gray-300 hover:text-brand-gold transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-4 border-l border-brand-charcoal-light pl-6">
              <Link href="/login" className="text-gray-300 hover:text-brand-gold transition-colors">
                <User size={20} />
              </Link>
              <Link href="/cart" className="text-gray-300 hover:text-brand-gold transition-colors relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-brand-gold text-brand-black text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
              </Link>
            </div>
            <Link href="/services">
              <button className="px-6 py-2.5 bg-brand-gold text-brand-black font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-brand-gold-light hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                Book Now
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-gold"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-brand-black border-t border-brand-gold/20"
        >
          <div className="px-4 pt-2 pb-6 flex flex-col">
            {/* Nav Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-3 text-base uppercase tracking-wider text-gray-300 hover:text-brand-gold hover:bg-brand-charcoal transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-brand-charcoal-light my-3" />

            {/* Login & Cart */}
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 text-base uppercase tracking-wider text-gray-300 hover:text-brand-gold hover:bg-brand-charcoal transition-colors duration-300"
            >
              <User size={18} />
              Login / Account
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 text-base uppercase tracking-wider text-gray-300 hover:text-brand-gold hover:bg-brand-charcoal transition-colors duration-300"
            >
              <ShoppingCart size={18} />
              Cart
              <span className="ml-auto w-5 h-5 bg-brand-gold text-brand-black text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
            </Link>

            {/* Book Now Button */}
            <div className="pt-3 px-0">
              <Link href="/services" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-3 bg-brand-gold text-brand-black font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-brand-gold-light transition-colors duration-300">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
