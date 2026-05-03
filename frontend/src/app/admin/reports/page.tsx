"use client";

import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Calendar, 
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from "lucide-react";
import { motion } from "framer-motion";

const summaries = [
  { label: "Revenue", value: "₹45,200", change: "+12.5%", trend: "up", icon: <DollarSign size={20} />, color: "text-green-600", bg: "bg-green-50" },
  { label: "Orders", value: "124", change: "+8.2%", trend: "up", icon: <ShoppingBag size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Event Enquiries", value: "32", change: "-2.4%", trend: "down", icon: <Calendar size={20} />, color: "text-purple-600", bg: "bg-purple-50" },
];

const chartData = [
  { day: "Mon", revenue: 4500, orders: 12 },
  { day: "Tue", revenue: 3200, orders: 8 },
  { day: "Wed", revenue: 5800, orders: 15 },
  { day: "Thu", revenue: 4100, orders: 10 },
  { day: "Fri", revenue: 7500, orders: 22 },
  { day: "Sat", revenue: 9200, orders: 28 },
  { day: "Sun", revenue: 6800, orders: 18 },
];

export default function AdminReportsPage() {
  const [activeRange, setActiveRange] = useState("7 Days");
  const maxRevenue = Math.max(...chartData.map(d => d.revenue));

  return (
    <div className="p-8 space-y-10">
      {/* Header with Export */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Sales & Analytics</h2>
          <p className="text-xs text-gray-500">Comprehensive overview of your store's performance.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
            {["7 Days", "30 Days", "Year"].map((range) => (
              <button 
                key={range}
                onClick={() => setActiveRange(range)}
                className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                  activeRange === range ? "bg-white text-brand-gold shadow-sm" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white font-bold text-xs rounded-xl hover:bg-black transition-all shadow-lg">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaries.map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center`}>
                {s.icon}
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${
                s.trend === "up" ? "bg-green-50 text-green-600" : "bg-rose-50 text-rose-600"
              }`}>
                {s.trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {s.change}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
              <p className="text-3xl font-black text-gray-900 mt-1">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Analytics - Custom SVG Chart */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Revenue Trends</h3>
            <p className="text-xs text-gray-400">Daily performance for the current week</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-brand-gold rounded-full" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-200 rounded-full" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Orders</span>
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="relative h-[350px] w-full mt-4 flex items-end justify-between gap-4 px-4">
          {/* Y-Axis Labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] font-bold text-gray-300 py-2">
            <span>₹10k</span>
            <span>₹7.5k</span>
            <span>₹5k</span>
            <span>₹2.5k</span>
            <span>0</span>
          </div>

          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-2 ml-10">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="w-full border-t border-gray-50" />
            ))}
          </div>

          {/* Bars */}
          <div className="flex-1 flex items-end justify-between gap-4 md:gap-8 ml-10 h-full">
            {chartData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  <div className="bg-gray-900 text-white text-[10px] font-bold px-3 py-2 rounded-xl shadow-xl whitespace-nowrap">
                    ₹{data.revenue.toLocaleString()} • {data.orders} Orders
                  </div>
                  <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1" />
                </div>

                {/* Revenue Bar */}
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.revenue / maxRevenue) * 80}%` }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                  className="w-full max-w-[40px] bg-brand-gold rounded-t-xl group-hover:bg-brand-gold-light transition-colors relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </motion.div>

                {/* X-Axis Label */}
                <span className="text-[10px] font-bold text-gray-400 mt-4 group-hover:text-gray-900 transition-colors uppercase tracking-widest">{data.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Extra Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Top Performing Categories</h3>
          <div className="space-y-6">
            {[
              { name: "Personalized Gifts", share: 45, color: "bg-brand-gold" },
              { name: "Event Management", share: 30, color: "bg-purple-500" },
              { name: "Cakes & Bouquets", share: 25, color: "bg-blue-500" },
            ].map((cat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-500">
                  <span>{cat.name}</span>
                  <span className="text-gray-900">{cat.share}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cat.share}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${cat.color}`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Conversion Rate</h3>
            <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">3.2% Overall</span>
          </div>
          <div className="flex items-center justify-center py-10">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#F3F4F6" strokeWidth="10" />
                <motion.circle 
                  cx="50" cy="50" r="45" fill="none" stroke="#D4AF37" strokeWidth="10" 
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283 }}
                  whileInView={{ strokeDashoffset: 283 - (283 * 0.65) }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-gray-900">65%</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Target</span>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 px-10 leading-relaxed">
            Your store conversion is currently higher than the industry average for luxury gifting.
          </p>
        </div>
      </div>
    </div>
  );
}
