import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Vision from "@/components/Vision";
import WhyUs from "@/components/WhyUs";
import Properties from "@/components/Properties";
import Partners from "@/components/Partners";
import Consultation from "@/components/Consultation";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ClientBody from "@/components/ClientBody";

export default function Home() {
  return (
    <ClientBody>
      <Header />
      <main>
        <Hero />
        <Vision />
        <WhyUs />
        <Properties />
        <Partners />
        <Consultation />
        <Testimonials />
      </main>
      <Footer />
    </ClientBody>
  );
}
