import Footer from "@/components/Footer";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-brand-black flex flex-col pt-24">
      <section className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-8">
          Secure <span className="text-brand-gold">Checkout</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Shipping Details */}
          <div className="flex-1 space-y-8">
            <div className="glass p-6 md:p-8 rounded-xl border border-brand-charcoal">
              <h2 className="text-xl font-semibold text-white mb-6">Shipping Address</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                    <input type="text" className="w-full bg-brand-black border border-brand-charcoal-light rounded-sm px-4 py-2 text-white focus:border-brand-gold outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                    <input type="text" className="w-full bg-brand-black border border-brand-charcoal-light rounded-sm px-4 py-2 text-white focus:border-brand-gold outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Street Address</label>
                  <input type="text" className="w-full bg-brand-black border border-brand-charcoal-light rounded-sm px-4 py-2 text-white focus:border-brand-gold outline-none mb-4" placeholder="House number and street name" />
                  <input type="text" className="w-full bg-brand-black border border-brand-charcoal-light rounded-sm px-4 py-2 text-white focus:border-brand-gold outline-none" placeholder="Apartment, suite, unit, etc. (optional)" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">City</label>
                    <input type="text" className="w-full bg-brand-black border border-brand-charcoal-light rounded-sm px-4 py-2 text-white focus:border-brand-gold outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">State</label>
                    <input type="text" className="w-full bg-brand-black border border-brand-charcoal-light rounded-sm px-4 py-2 text-white focus:border-brand-gold outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">PIN Code</label>
                    <input type="text" className="w-full bg-brand-black border border-brand-charcoal-light rounded-sm px-4 py-2 text-white focus:border-brand-gold outline-none" />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="glass p-6 md:p-8 rounded-xl border border-brand-charcoal">
              <h2 className="text-xl font-semibold text-white mb-6">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 border border-brand-gold bg-brand-gold/5 rounded-md cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-brand-gold bg-brand-black border-brand-charcoal focus:ring-brand-gold" />
                  <span className="text-white font-medium">Credit / Debit Card / UPI</span>
                </label>
                <label className="flex items-center gap-4 p-4 border border-brand-charcoal hover:border-brand-charcoal-light rounded-md cursor-pointer transition-colors">
                  <input type="radio" name="payment" className="w-4 h-4 text-brand-gold bg-brand-black border-brand-charcoal focus:ring-brand-gold" />
                  <span className="text-white font-medium">Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="glass p-6 rounded-xl border border-brand-charcoal sticky top-32">
              <h3 className="font-heading text-xl font-bold text-white mb-6">Your Order</h3>
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between items-center text-gray-300">
                  <div className="flex gap-4 items-center">
                    <img src="https://images.unsplash.com/photo-1583847268964-b28ce8f30e92?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 rounded-sm object-cover" alt="Product" />
                    <div>
                      <p className="text-white">Premium Wooden Frame</p>
                      <p className="text-xs">Qty: 1</p>
                    </div>
                  </div>
                  <span>₹899</span>
                </div>
                <div className="border-t border-brand-charcoal-light my-4"></div>
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>₹899</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>₹50</span>
                </div>
                <div className="border-t border-brand-charcoal-light pt-4 flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span className="text-brand-gold">₹949</span>
                </div>
              </div>
              <button className="w-full py-3 bg-brand-gold text-brand-black text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-brand-gold-light transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] mt-4">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
