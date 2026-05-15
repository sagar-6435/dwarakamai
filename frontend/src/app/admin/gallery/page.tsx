"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Plus, Search, Trash2, X, Upload, Image as ImageIcon,
  ChevronLeft, ChevronRight, Layers,
} from "lucide-react";
import { apiFetch, uploadAdminImage } from "@/lib/api";
import { formatDate } from "@/lib/format";

type GallerySet = {
  _id: string;
  title: string;
  description?: string;
  mainImages: string[];
  side1Image?: string;
  side1Label?: string;
  side2Image?: string;
  side2Label?: string;
  displayOrder: number;
  active: boolean;
  createdAt?: string;
};

// ─── tiny image-upload dropzone ───────────────────────────────────────────────
function ImageDropzone({
  label,
  preview,
  onFile,
  multiple,
  previews,
  onRemove,
}: {
  label: string;
  preview?: string | null;
  onFile: (files: File[]) => void;
  multiple?: boolean;
  previews?: string[];
  onRemove?: (idx: number) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  function pick(files: FileList | null) {
    if (!files) return;
    onFile(Array.from(files).filter((f) => f.type.startsWith("image/")));
  }

  return (
    <div>
      <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">
        {label}
      </label>

      {/* multi-image strip */}
      {multiple && previews && previews.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {previews.map((src, i) => (
            <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover" />
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(i)}
                  className="absolute top-0.5 right-0.5 bg-rose-500 text-white rounded-full p-0.5"
                >
                  <X size={10} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <div
        className="relative w-full rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-brand-orange transition-colors cursor-pointer"
        onClick={() => ref.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); pick(e.dataTransfer.files); }}
      >
        <input
          ref={ref}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => { pick(e.target.files); e.target.value = ""; }}
        />
        {!multiple && preview ? (
          <div className="relative group/prev">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="w-full h-32 object-contain rounded-xl p-2" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/prev:opacity-100 transition-opacity rounded-xl">
              <span className="text-white text-xs font-bold flex items-center gap-1">
                <Upload size={12} /> Change
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 gap-1 text-gray-400">
            <ImageIcon size={24} />
            <span className="text-xs font-medium">
              {multiple ? "Click or drag to add images" : "Click or drag to upload"}
            </span>
            <span className="text-[10px]">PNG, JPG, WEBP</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── set card preview ─────────────────────────────────────────────────────────
function SetCard({
  set,
  onDelete,
}: {
  set: GallerySet;
  onDelete: (s: GallerySet) => void;
}) {
  const [slide, setSlide] = useState(0);
  const imgs = set.mainImages ?? [];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all">
      {/* carousel preview */}
      <div className="relative aspect-video bg-gray-100">
        {imgs.length > 0 ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgs[slide]} alt="" className="w-full h-full object-cover" />
            {imgs.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setSlide((s) => (s - 1 + imgs.length) % imgs.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setSlide((s) => (s + 1) % imgs.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow"
                >
                  <ChevronRight size={14} />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {imgs.map((_, i) => (
                    <span
                      key={i}
                      className={`block rounded-full transition-all ${i === slide ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No main images</div>
        )}
        <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
          {imgs.length} / 7 carousel
        </div>
        <button
          type="button"
          onClick={() => onDelete(set)}
          className="absolute top-2 right-2 p-1.5 bg-rose-500/90 rounded-full text-white hover:bg-rose-600 transition-all"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* side images */}
      <div className="flex gap-2 px-4 py-3">
        <div className="flex-1 rounded-xl overflow-hidden bg-gray-100 aspect-square">
          {set.side1Image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={set.side1Image} alt="Side 1" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px] text-center p-1">Side 1</div>
          )}
        </div>
        <div className="flex-1 rounded-xl overflow-hidden bg-gray-100 aspect-square">
          {set.side2Image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={set.side2Image} alt="Side 2" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px] text-center p-1">Side 2</div>
          )}
        </div>
      </div>

      <div className="px-4 pb-4">
        <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{set.title}</h4>
        {set.description && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{set.description}</p>}
        <p className="text-xs text-gray-400 mt-1">{set.createdAt ? formatDate(set.createdAt) : "—"}</p>
      </div>
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────
export default function AdminGalleryPage() {
  const [sets, setSets] = useState<GallerySet[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainFiles, setMainFiles] = useState<File[]>([]);
  const [mainPreviews, setMainPreviews] = useState<string[]>([]);
  const [side1File, setSide1File] = useState<File | null>(null);
  const [side1Preview, setSide1Preview] = useState<string | null>(null);
  const [side1Label, setSide1Label] = useState("");
  const [side2File, setSide2File] = useState<File | null>(null);
  const [side2Preview, setSide2Preview] = useState<string | null>(null);
  const [side2Label, setSide2Label] = useState("");

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await apiFetch<{ gallery: GallerySet[] }>("/gallery/all");
      setSets(res.gallery);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function resetForm() {
    setTitle(""); setDescription("");
    setMainFiles([]); setMainPreviews([]);
    setSide1File(null); setSide1Preview(null); setSide1Label("");
    setSide2File(null); setSide2Preview(null); setSide2Label("");
  }

  function addMainFiles(files: File[]) {
    const remaining = 7 - mainFiles.length;
    const toAdd = files.slice(0, remaining);
    setMainFiles((prev) => [...prev, ...toAdd]);
    setMainPreviews((prev) => [...prev, ...toAdd.map((f) => URL.createObjectURL(f))]);
  }

  function removeMainFile(idx: number) {
    setMainFiles((prev) => prev.filter((_, i) => i !== idx));
    setMainPreviews((prev) => prev.filter((_, i) => i !== idx));
  }

  function setSide(n: 1 | 2, files: File[]) {
    const f = files[0];
    if (!f) return;
    if (n === 1) { setSide1File(f); setSide1Preview(URL.createObjectURL(f)); }
    else { setSide2File(f); setSide2Preview(URL.createObjectURL(f)); }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) { setError("Title is required."); return; }
    if (mainFiles.length === 0) { setError("Add at least one main carousel image."); return; }

    setSaving(true);
    setError(null);
    try {
      // upload all images in parallel
      const [mainUrls, s1, s2] = await Promise.all([
        Promise.all(mainFiles.map((f) => uploadAdminImage(f, "gallery/main").then((r) => r.url))),
        side1File ? uploadAdminImage(side1File, "gallery/side").then((r) => r.url) : Promise.resolve(undefined),
        side2File ? uploadAdminImage(side2File, "gallery/side").then((r) => r.url) : Promise.resolve(undefined),
      ]);

      await apiFetch("/gallery", {
        method: "POST",
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
          mainImages: mainUrls,
          side1Image: s1,
          side1Label: side1Label.trim() || undefined,
          side2Image: s2,
          side2Label: side2Label.trim() || undefined,
        }),
      });

      setModalOpen(false);
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(set: GallerySet) {
    if (!confirm(`Delete set "${set.title}"?`)) return;
    setError(null);
    try {
      await apiFetch(`/gallery/${set._id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  const filtered = sets.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    (s.description ?? "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-8 space-y-8">
      {error && (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      )}

      {/* toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search sets…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange transition-all"
          />
        </div>
        <button
          type="button"
          onClick={() => { resetForm(); setModalOpen(true); }}
          className="flex items-center gap-2 px-6 py-2.5 bg-brand-orange text-white font-bold rounded-xl hover:bg-brand-orange-light transition-all shadow-lg shadow-brand-orange/20"
        >
          <Plus size={18} /> New Gallery Set
        </button>
      </div>

      {/* grid */}
      {loading ? (
        <p className="text-center text-gray-500 text-sm py-12">Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
          <Layers size={40} strokeWidth={1.2} />
          <p className="text-sm">No gallery sets yet. Create your first one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <SetCard key={s._id} set={s} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* ── Create modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Layers size={20} className="text-brand-orange" /> New Gallery Set
              </h2>
              <button type="button" onClick={() => setModalOpen(false)} className="p-2 rounded-lg hover:bg-gray-50">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* title + description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Set Title *</label>
                  <input
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Wedding Highlights"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Description</label>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional short description"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              {/* main carousel images */}
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-800">
                    Main Carousel Images
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${mainFiles.length >= 7 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                    {mainFiles.length} / 7
                  </span>
                </div>
                <p className="text-xs text-gray-500">Upload 6–7 images that will rotate in the carousel.</p>
                <ImageDropzone
                  label=""
                  multiple
                  previews={mainPreviews}
                  onFile={addMainFiles}
                  onRemove={removeMainFile}
                />
              </div>

              {/* side images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* side 1 */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 space-y-3">
                  <span className="text-sm font-bold text-gray-800">Side Image 1</span>
                  <p className="text-xs text-gray-500">Shown in the top-right panel (detail / portrait).</p>
                  <ImageDropzone
                    label="Image"
                    preview={side1Preview}
                    onFile={(files) => setSide(1, files)}
                  />
                  <div>
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Label</label>
                    <input
                      value={side1Label}
                      onChange={(e) => setSide1Label(e.target.value)}
                      placeholder="e.g. Bridal Portrait"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:border-brand-orange text-sm"
                    />
                  </div>
                </div>

                {/* side 2 */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 space-y-3">
                  <span className="text-sm font-bold text-gray-800">Side Image 2</span>
                  <p className="text-xs text-gray-500">Shown in the bottom-right panel.</p>
                  <ImageDropzone
                    label="Image"
                    preview={side2Preview}
                    onFile={(files) => setSide(2, files)}
                  />
                  <div>
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">Label</label>
                    <input
                      value={side2Label}
                      onChange={(e) => setSide2Label(e.target.value)}
                      placeholder="e.g. Venue Decor"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:border-brand-orange text-sm"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-sm text-rose-600 bg-rose-50 rounded-xl px-4 py-2">{error}</p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || mainFiles.length === 0}
                  className="px-6 py-2.5 rounded-xl bg-brand-orange text-white text-sm font-bold disabled:opacity-60 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Uploading…
                    </>
                  ) : (
                    "Save Set"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
