"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Footer from "@/components/Footer";
import { ChevronDown, Filter, Check } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { formatInr } from "@/lib/format";

type Category = { _id: string; name: string };

type Product = {
  _id: string;
  name: string;
  price: number;
  images?: string[];
  category?: Category | string;
};

function categoryName(p: Product): string {
  const c = p.category;
  if (c && typeof c === "object" && "name" in c) return (c as Category).name;
  return "";
}

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low-High", value: "price-low" },
  { label: "Price: High-Low", value: "price-high" },
];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("newest");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([
      apiFetch<{ products: Product[] }>("/products?page=1&limit=200"),
      apiFetch<Category[]>("/categories"),
    ])
      .then(([prodRes, cats]) => {
        setProducts(prodRes.products);
        setCategories(cats);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) setIsCategoryOpen(false);
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) setIsSortOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allCategories = ["All Products", ...categories.map((c) => c.name)];

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== "All Products") {
      result = result.filter((p) => categoryName(p) === selectedCategory);
    }
    result.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0; // newest = default API order
    });
    return result;
  }, [products, selectedCategory, sortBy]);

  return (
    <main className="min-h-screen bg-brand-white flex flex-col">
      <section className="flex-1 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-6 w-full">

        {/* Sticky Filter Bar */}
        <div className="sticky top-[72px] md:top-[80px] z-40 bg-brand-white/95 backdrop-blur-md py-4 mb-8 border-b border-brand-gray">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4 flex-1">

              {/* Category Dropdown */}
              <div className="relative flex-1 sm:flex-initial" ref={categoryRef}>
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="w-full sm:w-56 flex items-center justify-between gap-2 bg-brand-gray border border-brand-gray-light text-black text-xs md:text-sm py-2.5 px-4 rounded-xl hover:border-brand-orange/50 transition-all"
                >
                  <span className="truncate font-medium">{selectedCategory}</span>
                  <ChevronDown size={16} className={`text-brand-orange transition-transform duration-300 ${isCategoryOpen ? "rotate-180" : ""}`} />
                </button>
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-brand-gray border border-brand-gray-light rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl z-50">
                    <div className="max-h-[300px] overflow-y-auto py-2">
                      {allCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => { setSelectedCategory(cat); setIsCategoryOpen(false); }}
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

              {/* Sort Dropdown */}
              <div className="relative flex-1 sm:flex-initial" ref={sortRef}>
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="w-full sm:w-48 flex items-center justify-between gap-2 bg-brand-gray border border-brand-gray-light text-black text-xs md:text-sm py-2.5 px-4 rounded-xl hover:border-brand-orange/50 transition-all"
                >
                  <span className="truncate font-medium">Sort: {sortOptions.find((o) => o.value === sortBy)?.label}</span>
                  <ChevronDown size={16} className={`text-gray-600 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
                </button>
                {isSortOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-brand-gray border border-brand-gray-light rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl z-50">
                    <div className="py-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
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
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-gray-100 animate-pulse aspect-square" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
              {filteredProducts.map((product) => {
                const img = product.images?.[0];
                return (
                  <div key={product._id} className="glass rounded-2xl overflow-hidden group border border-brand-gray hover:border-brand-orange/30 transition-all duration-500">
                    <div className="aspect-square overflow-hidden relative bg-gray-100">
                      {img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No image</div>
                      )}
                      {categoryName(product) && (
                        <div className="absolute top-3 right-3 z-10 bg-brand-white/80 text-brand-orange text-[10px] font-bold px-2 py-1 rounded-md border border-brand-orange/20 backdrop-blur-sm">
                          {categoryName(product)}
                        </div>
                      )}
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3 className="text-black font-semibold mb-1 text-sm md:text-base line-clamp-1 group-hover:text-brand-orange transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex justify-between items-center mt-3 md:mt-5">
                        <span className="text-brand-orange font-bold text-base md:text-lg">{formatInr(product.price)}</span>
                        <button className="px-4 py-2 bg-brand-gray text-black text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-brand-orange hover:text-brand-white transition-all active:scale-95 shadow-lg">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-brand-gray/30 rounded-3xl border border-dashed border-brand-gray-light">
              <div className="w-16 h-16 bg-brand-gray rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                <Filter size={32} />
              </div>
              <h3 className="text-black text-lg font-bold mb-2">No products found</h3>
              <p className="text-gray-500 text-sm mb-6">Try adjusting your filters</p>
              <button
                onClick={() => { setSelectedCategory("All Products"); setSortBy("newest"); }}
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
