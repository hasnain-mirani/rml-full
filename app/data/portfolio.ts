export type CaseStudy = {
  slug: string;
  title: string;
  shortDesc: string;
  image: string; // /images/...
  category?: string;
  overview: string;
  highlights: string[];
  results: { label: string; value: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "case-study-1",
    title: "Case Study 1",
    shortDesc:
      "Latest trends. Breakthrough findings. Practical tips. Fuel your next move with our fresh perspectives on everything AI.",
    image: "/images/portfolio-1.png",
    category: "Automation",
    overview:
      "A structured delivery to streamline workflows and unlock faster execution across teams with reliable automation.",
    highlights: [
      "Mapped bottlenecks and automated repetitive flows",
      "Improved handoffs with clearer operational steps",
      "Introduced dashboards for measurable progress",
    ],
    results: [
      { label: "Time Saved", value: "40%" },
      { label: "Process Speed", value: "2.1x" },
      { label: "Adoption", value: "92%" },
    ],
  },
  {
    slug: "case-study-2",
    title: "Case Study 2",
    shortDesc:
      "Tune in for candid conversations and fresh perspectives with AI pioneers, industry disruptors, and our own in-house experts.",
    image: "/images/portfolio-2.png",
    category: "Cloud + AI",
    overview:
      "Designed scalable cloud foundations for AI workloads with cost controls and performance optimization.",
    highlights: [
      "Scalable architecture for ML/AI workloads",
      "Proactive cost monitoring and automation",
      "Reliability improvements with observability",
    ],
    results: [
      { label: "Cost Reduction", value: "28%" },
      { label: "Latency", value: "-35%" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    slug: "case-study-3",
    title: "Case Study 3",
    shortDesc:
      "Tune in for candid conversations and fresh perspectives with AI pioneers, industry disruptors, and our own in-house experts.",
    image: "/images/portfolio-3.png",
    category: "Product Engineering",
    overview:
      "Built a clean, responsive product experience aligned with business goals and measurable outcomes.",
    highlights: [
      "Pixel-perfect UI build from Figma",
      "Improved information architecture",
      "Conversion-focused interaction design",
    ],
    results: [
      { label: "Conversion", value: "+19%" },
      { label: "Bounce Rate", value: "-22%" },
      { label: "Time to Ship", value: "3 weeks" },
    ],
  },
];
