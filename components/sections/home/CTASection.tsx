"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";


type CtaCard = {
  id: string;
  title: string;
  desc: string;
  image: string;
  href?: string;
};

const cards: CtaCard[] = [
  {
    id: "blog",
    title: "Blog",
    desc: "Latest trends. Breakthrough findings. Practical tips. Fuel your next move with our fresh perspectives on everything AI.",
    image: "/images/cta-blog.png",
    href: "/blog",
  },
  {
    id: "podcast",
    title: "Podcast",
    desc: "Tune in for candid conversations and fresh perspectives with AI pioneers, industry disruptors, and our own in-house experts.",
    image: "/images/cta-podcast.png",
    href: "/podcasts",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    desc: "Explore real outcomes, measurable results, and practical case studies that show what production-grade AI looks like.",
    image: "/images/cta-portfolio.png",
    href: "/portfolio",
  },
];

export default function CTASection() {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#ffffff] md:h-screen">
     
      {/* background depth */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_650px_at_50%_10%,rgba(255,255,255,0.14),rgba(0,0,0,0)_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_50%_85%,rgba(0,0,0,0.35),rgba(0,0,0,0)_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.12),rgba(0,0,0,0.22))]" />
      </div>

      {/* ambient rings */}
      {!reduce && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-24 top-20 h-[520px] w-[520px] rounded-full border border-white/15 blur-[1px]"
            animate={{ rotate: [0, 25, 0], x: [0, 18, 0], y: [0, 10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -right-28 bottom-10 h-[620px] w-[620px] rounded-full border border-black/30 blur-[1px]"
            animate={{ rotate: [0, -22, 0], x: [0, -16, 0], y: [0, -10, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative mx-auto flex min-h-full max-w-6xl items-center px-3 py-8 sm:px-4 sm:py-10 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
          className={cn(
            "relative w-full overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[28px]",
            "border border-white/14 bg-black/55 backdrop-blur-xl",
            "shadow-[0_35px_120px_rgba(0,0,0,0.45)]"
          )}
        >
          {/* subtle top highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/25" />

          {/* soft inner glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_20%,rgba(111,42,167,0.35),transparent_65%)]" />

          {/* sheen */}
          {!reduce && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-white/10 blur-2xl"
              animate={{ x: ["-30%", "420%"] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatDelay: 2.8,
                ease: "easeInOut",
              }}
            />
          )}

          <div className="relative px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-14">
            {/* heading */}
            <div className="text-center">
              <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl md:text-4xl lg:text-5xl">
                Checkout our latest Posts
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:mt-4 sm:text-base">
                Stay Ahead: AI Insights &amp; Expertise
              </p>
            </div>

            {/* ✅ Glass cards */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-5 md:mt-10 md:grid-cols-3 md:gap-6">
              {cards.map((c) => {
                const Card = (
                  <motion.article
                    whileHover={reduce ? undefined : { y: -6 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "group relative overflow-hidden rounded-[22px]",
                      "border border-white/22",
                      "bg-white/14 backdrop-blur-xl",
                      "shadow-[0_22px_70px_rgba(0,0,0,0.22)]"
                    )}
                  >
                    {/* glossy highlight */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_260px_at_30%_10%,rgba(255,255,255,0.26),transparent_70%)]" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />

                    {/* Mobile: horizontal row / Desktop: stacked */}
                    <div className="relative flex items-center gap-4 p-4 sm:block sm:p-0">
                      {/* image */}
                      <div className="relative grid shrink-0 place-items-center sm:px-6 sm:pt-6 md:pt-8">
                        <div className="relative h-[80px] w-[100px] sm:h-[120px] sm:w-[180px] md:h-[160px] md:w-[240px]">
                          <Image
                            src={c.image}
                            alt={c.title}
                            fill
                            className="object-contain object-center"
                            sizes="(max-width: 640px) 100px, (max-width: 768px) 180px, 240px"
                          />
                        </div>
                      </div>

                      {/* content */}
                      <div className="relative min-w-0 sm:px-5 sm:pb-6 sm:pt-4 md:px-6 md:pb-7 md:pt-6">
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="font-display text-base font-semibold text-white sm:text-lg md:text-2xl">
                            {c.title}
                          </h4>

                          {/* view pill */}
                          <div
                            className={cn(
                              "inline-flex shrink-0 items-center justify-center rounded-full px-3 py-0.5 text-[10px] font-medium sm:px-4 sm:py-1 sm:text-xs",
                              "border border-white/25 bg-white/10 text-white/90",
                              "transition group-hover:bg-white/15"
                            )}
                          >
                            View
                          </div>
                        </div>

                        <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-white/75 sm:mt-3 sm:line-clamp-none sm:text-sm">
                          {c.desc}
                        </p>
                      </div>
                    </div>

                    {/* soft bottom shading */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(to_top,rgba(0,0,0,0.25),transparent)] sm:h-24" />
                  </motion.article>
                );

                return c.href ? (
                  <Link key={c.id} href={c.href} className="block">
                    {Card}
                  </Link>
                ) : (
                  <div key={c.id}>{Card}</div>
                );
              })}
            </div>

           
          </div>
        </motion.div>
      </div>
    </section>
  );
}
