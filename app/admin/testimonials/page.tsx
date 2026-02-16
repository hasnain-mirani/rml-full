"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type TestimonialRow = {
  _id: string;
  name: string;
  text: string;
  image?: string;
  linkEnabled?: boolean;
  linkUrl?: string;
  published: boolean;
};

export default function AdminTestimonialsPage() {
  const router = useRouter();
  const [items, setItems] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [showInNavbar, setShowInNavbar] = useState(true);
  const [toggling, setToggling] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/testimonials", { cache: "no-store" });
    const data = await res.json().catch(() => null);
    setItems((data?.items || []).map((x: any) => ({ ...x, _id: String(x._id) })));
    setLoading(false);
  }

  async function loadVisibility() {
    const res = await fetch("/api/settings?key=showTestimonials", { cache: "no-store" });
    const data = await res.json().catch(() => null);
    if (data) setShowInNavbar(data.value !== false);
  }

  async function toggleVisibility() {
    setToggling(true);
    const newVal = !showInNavbar;
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "showTestimonials", value: newVal }),
    });
    if (res.ok) setShowInNavbar(newVal);
    setToggling(false);
  }

  useEffect(() => {
    load();
    loadVisibility();
  }, []);

  async function handleDelete(id: string) {
    const ok = confirm("Delete this testimonial?");
    if (!ok) return;

    const res = await fetch(`/api/testimonials/${encodeURIComponent(String(id))}`, {
      method: "DELETE",
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      alert(json?.message || "Delete failed");
      return;
    }

    setItems((prev) => prev.filter((t) => t._id !== String(id)));

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Testimonials
            </h1>
            <p className="mt-2 text-zinc-600">
              Add, review, and publish testimonials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Navbar visibility toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 whitespace-nowrap">
                {showInNavbar ? "Visible in Navbar" : "Hidden from Navbar"}
              </span>
              <button
                type="button"
                disabled={toggling}
                onClick={toggleVisibility}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-60 ${
                  showInNavbar ? "bg-purple-600" : "bg-zinc-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    showInNavbar ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <Link
              href="/admin/testimonials/new"
              className="rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50 hover:border-zinc-300 transition"
            >
              + New Testimonial
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-zinc-200 bg-white overflow-hidden">
          <div className="grid grid-cols-12 gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-3 text-xs font-medium text-zinc-600">
            <div className="col-span-4">Name</div>
            <div className="col-span-4">Link</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {loading ? (
            <div className="p-6 text-zinc-600">Loading…</div>
          ) : items.length === 0 ? (
            <div className="p-6 text-zinc-600">No testimonials yet.</div>
          ) : (
            items.map((t) => (
              <div
                key={t._id}
                className="grid grid-cols-12 gap-2 px-4 py-3 text-sm border-b border-zinc-100"
              >
                <div className="col-span-4 font-medium text-zinc-900 truncate">
                  {t.name}
                </div>

                <div className="col-span-4 text-zinc-600 truncate">
                  {t.linkEnabled ? t.linkUrl || "" : "—"}
                </div>

                <div className="col-span-2">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs border ${
                      t.published
                        ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                        : "border-zinc-200 bg-zinc-50 text-zinc-700"
                    }`}
                  >
                    {t.published ? "Published" : "Draft"}
                  </span>
                </div>

                <div className="col-span-2 flex justify-end gap-2">
                  <a
                    href="/testimonials"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-zinc-200 px-3 py-1 text-xs hover:bg-zinc-50"
                  >
                    View
                  </a>

                  <Link
                    href={`/admin/testimonials/${t._id}`}
                    className="rounded-xl border border-zinc-200 px-3 py-1 text-xs hover:bg-zinc-50"
                  >
                    Edit
                  </Link>

                  <button
                    disabled={isPending}
                    onClick={() => handleDelete(t._id)}
                    className="rounded-xl border border-red-200 px-3 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-60"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
