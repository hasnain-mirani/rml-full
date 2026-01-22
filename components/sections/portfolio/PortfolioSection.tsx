import PortfolioCards from "./PortfolioCards";
import PortfolioWaves from "./PortfolioWaves";

export default function PortfolioSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-soft)] pb-20">
      {/* Waves background */}
      <div className="pointer-events-none absolute inset-0">
        <PortfolioWaves />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-20 md:pt-24">
        <div className="text-center">
          <h1 className="font-display text-[38px] font-semibold leading-tight text-[var(--purple)] md:text-[56px]">
            Proven Impact: Our Case Studies & <br className="hidden md:block" />
            Success Portfolio
          </h1>
        </div>

        <div className="mt-14">
          <PortfolioCards />
        </div>
      </div>
    </section>
  );
}
