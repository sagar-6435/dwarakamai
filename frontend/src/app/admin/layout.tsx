"use client";

import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Tag, 
  Package, 
  Briefcase, 
  ShoppingCart, 
  Users, 
  Image as ImageIcon, 
  Home, 
  BarChart3, 
  LogOut,
  Settings,
  Bell
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { clearToken, type AuthUser } from "@/lib/auth";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin" },
  { name: "Categories", icon: <Tag size={20} />, href: "/admin/categories" },
  { name: "Products", icon: <Package size={20} />, href: "/admin/products" },
  { name: "Services", icon: <Briefcase size={20} />, href: "/admin/services" },
  { name: "Orders", icon: <ShoppingCart size={20} />, href: "/admin/orders" },
  { name: "Customers", icon: <Users size={20} />, href: "/admin/customers" },
  { name: "Gallery", icon: <ImageIcon size={20} />, href: "/admin/gallery" },
  { name: "Homepage", icon: <Home size={20} />, href: "/admin/homepage" },
  { name: "Sales Report", icon: <BarChart3 size={20} />, href: "/admin/reports" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancel = false;
    const run = async () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("dwarakamai_token") : null;
      if (!token) {
        router.replace(`/login?next=${encodeURIComponent(pathname || "/admin")}`);
        if (!cancel) setReady(true);
        return;
      }
      try {
        const data = await apiFetch<{ user: AuthUser }>("/auth/me");
        if (cancel) return;
        if (data.user.role !== "admin") {
          router.replace("/");
          return;
        }
        setAdminUser(data.user);
      } catch {
        if (cancel) return;
        clearToken();
        router.replace(`/login?next=${encodeURIComponent(pathname || "/admin")}`);
      } finally {
        if (!cancel) setReady(true);
      }
    };
    run();
    return () => {
      cancel = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount — token lives in localStorage, no need to re-verify on every navigation

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] text-gray-600 text-sm font-medium">
        Verifying admin access…
      </div>
    );
  }

  if (!adminUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 z-30">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-brand-white font-bold">D</div>
            <span className="font-bold text-gray-900 tracking-tight">DWARAKAMAI</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                  ? "bg-brand-orange text-brand-white shadow-lg shadow-brand-orange/20" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => {
              clearToken();
              router.push("/login");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {pathname === "/admin" ? "Dashboard" : pathname.split("/").pop()?.replace("-", " ")}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Bell size={20} />
            </button>
            <Link href="/admin/profile" className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Settings size={20} />
            </Link>
            <div className="h-8 w-[1px] bg-gray-200 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">{adminUser.name}</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">{adminUser.email}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center text-gray-600">
                <Users size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
