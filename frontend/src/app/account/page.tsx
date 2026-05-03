"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import { User, Package, Calendar, Heart, MapPin } from "lucide-react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "orders", name: "Orders", icon: Package },
    { id: "bookings", name: "Bookings", icon: Calendar },
    { id: "wishlist", name: "Wishlist", icon: Heart },
    { id: "addresses", name: "Addresses", icon: MapPin },
  ];

  return (
    <main className="min-h-screen bg-brand-white flex flex-col">
      <section className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="glass p-6 rounded-xl border border-brand-gray">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-brand-gray-light">
              <div className="w-12 h-12 rounded-full bg-brand-orange text-brand-white flex items-center justify-center font-heading font-bold text-xl">
                JD
              </div>
              <div>
                <h3 className="text-black font-semibold">John Doe</h3>
                <p className="text-gray-600 text-xs">john.doe@example.com</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium ${
                      activeTab === tab.id 
                        ? "bg-brand-orange/10 text-brand-orange border border-brand-orange/20" 
                        : "text-gray-600 hover:text-black hover:bg-brand-gray"
                    }`}
                  >
                    <Icon size={18} />
                    {tab.name}
                  </button>
                )
              })}
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors text-sm font-medium mt-4">
                Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1">
          <div className="glass p-8 rounded-xl border border-brand-gray min-h-[500px]">
            {activeTab === "profile" && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-black mb-6">Personal Information</h2>
                <form className="space-y-6 max-w-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
                      <input type="text" defaultValue="John" className="w-full bg-brand-white border border-brand-gray-light rounded-sm px-4 py-2 text-black focus:border-brand-orange outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
                      <input type="text" defaultValue="Doe" className="w-full bg-brand-white border border-brand-gray-light rounded-sm px-4 py-2 text-black focus:border-brand-orange outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
                    <input type="email" defaultValue="john.doe@example.com" className="w-full bg-brand-white border border-brand-gray-light rounded-sm px-4 py-2 text-black focus:border-brand-orange outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Phone Number</label>
                    <input type="tel" defaultValue="+91 9876543210" className="w-full bg-brand-white border border-brand-gray-light rounded-sm px-4 py-2 text-black focus:border-brand-orange outline-none" />
                  </div>
                  <button type="button" className="px-6 py-2 bg-brand-orange text-brand-white text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-brand-orange-light transition-all">
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-black mb-6">Recent Orders</h2>
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-brand-gray-light mx-auto mb-4" />
                  <p className="text-gray-600">You haven't placed any orders yet.</p>
                </div>
              </div>
            )}

            {/* Other tabs can be similarly structured */}
            {activeTab !== "profile" && activeTab !== "orders" && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-black mb-6 capitalize">{activeTab}</h2>
                <p className="text-gray-600">This section is currently empty.</p>
              </div>
            )}
          </div>
        </div>

      </section>
      <Footer />
    </main>
  );
}
