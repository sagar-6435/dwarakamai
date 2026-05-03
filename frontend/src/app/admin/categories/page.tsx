"use client";

import { Plus, Search, Tag, MoreVertical, Edit2, Trash2 } from "lucide-react";

export default function CategoriesPage() {
  const categories = [
    { id: 1, name: "Gifts", items: 42, status: "Active" },
    { id: 2, name: "Cakes", items: 15, status: "Active" },
    { id: 3, name: "Frames", items: 28, status: "Active" },
    { id: 4, name: "Bouquets", items: 12, status: "Active" },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
          <input 
            type="text" 
            placeholder="Search categories..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-brand-orange text-brand-white font-bold rounded-xl hover:bg-brand-orange-light transition-all shadow-lg shadow-brand-orange/20">
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Category Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Products</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center text-brand-orange">
                      <Tag size={20} />
                    </div>
                    <span className="font-bold text-gray-900">{cat.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 font-medium">{cat.items} Products</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded-full border border-green-100">
                    {cat.status}
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
  );
}
