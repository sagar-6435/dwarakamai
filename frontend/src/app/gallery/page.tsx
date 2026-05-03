import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-brand-black flex flex-col pt-24">
      <div className="flex-1 w-full">
        <GallerySection />
      </div>
      <Footer />
    </main>
  );
}
