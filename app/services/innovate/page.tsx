import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

const overview = [
  "The AI Innovation Program is a collaborative venture-building initiative designed for founders, researchers, and domain experts who bring real-world problems and want to co-develop scalable AI solutions.",
  "Rather than a traditional accelerator, this program focuses on problem-first innovation. We work closely with selected teams to co-design, build, validate, and commercialize AI-driven products through research-grade engineering, rapid iteration, and structured market enablement.",
  "In exchange, we pursue aligned incentives through equity participation and/or revenue-sharing models, ensuring long-term commitment to the success of each venture.",
];

const offerings = [
  {
    num: "01",
    title: "Business & Venture Development",
    desc: "We support participants in transforming early concepts into structured, fundable, and scalable ventures.",
    points: [
      "Problem discovery and market validation",
      "Business model design and monetization strategy",
      "Product-market fit assessment",
      "Competitive landscape analysis",
      "Startup structuring and roadmap planning",
      "Fundraising readiness and investor positioning",
    ],
  },
  {
    num: "02",
    title: "Technical Co-Development (Research-Grade Engineering)",
    desc: "Selected teams co-build their solutions with our technical experts through a structured and iterative development process.",
    points: [
      "AI solution architecture design",
      "Rapid prototyping and MVP development",
      "Model selection and experimentation (LLMs, Vision, Speech, etc.)",
      "Data strategy and dataset planning",
      "Scalable infrastructure guidance",
      "Research-backed experimentation and benchmarking",
      "Continuous product iteration based on user feedback",
    ],
    note: "Our approach combines academic rigor with practical product engineering to ensure solutions are both innovative and deployable.",
  },
  {
    num: "03",
    title: "Go-to-Market Enablement",
    desc: "Beyond building the technology, we help teams successfully bring their solutions to market.",
    points: [
      "Target customer segmentation",
      "Value proposition refinement",
      "Pricing and commercialization strategy",
      "Branding, messaging, and positioning",
      "Demo preparation and stakeholder pitching",
    ],
    note: "This ensures that solutions are not only technically sound but commercially viable.",
  },
  {
    num: "04",
    title: "Investment Pursuit & Capital Strategy",
    desc: "We actively support ventures in securing funding through aligned investment pathways.",
    points: [
      "Investment readiness preparation",
      "Pitch deck refinement and storytelling",
      "Investor targeting and warm introductions",
      "Alignment with angel investors and early-stage funds",
      "Strategic fundraising timeline planning",
      "Access to curated investor networks through our AI Angels initiative",
    ],
  },
];

const phases = [
  {
    label: "Phase 1",
    title: "Problem Intake & Evaluation",
    timeline: "3\u20134 weeks",
    desc: "Applicants submit a structured proposal outlining:",
    points: [
      "The problem they aim to solve",
      "Industry/domain context",
      "Existing research or concept (if any)",
      "Team background and expertise",
      "Desired outcomes (startup, product, pilot, etc.)",
    ],
    evalIntro: "Our review panel evaluates submissions based on:",
    evalPoints: [
      "Problem significance",
      "AI applicability",
      "Market potential",
      "Feasibility of co-development",
    ],
  },
  {
    label: "Phase 2",
    title: "Co-Design & Rapid Iteration",
    timeline: "4\u201312 weeks",
    desc: "Selected participants enter a hands-on co-building phase where we:",
    points: [
      "Refine the problem scope",
      "Design the technical solution architecture",
      "Develop and test prototypes",
      "Validate assumptions through iterative experimentation",
      "Align product direction with market needs",
    ],
    note: "This phase is highly collaborative and execution-focused.",
  },
  {
    label: "Phase 3",
    title: "Market Validation & Scaling Pathway",
    timeline: "Ongoing",
    desc: "Once a functional solution is validated, we support:",
    points: [
      "Pilot deployments with early users or partners",
      "Product refinement based on real-world feedback",
      "Go-to-market execution planning",
      "Investment pursuit or revenue pathway structuring",
    ],
    note: "Teams may then transition into fundraising, venture scaling, or integration with strategic partners.",
  },
];

const whoShouldApply = [
  "Founders with strong problem statements but early-stage solutions",
  "Researchers seeking to commercialize AI innovations",
  "Domain experts (healthcare, finance, education, accessibility, etc.)",
  "Early-stage AI builders needing technical and venture co-creation support",
  "Individuals or teams with validated industry pain points",
];

