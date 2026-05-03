"use client";

import { Search, ShoppingCart, Eye, Package, CheckCircle2, Clock } from "lucide-react";

const orders = [
  { id: "#DM-1001", customer: "Rahul Sharma", date: "Oct 24, 2023", amount: "₹2,499", status: "Processing", method: "UPI" },
  { id: "#DM-1002", customer: "Priya Patel", date: "Oct 23, 2023", amount: "₹1,200", status: "Delivered", method: "Card" },
  { id: "#DM-1003", customer: "Anita Rao", date: "Oct 22, 2023", amount: "₹4,500", status: "Pending", method: "Cash" },
];

export default function AdminOrdersPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
          <input 
            type="text" 
            placeholder="Search orders by ID or customer..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange transition-all"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Processing", "Delivered", "Pending"].map((tab) => (
            <button key={tab} className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border border-gray-100 hover:bg-gray-50 transition-all text-gray-500">
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Order ID</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Customer</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Amount</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4 font-bold text-brand-orange">{order.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">{order.amount}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {order.status === "Delivered" ? <CheckCircle2 size={14} className="text-green-500" /> : <Clock size={14} className="text-orange-400" />}
                    <span className={`text-[10px] font-bold uppercase ${
                      order.status === "Delivered" ? "text-green-600" : "text-orange-600"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="flex items-center gap-2 ml-auto px-4 py-2 bg-brand-white text-black text-[10px] font-bold uppercase rounded-lg hover:bg-brand-orange hover:text-brand-white transition-all">
                    <Eye size={14} /> Details
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
