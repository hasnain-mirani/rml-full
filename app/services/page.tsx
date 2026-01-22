import ServicesHero from "@/components/sections/services/ServiceHero";
import ServicesList from "@/components/sections/services/ServicesList";
import ServicesEndingBanner from "@/components/sections/services/ServicesEndingBanner";

export default function ServicesPage() {
  return (
    <main className="bg-[var(--bg-soft)]">
      <ServicesHero />
      <ServicesList />
      <ServicesEndingBanner />
    </main>
  );
}
