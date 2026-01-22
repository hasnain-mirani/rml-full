import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="bg-[var(--purple)] pb-14 pt-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-[22px] bg-[#0b0b12] px-6 py-14 md:px-10">
          {/* neon rings */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full border-[18px] border-fuchsia-500/70" />
          <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full border-[10px] border-purple-400/50" />

          <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full border-[20px] border-fuchsia-500/70" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full border-[10px] border-purple-400/50" />

          <div className="relative text-center">
            <h3 className="font-display text-3xl font-semibold text-white md:text-4xl">
              Start transforming your <br className="hidden md:block" />
              workplace today with AI.
            </h3>

            <Button className="mt-6 rounded-full bg-[var(--purple)] px-8 hover:opacity-95">
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
