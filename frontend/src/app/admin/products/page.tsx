"use client";

import { Plus, Search, Package, MoreVertical, Edit2, Trash2, Filter } from "lucide-react";
import Image from "next/image";

const products = [
  { id: 1, name: "Personalised Crystal Gift", price: "₹1,499", stock: 12, category: "Gifts", status: "In Stock", image: "/images/personalised-gifts.jpg" },
  { id: 2, name: "Anniversary Heart Frame", price: "₹899", stock: 8, category: "Couple Gifts", status: "Low Stock", image: "/images/couple-gifts.png" },
  { id: 3, name: "Premium Gallery Photo Frame", price: "₹1,200", stock: 24, category: "Frames", status: "In Stock", image: "/images/photo-frames.webp" },
];

export default function AdminProductsPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange transition-all"
            />
          </div>
          <button className="p-2.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-xl hover:text-gray-900 transition-all">
            <Filter size={18} />
          </button>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-brand-orange text-brand-white font-bold rounded-xl hover:bg-brand-orange-light transition-all shadow-lg shadow-brand-orange/20">
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-gray-100">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <span className="font-bold text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{product.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">{product.stock} Units</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full border ${
                      product.status === "In Stock" 
                      ? "bg-green-50 text-green-600 border-green-100" 
                      : "bg-orange-50 text-orange-600 border-orange-100"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={16} /></button>
                      <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
