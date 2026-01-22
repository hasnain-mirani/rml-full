import Hero from "@/components/sections/home/Hero";
import ProcessSection from "@/components/sections/home/ProcessSection";
import FeaturesSection from "@/components/sections/home/FeaturesSection";
import SuccessStoriesSection from "@/components/sections/home/SuccessStoriesSection";
import CTASection from "@/components/sections/home/CTASection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProcessSection />
      <FeaturesSection />
      <SuccessStoriesSection />
      <CTASection />
    </main>
  );
}
