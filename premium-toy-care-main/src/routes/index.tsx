import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { AssemblyFloat } from "@/components/site/AssemblyFloat";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Assembly } from "@/components/site/Assembly";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { SpareCatalog } from "@/components/site/SpareCatalog";
import { Rent } from "@/components/site/Rent";
import { FAQ } from "@/components/site/FAQ";
import { Reviews } from "@/components/site/Reviews";
import { BookContact } from "@/components/site/BookContact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useEffect(() => {
    document.title = "MyToysCare — Premium Toy Repair & Rental in Bangalore";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <Assembly />
        <BeforeAfter />
        <SpareCatalog />
        <Rent />
        <FAQ />
        <Reviews />
        <BookContact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <AssemblyFloat />
    </div>
  );
}
