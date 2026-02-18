"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminTopbar from "@/components/admin/AdminTopbar";
import StatCard from "@/components/admin/StatCard";

type Stats = {
  blogs: { total: number; published: number; drafts: number };
  podcasts: { total: number };
  portfolio: { total: number };
  caseStudies: { total: number };
  testimonials: { total: number };
  messages: { total: number; unread: number };
};

type RecentItem = {
  _id: string;
  title?: string;
  name?: string;
  slug?: string;
  published?: boolean;
  createdAt?: string;
};

const INITIAL: Stats = {
  blogs: { total: 0, published: 0, drafts: 0 },
  podcasts: { total: 0 },
  portfolio: { total: 0 },
  caseStudies: { total: 0 },
  testimonials: { total: 0 },
  messages: { total: 0, unread: 0 },
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>(INITIAL);
  const [recentBlogs, setRecentBlogs] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const next: Stats = { ...INITIAL };
      const recent: RecentItem[] = [];

      const fetches = [
        fetch("/api/blog", { cache: "no-store" })
          .then((r) => r.json())
          .then((d) => {
            const items: RecentItem[] = d?.items || [];
            next.blogs.total = items.length;
            next.blogs.published = items.filter((i) => i.published).length;
            next.blogs.drafts = items.filter((i) => !i.published).length;
            recent.push(...items.slice(0, 5));
          })
          .catch(() => {}),

        fetch("/api/podcasts", { cache: "no-store" })
          .then((r) => r.json())
          .then((d) => {
            next.podcasts.total = (d?.items || []).length;
          })
          .catch(() => {}),

        fetch("/api/portfolio", { cache: "no-store" })
          .then((r) => r.json())
          .then((d) => {
            next.portfolio.total = (d?.items || []).length;
          })
          .catch(() => {}),

        fetch("/api/case-studies", { cache: "no-store" })
          .then((r) => r.json())
          .then((d) => {
            next.caseStudies.total = (d?.items || []).length;
          })
          .catch(() => {}),

        fetch("/api/testimonials", { cache: "no-store" })
          .then((r) => r.json())
          .then((d) => {
            next.testimonials.total = (d?.items || []).length;
          })
          .catch(() => {}),

        getDocs(collection(db, "contactMessages"))
          .then((snap) => {
            next.messages.total = snap.size;
          })
          .catch(() => {}),

        getDocs(
          query(
            collection(db, "contactMessages"),
            where("read", "==", false)
          )
        )
          .then((snap) => {
            next.messages.unread = snap.size;
          })
          .catch(() => {}),
      ];

      await Promise.all(fetches);

      setStats(next);
      setRecentBlogs(recent);
      setLoading(false);
    }

    load();
  }, []);

  return (
    <div>
      <AdminTopbar
        title="Dashboard"
        subtitle="Overview of your content and activity"
        createHref="/admin/blog/new"
      />

      <div className="space-y-6 p-4 md:p-6">
        {loading ? (
          <div className="py-20 text-center text-sm text-white/50">
            Loading dashboard…
          </div>
        ) : (
          <>
            {/* Blog stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard
                label="Total Blog Posts"
                value={String(stats.blogs.total)}
                helper="All blog posts"
              />
              <StatCard
                label="Published"
                value={String(stats.blogs.published)}
                helper="Visible on website"
                badge={{ text: "Live", positive: true }}
              />
              <StatCard
                label="Drafts"
                value={String(stats.blogs.drafts)}
                helper="Not visible yet"
                badge={{ text: "Hidden" }}
              />
            </div>

            {/* Content stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="Podcasts"
                value={String(stats.podcasts.total)}
                helper="All podcast episodes"
              />
              <StatCard
                label="Portfolio Items"
                value={String(stats.portfolio.total)}
                helper="Portfolio case studies"
              />
              <StatCard
                label="Case Studies"
                value={String(stats.caseStudies.total)}
                helper="Published case studies"
              />
              <StatCard
                label="Testimonials"
                value={String(stats.testimonials.total)}
                helper="Client testimonials"
              />
            </div>

            {/* Messages */}
            <div className="grid gap-4 sm:grid-cols-2">
              <StatCard
                label="Total Messages"
                value={String(stats.messages.total)}
                helper="Contact form submissions"
              />
              <StatCard
                label="Unread Messages"
                value={String(stats.messages.unread)}
                helper="Awaiting review"
                badge={
                  stats.messages.unread > 0
                    ? { text: `${stats.messages.unread} new`, positive: true }
                    : undefined
                }
              />
            </div>

            {/* Recent blog posts */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <div className="border-b border-white/10 px-5 py-4">
                <h3 className="text-sm font-semibold">Recent Blog Posts</h3>
              </div>

              {recentBlogs.length === 0 ? (
                <div className="p-8 text-center text-sm text-white/40">
                  No blog posts yet.
                </div>
              ) : (
                recentBlogs.map((b) => (
                  <Link
                    key={b._id}
                    href={`/admin/blog/${b._id}/edit`}
                    className="flex items-center justify-between border-b border-white/5 px-5 py-3 text-sm transition hover:bg-white/[0.04]"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="truncate font-medium">
                        {b.title || "Untitled"}
                      </span>
                    </div>
                    <span
                      className={`ml-3 shrink-0 rounded-full px-2.5 py-0.5 text-xs ring-1 ${
                        b.published
                          ? "bg-emerald-500/15 text-emerald-200 ring-emerald-500/20"
                          : "bg-zinc-500/15 text-zinc-200 ring-zinc-500/20"
                      }`}
                    >
                      {b.published ? "Published" : "Draft"}
                    </span>
                  </Link>
                ))
              )}
            </div>

            {/* Quick actions */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <h3 className="text-sm font-semibold">Quick Actions</h3>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Link
                  href="/admin/blog/new"
                  className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-white/90 active:scale-[0.98]"
                >
                  New Blog Post
                </Link>
                <Link
                  href="/admin/podcasts/new"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white transition hover:bg-white/10 active:scale-[0.98]"
                >
                  New Podcast
                </Link>
                <Link
                  href="/admin/messages"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white transition hover:bg-white/10 active:scale-[0.98]"
                >
                  View Messages
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
