import Navbar from "@/components/Navbar";
import Hero from "@/components/HeroSection";
import Popular from "@/components/PopularSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen min-w-min">
      <div>
        <Navbar />
      </div>    
      <div className="container mx-auto flex flex-col gap-24">
        <Hero />
        <Popular />
      </div>
      <Footer />
    </main>
  );
}
