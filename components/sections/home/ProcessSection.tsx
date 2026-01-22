const steps = [
  {
    no: "01",
    title: "Discover & Align",
    desc:
      "Start by identifying your team’s unique strengths and challenges. Map out workflows and goals so everyone is moving together, empowered by clarity and shared vision.",
  },
  {
    no: "02",
    title: "Automate & Simplify",
    desc:
      "Leverage cutting-edge tools to remove repetitive tasks and bottlenecks. Free your teams to focus on innovative, meaningful work—with seamless processes powered by smart automation and AI.",
  },
  {
    no: "03",
    title: "Collaborate & Grow",
    desc:
      "Foster a culture of open feedback, continuous learning, and cross-team collaboration. Watch as your empowered teams unlock new heights of productivity, creativity, and impact—together.",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-[var(--purple)] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-center text-4xl font-semibold text-white md:text-5xl">
          Empowering your teams through <br className="hidden md:block" />
          streamlined processes.
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.no}
              className="rounded-[10px] bg-white px-8 py-10 text-center"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-fuchsia-400 text-sm font-semibold text-[var(--purple)]">
                {s.no}
              </div>

              <h3 className="mt-6 text-lg font-semibold text-[var(--purple)]">
                {s.title}
              </h3>

              <p className="mt-4 text-sm leading-6 text-[var(--purple)]/80">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
