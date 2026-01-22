"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PortfolioCard() {
  return (
    <Link href="/portfolio" className="block">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full rounded-[22px] bg-[#D9C4FF] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
      >
        {/* Image box */}
        <div className="rounded-[18px] bg-white/20 p-4">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative mx-auto h-[180px] w-full max-w-[420px] md:h-[200px]"
          >
            <Image
              src="/images/portfolio-card.png"
              alt="Portfolio"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 90vw, 420px"
            />
          </motion.div>
        </div>

        {/* Title + View pill */}
        <div className="mt-6 flex items-center gap-4">
          <h3 className="font-display text-3xl font-semibold text-[#7F289A]">
            Portfolio
          </h3>

          <span className="rounded-full border border-[#7F289A]/35 bg-white/10 px-5 py-1 text-xs font-semibold text-[#7F289A] transition hover:bg-white/20">
            View
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm leading-6 text-[#7F289A]/75">
          Explore our portfolio to see how Revelation ML transforms challenge into opportunity.
          Each project tells a story of breakthrough solutions, tangible results, and happy clients.
        </p>
      </motion.article>
    </Link>
  );
}
