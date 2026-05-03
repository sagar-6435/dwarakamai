"use client";

import { Search, Users, Mail, Phone, MapPin, MoreVertical } from "lucide-react";

const customers = [
  { id: 1, name: "Rahul Sharma", email: "rahul@example.com", phone: "+91 98765 43210", orders: 5, totalSpent: "₹12,500" },
  { id: 2, name: "Priya Patel", email: "priya@example.com", phone: "+91 87654 32109", orders: 2, totalSpent: "₹3,400" },
  { id: 3, name: "Anita Rao", email: "anita@example.com", phone: "+91 76543 21098", orders: 1, totalSpent: "₹4,500" },
];

export default function AdminCustomersPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search customers by name or email..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-gold transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-6 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-all">Export CSV</button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Customer Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Contact Info</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Orders</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Total Spent</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold uppercase text-xs">
                      {customer.name.substring(0, 2)}
                    </div>
                    <span className="font-bold text-gray-900">{customer.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs text-gray-500"><Mail size={12} /> {customer.email}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500"><Phone size={12} /> {customer.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-sm font-medium text-gray-700">{customer.orders}</td>
                <td className="px-6 py-4 text-center font-bold text-gray-900">{customer.totalSpent}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-gray-400 hover:text-gray-900 rounded-lg transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
