"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PortfolioCard from "../portfolio/pCard";
type Testimonial = {
  name: string;
  role: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    name: "John Smith",
    role: "Operations Lead",
    text:
      "This HR management platform has been a game-changer for our organization. Before we switched, our HR processes were fragmented and time-consuming. Performance management is seamlessly integrated.",
  },
  {
    name: "Ayesha Khan",
    role: "Founder",
    text:
      "We reduced manual workload dramatically. The workflows are clear, reliable, and easy to scale. It feels like our operations finally work with us, not against us.",
  },
  {
    name: "Michael Lee",
    role: "Product Manager",
    text:
      "The delivery was fast and polished. The UI is pixel-perfect and the system is stable. Our team adopted it quickly and the impact was immediate.",
  },
];

const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

export default function SuccessStoriesSection() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const current = useMemo(() => testimonials[index], [index]);

  const goNext = () => setIndex((v) => (v + 1) % total);
  const goPrev = () => setIndex((v) => (v - 1 + total) % total);

  return (
    <section className="bg-[var(--purple)] py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold text-white md:text-5xl">
            Success Stories & Real Results
          </h2>
          <p className="font-display mt-4 text-lg font-semibold text-white/60 md:text-3xl">
            See What Our Clients Say and Discover Our Impactful Work
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 md:items-start">
          {/* LEFT: page-curl stack */}
          <div className="relative">
            {/* back page (always visible behind) */}
            <div className="absolute left-2 top-2 h-full w-full rounded-[22px] bg-white/10 blur-[0.2px]" />
            <div className="absolute left-4 top-4 h-full w-full rounded-[22px] bg-white/5" />

            <AnimatePresence mode="wait">
              <PageTurnCard
                key={index}
                data={current}
                index={index}
                total={total}
                onNext={goNext}
                onPrev={goPrev}
              />
            </AnimatePresence>
          </div>

          {/* RIGHT: use your component */}
          <PortfolioCard />
        </div>
      </div>
    </section>
  );
}

function PageTurnCard({
  data,
  index,
  total,
  onNext,
  onPrev,
}: {
  data: Testimonial;
  index: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <motion.div
      className="relative rounded-[22px] bg-[#D9C4FF] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
      style={{ transformStyle: "preserve-3d", perspective: 1200 }}
      initial={{ opacity: 0, rotateY: -25, x: -18 }}
      animate={{ opacity: 1, rotateY: 0, x: 0 }}
      exit={{ opacity: 0, rotateY: 25, x: 18 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.18}
      onDragEnd={(_, info) => {
        const power = swipePower(info.offset.x, info.velocity.x);
        if (power > 12000) {
          if (info.offset.x > 0) onPrev();
          else onNext();
        }
      }}
    >
      {/* header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white/40 ring-1 ring-white/30" />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-[var(--purple)]">{data.name}</p>
            <p className="text-xs text-[var(--purple)]/70">{data.role}</p>
          </div>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25 ring-1 ring-white/25">
          <span className="text-[var(--purple)]/80">×</span>
        </div>
      </div>

      {/* body */}
      <p className="mt-5 text-[15px] leading-6 text-[var(--purple)]/80">
        “{data.text}”
      </p>

      {/* swipe indicator */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="rounded-full border border-[var(--purple)]/25 bg-white/15 px-4 py-1 text-xs font-semibold text-[var(--purple)]/80 hover:bg-white/20"
        >
          Swipe {index + 1}/{total} →
        </button>
      </div>

      {/* Page-curl corner (stronger) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-28 w-28 rounded-bl-[70px]"
        style={{
          background:
            "conic-gradient(from 225deg, rgba(255,255,255,0.75), rgba(255,255,255,0) 55%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-28 w-28 rounded-tl-[50px]"
        style={{
          boxShadow: "-16px -16px 30px rgba(0,0,0,0.08)",
          opacity: 0.55,
        }}
      />
    </motion.div>
  );
}
