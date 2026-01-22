"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { caseStudies } from "@/app/data/portfolio";



export default function PortfolioCards() {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 md:gap-7">
      {caseStudies.map((item) => (
        <Link
          key={item.slug}
          href={`/portfolio/${item.slug}`}
          className="group"
        >
          <motion.article
            
            initial="initial"
            whileHover="hover"
            className="rounded-[18px] bg-[#C8A7FF] p-6 shadow-[0_10px_25px_rgba(83,35,143,0.12)] transition-shadow"
          >
            {/* Image box */}
            <div className="rounded-[14px] bg-white/20 p-4">
              <motion.div
                
                className="relative mx-auto h-[140px] w-full max-w-[220px] md:h-[160px] md:max-w-[240px]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 220px, 240px"
                  className="object-contain select-none"
                />
              </motion.div>
            </div>

            {/* Title + View pill */}
            <div className="mt-5 flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold text-[var(--purple)]">
                {item.title}
              </h3>

              {/* This “View” pill ALSO navigates */}
              <span className="rounded-full border border-[var(--purple)]/40 bg-white/20 px-4 py-1 text-xs font-medium text-[var(--purple)] transition group-hover:bg-white/30">
                View
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-[var(--purple)]/75">
              {item.shortDesc}
            </p>

            {/* subtle bottom glow like prototype */}
            <div className="mt-5 h-[1px] w-full bg-white/25 opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.article>
        </Link>
      ))}
    </div>
  );
}
