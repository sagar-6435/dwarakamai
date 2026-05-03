"use client";

import { Save, Home, Layout, Sparkles, MessageCircle, Star, PenTool, Trash2 } from "lucide-react";

export default function AdminHomepagePage() {
  return (
    <div className="p-8 space-y-8">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Homepage Content</h2>
          <p className="text-xs text-gray-500">Customize what customers see on the landing page.</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-brand-orange text-brand-white font-bold rounded-xl hover:bg-brand-orange-light transition-all shadow-lg shadow-brand-orange/20">
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hero Section Edit */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
            <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
              <Sparkles size={20} />
            </div>
            <h3 className="font-bold text-gray-900">Hero Section</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-2">Main Headline</label>
              <input type="text" defaultValue="Capture Memories. Create Emotions." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-2">Subheadline</label>
              <textarea rows={3} defaultValue="Celebrate Every Moment with our premium digital studio services." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange resize-none" />
            </div>
          </div>
        </div>

        {/* Featured Categories Toggle */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
            <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
              <Layout size={20} />
            </div>
            <h3 className="font-bold text-gray-900">Featured Modules</h3>
          </div>
          
          <div className="space-y-3">
            {[
              { name: "Product Categories Grid", enabled: true },
              { name: "Elite Event Showcase", enabled: true },
              { name: "Client Testimonials", enabled: true },
              { name: "Instagram Live Feed", enabled: false },
            ].map((mod, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <span className="text-sm font-bold text-gray-700">{mod.name}</span>
                <div className={`w-12 h-6 rounded-full transition-all relative cursor-pointer ${mod.enabled ? "bg-brand-orange" : "bg-gray-300"}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${mod.enabled ? "right-1" : "left-1"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Management */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between pb-4 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
                <MessageCircle size={20} />
              </div>
              <h3 className="font-bold text-gray-900">Testimonials</h3>
            </div>
            <button className="text-xs font-bold text-brand-orange hover:underline uppercase tracking-widest">+ Add New</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((t) => (
              <div key={t} className="p-4 border border-gray-100 rounded-2xl relative group">
                <div className="flex gap-1 text-brand-orange mb-2">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={10} fill="currentColor" />)}
                </div>
                <p className="text-xs text-gray-500 italic mb-3">"Amazing work by the team for my sister's wedding!"</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-900 uppercase">- John Doe</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-blue-500"><PenTool size={14} /></button>
                    <button className="text-rose-500"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
