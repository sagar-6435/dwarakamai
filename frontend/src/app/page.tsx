import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-black">
      <HeroSection />
      <CategoriesSection />
      <Testimonials />
      <Footer />
    </main>
  );
}
