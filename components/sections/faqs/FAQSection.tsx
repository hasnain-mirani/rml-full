import FAQGrid from "@/components/sections/faqs/FAQGrid";
import FAQWaves from "@/components/sections/faqs/FAQWaves";

export default function FAQSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-soft)] pb-20">
      {/* waves */}
      <div className="pointer-events-none absolute inset-0">
        <FAQWaves />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-20 md:pt-24">
        <h1 className="font-display text-center text-[40px] font-semibold leading-[1.08] text-[var(--purple)] md:text-[56px]">
          Frequently Asked Questions
        </h1>

        <div className="mt-14">
          <FAQGrid />
        </div>
      </div>
    </section>
  );
}