export default function InnovatePage() {
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
            INNOVATE WITH US
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            AI Innovation Program
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg">
            Become a co-founder by becoming a part of our AI Innovation Program
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

      {/* What We Offer */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
          <SectionHeading>What We Offer</SectionHeading>
          <div className="mt-8 space-y-6">
            {offerings.map((o) => (
              <div
                key={o.num}
                className="rounded-3xl border border-black/8 bg-gradient-to-br from-[#FAFAFA] to-white p-6 shadow-sm sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#6F2AA7]/10 text-sm font-bold text-[#6F2AA7]">
                    {o.num}
                  </span>
                  <h3 className="text-lg font-semibold text-black sm:text-xl">
                    {o.title}
                  </h3>
                </div>
                <p className="mt-4 text-base leading-relaxed text-black/60">
                  {o.desc}
                </p>
                <ul className="mt-4 space-y-2">
                  {o.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-2.5 text-base text-black/70"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#6F2AA7]/40" />
                      {pt}
                    </li>
                  ))}
                </ul>
                {o.note && (
                  <p className="mt-4 text-sm italic text-black/50">{o.note}</p>
                )}
              </div>
            ))}
          </div>

          {/* Compensation callout */}
          <div className="mt-8 rounded-2xl border border-[#6F2AA7]/15 bg-[#6F2AA7]/5 p-6">
            <p className="text-base font-medium leading-relaxed text-[#6F2AA7]">
              Our compensation model is based on equity and/or revenue sharing,
              aligning our long-term incentives with the success of the ventures
              we co-build.
            </p>
          </div>
        </div>
      </section>

      {/* Program Structure */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <SectionHeading>Program Structure</SectionHeading>
        <div className="mt-8 space-y-8">
          {phases.map((ph, idx) => (
            <div key={ph.label} className="relative pl-10 sm:pl-12">
              {/* Timeline dot + line */}
              <div className="absolute left-0 top-0 flex h-full flex-col items-center">
                <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full border-2 border-[#6F2AA7] bg-white text-[10px] font-bold text-[#6F2AA7]">
                  {idx + 1}
                </span>
                {idx < phases.length - 1 && (
                  <span className="w-px flex-1 bg-[#6F2AA7]/15" />
                )}
              </div>

              <div className="-mt-0.5">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6F2AA7]">
                    {ph.label}
                  </span>
                  <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-medium text-black/50">
                    {ph.timeline}
                  </span>
                </div>
                <h3 className="mt-1.5 text-lg font-semibold text-black sm:text-xl">
                  {ph.title}
                </h3>
                <p className="mt-2 text-base text-black/60">{ph.desc}</p>
                <ul className="mt-3 space-y-2">
                  {ph.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-2.5 text-base text-black/70"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6F2AA7]/40" />
                      {pt}
                    </li>
                  ))}
                </ul>
                {"evalIntro" in ph && ph.evalIntro && (
                  <>
                    <p className="mt-4 text-base text-black/60">
                      {ph.evalIntro}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {(ph.evalPoints ?? []).map((ep) => (
                        <li
                          key={ep}
                          className="flex items-start gap-2.5 text-base text-black/70"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6F2AA7]/40" />
                          {ep}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {ph.note && (
                  <p className="mt-3 text-sm italic text-black/50">
                    {ph.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who Should Apply */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
          <SectionHeading>Who Should Apply?</SectionHeading>
          <p className="mt-5 text-base text-black/60 md:text-lg">
            We are specifically looking for:
          </p>
          <ul className="mt-4 space-y-3">
            {whoShouldApply.map((pt) => (
              <li
                key={pt}
                className="flex items-start gap-3 text-base text-black/70 md:text-lg"
              >
                <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#6F2AA7]" />
                {pt}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#6F2AA7] to-[#3D1566] py-16 text-center text-white sm:py-20 md:py-24">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Ready to build the future?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            Join the AI Innovation Program and turn your vision into a scalable
            AI venture.
          </p>
          <div className="mt-8">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLScO8SSx6kZcsut3HFcdYZQXzJma5phtqdm8rO591R51T_0bTA/viewform"
              className="inline-flex h-14 items-center justify-center rounded-full bg-white px-10 text-base font-semibold text-[#6F2AA7] shadow-lg transition hover:bg-white/90 active:scale-[0.98]"
            >
              Apply
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-2xl font-bold text-black sm:text-3xl">
      <span className="h-px w-10 bg-[#6F2AA7]/30" />
      {children}
    </h2>
  );
}
