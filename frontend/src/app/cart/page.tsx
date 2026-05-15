import Footer from "@/components/Footer";
import { Trash2 } from "lucide-react";
import Link from "next/link";

const cartItems = [
  { id: 1, name: "Premium Wooden Frame", price: 899, quantity: 1, image: "https://images.unsplash.com/photo-1583847268964-b28ce8f30e92?q=80&w=500&auto=format&fit=crop" },
  { id: 2, name: "Custom Printed Mug", price: 299, quantity: 2, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=500&auto=format&fit=crop" },
];

export default function CartPage() {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-brand-white flex flex-col">
      <section className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-black mb-8">
          Shopping <span className="text-brand-orange">Cart</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="glass p-4 rounded-xl border border-brand-gray flex gap-4 items-center">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className="text-black font-semibold">{item.name}</h3>
                  <p className="text-brand-orange font-bold mt-1">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-brand-gray-light rounded-sm">
                    <button className="px-3 py-1 text-gray-600 hover:text-black">-</button>
                    <span className="text-black px-2 text-sm">{item.quantity}</span>
                    <button className="px-3 py-1 text-gray-600 hover:text-black">+</button>
                  </div>
                  <button className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-400/10 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="glass p-6 rounded-xl border border-brand-gray sticky top-32">
              <h3 className="font-heading text-xl font-bold text-black mb-6">Order Summary</h3>
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-brand-gray-light pt-4 flex justify-between text-black font-bold text-lg">
                  <span>Total</span>
                  <span className="text-brand-orange">₹{subtotal}</span>
                </div>
              </div>
              <Link href="/checkout">
                <button className="w-full py-3 bg-brand-orange text-brand-white text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-brand-orange-light transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
