import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustIndicators from "@/components/TrustIndicators";
import HowItWorks from "@/components/HowItWorks";
import Transparency from "@/components/Transparency";
import ImpactStats from "@/components/ImpactStats";
import SuccessStories from "@/components/SuccessStories";
import CommunityImpact from "@/components/CommunityImpact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustIndicators />
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
