import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { SpareCatalog } from "@/components/site/SpareCatalog";
import { Rent } from "@/components/site/Rent";
import { FAQ } from "@/components/site/FAQ";
import { Reviews } from "@/components/site/Reviews";
import { BookContact } from "@/components/site/BookContact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MyToysCare — Premium Toy Repair & Rental in Bangalore" },
      { name: "description", content: "Expert kids toy repair, genuine spare parts and rentals in Bangalore. Ride-on cars, RC vehicles, scooters and bikes. Doorstep pickup. 4.9★ rated." },
      { property: "og:title", content: "MyToysCare — Premium Toy Repair & Rental" },
      { property: "og:description", content: "Expert kids toy repair and rental service in Bangalore. 10+ years experience, genuine parts, doorstep pickup." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <SpareCatalog />
        <Rent />
        <FAQ />
        <Reviews />
        <BookContact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
