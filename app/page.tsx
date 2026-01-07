import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";
import CoreValues from "@/components/pricing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <Hero />
        <CoreValues />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
