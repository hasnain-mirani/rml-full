import Link from "next/link";
import { fetchPortfolio } from "@/lib/fetchPortfolio";
import AdminPortfoliosTableClient from "./AdminPortfoliosTableClient";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  const items = await fetchPortfolio({ publishedOnly: false });

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Portfolio (Admin)
            </h1>
            <p className="mt-2 text-zinc-600">
              Create, review, edit and publish portfolio items.
            </p>
          </div>

          <Link
            href="/admin/portfolios/new"
            className="rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50 hover:border-zinc-300 transition"
          >
            + New Portfolio
          </Link>
        </div>

        <div className="mt-8">
          <AdminPortfoliosTableClient initialItems={items as any} />
        </div>
      </div>
    </main>
  );
}
