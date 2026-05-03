"use client";

import { Plus, Search, Image as ImageIcon, Trash2, Maximize2, Tag } from "lucide-react";
import Image from "next/image";

const galleryItems = [
  { id: 1, title: "Wedding Setup - Grand Hall", category: "Weddings", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop" },
  { id: 2, title: "Outdoor Birthday Decor", category: "Events", image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=400&auto=format&fit=crop" },
  { id: 3, title: "Traditional Saree Ceremony", category: "Functions", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop" },
  { id: 4, title: "Engagement Stage Design", category: "Weddings", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop" },
];

export default function AdminGalleryPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search gallery..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-gold transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-brand-gold text-brand-black font-bold rounded-xl hover:bg-brand-gold-light transition-all shadow-lg shadow-brand-gold/20">
          <Plus size={18} /> Upload Image
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {galleryItems.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden group shadow-sm hover:shadow-xl transition-all">
            <div className="aspect-[4/3] relative">
              <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"><Maximize2 size={18} /></button>
                <button className="p-3 bg-rose-500/80 backdrop-blur-md rounded-full text-white hover:bg-rose-600 transition-all"><Trash2 size={18} /></button>
              </div>
              <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-gray-900 uppercase flex items-center gap-2">
                <Tag size={12} className="text-brand-gold" /> {item.category}
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{item.title}</h4>
              <p className="text-xs text-gray-400 mt-1">Uploaded on Oct 24, 2023</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
