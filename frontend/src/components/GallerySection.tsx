"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { apiFetch } from "@/lib/api";

type GalleryItem = {
  _id: string;
  title: string;
  image: string;
  category?: string;
};

// Categories reserved for the two side panels
const SIDE1_CAT = "__side1";
const SIDE2_CAT = "__side2";

export default function GallerySection() {
  const [carouselItems, setCarouselItems] = useState<GalleryItem[]>([]);
  const [side1, setSide1] = useState<GalleryItem | null>(null);
  const [side2, setSide2] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<{ gallery: GalleryItem[] }>("/gallery?page=1&limit=50")
      .then((res) => {
        const all = res.gallery;
        setSide1(all.find((i) => i.category === SIDE1_CAT) ?? null);
        setSide2(all.find((i) => i.category === SIDE2_CAT) ?? null);
        // carousel = everything except side panel items, max 7
        const carousel = all
          .filter((i) => i.category !== SIDE1_CAT && i.category !== SIDE2_CAT)
          .slice(0, 7);
        setCarouselItems(carousel);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const prev = useCallback(() =>
    setCurrent((c) => (c - 1 + carouselItems.length) % carouselItems.length),
    [carouselItems.length]
  );

  const next = useCallback(() =>
    setCurrent((c) => (c + 1) % carouselItems.length),
    [carouselItems.length]
  );

  // Auto-advance carousel
  useEffect(() => {
    if (carouselItems.length < 2) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [carouselItems.length, next]);

  const activeItem = carouselItems[current];

  return (
    <section id="gallery" className="py-14 md:py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex gap-4 h-[420px]">
            <div className="flex-1 rounded-2xl bg-gray-200 animate-pulse" />
            <div className="w-[320px] flex flex-col gap-4">
              <div className="flex-1 rounded-2xl bg-gray-200 animate-pulse" />
              <div className="flex-1 rounded-2xl bg-gray-200 animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[480px]">

            {/* ── Left: Carousel ── */}
            <div className="relative flex-1 rounded-2xl overflow-hidden bg-gray-100 min-h-[280px] md:min-h-0 group">
              {carouselItems.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  No gallery images yet.
                </div>
              ) : (
                <>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeItem._id}
                      src={activeItem.image}
                      alt={activeItem.title}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setLightbox(activeItem.image)}
                    />
                  </AnimatePresence>

                  {/* Zoom hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-black/30 rounded-full p-3">
                      <ZoomIn className="text-white w-7 h-7" />
                    </div>
                  </div>

                  {/* Prev / Next */}
                  {carouselItems.length > 1 && (
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
                    </>
                  )}

                  {/* Dot indicators */}
                  {carouselItems.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {carouselItems.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrent(i)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i === current ? "bg-white w-5" : "bg-white/50"
                          }`}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ── Right: Two side panels ── */}
            <div className="flex flex-row md:flex-col gap-4 md:w-[320px]">
              {/* Side panel 1 */}
              <SidePanel item={side1} onZoom={setLightbox} placeholder="Upload side image 1 in Gallery admin (category: __side1)" />
              {/* Side panel 2 */}
              <SidePanel item={side2} onZoom={setLightbox} placeholder="Upload side image 2 in Gallery admin (category: __side2)" />
            </div>
          </div>
        )}
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
              className="max-w-full max-h-[90vh] object-contain rounded-md border border-brand-orange/20 shadow-[0_0_50px_rgba(212,175,55,0.2)]"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function SidePanel({
  item,
  onZoom,
  placeholder,
}: {
  item: GalleryItem | null;
  onZoom: (url: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative flex-1 md:flex-none md:h-[calc(50%-8px)] rounded-2xl overflow-hidden bg-gray-100 group cursor-pointer min-h-[140px]">
      {item ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onClick={() => onZoom(item.image)}
          />
          {/* Label overlay */}
          {item.title && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-gray-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-orange inline-block" />
              {item.title}
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
