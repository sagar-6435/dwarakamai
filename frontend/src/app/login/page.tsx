"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { setToken } from "@/lib/auth";

type AuthResponse = {
  message: string;
  user: { id: string; name: string; email: string; role: string };
  token: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [nextPath, setNextPath] = useState("/account");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("next");
    if (q?.startsWith("/")) setNextPath(q);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      if (isSignup) {
        const body: { name: string; email: string; password: string } = {
          name: name.trim(),
          email: email.trim(),
          password,
        };
        const data = await apiFetch<AuthResponse>("/auth/register", {
          method: "POST",
          body: JSON.stringify(body),
          skipAuth: true,
        });
        setToken(data.token);
      } else {
        const data = await apiFetch<AuthResponse>("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email: email.trim(), password }),
          skipAuth: true,
        });
        setToken(data.token);
      }

      const me = await apiFetch<{ user: { role: string } }>("/auth/me");
      const target =
        me.user.role === "admin"
          ? nextPath.startsWith("/admin")
            ? nextPath
            : "/admin"
          : nextPath.startsWith("/admin")
            ? "/account"
            : nextPath;
      router.push(target);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-brand-white flex flex-col md:flex-row" suppressHydrationWarning>
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop"
          alt="Studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-white/80 via-brand-white/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <blockquote className="mb-8 mt-auto">
            <p className="font-heading text-2xl text-black font-bold leading-snug mb-3">
              &quot;Capture Memories.<br />Create Emotions.&quot;
            </p>
            <p className="text-gray-600 text-sm max-w-xs">
              Sign in to track your orders, manage event bookings, and access exclusive member offers.
            </p>
          </blockquote>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 md:py-0 md:px-12 lg:px-20">
        <div className="w-full max-w-md">
          <div className="flex bg-brand-gray rounded-sm p-1 mb-8">
            <button
              type="button"
              onClick={() => setIsSignup(false)}
              className={`flex-1 py-2.5 text-sm font-semibold uppercase tracking-wider rounded-sm transition-all ${!isSignup ? "bg-brand-orange text-brand-white" : "text-gray-600 hover:text-black"}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsSignup(true)}
              className={`flex-1 py-2.5 text-sm font-semibold uppercase tracking-wider rounded-sm transition-all ${isSignup ? "bg-brand-orange text-brand-white" : "text-gray-600 hover:text-black"}`}
            >
              Sign Up
            </button>
          </div>

          <h1 className="font-heading text-3xl font-bold text-black mb-2">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-600 text-sm mb-8">
            {isSignup ? "Join us and start celebrating moments." : "Login to your account to continue."}
          </p>

          {error && (
            <div className="mb-4 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-sm px-4 py-3">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {isSignup && (
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignup}
                  className="w-full bg-brand-gray border border-brand-gray-light rounded-sm px-4 py-3 text-black focus:outline-none focus:border-brand-orange transition-colors placeholder:text-gray-600"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-brand-gray border border-brand-gray-light rounded-sm px-4 py-3 text-black focus:outline-none focus:border-brand-orange transition-colors placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  className="w-full bg-brand-gray border border-brand-gray-light rounded-sm px-4 py-3 pr-12 text-black focus:outline-none focus:border-brand-orange transition-colors placeholder:text-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-orange transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {isSignup && (
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={isSignup}
                    minLength={6}
                    autoComplete="new-password"
                    className="w-full bg-brand-gray border border-brand-gray-light rounded-sm px-4 py-3 pr-12 text-black focus:outline-none focus:border-brand-orange transition-colors placeholder:text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-orange transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}
            {!isSignup && (
              <div className="text-right">
                <button type="button" className="text-xs text-brand-orange hover:text-brand-orange-light transition-colors">
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-brand-orange text-brand-white font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-brand-orange-light transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.3)] disabled:opacity-60"
            >
              {loading ? "Please wait…" : isSignup ? "Create Account" : "Login"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            {isSignup ? (
              <>Already have an account?{" "}
                <button type="button" onClick={() => setIsSignup(false)} className="text-brand-orange hover:underline">Login</button>
              </>
            ) : (
              <>Don&apos;t have an account?{" "}
                <button type="button" onClick={() => setIsSignup(true)} className="text-brand-orange hover:underline">Sign Up</button>
              </>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-gray-600 hover:text-gray-600 transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
