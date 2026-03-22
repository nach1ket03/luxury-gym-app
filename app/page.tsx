import Hero from "@/components/sections/Hero";
import Programs from "@/components/sections/Programs";
import Pricing from "@/components/sections/Pricing";
import Trainers from "@/components/sections/Trainers";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Programs />
      <Pricing />
      <Trainers />
      <Footer />
    </main>
  );
}