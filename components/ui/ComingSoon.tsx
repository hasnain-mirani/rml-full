"use client";

import { motion } from "framer-motion";

type Props = {
  title?: string;
  subtitle?: string;
};

const floatVariants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

const pulseRing = {
  animate: {
    scale: [1, 1.5, 1],
    opacity: [0.4, 0, 0.4],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
  },
};

const dotVariants = {
  animate: (i: number) => ({
    opacity: [0.3, 1, 0.3],
    y: [0, -6, 0],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.2,
    },
  }),
};

export default function ComingSoon({
  title = "Coming Soon",
  subtitle = "We're working on something exciting. Stay tuned!",
}: Props) {
  return (
    <div className="relative mt-6 overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-white via-purple-50/40 to-indigo-50/40 py-20 text-center">
      {/* Background decorative blobs */}
      <motion.div
        className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-purple-200/30 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Animated icon */}
        <div className="relative">
          <motion.div variants={pulseRing} animate="animate" className="absolute inset-0 rounded-full bg-purple-400/20" />
          <motion.div
            variants={floatVariants}
            animate="animate"
            className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/25"
          >
            <svg
              className="h-9 w-9 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
              />
            </svg>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl"
        >
          {title}
        </motion.h3>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500 sm:text-base"
        >
          {subtitle}
        </motion.p>

        {/* Animated dots */}
        <div className="mt-6 flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              custom={i}
              variants={dotVariants}
              animate="animate"
              className="inline-block h-2 w-2 rounded-full bg-purple-500"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
