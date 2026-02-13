// lib/fetchBlogs.ts
import { getBaseUrl } from "@/lib/getBaseUrl";

export type Blog = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  excerpt: string;
  content?: string;
  image?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type BlogListApiResponse =
  | { items?: Blog[] }
  | { data?: Blog[] }
  | { blogs?: Blog[] }
  | Blog[];

type BlogSingleApiResponse =
  | { item?: Blog }
  | { data?: Blog }
  | { blog?: Blog }
  | Blog
  | null;

function toArray(res: BlogListApiResponse): Blog[] {
  if (Array.isArray(res)) return res;
  if (res && typeof res === "object") {
    const anyRes = res as any;
    if (Array.isArray(anyRes.items)) return anyRes.items;
    if (Array.isArray(anyRes.data)) return anyRes.data;
    if (Array.isArray(anyRes.blogs)) return anyRes.blogs;
  }
  return [];
}

function toBlog(res: BlogSingleApiResponse): Blog | null {
  if (!res) return null;
  const anyRes = res as any;
  return (anyRes.blog ?? anyRes.item ?? anyRes.data ?? anyRes) as Blog;
}

async function safeText(res: Response) {
  try {
    return await res.text();
  } catch {
    return "";
  }
}

/** ✅ LIST */
export async function fetchBlogs(opts?: {
  includeDrafts?: boolean;
  category?: string;
  time?: "all" | "7d" | "30d" | "90d" | "year";
}) {
  const includeDrafts = opts?.includeDrafts ?? false;

  const qs = new URLSearchParams();
  if (!includeDrafts) qs.set("published", "1");
  if (opts?.category && opts.category !== "all") qs.set("category", opts.category);
  if (opts?.time && opts.time !== "all") qs.set("time", opts.time);

  const base = getBaseUrl();
  const url = `${base}/api/blog${qs.toString() ? `?${qs.toString()}` : ""}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const body = await safeText(res);
    throw new Error(
      `Failed to fetch blogs (${res.status} ${res.statusText}) URL: ${url} Body: ${body.slice(
        0,
        300
      )}`
    );
  }

  const json = (await res.json()) as BlogListApiResponse;
  return toArray(json);
}

/** ✅ SINGLE by slug */
export async function fetchBlogBySlug(
  slug: string,
  opts?: { includeDrafts?: boolean; publishedOnly?: boolean }
) {
  const includeDrafts = opts?.includeDrafts ?? false;
  const publishedOnly = opts?.publishedOnly ?? !includeDrafts;

  const qs = new URLSearchParams({ slug });
  if (publishedOnly) qs.set("published", "1");

  const base = getBaseUrl();
  const url = `${base}/api/blog?${qs.toString()}`;

  const res = await fetch(url, { cache: "no-store" });

  if (res.status === 404) return null;

  if (!res.ok) {
    const body = await safeText(res);
    throw new Error(
      `Failed to fetch blog (${res.status} ${res.statusText}) URL: ${url} Body: ${body.slice(
        0,
        300
      )}`
    );
  }

  const json = (await res.json()) as BlogSingleApiResponse;
  const blog = toBlog(json);

  if (!blog) return null;
  if (publishedOnly && blog.published === false) return null;

  return blog;
}
