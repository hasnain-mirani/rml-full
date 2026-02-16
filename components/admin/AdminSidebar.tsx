"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  LayoutDashboard,
  FileText,
  Mic2,
  Briefcase,
  Quote,
  Mail,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/podcasts", label: "Podcasts", icon: Mic2 },
  { href: "/admin/case-studies", label: "Case Studies", icon: Briefcase },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/portfolios", label: "Portfolio", icon: Briefcase },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export default function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);
  const prevCountRef = useRef(0);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "contactMessages"),
      where("read", "==", false)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newCount = snapshot.size;

      if (prevCountRef.current > 0 && newCount > prevCountRef.current) {
        const newest = snapshot.docChanges().find((c) => c.type === "added");
        const name = newest?.doc.data()?.name || "Someone";
        setToast(`New message from ${name}`);
        setTimeout(() => setToast(null), 4000);
      }

      prevCountRef.current = newCount;
      setUnreadCount(newCount);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-full flex-col p-5">
      {/* Toast notification */}
      {toast && (
        <div className="absolute right-4 top-4 z-50 animate-slide-in rounded-xl border border-purple-500/30 bg-purple-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-purple-500/20">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            {toast}
          </div>
        </div>
      )}

      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
          <div className="h-5 w-5 rounded-md bg-white/60" />
        </div>

        <div className="min-w-0">
          <div className="truncate text-sm font-semibold tracking-tight">
            Admin Panel
          </div>
          <div className="truncate text-xs text-white/50">
            Content Management
          </div>
        </div>
      </div>

      <Separator className="my-5 bg-white/10" />

      {/* Nav */}
      <nav className="space-y-1.5">
        {nav.map((it) => {
          const active =
            pathname === it.href || pathname.startsWith(it.href + "/");
          const Icon = it.icon;
          const isMessages = it.href === "/admin/messages";

          return (
            <Link
              key={it.href}
              href={it.href}
              onClick={onNavigate}
              className={cn(
                "relative group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm",
                "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
                "text-white/60 hover:text-white hover:bg-white/[0.06]",
                "active:scale-[0.99]"
              )}
            >
              {/* Active indicator */}
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full",
                  "transition-all duration-200",
                  active
                    ? "bg-white/50"
                    : "bg-transparent group-hover:bg-white/20"
                )}
              />

              {/* Icon */}
              <span
                className={cn(
                  "relative grid h-9 w-9 place-items-center rounded-xl",
                  "transition-all duration-200",
                  "bg-white/[0.04] ring-1 ring-white/10",
                  "group-hover:bg-white/10 group-hover:ring-white/15 group-hover:scale-[1.04]",
                  active && "bg-white/[0.06] ring-white/20"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    active ? "text-white" : "text-white/70"
                  )}
                />

                {/* Unread badge */}
                {isMessages && unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-[#111]">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </span>

              {/* Label */}
              <span
                className={cn(
                  "font-medium tracking-tight transition-all duration-200",
                  "group-hover:translate-x-[1px]",
                  active ? "text-white" : "text-white/75"
                )}
              >
                {it.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-5">
        <Separator className="my-5 bg-white/10" />

        <Button
          variant="outline"
          className="w-full rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10"
          onClick={async () => {
            await fetch("/api/admin/login", { method: "DELETE" });
            window.location.href = "/login";
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>

        <p className="mt-3 text-xs text-white/40">Dark • modern • polished</p>
      </div>
    </div>
  );
}
