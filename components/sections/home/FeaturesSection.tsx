import Image from "next/image";

const features = [
  {
    title: "Automate the Repetitive",
    desc:
      "Unlock peak productivity by automating tedious, routine tasks. Smart features like AI-powered scheduling, instant data syncing, and automatic notifications eliminate bottlenecks—so teams stay focused on what matters most.",
    img: "/images/feature-1.png",
  },
  {
    title: "Optimize Workflows in Real Time",
    desc:
      "Leverage intuitive dashboards and smart analytics to spot inefficiencies and make instant improvements. With seamless integration and continuous monitoring, improvements never stop—delivering streamlined results, faster and smarter every day.",
    img: "/images/feature-2.png",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-center text-4xl font-semibold text-[var(--purple)] md:text-5xl">
          Streamlined features for <br className="hidden md:block" />
          maximum efficiency.
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-[22px] bg-[#8D63B7] px-10 pb-10 pt-14 text-white"
            >
              <div className="flex justify-center">
                <Image
                  src={f.img}
                  alt={f.title}
                  width={320}
                  height={260}
                  className="h-auto w-[320px]"
                />
              </div>

              <h3 className="mt-10 font-display text-2xl font-semibold">
                {f.title}
              </h3>

              <p className="mt-4 text-sm leading-6 text-white/85">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* bottom purple strip seen in screenshot */}
      <div className="mt-16 h-10 bg-[var(--purple)]" />
    </section>
  );
}
