import Image from "next/image";

type Service = {
  title: string;
  image: string;
  bullets: string[];
};

const services: Service[] = [
  {
    title: "Generative AI Strategy:",
    image: "/images/service-generative-ai.png",
    bullets: [
      "Craft the roadmap to an AI-driven reality with tailored business blueprints focused on real-world impact.",
      "Conduct stakeholder workshops and in-depth data readiness assessments to understand your unique environment.",
      "Develop a strategic blueprint that identifies high-impact AI use cases and defines clear milestones, from pilot projects to full-scale deployment.",
    ],
  },
  {
    title: "Cloud Management for AI:",
    image: "/images/service-cloud.png",
    bullets: [
      "Analyze your current infrastructure and design scalable cloud architectures tailored for machine learning and AI applications.",
      "Automate provisioning and proactively manage cloud costs to deliver higher performance with less expense—and zero headaches.",
      "Ensure your AI systems remain fast, responsive, and ready to scale as your business evolves.",
    ],
  },
  {
    title: "Enterprise AI Roadmaps:",
    image: "/images/service-roadmaps.png",
    bullets: [
      "Unlock a data-driven path for your entire organization, eliminating guesswork at every stage.",
      "Structure AI deployment in clear phases—starting with pilot projects to prove value, then responsibly scaling solutions across departments.",
      "Continuously measure and optimize performance, building AI capabilities as an integrated, sustainable part of your business DNA.",
    ],
  },
  {
    title: "AI Risk & Compliance:",
    image: "/images/service-risk.png",
    bullets: [
      "Ensure your AI systems are secure, compliant, and prepared for the future, giving you peace of mind.",
      "Benefit from continuous risk monitoring, detailed audit trails, and adherence to industry best practices.",
      "Avoid costly penalties while building trust with customers and stakeholders through responsible and transparent AI deployments.",
    ],
  },
  {
    title: "Industry Solutions:",
    image: "/images/service-industry.png",
    bullets: [
      "Tailor AI innovations specifically for your sector’s unique challenges, whether healthcare, retail, public sector, or beyond.",
      "Combine deep domain expertise with advanced AI technologies to deliver practical, effective solutions.",
      "Develop scalable applications that enhance operational excellence and create a clear competitive advantage, customized for your industry’s needs.",
    ],
  },
];

export default function ServicesList() {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="space-y-10 md:space-y-12">
          {services.map((s) => (
            <article
              key={s.title}
              className="overflow-hidden rounded-[18px] bg-[#C8A7FF] px-5 py-6 md:px-10 md:py-10"
            >
              <div className="grid items-center gap-8 md:grid-cols-[360px_1fr] md:gap-10">
                {/* Image */}
                <div className="flex justify-center md:justify-start">
                  <Image
                    src={s.image}
                    alt={s.title}
                    width={420}
                    height={320}
                    className="h-auto w-[260px] md:w-[320px]"
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display text-2xl font-semibold text-[var(--purple)] md:text-3xl">
                    {s.title}
                  </h3>

                  <ul className="mt-4 space-y-3 text-[15px] leading-6 text-[var(--purple)]/80 md:mt-5">
                    {s.bullets.map((b, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-[var(--purple)]/70" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
