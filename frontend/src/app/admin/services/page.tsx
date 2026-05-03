"use client";

import { Plus, Search, Briefcase, Edit2, Trash2, Calendar, Star } from "lucide-react";

const services = [
  { id: 1, name: "Grand Wedding Planning", price: "Starting ₹2,00,000", bookings: 12, rating: 4.9, status: "Active" },
  { id: 2, name: "Premium Photoshoot", price: "₹25,000", bookings: 45, rating: 4.8, status: "Active" },
  { id: 3, name: "Event Decor (Standard)", price: "₹50,000", bookings: 28, rating: 4.7, status: "Active" },
];

export default function AdminServicesPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
          <input 
            type="text" 
            placeholder="Search services..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-brand-orange text-brand-white font-bold rounded-xl hover:bg-brand-orange-light transition-all shadow-lg shadow-brand-orange/20">
          <Plus size={18} /> Add Service
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Service Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Pricing</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Bookings</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Rating</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center text-brand-orange">
                      <Briefcase size={20} />
                    </div>
                    <span className="font-bold text-gray-900">{service.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">{service.price}</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-medium">{service.bookings} Total</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-brand-orange">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-bold">{service.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={16} /></button>
                    <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
