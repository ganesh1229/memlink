import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import HowItWorks from "../../components/landing/HowItWorks";
import FAQ from "../../components/landing/FAQ";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/landing/Footer";

function Home() {
  return (
    <div className="bg-slate-50">

      <Navbar />

      <Hero />

      <Features />

      <HowItWorks />

      <FAQ />

      <CTA />

      <Footer />

    </div>
  );
}

export default Home;