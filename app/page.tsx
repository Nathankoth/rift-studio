import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import BrandShowcase from "@/components/BrandShowcase";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import About from "@/components/About";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Marquee />
      <BrandShowcase />
      <Services />
      <Work />
      <Process />
      <About />
      <CTA />
    </main>
  );
}
