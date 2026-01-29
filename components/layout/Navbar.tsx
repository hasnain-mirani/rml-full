"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/our-story" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faq" },
];

function isRouteActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Navbar({
  scrollContainerRef,
}: {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const pathname = usePathname();

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const lastY = useRef(0);

<<<<<<< HEAD
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const onScroll = () => {
      const y = el.scrollTop;

      setScrolled(y > 8);

      if (y > lastY.current && y > 120) {
        setHidden(true); // scrolling down
      } else if (y < lastY.current) {
        setHidden(false); // scrolling up
      }

      lastY.current = y;
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [scrollContainerRef]);
=======
  // show/hide on scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;

    setScrolled(latest > 8);

    if (latest > prev && latest > 120) setHidden(true);
    else setHidden(false);
  });
>>>>>>> 05a6afdc887990c2e3f985aab48c0d1e34da811a

  const activeLabel = useMemo(() => {
    const found = navLinks.find((l) => isRouteActive(pathname, l.href));
    return found?.label ?? "Menu";
  }, [pathname]);

  return (
    <motion.header
      className="fixed top-0 z-50 w-full"
      animate={hidden ? { y: -96, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto max-w-6xl px-4 pt-4 md:pt-6">
        <div
          className={cn(
            "relative flex h-[64px] items-center rounded-full bg-[#7F289A]",
            scrolled
              ? "shadow-[0_14px_40px_rgba(0,0,0,0.22)]"
              : "shadow-[0_10px_26px_rgba(0,0,0,0.16)]"
          )}
        >
          <Link
            href="/"
            className="flex h-full w-[140px] items-center justify-center bg-[#6c217f]"
          >
            <Image src="/images/logo.png" alt="Logo" width={46} height={46} />
          </Link>

          <nav className="hidden h-full flex-1 items-center md:flex">
            {navLinks.map((l) => {
              const active = isRouteActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "flex h-full flex-1 items-center justify-center text-sm font-medium transition",
                    active
                      ? "bg-[#CDB6FF] text-[#1E1230]"
                      : "text-white/90 hover:text-white"
                  )}
                >
<<<<<<< HEAD
                  {l.label}
                </Link>
              );
            })}
          </nav>
=======
                  <div className="grid">
                    {navLinks.map((l) => {
                      const active = isRouteActive(pathname, l.href);
                      return (
                        <Link
                          key={l.href}
                          href={l.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center justify-between px-5 py-4 text-sm font-medium",
                            "transition-colors",
                            active
                              ? "bg-[#CDB6FF] text-[#1E1230]"
                              : "text-white/90 hover:bg-white/10 hover:text-white"
                          )}
                        >
                          <span>{l.label}</span>
                          <span
                            className={cn(
                              "text-xs",
                              active ? "text-[#1E1230]/70" : "text-white/60"
                            )}
                          >
                            →
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
>>>>>>> 05a6afdc887990c2e3f985aab48c0d1e34da811a

          <div className="ml-auto pr-4 text-xs text-white/70 md:hidden">
            {activeLabel}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
