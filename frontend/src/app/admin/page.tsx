import Footer from "@/components/Footer";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-brand-black flex flex-col pt-24">
      <section className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-8">
          Admin <span className="text-brand-gold">Dashboard</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass p-6 rounded-xl border border-brand-charcoal">
            <h3 className="text-gray-400 mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-white">124</p>
          </div>
          <div className="glass p-6 rounded-xl border border-brand-charcoal">
            <h3 className="text-gray-400 mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-brand-gold">₹45,200</p>
          </div>
          <div className="glass p-6 rounded-xl border border-brand-charcoal">
            <h3 className="text-gray-400 mb-2">Active Bookings</h3>
            <p className="text-3xl font-bold text-white">12</p>
          </div>
        </div>
        <div className="glass p-6 rounded-xl border border-brand-charcoal min-h-[400px] flex items-center justify-center">
          <p className="text-gray-500">Admin management features (Products, Orders, Bookings) will be implemented here.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
