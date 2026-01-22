import Link from "next/link";

const columns = [
  {
    title: "Company",
    links: ["Home", "About", "Price", "Blog", "FAQ"],
  },
  {
    title: "Feature",
    links: ["Career", "Integration", "Team", "Terms & Condition", "Privacy Policy", "Feature"],
  },
  {
    title: "Authentication",
    links: ["Login", "Sign up", "Forgot", "Confirm email"],
  },
  {
    title: "Utility pages",
    links: ["Style Guide", "Change log", "404 Page", "Licenses", "Protected"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-soft)] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-14 md:grid-cols-5">
          {/* brand */}
          <div>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-[var(--purple)]" />
              <h4 className="font-display text-3xl font-semibold text-[var(--purple)]">
                Revelation ML
              </h4>
            </div>

            <p className="mt-8 max-w-[280px] text-sm leading-6 text-slate-600">
              Ready to accelerate your AI journey? Whether you have a quick question or want
              to partner on an ambitious project, we want to hear from you.
            </p>
          </div>

          {/* columns */}
          {columns.map((c) => (
            <div key={c.title}>
              <p className="text-sm font-semibold text-[var(--purple)]">{c.title}</p>
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                {c.links.map((l) => (
                  <li key={l}>
                    <Link href="#" className="hover:text-slate-900">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
