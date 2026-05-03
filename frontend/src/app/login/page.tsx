"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-brand-black flex flex-col md:flex-row">
      {/* Left - Cinematic Panel */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop"
          alt="Studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 via-brand-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <blockquote className="mb-8 mt-auto">
            <p className="font-heading text-2xl text-white font-bold leading-snug mb-3">
              "Capture Memories.<br />Create Emotions."
            </p>
            <p className="text-gray-400 text-sm max-w-xs">
              Sign in to track your orders, manage event bookings, and access exclusive member offers.
            </p>
          </blockquote>
        </div>
      </div>

      {/* Right - Form Panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 md:py-0 md:px-12 lg:px-20">
        <div className="w-full max-w-md">
          {/* Toggle */}
          <div className="flex bg-brand-charcoal rounded-sm p-1 mb-8">
            <button
              onClick={() => setIsSignup(false)}
              className={`flex-1 py-2.5 text-sm font-semibold uppercase tracking-wider rounded-sm transition-all ${!isSignup ? "bg-brand-gold text-brand-black" : "text-gray-400 hover:text-white"}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsSignup(true)}
              className={`flex-1 py-2.5 text-sm font-semibold uppercase tracking-wider rounded-sm transition-all ${isSignup ? "bg-brand-gold text-brand-black" : "text-gray-400 hover:text-white"}`}
            >
              Sign Up
            </button>
          </div>

          <h1 className="font-heading text-3xl font-bold text-white mb-2">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            {isSignup ? "Join us and start celebrating moments." : "Login to your account to continue."}
          </p>

          <form className="space-y-5">
            {isSignup && (
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-brand-charcoal border border-brand-charcoal-light rounded-sm px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors placeholder:text-gray-600"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                {isSignup ? "Email or Phone" : "Email / Phone"}
              </label>
              <input
                type="text"
                placeholder="you@example.com"
                className="w-full bg-brand-charcoal border border-brand-charcoal-light rounded-sm px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-brand-charcoal border border-brand-charcoal-light rounded-sm px-4 py-3 pr-12 text-white focus:outline-none focus:border-brand-gold transition-colors placeholder:text-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-gold transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {isSignup && (
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-brand-charcoal border border-brand-charcoal-light rounded-sm px-4 py-3 pr-12 text-white focus:outline-none focus:border-brand-gold transition-colors placeholder:text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-gold transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}
            {!isSignup && (
              <div className="text-right">
                <button type="button" className="text-xs text-brand-gold hover:text-brand-gold-light transition-colors">
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="button"
              className="w-full py-3.5 bg-brand-gold text-brand-black font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-brand-gold-light transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              {isSignup ? "Create Account" : "Login"}
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            {isSignup ? (
              <>Already have an account?{" "}
                <button onClick={() => setIsSignup(false)} className="text-brand-gold hover:underline">Login</button>
              </>
            ) : (
              <>Don&apos;t have an account?{" "}
                <button onClick={() => setIsSignup(true)} className="text-brand-gold hover:underline">Sign Up</button>
              </>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
