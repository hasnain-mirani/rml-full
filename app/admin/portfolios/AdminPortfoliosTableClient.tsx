"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { PortfolioItem } from "@/lib/fetchPortfolio";

export default function AdminPortfoliosTableClient({
  initialItems,
}: {
  initialItems: PortfolioItem[];
}) {
  const router = useRouter();
  const items = useMemo(() => initialItems ?? [], [initialItems]);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function onDelete(item: PortfolioItem) {
    if (!item._id) {
      alert("Missing _id. Ensure API returns _id for each item.");
      return;
    }

    const ok = window.confirm(`Delete "${item.title}"?`);
    if (!ok) return;

    try {
      setBusyId(item._id);

      // ✅ EXACT testimonial pattern: encode id
      const res = await fetch(
        `/api/portfolio/${encodeURIComponent(String(item._id))}`,
        { method: "DELETE" }
      );

      const j = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(j?.message || "Delete failed");
      }

      router.refresh();
    } catch (e: any) {
      alert(e?.message || "Delete failed");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white overflow-hidden">
      <div className="grid grid-cols-12 gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-3 text-xs font-medium text-zinc-600">
        <div className="col-span-5">Title</div>
        <div className="col-span-3">Slug</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {items.map((p) => {
        const isBusy = busyId === p._id;

        return (
          <div
            key={p.slug}
            className="grid grid-cols-12 gap-2 px-4 py-3 text-sm border-b border-zinc-100 items-center"
          >
            <div className="col-span-5 font-medium text-zinc-900 truncate">
              {p.title}
            </div>

            <div className="col-span-3 text-zinc-600 truncate">{p.slug}</div>

            <div className="col-span-2">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs border ${
                  p.published
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-zinc-200 bg-zinc-50 text-zinc-700"
                }`}
              >
                {p.published ? "Published" : "Draft"}
              </span>
            </div>

            <div className="col-span-2 flex items-center justify-end gap-3">
              <Link
                href={`/admin/portfolios/${p.slug}`}
                className="text-zinc-700 hover:text-zinc-900 underline"
              >
                View
              </Link>

              <Link
                href={`/admin/portfolios/${p.slug}`}
                className="text-zinc-700 hover:text-zinc-900 underline"
              >
                Edit
              </Link>

              <button
                type="button"
                onClick={() => onDelete(p)}
                disabled={!p._id || isBusy}
                className={`underline ${
                  isBusy
                    ? "text-zinc-400 cursor-not-allowed"
                    : "text-red-600 hover:text-red-700"
                }`}
              >
                {isBusy ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        );
      })}

      {items.length === 0 ? (
        <div className="p-6 text-zinc-600">No portfolio items yet.</div>
      ) : null}
    </div>
  );
}
