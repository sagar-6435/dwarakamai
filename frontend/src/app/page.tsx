import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import EventsSection from "@/components/EventsSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-white">
      <HeroSection />
      <CategoriesSection />
      <EventsSection />
      <Testimonials />
      <Footer />
    </main>
  );
}
