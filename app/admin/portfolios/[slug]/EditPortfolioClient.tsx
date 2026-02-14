"use client";

import { useRouter } from "next/navigation";
import PortfolioEditor, { type PortfolioValue } from "@/components/portfolio/PortfolioEditor";

export default function EditPortfolioClient({ initial }: { initial: any }) {
  const router = useRouter();

  async function onSave(v: PortfolioValue) {
    const res = await fetch(
      `/api/portfolio/${encodeURIComponent(String(initial._id))}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      }
    );

    const j = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(j?.message || "Failed to update portfolio");
    }

    router.push("/admin/portfolios");
    router.refresh();
  }

  async function onDelete() {
    const ok = confirm("Delete this portfolio item?");
    if (!ok) return;

    const res = await fetch(
      `/api/portfolio/${encodeURIComponent(String(initial._id))}`,
      { method: "DELETE" }
    );

    const j = await res.json().catch(() => null);

    if (!res.ok) {
      alert(j?.message || "Delete failed");
      return;
    }

    router.push("/admin/portfolios");
    router.refresh();
  }

  // ✅ cast initial for editor (adjust fields to match your editor)
  const castInitial: PortfolioValue = {
    title: initial.title || "",
    excerpt: initial.excerpt || "",
    image: initial.image || "",
    tags: Array.isArray(initial.tags) ? initial.tags : [],
    published: Boolean(initial.published),
    content_blocks: Array.isArray(initial.content_blocks) ? initial.content_blocks : [],
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Edit Portfolio
            </h1>
            <p className="mt-2 text-zinc-600">Update and publish portfolio item.</p>
          </div>

          <button
            onClick={onDelete}
            className="rounded-2xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
          <PortfolioEditor initial={castInitial} onSave={onSave} />
        </div>
      </div>
    </main>
  );
}
