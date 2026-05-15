"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Trash2, Upload, Image as ImageIcon, X, CheckCircle, AlertCircle } from "lucide-react";
import { apiFetch, uploadAdminImage } from "@/lib/api";

type GalleryItem = {
  _id: string;
  title: string;
  image: string;
  category?: string;
};

const SIDE1_CAT = "__side1";
const SIDE2_CAT = "__side2";
const MAX_CAROUSEL = 7;

// ─── Drag-drop upload zone ────────────────────────────────────────────────────
function UploadZone({
  preview,
  onFile,
  onClear,
  uploading,
  className = "",
  label,
}: {
  preview: string | null;
  onFile: (f: File) => void;
  onClear?: () => void;
  uploading?: boolean;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  function pick(file: File) {
    if (file.type.startsWith("image/")) onFile(file);
  }
  return (
    <div className={className}>
      <div
        className="relative w-full h-full rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-brand-orange cursor-pointer transition-colors"
        onClick={() => ref.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) pick(f); }}
      >
        <input ref={ref} type="file" accept="image/*" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) pick(f); e.target.value = ""; }} />
        {uploading ? (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm gap-2">
            <Upload size={16} className="animate-bounce" /> Uploading…
          </div>
        ) : preview ? (
          <div className="relative w-full h-full group/z">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" className="w-full h-full object-cover rounded-xl" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/z:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
              <span className="text-white text-[10px] font-bold flex items-center gap-1"><Upload size={12} /> Change</span>
              {onClear && (
                <button type="button" onClick={(e) => { e.stopPropagation(); onClear(); }}
                  className="text-white text-[10px] font-bold flex items-center gap-1 bg-rose-500/80 px-2 py-1 rounded-lg">
                  <X size={10} /> Remove
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-gray-400 p-3">
            <ImageIcon size={24} />
            <span className="text-[11px] font-medium text-center">{label ?? "Click or drag"}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Confirmation dialog ──────────────────────────────────────────────────────
function ConfirmDialog({
  count,
  slots,
  onConfirm,
  onCancel,
  saving,
}: {
  count: number;
  slots: { preview: string | null }[];
  onConfirm: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const filled = slots.filter((s) => s.preview !== null).length;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
            <AlertCircle size={22} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Confirm upload</h3>
            <p className="text-xs text-gray-500">Review before saving to gallery</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm text-gray-700">
          <p>You selected <span className="font-bold text-gray-900">{count} slot{count !== 1 ? "s" : ""}</span> for the carousel.</p>
          <p><span className="font-bold text-gray-900">{filled}</span> of {count} {filled === 1 ? "has" : "have"} an image selected.</p>
          {filled < count && (
            <p className="text-amber-600 text-xs">Empty slots will be skipped.</p>
          )}
          <p className="text-xs text-gray-500 pt-1">
            Images will be uploaded to Cloudinary under the <code className="bg-gray-200 px-1 rounded">gallery</code> folder and saved to the database.
          </p>
        </div>

        {/* Thumbnail preview row */}
        <div className="flex gap-2 flex-wrap">
          {slots.map((s, i) =>
            s.preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={s.preview} alt="" className="w-14 h-14 object-cover rounded-lg border border-gray-200" />
            ) : (
              <div key={i} className="w-14 h-14 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-[10px]">
                empty
              </div>
            )
          )}
        </div>

        <div className="flex justify-end gap-3 pt-1">
          <button type="button" onClick={onCancel} disabled={saving}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 disabled:opacity-50">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} disabled={saving || filled === 0}
            className="px-5 py-2.5 rounded-xl bg-brand-orange text-brand-white text-sm font-bold disabled:opacity-60 flex items-center gap-2">
            {saving ? (
              <><Upload size={14} className="animate-bounce" /> Uploading…</>
            ) : (
              <><CheckCircle size={14} /> Confirm & Upload</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AdminGalleryPage() {
  const [carouselItems, setCarouselItems] = useState<GalleryItem[]>([]);
  const [side1, setSide1] = useState<GalleryItem | null>(null);
  const [side2, setSide2] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // carousel upload flow
  const [carouselCount, setCarouselCount] = useState<number>(3);
  const [carouselSlots, setCarouselSlots] = useState<{ file: File | null; preview: string | null }[]>(
    Array.from({ length: 3 }, () => ({ file: null, preview: null }))
  );
  const [showConfirm, setShowConfirm] = useState(false);
  const [carouselSaving, setCarouselSaving] = useState(false);
  const [carouselProgress, setCarouselProgress] = useState<string | null>(null);

  // side panel states
  const [side1Uploading, setSide1Uploading] = useState(false);
  const [side2Uploading, setSide2Uploading] = useState(false);
  const [side1Preview, setSide1Preview] = useState<string | null>(null);
  const [side2Preview, setSide2Preview] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await apiFetch<{ gallery: GalleryItem[] }>("/gallery?page=1&limit=200");
      const all = res.gallery;
      const s1 = all.find((i) => i.category === SIDE1_CAT) ?? null;
      const s2 = all.find((i) => i.category === SIDE2_CAT) ?? null;
      setSide1(s1);
      setSide2(s2);
      setSide1Preview(s1?.image ?? null);
      setSide2Preview(s2?.image ?? null);
      setCarouselItems(all.filter((i) => i.category !== SIDE1_CAT && i.category !== SIDE2_CAT));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // When count changes, resize slots array
  function handleCountChange(n: number) {
    setCarouselCount(n);
    setCarouselSlots((prev) => {
      const next = Array.from({ length: n }, (_, i) => prev[i] ?? { file: null, preview: null });
      return next;
    });
  }

  function setSlotFile(index: number, file: File) {
    setCarouselSlots((prev) => {
      const next = [...prev];
      next[index] = { file, preview: URL.createObjectURL(file) };
      return next;
    });
  }

  function clearSlot(index: number) {
    setCarouselSlots((prev) => {
      const next = [...prev];
      next[index] = { file: null, preview: null };
      return next;
    });
  }

  // ── Carousel: confirm & upload all ──
  async function handleCarouselConfirm() {
    setCarouselSaving(true);
    setError(null);
    let uploaded = 0;
    try {
      for (let i = 0; i < carouselSlots.length; i++) {
        const slot = carouselSlots[i];
        if (!slot.file) continue;
        setCarouselProgress(`Uploading photo ${i + 1} of ${carouselSlots.filter((s) => s.file).length}…`);
        const { url } = await uploadAdminImage(slot.file, "gallery");
        await apiFetch("/gallery", {
          method: "POST",
          body: JSON.stringify({ title: `Carousel photo ${carouselItems.length + uploaded + 1}`, image: url }),
        });
        uploaded++;
      }
      setShowConfirm(false);
      setCarouselSlots(Array.from({ length: carouselCount }, () => ({ file: null, preview: null })));
      setSuccessMsg(`${uploaded} photo${uploaded !== 1 ? "s" : ""} uploaded successfully.`);
      setTimeout(() => setSuccessMsg(null), 4000);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setCarouselSaving(false);
      setCarouselProgress(null);
    }
  }

  // ── Carousel: delete existing ──
  async function handleCarouselDelete(item: GalleryItem) {
    if (!confirm(`Remove "${item.title}" from carousel?`)) return;
    try {
      await apiFetch(`/gallery/${item._id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  // ── Side panel: upload ──
  async function handleSideUpload(slot: 1 | 2, file: File) {
    const cat = slot === 1 ? SIDE1_CAT : SIDE2_CAT;
    const existing = slot === 1 ? side1 : side2;
    const setUploading = slot === 1 ? setSide1Uploading : setSide2Uploading;
    const setPreview = slot === 1 ? setSide1Preview : setSide2Preview;
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setError(null);
    try {
      const { url } = await uploadAdminImage(file, "gallery");
      if (existing) await apiFetch(`/gallery/${existing._id}`, { method: "DELETE" });
      await apiFetch("/gallery", {
        method: "POST",
        body: JSON.stringify({ title: `Side panel ${slot}`, image: url, category: cat }),
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  // ── Side panel: remove ──
  async function handleSideRemove(slot: 1 | 2) {
    const existing = slot === 1 ? side1 : side2;
    if (!existing || !confirm("Remove this side panel image?")) return;
    try {
      await apiFetch(`/gallery/${existing._id}`, { method: "DELETE" });
      if (slot === 1) setSide1Preview(null);
      else setSide2Preview(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  const slotsWithImages = carouselSlots.filter((s) => s.file !== null).length;
  const remainingSlots = MAX_CAROUSEL - carouselItems.length;

  return (
    <div className="p-8 space-y-8">
      {error && (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700 flex items-center gap-2">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      {successMsg && (
        <div className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700 flex items-center gap-2">
          <CheckCircle size={16} /> {successMsg}
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500 text-sm py-20">Loading…</p>
      ) : (
        <>
          {/* ── Layout preview ── */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-bold text-gray-900">Gallery layout preview</h2>
            <div className="flex gap-4 h-[260px]">
              <div className="flex-1 rounded-xl bg-gray-100 overflow-hidden relative">
                {carouselItems[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={carouselItems[0].image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Carousel — no photos yet</div>
                )}
                <div className="absolute bottom-3 left-3 bg-black/50 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                  {carouselItems.length} / {MAX_CAROUSEL} photos
                </div>
              </div>
              <div className="w-[180px] flex flex-col gap-3">
                {[side1Preview, side2Preview].map((src, i) => (
                  <div key={i} className="flex-1 rounded-xl bg-gray-100 overflow-hidden">
                    {src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px]">Side {i + 1}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Carousel upload section ── */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-base font-bold text-gray-900">Carousel photos</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {carouselItems.length} of {MAX_CAROUSEL} slots used.
                {remainingSlots > 0 ? ` You can add up to ${remainingSlots} more.` : " Carousel is full — remove a photo to add new ones."}
              </p>
            </div>

            {/* Existing carousel thumbnails */}
            {carouselItems.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
                {carouselItems.map((item, i) => (
                  <div key={item._id} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5">
                      <span className="text-white text-[10px] font-bold">#{i + 1}</span>
                      <button type="button" onClick={() => handleCarouselDelete(item)}
                        className="p-1.5 bg-rose-500/90 rounded-full text-white hover:bg-rose-600 transition-all">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add new photos */}
            {remainingSlots > 0 && (
              <div className="border-t border-gray-100 pt-5 space-y-5">
                {/* Step 1: choose count */}
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-sm font-bold text-gray-700">How many photos to add?</span>
                  <div className="flex gap-2">
                    {Array.from({ length: remainingSlots }, (_, i) => i + 1).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => handleCountChange(n)}
                        className={`w-9 h-9 rounded-xl text-sm font-bold border transition-all ${
                          carouselCount === n
                            ? "bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/20"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:border-brand-orange"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: upload slots */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {carouselSlots.map((slot, i) => (
                    <UploadZone
                      key={i}
                      preview={slot.preview}
                      onFile={(f) => setSlotFile(i, f)}
                      onClear={() => clearSlot(i)}
                      className="aspect-square"
                      label={`Photo ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Step 3: confirm button */}
                <div className="flex items-center justify-between pt-1">
                  <p className="text-xs text-gray-500">
                    {slotsWithImages} of {carouselCount} photo{carouselCount !== 1 ? "s" : ""} selected
                  </p>
                  <button
                    type="button"
                    disabled={slotsWithImages === 0}
                    onClick={() => setShowConfirm(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-brand-orange text-white font-bold rounded-xl hover:bg-brand-orange-light transition-all text-sm shadow-lg shadow-brand-orange/20 disabled:opacity-40"
                  >
                    <CheckCircle size={16} /> Review & Upload
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Side panels ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {([1, 2] as const).map((slot) => (
              <div key={slot} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900">Side panel {slot}</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Single static image on the right side of the gallery.</p>
                </div>
                <UploadZone
                  preview={slot === 1 ? side1Preview : side2Preview}
                  onFile={(f) => handleSideUpload(slot, f)}
                  onClear={() => handleSideRemove(slot)}
                  uploading={slot === 1 ? side1Uploading : side2Uploading}
                  className="h-52"
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Confirmation dialog ── */}
      {showConfirm && (
        <ConfirmDialog
          count={carouselCount}
          slots={carouselSlots}
          onConfirm={handleCarouselConfirm}
          onCancel={() => !carouselSaving && setShowConfirm(false)}
          saving={carouselSaving}
        />
      )}

      {/* Progress overlay */}
      {carouselProgress && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl px-8 py-6 shadow-2xl flex items-center gap-4">
            <Upload size={20} className="text-brand-orange animate-bounce" />
            <span className="text-sm font-bold text-gray-800">{carouselProgress}</span>
          </div>
        </div>
      )}
    </div>
  );
}
