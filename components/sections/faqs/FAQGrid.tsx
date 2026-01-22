"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type FAQ = {
  id: string;
  q: string;
  a: string;
};

const faqs: FAQ[] = [
  {
    id: "1",
    q: "How long until we deliver your first blog post?",
    a: "Really boy law county she unable her sister. Feet you off its like like six. Among are leave law built now. In built table in an rapid blush. Merits behind on afraid or warmly.",
  },
  {
    id: "2",
    q: "How long until we deliver your first blog post?",
    a: "Answer goes here.",
  },
  {
    id: "3",
    q: "How long until we deliver your first blog post?",
    a: "Answer goes here.",
  },
  {
    id: "4",
    q: "How long until we deliver your first blog post?",
    a: "Answer goes here.",
  },
  {
    id: "5",
    q: "How long until we deliver your first blog post?",
    a: "Answer goes here.",
  },
];

export default function FAQGrid() {
  // Figma shows the FIRST card expanded by default.
  const [openId, setOpenId] = useState<string>("1");

  const leftCol = useMemo(() => [faqs[0], faqs[4]], []);
  const rightCol = useMemo(() => [faqs[1], faqs[2], faqs[3]], []);

  return (
    <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
      {/* LEFT COLUMN: expanded + collapsed */}
      <div className="space-y-8">
        {leftCol.map((item) => (
          <FAQCard
            key={item.id}
            item={item}
            open={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? "" : item.id)}
          />
        ))}
      </div>

      {/* RIGHT COLUMN: 3 collapsed */}
      <div className="space-y-8">
        {rightCol.map((item) => (
          <FAQCard
            key={item.id}
            item={item}
            open={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? "" : item.id)}
          />
        ))}
      </div>
    </div>
  );
}

function FAQCard({
  item,
  open,
  onToggle,
}: {
  item: FAQ;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "w-full rounded-[18px] bg-white text-left shadow-[0_10px_25px_rgba(83,35,143,0.10)]",
        "transition hover:shadow-[0_14px_35px_rgba(83,35,143,0.14)]"
      )}
    >
      <div className={cn("flex gap-4 px-6 py-5", open && "py-6")}>
        {/* Icon area (matches figma: plus/minus at left) */}
        <div className="mt-1 flex w-8 items-start justify-center">
          {open ? (
            <div className="mt-1 h-[2px] w-4 rounded-full bg-emerald-500" />
          ) : (
            <PlusIcon />
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#2B1B3F] md:text-[15px]">
            {item.q}
          </p>

          {open && (
            <p className="mt-3 max-w-[520px] text-xs leading-5 text-[#6E5A8A] md:text-sm md:leading-6">
              {item.a}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M9 3.2v11.6M3.2 9h11.6"
        stroke="#2B1B3F"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
