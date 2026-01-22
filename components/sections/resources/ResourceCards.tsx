import Image from "next/image";
import Link from "next/link";

type Card = {
  title: string;
  desc: string;
  img: string;
  href: string;
};

const cards: Card[] = [
  {
    title: "Blog",
    desc: "Latest trends. Breakthrough findings. Practical tips. Fuel your next move with our fresh perspectives on everything AI.",
    img: "/images/resources-blog.png",
    href: "/blog",
  },
  {
    title: "Podcast",
    desc: "Tune in for candid conversations and fresh perspectives with AI pioneers, industry disruptors, and our own in-house experts.",
    img: "/images/resources-podcast.png",
    href: "/podcast",
  },
  {
    title: "Portfolio",
    desc: "Tune in for candid conversations and fresh perspectives with AI pioneers, industry disruptors, and our own in-house experts.",
    img: "/images/resources-portfolio.png",
    href: "/portfolio",
  },
];

export default function ResourceCards() {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 md:gap-7">
      {cards.map((c) => (
        <Link
          key={c.title}
          href={c.href}
          className="group rounded-[16px] bg-[#C8A7FF] p-6 shadow-[0_10px_25px_rgba(83,35,143,0.12)] transition hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(83,35,143,0.18)]"
        >
          {/* Image box */}
          <div className="flex h-[140px] items-center justify-center rounded-[12px] bg-white/20">
            <Image
              src={c.img}
              alt={c.title}
              width={220}
              height={150}
              className="h-auto w-[210px] select-none"
              priority
            />
          </div>

          {/* Title row */}
          <div className="mt-5 flex items-center justify-between">
            <h3 className="font-display text-2xl font-semibold text-[var(--purple)]">
              {c.title}
            </h3>

            <span className="rounded-full border border-[var(--purple)]/40 bg-white/15 px-4 py-1 text-xs font-semibold text-[var(--purple)]">
              View
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-[var(--purple)]/75">
            {c.desc}
          </p>
        </Link>
      ))}
    </div>
  );
}
