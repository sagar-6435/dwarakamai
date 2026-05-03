import Footer from "@/components/Footer";
import FeaturedServices from "@/components/FeaturedServices";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-brand-black flex flex-col">
      <div className="flex-1 w-full">
        <FeaturedServices />
        <WhyChooseUs />
      </div>
      <Footer />
    </main>
  );
}
