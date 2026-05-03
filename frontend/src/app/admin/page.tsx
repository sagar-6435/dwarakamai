"use client";

import { 
  Package, 
  Briefcase, 
  ShoppingCart, 
  Plus,
  BarChart3,
  Image as ImageIcon,
  Home
} from "lucide-react";

const stats = [
  { label: "Total Orders", value: "0", icon: <ShoppingCart size={24} />, color: "bg-blue-500" },
  { label: "Total Products", value: "15", icon: <Package size={24} />, color: "bg-green-500" },
  { label: "Service Bookings", value: "0", icon: <Briefcase size={24} />, color: "bg-purple-500" },
  { label: "Total Revenue", value: "₹0", icon: <BarChart3 size={24} />, color: "bg-brand-orange" },
];

const quickActions = [
  { title: "Product Management", desc: "Add, edit, or remove products", icon: <Package size={28} />, color: "bg-blue-600" },
  { title: "Order Management", desc: "View and manage customer orders", icon: <ShoppingCart size={28} />, color: "bg-green-600" },
  { title: "Service Management", desc: "Manage services and bookings", icon: <Briefcase size={28} />, color: "bg-purple-600" },
  { title: "Gallery Management", desc: "Upload and manage gallery images", icon: <ImageIcon size={28} />, color: "bg-rose-500" },
  { title: "Homepage Management", desc: "Manage homepage images and content", icon: <Home size={28} />, color: "bg-orange-500" },
];

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
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

      {/* Quick Actions */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          <button className="flex items-center gap-2 text-brand-orange font-bold text-sm hover:underline">
            View All Actions <Plus size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
              <div className={`${action.color} w-14 h-14 rounded-2xl flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{action.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Orders</h3>
        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-600 border-2 border-dashed border-gray-100 rounded-2xl">
          <ShoppingCart size={48} className="mb-4 opacity-20" />
          <p className="text-sm font-medium">No recent orders to show</p>
          <p className="text-xs">Once customers start buying, orders will appear here.</p>
        </div>
      </div>
    </div>
  );
}
