"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/our-story" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="w-full pt-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative mx-auto w-full rounded-full bg-[var(--purple)] px-4 py-3 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo (IMAGE ONLY) */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Revelation ML"
                width={44}
                height={44}
                priority
                className="h-11 w-11"
              />
            </Link>

            {/* Desktop Links */}
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-white/90 hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button className="rounded-full bg-[var(--purple-dark)] px-6 text-white hover:opacity-95">
                View Demos
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* Mobile dropdown */}
          {open && (
            <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-50 mx-auto w-full rounded-2xl bg-[var(--purple)] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.18)] ring-1 ring-white/15 md:hidden">
              <nav className="flex flex-col gap-2">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm text-white/90 hover:bg-white/10 hover:text-white"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              <Button
                onClick={() => setOpen(false)}
                className="mt-4 h-11 w-full rounded-full bg-[var(--purple-dark)] text-white hover:opacity-95"
              >
                View Demos
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
