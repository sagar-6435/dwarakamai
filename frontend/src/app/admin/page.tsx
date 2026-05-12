"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Briefcase,
  ShoppingCart,
  Plus,
  BarChart3,
  Image as ImageIcon,
  Home,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import { formatDate, formatInr } from "@/lib/format";

type OrderRow = {
  _id: string;
  orderNumber: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  customer?: { name?: string; email?: string };
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [orderTotal, setOrderTotal] = useState(0);
  const [productTotal, setProductTotal] = useState(0);
  const [bookingTotal, setBookingTotal] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [recent, setRecent] = useState<OrderRow[]>([]);

  useEffect(() => {
    let cancel = false;
    (async () => {
      setErr(null);
      try {
        const [ordersPage, productsMeta, bookingsMeta] = await Promise.all([
          apiFetch<{ orders: OrderRow[]; pagination: { total: number } }>(
            "/orders?page=1&limit=100",
          ),
          apiFetch<{ pagination: { total: number } }>("/products?page=1&limit=1"),
          apiFetch<{ pagination: { total: number } }>(
            "/service-bookings?page=1&limit=1",
          ),
        ]);
        if (cancel) return;
        const rev = ordersPage.orders.reduce((s, o) => s + (o.totalAmount || 0), 0);
        setOrderTotal(ordersPage.pagination.total);
        setProductTotal(productsMeta.pagination.total);
        setBookingTotal(bookingsMeta.pagination.total);
        setRevenue(rev);
        setRecent(ordersPage.orders.slice(0, 5));
      } catch (e) {
        if (!cancel) setErr(e instanceof Error ? e.message : "Failed to load dashboard");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  const stats = [
    {
      label: "Total Orders",
      value: loading ? "…" : String(orderTotal),
      icon: <ShoppingCart size={24} />,
      color: "bg-blue-500",
    },
    {
      label: "Total Products",
      value: loading ? "…" : String(productTotal),
      icon: <Package size={24} />,
      color: "bg-green-500",
    },
    {
      label: "Service Bookings",
      value: loading ? "…" : String(bookingTotal),
      icon: <Briefcase size={24} />,
      color: "bg-purple-500",
    },
    {
      label: "Revenue (sample)",
      value: loading ? "…" : formatInr(revenue),
      icon: <BarChart3 size={24} />,
      color: "bg-brand-orange",
    },
  ];

  const quickActions = [
    { title: "Product Management", desc: "Add, edit, or remove products", icon: <Package size={28} />, color: "bg-blue-600", href: "/admin/products" },
    { title: "Order Management", desc: "View and manage customer orders", icon: <ShoppingCart size={28} />, color: "bg-green-600", href: "/admin/orders" },
    { title: "Service Management", desc: "Manage services and bookings", icon: <Briefcase size={28} />, color: "bg-purple-600", href: "/admin/services" },
    { title: "Gallery Management", desc: "Upload and manage gallery images", icon: <ImageIcon size={28} />, color: "bg-rose-500", href: "/admin/gallery" },
    { title: "Homepage & events", desc: "Manage featured events on the site", icon: <Home size={28} />, color: "bg-orange-500", href: "/admin/homepage" },
  ];

  return (
    <div className="p-8 space-y-10">
      {err && (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {err}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all"
          >
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-gray-900">{stat.value}</p>
            </div>
            <div className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-black shadow-lg`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          <Link href="/admin/reports" className="flex items-center gap-2 text-brand-orange font-bold text-sm hover:underline">
            Sales report <Plus size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group block"
            >
              <div className={`${action.color} w-14 h-14 rounded-2xl flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{action.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Orders</h3>
        {loading ? (
          <p className="text-sm text-gray-500 py-8 text-center">Loading orders…</p>
        ) : recent.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-600 border-2 border-dashed border-gray-100 rounded-2xl">
            <ShoppingCart size={48} className="mb-4 opacity-20" />
            <p className="text-sm font-medium">No recent orders to show</p>
            <p className="text-xs">Once customers start buying, orders will appear here.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {recent.map((o) => (
              <li key={o._id} className="py-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-bold text-brand-orange">{o.orderNumber}</p>
                  <p className="text-sm text-gray-600">
                    {o.customer?.name || o.customer?.email || "Customer"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{formatInr(o.totalAmount)}</p>
                  <p className="text-xs text-gray-500 uppercase font-bold">{o.status}</p>
                  <p className="text-xs text-gray-400">{formatDate(o.createdAt)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
