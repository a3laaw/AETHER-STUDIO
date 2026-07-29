import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { LiveProjectProof } from "@/components/sections/live-project-proof";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PlatformCapabilities } from "@/components/sections/platform-capabilities";
import { InteractiveExperience } from "@/components/sections/interactive-experience";
import { WhoItsFor } from "@/components/sections/who-its-for";
import { FinalCTA } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <Header />
      <main className="flex-1">
        <Hero />
        <LiveProjectProof />
        <HowItWorks />
        <PlatformCapabilities />
        <InteractiveExperience />
        <WhoItsFor />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
