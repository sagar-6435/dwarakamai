"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, Search, Trash2, Tag, X, Upload, Image as ImageIcon } from "lucide-react";
import { apiFetch, uploadAdminImage } from "@/lib/api";
import { formatDate } from "@/lib/format";

type GalleryItem = {
  _id: string;
  title: string;
  image: string;
  category?: string;
  createdAt?: string;
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await apiFetch<{ gallery: GalleryItem[] }>("/gallery?page=1&limit=200");
      setItems(res.gallery);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function handleImageSelect(file: File) {
    setUploadError(null);
    if (!file.type.startsWith("image/")) {
      setUploadError("Only image files are allowed.");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !imageFile) {
      setError("Title and image are required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const { url } = await uploadAdminImage(imageFile, "gallery");
      await apiFetch("/gallery", {
        method: "POST",
        body: JSON.stringify({
          title: title.trim(),
          image: url,
          category: category.trim() || undefined,
        }),
      });
      setModalOpen(false);
      setTitle("");
      setCategory("");
      setImageFile(null);
      setImagePreview(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: GalleryItem) {
    if (!confirm(`Remove "${item.title}" from gallery?`)) return;
    setError(null);
    try {
      await apiFetch(`/gallery/${item._id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.category || "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-8 space-y-8">
      {error && (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
          <input
            type="text"
            placeholder="Search gallery..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange transition-all"
          />
        </div>
        <button
          type="button"
          onClick={() => {
            setTitle("");
            setCategory("");
            setImageFile(null);
            setImagePreview(null);
            setUploadError(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 px-6 py-2.5 bg-brand-orange text-brand-white font-bold rounded-xl hover:bg-brand-orange-light transition-all shadow-lg shadow-brand-orange/20"
        >
          <Plus size={18} /> Upload Image
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-sm py-12">Loading gallery…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden group shadow-sm hover:shadow-xl transition-all"
            >
              <div className="aspect-[4/3] relative bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
                    className="p-3 bg-rose-500/90 backdrop-blur-md rounded-full text-white hover:bg-rose-600 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                {item.category && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-gray-900 uppercase flex items-center gap-2">
                    <Tag size={12} className="text-brand-orange" /> {item.category}
                  </div>
                )}
              </div>
              <div className="p-5">
                <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{item.title}</h4>
                <p className="text-xs text-gray-600 mt-1">
                  {item.createdAt ? formatDate(item.createdAt) : "—"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">New gallery item</h2>
              <button type="button" onClick={() => setModalOpen(false)} className="p-2 rounded-lg hover:bg-gray-50">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Title</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Category</label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Image</label>
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
                    <div className="relative group/prev">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imagePreview} alt="Preview" className="w-full h-40 object-contain rounded-xl p-2" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/prev:opacity-100 transition-opacity rounded-xl">
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
                {uploadError && <p className="mt-1 text-xs text-rose-600">{uploadError}</p>}
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !imageFile}
                  className="px-5 py-2.5 rounded-xl bg-brand-orange text-brand-white text-sm font-bold disabled:opacity-60"
                >
                  {saving ? "Uploading & Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
