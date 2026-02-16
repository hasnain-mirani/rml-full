import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

const overview = [
  "The AI Angels Program is a curated investment and mentorship platform that connects vetted early-stage AI startups with private angel investors, micro-VCs, and strategic AI operators.",
  "Our mission is to reduce funding friction for high-potential AI startups by providing structured evaluation, investor alignment, technical consultancy, and hands-on support throughout the fundraising journey.",
  "Unlike generic pitch forums, the program focuses on quality deal flow, technical validation, and meaningful investor engagement.",
];

const phases = [
  {
    label: "Phase 1",
    title: "Application & Screening",
    timeline: "3\u20134 weeks",
    desc: "Startups submit a standardised funding dossier through our online application form. Our review committee, comprised of AI industry experts, technical advisors, and early-stage investors, evaluates each application based on:",
    points: [
      "Technical feasibility",
      "Market relevance",
      "Team capability",
      "Scalability potential",
      "Funding readiness",
    ],
  },
  {
    label: "Phase 2",
    title: "Investor Matching & Due Diligence",
    timeline: "4\u20138 weeks",
    desc: "During this phase, selected startups receive structured support designed to strengthen their investment readiness and fundraising outcomes.",
    startupsReceive: [
      "Curated investor matching based on sector, stage, and thesis alignment",
      "Pitch deck refinement and narrative positioning support",
      "Technical consultancy to strengthen product",
      "Fundraising strategy guidance (valuation, round structure, timelines)",
      "1:1 mentorship sessions with AI founders and domain experts",
      "Market positioning and go-to-market feedback",
      "Data room preparation guidance for due diligence",
    ],
    startupsNote:
      "This structured preparation ensures startups engage investors with clarity, credibility, and strong technical positioning.",
    investorsReceive: [
      "Access to a curated pipeline of pre-vetted AI startups",
      "Structured startup dossiers with key metrics and evaluation summaries",
      "Technical due diligence insights from AI experts",
      "Early access to high-potential startups before public exposure",
      "Facilitated 1:1 meetings with aligned founders",
      "Investor briefings and startup performance snapshots",
    ],
    investorsNote:
      "Our goal is to significantly reduce investor noise while increasing access to credible, technically sound AI ventures.",
  },
  {
    label: "Phase 3",
    title: "AI Angels Meetup",
    timeline: "Invite-only event",
    desc: "The AI Angels Meetup is a curated, invite-only forum where selected startups engage directly with aligned investors in a high-signal environment.",
    meetupFormat: [
      "Founder pitch presentations",
      "Live product demonstrations",
      "Investor Q&A sessions",
      "Curated 1:1 investor-founder meetings",
      "Closed-door networking with angels, operators, and micro-VCs",
    ],
    highlight:
      "This is not a mass demo day. Instead, it is a focused investment forum designed to foster meaningful conversations, deeper due diligence, and high-quality funding connections.",
  },
];

const whoShouldApply = {
  intro: "We are specifically looking for:",
  points: [
    "Early-stage AI startups (Pre-seed to Seed)",
    "Research-driven AI products transitioning to market",
    "Applied AI solutions (LLMs, Speech, Vision, AI Infrastructure, etc.)",
    "Strong technical founding teams with scalable vision",
  ],
  closing:
    "The AI Angels Program is designed for founders who are actively preparing to raise capital and are seeking aligned, long-term investors rather than transactional funding exposure.",
};

