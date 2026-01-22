import ResourceCards from "@/components/sections/resources/ResourceCards";
import ResourcesWaves from "@/components/sections/resources/ResourcesWaves";

export default function ResourcesHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-soft)] pb-20">
      {/* Waves behind */}
      <div className="pointer-events-none absolute inset-0">
        <ResourcesWaves />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-20 md:pt-24">
        <div className="text-center">
          <h1 className="font-display text-[40px] font-semibold leading-[1.08] text-[var(--purple)] md:text-[56px]">
            Checkout our latest posts
          </h1>
          <p className="mt-2 font-display text-xl font-semibold text-[var(--purple)]/70 md:text-2xl">
            Stay Ahead: AI Insights & Expertise
          </p>
        </div>

        <div className="mt-12 md:mt-14">
          <ResourceCards />
        </div>
      </div>
    </section>
  );
}
