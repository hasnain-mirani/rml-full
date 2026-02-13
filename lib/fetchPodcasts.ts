// lib/fetchPodcasts.ts
import { getBaseUrl } from "@/lib/getBaseUrl";
import type { Podcast } from "@/lib/contentTypes";

type ApiList = { items?: Podcast[] };
type ApiOne = { item?: Podcast };

async function parseErr(res: Response) {
  const text = await res.text().catch(() => "");
  return text?.slice(0, 1200) || "";
}

export async function fetchPodcasts(opts?: { publishedOnly?: boolean }) {
  const qs = new URLSearchParams();
  if (opts?.publishedOnly) qs.set("published", "1");

  const base = getBaseUrl();
  const url = `${base}/api/podcasts?${qs.toString()}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const body = await parseErr(res);
    throw new Error(
      `Failed to fetch podcasts (${res.status} ${res.statusText})\nURL: ${url}\nBody: ${body}`
    );
  }

  const data = (await res.json()) as ApiList;
  return data.items || [];
}

export async function fetchPodcastBySlug(
  slug: string,
  opts?: { publishedOnly?: boolean }
) {
  const qs = new URLSearchParams({ slug });
  if (opts?.publishedOnly) qs.set("published", "1");

  const base = getBaseUrl();
  const url = `${base}/api/podcasts?${qs.toString()}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) return null;
  const data = (await res.json()) as ApiOne;
  return data.item || null;
}
