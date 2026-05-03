import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedServices from "@/components/FeaturedServices";
import ProductCarousel from "@/components/ProductCarousel";
import EventHighlights from "@/components/EventHighlights";
import GallerySection from "@/components/GallerySection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-black">
      <HeroSection />
      <CategoriesSection />
      <FeaturedServices />
      <ProductCarousel />
      <EventHighlights />
      <GallerySection />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
      <ContactSection />
      <Footer />
    </main>
  );
}
