import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/app/data/portfolio";
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;

  const caseStudy = caseStudies.find((c) => c.slug === slug);
  if (!caseStudy) return notFound();

  return (
    <main className="bg-[var(--bg-soft)]">
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-16">
        <Link
          href="/portfolio"
          className="inline-flex items-center text-sm text-[var(--purple)]/70 hover:text-[var(--purple)]"
        >
          ← Back to Portfolio
        </Link>

        <div className="mt-8 grid gap-8 md:grid-cols-[520px_1fr] md:items-start">
          {/* Left Visual */}
          <div className="rounded-[22px] bg-[#C8A7FF] p-8 shadow-[0_12px_30px_rgba(83,35,143,0.14)]">
            <div className="flex h-[260px] items-center justify-center rounded-[16px] bg-white/20">
              <Image
                src={caseStudy.image}
                alt={caseStudy.title}
                width={360}
                height={260}
                className="w-[300px]"
                priority
              />
            </div>

            <div className="mt-6">
              <p className="text-xs font-medium text-[var(--purple)]/70">
                {caseStudy.category ?? "Case Study"}
              </p>
              <h1 className="font-display mt-2 text-3xl font-semibold text-[var(--purple)]">
                {caseStudy.title}
              </h1>
              <p className="mt-3 text-sm leading-6 text-[var(--purple)]/75">
                {caseStudy.shortDesc}
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <h2 className="font-display text-2xl font-semibold text-[var(--purple)]">
              Overview
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--purple)]/75">
              {caseStudy.overview}
            </p>

            <h3 className="font-display mt-10 text-xl font-semibold text-[var(--purple)]">
              Key Highlights
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--purple)]/75">
              {caseStudy.highlights.map((h, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-[var(--purple)]/70" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-display mt-10 text-xl font-semibold text-[var(--purple)]">
              Results
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {caseStudy.results.map((r) => (
                <div
                  key={r.label}
                  className="rounded-[16px] bg-white/60 p-5 shadow-[0_8px_20px_rgba(83,35,143,0.08)] backdrop-blur"
                >
                  <p className="text-xs text-[var(--purple)]/60">{r.label}</p>
                  <p className="mt-2 font-display text-2xl font-semibold text-[var(--purple)]">
                    {r.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
