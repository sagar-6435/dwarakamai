"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Footer from "@/components/Footer";
import Image from "next/image";
import { ChevronDown, Filter, LayoutGrid, Check } from "lucide-react";

const products = [
  { id: 1, name: "Personalised Crystal Gift", price: 1499, category: "Gifts", image: "/images/personalised-gifts.jpg", popularity: 95 },
  { id: 2, name: "Anniversary Heart Frame", price: 899, category: "Couple Gifts", image: "/images/couple-gifts.png", popularity: 88 },
  { id: 3, name: "Premium Gallery Photo Frame", price: 1200, category: "Frames", image: "/images/photo-frames.webp", popularity: 92 },
  { id: 4, name: "Custom Printed Premium T-Shirt", price: 499, category: "Apparel", image: "/images/t-shirts.png", popularity: 85 },
  { id: 5, name: "Designer Celebration Cake", price: 950, category: "Cakes", image: "/images/cakes.jpg", popularity: 98 },
  { id: 6, name: "Exotic Mixed Flower Bouquet", price: 599, category: "Bouquets", image: "/images/bouquets.jpg", popularity: 80 },
  { id: 7, name: "Tabletop Succulent Plant", price: 349, category: "Plants", image: "/images/plants.jpg", popularity: 75 },
  { id: 8, name: "Bulk Document Printing Service", price: 2, category: "Printing", image: "/images/printing-works.jpg", popularity: 70 },
  { id: 9, name: "Event Decor Essentials Kit", price: 4500, category: "Events", image: "/images/event-needs.webp", popularity: 60 },
  { id: 10, name: "Customised Surprise Box", price: 1999, category: "Gifts", image: "/images/customized.jpg", popularity: 82 },
];

const categories = ["All Products", "Gifts", "Couple Gifts", "Frames", "Apparel", "Cakes", "Bouquets", "Plants", "Printing", "Events"];
const sortOptions = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low-High", value: "price-low" },
  { label: "Price: High-Low", value: "price-high" },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("popularity");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const categoryRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) setIsCategoryOpen(false);
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) setIsSortOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All Products") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "popularity") return b.popularity - a.popularity;
      return 0;
    });

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <main className="min-h-screen bg-brand-white flex flex-col">
      <section className="flex-1 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-6 w-full">
        
        {/* Sticky Filter Bar */}
        <div className="sticky top-[72px] md:top-[80px] z-40 bg-brand-white/95 backdrop-blur-md py-4 mb-8 border-b border-brand-gray">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4 flex-1">
              
              {/* Custom Category Dropdown */}
              <div className="relative flex-1 sm:flex-initial" ref={categoryRef}>
                <button 
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="w-full sm:w-56 flex items-center justify-between gap-2 bg-brand-gray border border-brand-gray-light text-black text-xs md:text-sm py-2.5 px-4 rounded-xl hover:border-brand-orange/50 transition-all"
                >
                  <span className="truncate font-medium">{selectedCategory || "Select Category"}</span>
                  <ChevronDown size={16} className={`text-brand-orange transition-transform duration-300 ${isCategoryOpen ? "rotate-180" : ""}`} />
                </button>

                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-brand-gray border border-brand-gray-light rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-h-[300px] overflow-y-auto py-2 custom-scrollbar">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setIsCategoryOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-all ${
                            selectedCategory === cat 
                            ? "bg-brand-orange/10 text-brand-orange font-bold" 
                            : "text-gray-700 hover:bg-brand-white/50 hover:text-black"
                          }`}
                        >
                          {cat}
                          {selectedCategory === cat && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Custom Sort Dropdown */}
              <div className="relative flex-1 sm:flex-initial" ref={sortRef}>
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="w-full sm:w-48 flex items-center justify-between gap-2 bg-brand-gray border border-brand-gray-light text-black text-xs md:text-sm py-2.5 px-4 rounded-xl hover:border-brand-orange/50 transition-all"
                >
                  <span className="truncate font-medium">Sort: {sortOptions.find(o => o.value === sortBy)?.label}</span>
                  <ChevronDown size={16} className={`text-gray-600 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
                </button>

                {isSortOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-brand-gray border border-brand-gray-light rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-all ${
                            sortBy === option.value 
                            ? "bg-brand-orange/10 text-brand-orange font-bold" 
                            : "text-gray-700 hover:bg-brand-white/50 hover:text-black"
                          }`}
                        >
                          {option.label}
                          {sortBy === option.value && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="hidden lg:block text-xs text-gray-500 uppercase tracking-widest font-bold">
              {filteredProducts.length} Results
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="min-h-[400px]">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="glass rounded-2xl overflow-hidden group border border-brand-gray hover:border-brand-orange/30 transition-all duration-500">
                  <div className="aspect-square overflow-hidden relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 z-10 bg-brand-white/80 text-brand-orange text-[10px] font-bold px-2 py-1 rounded-md border border-brand-orange/20 backdrop-blur-sm">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-black font-semibold mb-1 text-sm md:text-base line-clamp-1 group-hover:text-brand-orange transition-colors">{product.name}</h3>
                    <div className="flex justify-between items-center mt-3 md:mt-5">
                      <span className="text-brand-orange font-bold text-base md:text-lg">₹{product.price}</span>
                      <button className="px-4 py-2 bg-brand-gray text-black text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-brand-orange hover:text-brand-white transition-all active:scale-95 shadow-lg">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-brand-gray/30 rounded-3xl border border-dashed border-brand-gray-light">
              <div className="w-16 h-16 bg-brand-gray rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                <Filter size={32} />
              </div>
              <h3 className="text-black text-lg font-bold mb-2">No products found</h3>
              <p className="text-gray-500 text-sm mb-6">Try adjusting your filters</p>
              <button 
                onClick={() => {
                  setSelectedCategory("All Products");
                  setSortBy("popularity");
                }}
                className="px-6 py-2 bg-brand-orange text-brand-white font-bold text-sm rounded-md hover:bg-brand-orange-light transition-colors"
              >
                Reset All
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
