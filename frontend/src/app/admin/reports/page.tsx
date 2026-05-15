"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DollarSign,
  ShoppingBag,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/api";
import { formatInr } from "@/lib/format";

type Order = {
  totalAmount: number;
  createdAt: string;
  items?: {
    quantity: number;
    product?: { category?: { name?: string } | string };
  }[];
};

function localDateKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function AdminReportsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [bookingTotal, setBookingTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeRange, setActiveRange] = useState("7 Days");

  const load = useCallback(async () => {
    setError(null);
    try {
      const [ordRes, bookRes] = await Promise.all([
        apiFetch<{ orders: Order[] }>("/orders?page=1&limit=500"),
        apiFetch<{ pagination: { total: number } }>("/service-bookings?page=1&limit=1"),
      ]);
      setOrders(ordRes.orders);
      setBookingTotal(bookRes.pagination.total);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load report data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const rangeDays = activeRange === "7 Days" ? 7 : activeRange === "30 Days" ? 30 : 365;
  const cutoff = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - (rangeDays - 1));
    return d.getTime();
  }, [rangeDays]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => new Date(o.createdAt).getTime() >= cutoff);
  }, [orders, cutoff]);

  const totalRevenue = useMemo(
    () => filteredOrders.reduce((s, o) => s + (o.totalAmount || 0), 0),
    [filteredOrders],
  );
  const orderCount = filteredOrders.length;

  const chartData = useMemo(() => {
    const barCount = Math.min(rangeDays, 14);
    const out: { day: string; revenue: number; orders: number; key: string }[] = [];
    for (let i = barCount - 1; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      out.push({
        key: localDateKey(d),
        day:
          barCount > 7
            ? `${d.getDate()}/${d.getMonth() + 1}`
            : d.toLocaleDateString("en-IN", { weekday: "short" }),
        revenue: 0,
        orders: 0,
      });
    }
    for (const o of filteredOrders) {
      const k = localDateKey(new Date(o.createdAt));
      const bucket = out.find((b) => b.key === k);
      if (bucket) {
        bucket.revenue += o.totalAmount || 0;
        bucket.orders += 1;
      }
    }
    return out;
  }, [filteredOrders, rangeDays]);

  const maxRevenue = Math.max(...chartData.map((d) => d.revenue), 1);

  const topCategories = useMemo(() => {
    const map = new Map<string, number>();
    for (const o of filteredOrders) {
      for (const line of o.items || []) {
        const p = line.product;
        let label = "Other";
        if (p && typeof p === "object" && p.category) {
          const c = p.category;
          label = typeof c === "object" && c.name ? c.name : String(c);
        }
        map.set(label, (map.get(label) || 0) + (line.quantity || 0));
      }
    }
    const entries = [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
    const sum = entries.reduce((s, [, n]) => s + n, 0) || 1;
    return entries.map(([name, n]) => ({ name, share: Math.round((n / sum) * 100) }));
  }, [filteredOrders]);

  const prevRevenue = useMemo(() => {
    const start = cutoff - rangeDays * 86400000;
    const end = cutoff;
    return orders
      .filter((o) => {
        const t = new Date(o.createdAt).getTime();
        return t >= start && t < end;
      })
      .reduce((s, o) => s + (o.totalAmount || 0), 0);
  }, [orders, cutoff, rangeDays]);

  const revDelta =
    prevRevenue > 0 ? (((totalRevenue - prevRevenue) / prevRevenue) * 100).toFixed(1) : "0";

  const summaries = [
    {
      label: "Revenue",
      value: loading ? "…" : formatInr(totalRevenue),
      change: `${Number(revDelta) >= 0 ? "+" : ""}${revDelta}%`,
      trend: Number(revDelta) >= 0 ? "up" : "down",
      icon: <DollarSign size={20} />,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Orders",
      value: loading ? "…" : String(orderCount),
      change: "in range",
      trend: "up",
      icon: <ShoppingBag size={20} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Service bookings (all time)",
      value: loading ? "…" : String(bookingTotal),
      change: "total",
      trend: "up",
      icon: <Calendar size={20} />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  function exportCsv() {
    const lines = [
      "date,orderValue",
      ...filteredOrders.map(
        (o) => `${new Date(o.createdAt).toISOString()},${o.totalAmount}`,
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders-in-range.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-8 space-y-10">
      {error && (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Sales & Analytics</h2>
          <p className="text-xs text-gray-500">Based on orders in your database (sample up to 500 orders).</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
          <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
            {["7 Days", "30 Days", "Year"].map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setActiveRange(range)}
                className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                  activeRange === range ? "bg-white text-brand-orange shadow-sm" : "text-gray-600 hover:text-gray-600"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={exportCsv}
            disabled={filteredOrders.length === 0}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white font-bold text-xs rounded-xl hover:bg-black transition-all shadow-lg disabled:opacity-40"
          >
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaries.map((s, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center`}>
                {s.icon}
              </div>
              <div
                className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${
                  s.trend === "up" ? "bg-green-50 text-green-600" : "bg-rose-50 text-rose-600"
                }`}
              >
                {s.trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {s.change}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">{s.label}</p>
              <p className="text-3xl font-black text-gray-900 mt-1">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Revenue Trends</h3>
            <p className="text-xs text-gray-600">Recent {chartData.length} days (up to 14 bars)</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-brand-orange rounded-full" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-200 rounded-full" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Orders</span>
            </div>
          </div>
        </div>

        <div className="relative h-[350px] w-full mt-4 flex items-end justify-between gap-4 px-4">
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] font-bold text-gray-700 py-2">
            <span>₹10k</span>
            <span>₹7.5k</span>
            <span>₹5k</span>
            <span>₹2.5k</span>
            <span>0</span>
          </div>
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-2 ml-10">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="w-full border-t border-gray-50" />
            ))}
          </div>

          <div className="flex-1 flex items-end justify-between gap-4 md:gap-8 ml-10 h-full">
            {chartData.map((data, i) => (
              <div key={data.key} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                <div className="absolute bottom-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  <div className="bg-gray-900 text-white text-[10px] font-bold px-3 py-2 rounded-xl shadow-xl whitespace-nowrap">
                    {formatInr(data.revenue)} • {data.orders} Orders
                  </div>
                  <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1" />
                </div>

                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.revenue / maxRevenue) * 80}%` }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: "easeOut" }}
                  className="w-full max-w-[40px] bg-brand-orange rounded-t-xl group-hover:bg-brand-orange-light transition-colors relative min-h-[4px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </motion.div>

                <span className="text-[10px] font-bold text-gray-600 mt-4 group-hover:text-gray-900 transition-colors uppercase tracking-widest">
                  {data.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Top categories (by units in range)</h3>
          {topCategories.length === 0 ? (
            <p className="text-sm text-gray-500">No line-item category data in this period.</p>
          ) : (
            <div className="space-y-6">
              {topCategories.map((cat, i) => (
                <div key={cat.name + i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-500">
                    <span>{cat.name}</span>
                    <span className="text-gray-900">{cat.share}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${cat.share}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full ${i === 0 ? "bg-brand-orange" : i === 1 ? "bg-purple-500" : "bg-blue-500"}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Orders in range</h3>
            <span className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full">
              {orderCount} orders
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Charts use the selected time window. For large histories, increase the backend pagination or add a dedicated
            reporting endpoint.
          </p>
        </div>
      </div>
    </div>
  );
}
