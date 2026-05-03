"use client";

import { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, Camera, Save, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="relative group">
          <div className="w-32 h-32 bg-gray-100 rounded-full border-4 border-gray-50 flex items-center justify-center text-gray-400 overflow-hidden">
            <User size={64} />
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-brand-gold text-brand-black rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform">
            <Camera size={18} />
          </button>
        </div>
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Admin User</h2>
          <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-2">
            <ShieldCheck size={16} className="text-brand-gold" /> Super Admin
          </p>
          <div className="pt-2">
            <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded-full border border-green-100">
              Account Verified
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl w-fit">
        {["personal", "security", "notifications"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
              activeTab === tab ? "bg-white text-brand-gold shadow-sm" : "text-gray-400 hover:text-gray-600"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block px-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" defaultValue="Admin User" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-brand-gold transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block px-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="email" defaultValue="admin@dwarakamai.com" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-brand-gold transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block px-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" defaultValue="+91 88975 36435" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-brand-gold transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block px-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" defaultValue="Hyderabad, India" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-brand-gold transition-all" />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-50 flex justify-end">
            <button className="flex items-center gap-2 px-8 py-3 bg-brand-gold text-brand-black font-bold rounded-xl hover:bg-brand-gold-light transition-all shadow-lg shadow-brand-gold/20">
              <Save size={18} /> Update Profile
            </button>
          </div>
        </motion.div>
      )}

      {activeTab === "security" && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block px-1">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-brand-gold transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block px-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="password" placeholder="Min. 8 characters" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-brand-gold transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block px-1">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="password" placeholder="Confirm new password" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-brand-gold transition-all" />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-50 flex justify-end">
            <button className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg">
              <Lock size={18} /> Update Password
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
