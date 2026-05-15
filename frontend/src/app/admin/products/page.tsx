"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, Search, Edit2, Trash2, Filter, X, Upload, ImageIcon } from "lucide-react";
import { apiFetch, uploadAdminImage } from "@/lib/api";
import { formatInr } from "@/lib/format";

type Category = { _id: string; name: string };

type Product = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  active?: boolean;
  images?: string[];
  category?: Category | string;
};

function categoryName(p: Product) {
  const c = p.category;
  if (c && typeof c === "object" && "name" in c) return (c as Category).name;
  return "—";
}

const emptyForm = {
  name: "",
  description: "",
  category: "",
  price: "",
  stock: "",
  imageUrl: "", // holds the final URL (existing or after upload)
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  // image upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const [prodRes, cats] = await Promise.all([
        apiFetch<{ products: Product[] }>("/products?page=1&limit=200"),
        apiFetch<Category[]>("/categories"),
      ]);
      setProducts(prodRes.products);
      setCategories(cats);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
    setUploadError(null);
    setModalOpen(true);
  }

  function openEdit(p: Product) {
    setEditing(p);
    const img = p.images?.[0] || "";
    const catId =
      p.category && typeof p.category === "object"
        ? (p.category as Category)._id
        : String(p.category || "");
    setForm({
      name: p.name,
      description: p.description || "",
      category: catId,
      price: String(p.price),
      stock: String(p.stock ?? 0),
      imageUrl: img,
    });
    setImageFile(null);
    setImagePreview(img || null);
    setUploadError(null);
    setModalOpen(true);
  }

  function handleImageSelect(file: File) {
    setUploadError(null);
    if (!file.type.startsWith("image/")) {
      setUploadError("Only image files are allowed.");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const price = Number(form.price);
      const stock = Number(form.stock);
      if (!form.name.trim() || !form.category) {
        throw new Error("Name and category are required.");
      }
      if (Number.isNaN(price) || price < 0) throw new Error("Invalid price.");

      // Upload new image if one was selected
      let finalImageUrl = form.imageUrl;
      if (imageFile) {
        const { url } = await uploadAdminImage(imageFile, "dwarakamai/products");
        finalImageUrl = url;
      }

      const images = finalImageUrl.trim() ? [finalImageUrl.trim()] : [];
      const body: Record<string, unknown> = {
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        category: form.category,
        price,
        stock: Number.isNaN(stock) ? 0 : stock,
        images,
      };
      if (editing) {
        await apiFetch(`/products/${editing._id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
      } else {
        await apiFetch("/products", { method: "POST", body: JSON.stringify(body) });
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(p: Product) {
    if (!confirm(`Delete “${p.name}”?`)) return;
    setError(null);
    try {
      await apiFetch(`/products/${p._id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      categoryName(p).toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-8 space-y-6">
      {error && (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange transition-all"
            />
          </div>
          <span className="p-2.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-xl" title="Filter">
            <Filter size={18} />
          </span>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 px-6 py-2.5 bg-brand-orange text-brand-white font-bold rounded-xl hover:bg-brand-orange-light transition-all shadow-lg shadow-brand-orange/20"
        >
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
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-sm">
                    Loading…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-sm">
                    No products found.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => {
                  const low = product.stock < 5;
                  const img = product.images?.[0];
                  return (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-gray-100 bg-gray-100 shrink-0">
                            {img ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={img} alt="" className="w-full h-full object-cover" />
                            ) : null}
                          </div>
                          <span className="font-bold text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-medium">{categoryName(product)}</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">{formatInr(product.price)}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-medium">{product.stock} Units</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full border ${
                            low
                              ? "bg-orange-50 text-orange-600 border-orange-100"
                              : "bg-green-50 text-green-600 border-green-100"
                          }`}
                        >
                          {low ? "Low Stock" : "In Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => openEdit(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(product)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">{editing ? "Edit product" : "New product"}</h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-50 text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Category</label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange"
                >
                  <option value="">Select…</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Price (₹)</label>
                  <input
                    required
                    type="number"
                    min={0}
                    step={1}
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Stock</label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={form.stock}
                    onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange"
                  />
                </div>
              </div>
              <div>
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">
                  Product Image
                </label>
                <div
                  className={`relative w-full rounded-xl border-2 border-dashed transition-colors cursor-pointer ${
                    uploadError ? "border-rose-300 bg-rose-50" : "border-gray-200 bg-gray-50 hover:border-brand-orange"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleImageSelect(file);
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageSelect(file);
                      e.target.value = "";
                    }}
                  />
                  {imagePreview ? (
                    <div className="relative group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-contain rounded-xl p-2"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                        <span className="text-white text-xs font-bold flex items-center gap-1">
                          <Upload size={14} /> Change image
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 gap-2 text-gray-400">
                      <ImageIcon size={32} />
                      <span className="text-sm font-medium">Click or drag to upload</span>
                      <span className="text-xs">PNG, JPG, WEBP</span>
                    </div>
                  )}
                </div>
                {uploadError && (
                  <p className="mt-1 text-xs text-rose-600">{uploadError}</p>
                )}
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-brand-orange text-brand-white text-sm font-bold hover:bg-brand-orange-light disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
