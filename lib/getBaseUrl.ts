// lib/getBaseUrl.ts
export function getBaseUrl() {
  // Client/browser: always relative
  if (typeof window !== "undefined") return "";

  // ✅ Vercel (production + preview): use provided hostname
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // ✅ Optional custom domain env (only if you want)
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site && site.startsWith("http")) return site;

  // Local dev fallback
  return "http://localhost:3000";
}
