import Footer from "@/components/Footer";

const products = [
  { id: 1, name: "Passport Photos (Set of 8)", price: "₹100", category: "Prints", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=500&auto=format&fit=crop" },
  { id: 2, name: "Custom Printed Mug", price: "₹299", category: "Gifts", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=500&auto=format&fit=crop" },
  { id: 3, name: "Personalized Photo Pillow", price: "₹499", category: "Gifts", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=500&auto=format&fit=crop" },
  { id: 4, name: "Premium Wooden Frame", price: "₹899", category: "Frames", image: "https://images.unsplash.com/photo-1583847268964-b28ce8f30e92?q=80&w=500&auto=format&fit=crop" },
  { id: 5, name: "Wedding Photo Album", price: "₹2500", category: "Albums", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=500&auto=format&fit=crop" },
  { id: 6, name: "Instant Polaroid Prints", price: "₹50", category: "Prints", image: "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?q=80&w=500&auto=format&fit=crop" },
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-brand-black flex flex-col pt-24">
      <section className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
          Our <span className="text-brand-gold">Shop</span>
        </h1>
        <p className="text-gray-400 mb-10 max-w-2xl">
          Browse our collection of custom printing services, premium frames, and personalized gifts.
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 space-y-8">
            <div>
              <h3 className="text-white font-semibold mb-4 border-b border-brand-charcoal-light pb-2">Categories</h3>
              <ul className="space-y-2">
                {["All Products", "Prints", "Gifts", "Frames", "Albums"].map((cat) => (
                  <li key={cat}>
                    <button className="text-gray-400 hover:text-brand-gold transition-colors text-sm">{cat}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 border-b border-brand-charcoal-light pb-2">Price Range</h3>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="Min" className="w-full bg-brand-charcoal border border-brand-charcoal-light rounded-sm px-2 py-1 text-sm text-white focus:border-brand-gold outline-none" />
                <span className="text-gray-500">-</span>
                <input type="number" placeholder="Max" className="w-full bg-brand-charcoal border border-brand-charcoal-light rounded-sm px-2 py-1 text-sm text-white focus:border-brand-gold outline-none" />
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="glass rounded-xl overflow-hidden group border border-brand-charcoal hover:border-brand-gold/30 transition-colors">
                <div className="aspect-square overflow-hidden relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-brand-black/80 text-brand-gold text-xs px-2 py-1 rounded-sm border border-brand-gold/20">
                    {product.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-semibold mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-brand-gold font-bold">{product.price}</span>
                    <button className="px-4 py-2 bg-brand-charcoal text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-brand-gold hover:text-brand-black transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
