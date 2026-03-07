import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Transparency from "@/components/Transparency";
import ImpactStats from "@/components/ImpactStats";
import SuccessStories from "@/components/SuccessStories";
import CommunityImpact from "@/components/CommunityImpact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main data-testid="main-content">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Transparency />
      <ImpactStats />
      <SuccessStories />
      <CommunityImpact />
      <CTA />
      <Footer />
    </main>
  );
}
