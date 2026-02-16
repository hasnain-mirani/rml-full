"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const content = {
  scale: {
    eyebrow: "FOR TEAMS READY TO GROW",
    title: "Scale with Us",
    desc: "Be part of our AI Angels Program and scale up your enterprise",
    href: "/services/scale",
    cta: "Apply Now",
  },
  innovate: {
    eyebrow: "FOR FOUNDERS & DOMAIN EXPERTS",
    title: "Innovate with Us",
    desc: "Become a co-founder by becoming a part of our AI Innovation Program",
    href: "/services/innovate",
    cta: "Apply Now",
  },
};

export default function FeaturesSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-svh w-full flex-col bg-white py-16 md:min-h-screen md:py-24">
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_30%_10%,rgba(111,42,167,0.07),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_70%_50%,rgba(0,0,0,0.04),transparent_60%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 sm:px-6">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 h-px w-12 bg-[#6F2AA7]/30" />
          <p className="text-xs font-semibold tracking-[0.25em] text-[#6F2AA7]/70 sm:text-sm">
            PATHS WE OFFER
          </p>

          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight text-black sm:mt-5 sm:text-[40px] md:text-[52px] lg:text-[64px]">
            Choose the way you{" "}
            <span className="text-[#6F2AA7]">want to build</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-black/50 sm:mt-5 sm:text-lg">
            Two engagement modes &mdash; both designed to deliver real outcomes
            with clear milestones.
          </p>
        </div>

        {/* Cards — separate rounded cards with gap */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 md:mt-14 md:grid-cols-2 md:gap-6">
          {/* ── SCALE ── */}
          <div className="group relative flex items-center justify-center overflow-hidden rounded-3xl p-8 sm:p-10 md:p-12 lg:p-14">
            {/* bg layers */}
            <div className="absolute inset-0 rounded-3xl bg-[#6F2AA7]" />
            <div className="absolute inset-0 bg-[radial-gradient(600px_400px_at_50%_0%,rgba(255,255,255,0.10),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(400px_400px_at_80%_100%,rgba(0,0,0,0.15),transparent_70%)]" />

            {/* sheen */}
            {!reduce && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-white/5 blur-2xl"
                animate={{ x: ["-25%", "420%"] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut",
                }}
              />
            )}

            <div className="relative flex w-full flex-col items-center text-center">
              {/* icon */}
              <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur sm:mb-8 sm:h-16 sm:w-16">
                <svg
                  className="h-7 w-7 text-white sm:h-8 sm:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                  />
                </svg>
              </div>

              <p className="text-[11px] font-semibold tracking-[0.22em] text-white/50 sm:text-xs">
                {content.scale.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold leading-[1.05] text-white sm:text-4xl md:text-[44px] lg:text-5xl">
                {content.scale.title}
              </h3>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/60 sm:text-base md:text-lg">
                {content.scale.desc}
              </p>

              <div className="mt-8 sm:mt-10">
                <Link
                  href={content.scale.href}
                  className={cn(
                    "group/btn inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold sm:h-13 sm:px-10 sm:text-base",
                    "bg-white text-[#6F2AA7] shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
                    "transition-all duration-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:scale-[1.02] active:scale-[0.98]"
                  )}
                >
                  {content.scale.cta}
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* ── INNOVATE ── */}
          <div className="group relative flex items-center justify-center overflow-hidden rounded-3xl border border-black/6 bg-[#FAFAFA] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-10 md:p-12 lg:p-14">
            {/* bg accent */}
            <div className="absolute inset-0 bg-[radial-gradient(600px_400px_at_50%_100%,rgba(111,42,167,0.04),transparent_70%)]" />

            <div className="relative flex w-full flex-col items-center text-center">
              {/* icon */}
              <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-[#6F2AA7]/6 ring-1 ring-[#6F2AA7]/10 sm:mb-8 sm:h-16 sm:w-16">
                <svg
                  className="h-7 w-7 text-[#6F2AA7] sm:h-8 sm:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
              </div>

              <p className="text-[11px] font-semibold tracking-[0.22em] text-black/40 sm:text-xs">
                {content.innovate.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold leading-[1.05] text-black sm:text-4xl md:text-[44px] lg:text-5xl">
                {content.innovate.title}
              </h3>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-black/50 sm:text-base md:text-lg">
                {content.innovate.desc}
              </p>

              <div className="mt-8 sm:mt-10">
                <Link
                  href={content.innovate.href}
                  className={cn(
                    "group/btn inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold sm:h-13 sm:px-10 sm:text-base",
                    "bg-[#6F2AA7] text-white shadow-[0_8px_30px_rgba(111,42,167,0.25)]",
                    "transition-all duration-200 hover:shadow-[0_12px_40px_rgba(111,42,167,0.35)] hover:scale-[1.02] active:scale-[0.98]"
                  )}
                >
                  {content.innovate.cta}
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