export default function ScalePage() {
  return (
    <main className="min-h-screen bg-[var(--bg-soft)]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#6F2AA7] to-[#3D1566] pb-16 pt-32 text-white sm:pb-20 sm:pt-36 md:pb-28 md:pt-44">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-purple-400/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs font-medium tracking-[0.25em] text-white/50 sm:text-sm">
            SCALE WITH US
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            AI Angels Program
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg">
            Be part of our AI Angels Program and scale up your enterprise
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <SectionHeading>Overview</SectionHeading>
        <div className="mt-6 space-y-4">
          {overview.map((p, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-black/65 md:text-lg"
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Program Structure */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
          <SectionHeading>Program Structure</SectionHeading>

          <div className="mt-8 space-y-10">
            {/* Phase 1 */}
            <PhaseBlock phase={phases[0]}>
              <p className="mt-3 text-base text-black/60">{phases[0].desc}</p>
              <BulletList items={phases[0].points} />
            </PhaseBlock>

            {/* Phase 2 */}
            <PhaseBlock phase={phases[1]}>
              <p className="mt-3 text-base text-black/60">{phases[1].desc}</p>

              {/* What Startups Receive */}
              <div className="mt-5 rounded-2xl border border-black/8 bg-gradient-to-br from-[#FAFAFA] to-white p-5 sm:p-6">
                <h4 className="text-base font-semibold text-black">
                  What Startups Receive
                </h4>
                <BulletList items={phases[1].startupsReceive!} />
                <p className="mt-3 text-sm italic text-black/50">
                  {phases[1].startupsNote}
                </p>
              </div>

              {/* Support for Investors */}
              <div className="mt-4 rounded-2xl border border-black/8 bg-gradient-to-br from-[#FAFAFA] to-white p-5 sm:p-6">
                <h4 className="text-base font-semibold text-black">
                  Support for Investors
                </h4>
                <p className="mt-2 text-sm text-black/60">
                  Meanwhile, we also support investors through:
                </p>
                <BulletList items={phases[1].investorsReceive!} />
                <p className="mt-3 text-sm italic text-black/50">
                  {phases[1].investorsNote}
                </p>
              </div>
            </PhaseBlock>

            {/* Phase 3 */}
            <PhaseBlock phase={phases[2]}>
              <p className="mt-3 text-base text-black/60">{phases[2].desc}</p>

              <div className="mt-5 rounded-2xl border border-black/8 bg-gradient-to-br from-[#FAFAFA] to-white p-5 sm:p-6">
                <h4 className="text-base font-semibold text-black">
                  Meetup Format
                </h4>
                <BulletList items={phases[2].meetupFormat!} />
              </div>

              {/* Highlight callout */}
              <div className="mt-4 rounded-2xl border border-[#6F2AA7]/15 bg-[#6F2AA7]/5 p-5">
                <p className="text-sm font-medium leading-relaxed text-[#6F2AA7]">
                  {phases[2].highlight}
                </p>
              </div>
            </PhaseBlock>
          </div>
        </div>
      </section>

      {/* Who Should Apply */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <SectionHeading>Who Should Apply?</SectionHeading>
        <p className="mt-5 text-base text-black/60 md:text-lg">
          {whoShouldApply.intro}
        </p>
        <ul className="mt-4 space-y-3">
          {whoShouldApply.points.map((pt) => (
            <li
              key={pt}
              className="flex items-start gap-3 text-base text-black/70 md:text-lg"
            >
              <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#6F2AA7]" />
              {pt}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-base leading-relaxed text-black/60 md:text-lg">
          {whoShouldApply.closing}
        </p>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#6F2AA7] to-[#3D1566] py-16 text-center text-white sm:py-20 md:py-24">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Ready to scale your AI venture?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            Join the AI Angels Program and connect with the right investors to
            fuel your growth.
          </p>
          <div className="mt-8">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSd47cVk8H82LJ_7qpEmGz-ztzzU06GvdH9z4vOHpE7tnmaE_g/viewform
"
              className="inline-flex h-14 items-center justify-center rounded-full bg-white px-10 text-base font-semibold text-[#6F2AA7] shadow-lg transition hover:bg-white/90 active:scale-[0.98]"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─── Helper Components ─── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-2xl font-bold text-black sm:text-3xl">
      <span className="h-px w-10 bg-[#6F2AA7]/30" />
      {children}
    </h2>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((pt) => (
        <li
          key={pt}
          className="flex items-start gap-2.5 text-base text-black/70"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6F2AA7]/40" />
          {pt}
        </li>
      ))}
    </ul>
  );
}

function PhaseBlock({
  phase,
  children,
}: {
  phase: { label: string; title: string; timeline: string };
  children: React.ReactNode;
}) {
  return (
    <div className="relative pl-10 sm:pl-12">
      <div className="absolute left-0 top-0 flex h-full flex-col items-center">
        <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full border-2 border-[#6F2AA7] bg-white text-[10px] font-bold text-[#6F2AA7]">
          {phase.label.replace("Phase ", "")}
        </span>
        <span className="w-px flex-1 bg-[#6F2AA7]/15" />
      </div>
      <div className="-mt-0.5">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6F2AA7]">
            {phase.label}
          </span>
          <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-medium text-black/50">
            {phase.timeline}
          </span>
        </div>
        <h3 className="mt-1.5 text-lg font-semibold text-black sm:text-xl">
          {phase.title}
        </h3>
        {children}
      </div>
    </div>
  );
}
