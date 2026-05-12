"use client";

import { useCallback, useEffect, useState } from "react";
import { User, Mail, Lock, Phone, MapPin, Save, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/api";
import type { AuthUser } from "@/lib/auth";

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const load = useCallback(async () => {
    setError(null);
    try {
      const data = await apiFetch<{ user: AuthUser }>("/auth/me");
      setName(data.user.name || "");
      setEmail(data.user.email || "");
      setPhone(data.user.phone || "");
      setCity(data.user.address?.city || "");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function savePersonal(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setOk(null);
    try {
      await apiFetch("/auth/profile", {
        method: "PUT",
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim() || undefined,
          address: city.trim() ? { city: city.trim() } : undefined,
        }),
      });
      setOk("Profile updated.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      {error && (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      )}
      {ok && (
        <div className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-800">{ok}</div>
      )}

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="relative group">
          <div className="w-32 h-32 bg-gray-100 rounded-full border-4 border-gray-50 flex items-center justify-center text-gray-600 overflow-hidden">
            <User size={64} />
          </div>
        </div>
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">{loading ? "…" : name}</h2>
          <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-2">
            <ShieldCheck size={16} className="text-brand-orange" /> Admin
          </p>
          <div className="pt-2">
            <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded-full border border-green-100">
              Signed in
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl w-fit">
        {["personal", "security"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
              activeTab === tab ? "bg-white text-brand-orange shadow-sm" : "text-gray-600 hover:text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "personal" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8"
        >
          <form onSubmit={savePersonal} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block px-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-brand-orange transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block px-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-100 rounded-2xl outline-none text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block px-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 …"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-brand-orange transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block px-1">City</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-brand-orange transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-50 flex justify-end">
              <button
                type="submit"
                disabled={saving || loading}
                className="flex items-center gap-2 px-8 py-3 bg-brand-orange text-brand-white font-bold rounded-xl hover:bg-brand-orange-light transition-all shadow-lg shadow-brand-orange/20 disabled:opacity-60"
              >
                <Save size={18} /> {saving ? "Saving…" : "Update Profile"}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {activeTab === "security" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6"
        >
          <p className="text-sm text-gray-600 flex items-start gap-3">
            <Lock className="shrink-0 mt-0.5 text-gray-500" size={18} />
            Password changes are not exposed on this API yet. Use database tools or add a change-password endpoint on the
            backend if you need this flow.
          </p>
        </motion.div>
      )}
    </div>
  );
}
