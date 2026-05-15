"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { apiFetch } from "@/lib/api";

type GallerySet = {
  _id: string;
  title: string;
  description?: string;
  mainImages: string[];
  side1Image?: string;
  side1Label?: string;
  side2Image?: string;
  side2Label?: string;
};

export default function GallerySection() {
  const [sets, setSets] = useState<GallerySet[]>([]);
  const [activeSet, setActiveSet] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<{ gallery: GallerySet[] }>("/gallery?page=1&limit=20")
      .then((res) => setSets(res.gallery))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = sets[activeSet] ?? null;

  return (
    <section id="gallery" className="py-14 md:py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* set selector tabs */}
        {!loading && sets.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {sets.map((s, i) => (
              <button
                key={s._id}
                onClick={() => setActiveSet(i)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  i === activeSet
                    ? "bg-brand-orange text-white shadow"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-brand-orange"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-[1fr_220px] sm:grid-cols-[1fr_280px] lg:grid-cols-[1fr_320px] gap-4 h-[340px] sm:h-[400px] lg:h-[480px]">
            <div className="rounded-2xl bg-gray-200 animate-pulse" />
            <div className="flex flex-col gap-4">
              <div className="flex-1 rounded-2xl bg-gray-200 animate-pulse" />
              <div className="flex-1 rounded-2xl bg-gray-200 animate-pulse" />
            </div>
          </div>
        ) : sets.length === 0 ? (
          <div className="flex items-center justify-center h-[420px] rounded-2xl bg-gray-100 text-gray-400 text-sm">
            No gallery sets yet.
          </div>
        ) : set ? (
          <GallerySetView set={set} onZoom={setLightbox} />
        ) : null}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-brand-orange transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightbox}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-md"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── single set layout ────────────────────────────────────────────────────────
function GallerySetView({
  set,
  onZoom,
}: {
  set: GallerySet;
  onZoom: (url: string) => void;
}) {
  const [current, setCurrent] = useState(0);
  const imgs = set.mainImages ?? [];

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + imgs.length) % imgs.length),
    [imgs.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % imgs.length),
    [imgs.length],
  );

  // reset slide when set changes
  useEffect(() => { setCurrent(0); }, [set._id]);

  // auto-advance
  useEffect(() => {
    if (imgs.length < 2) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [imgs.length, next]);

  const activeImg = imgs[current];

  return (
    <div className="grid grid-cols-[1fr_220px] sm:grid-cols-[1fr_280px] lg:grid-cols-[1fr_320px] gap-4 h-[340px] sm:h-[400px] lg:h-[480px]">

      {/* ── Left: Carousel ── */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-full group">
        {imgs.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No carousel images.
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={activeImg}
                alt={set.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => onZoom(activeImg)}
              />
            </AnimatePresence>

            {/* zoom hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-black/30 rounded-full p-3">
                <ZoomIn className="text-white w-7 h-7" />
              </div>
            </div>

            {imgs.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow transition-all"
                  aria-label="Previous"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow transition-all"
                  aria-label="Next"
                >
                  <ChevronRight size={20} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {imgs.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`rounded-full transition-all ${
                        i === current ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50"
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* ── Right: Two side panels ── */}
      <div className="flex flex-col gap-4 h-full">
        <SidePanel
          image={set.side1Image}
          label={set.side1Label}
          placeholder="Side image 1"
          onZoom={onZoom}
        />
        <SidePanel
          image={set.side2Image}
          label={set.side2Label}
          placeholder="Side image 2"
          onZoom={onZoom}
        />
      </div>
    </div>
  );
}

function SidePanel({
  image,
  label,
  placeholder,
  onZoom,
}: {
  image?: string;
  label?: string;
  placeholder: string;
  onZoom: (url: string) => void;
}) {
  return (
    <div className="relative flex-1 rounded-2xl overflow-hidden bg-gray-100 group cursor-pointer">
      {image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={label ?? placeholder}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onClick={() => onZoom(image)}
          />
          {label && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-gray-900 flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-brand-orange inline-block" />
              {label}
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center p-4 text-center text-gray-400 text-xs">
          {placeholder}
        </div>
      )}
    </div>
  );
}
