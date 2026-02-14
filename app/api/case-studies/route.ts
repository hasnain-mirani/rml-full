import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { CaseStudy } from "@/models/CaseStudy";

export const dynamic = "force-dynamic";

/** ---------- helpers ---------- */
function toBool(v: string | null) {
  return v === "1" || v === "true";
}

function serialize(doc: any) {
  if (!doc) return doc;
  const d = typeof doc.toObject === "function" ? doc.toObject() : doc;
  return { ...d, _id: String(d._id) };
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function toSlug(input: string) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/g, "");
}

async function ensureUniqueSlug(base: string) {
  let slug = base || "case-study";
  let counter = 2;

  while (await CaseStudy.exists({ slug })) {
    slug = `${base}-${counter}`;
    counter += 1;
  }
  return slug;
}

function pickTags(body: any): string[] {
  const raw = body?.tags;

  if (Array.isArray(raw)) {
    return raw
      .map((t: any) => (isNonEmptyString(t) ? t.trim() : ""))
      .filter(Boolean)
      .slice(0, 30);
  }

  if (isNonEmptyString(raw)) {
    return raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 30);
  }

  return [];
}

function pickBlocks(body: any) {
  const blocks = body?.content_blocks;
  if (!Array.isArray(blocks)) return [];
  return blocks
    .map((b: any) => ({
      id: isNonEmptyString(b?.id) ? b.id : "",
      type: isNonEmptyString(b?.type) ? b.type : "",
      text: isNonEmptyString(b?.text) ? b.text : "",
      label: isNonEmptyString(b?.label) ? b.label : "",
      url: isNonEmptyString(b?.url) ? b.url : "",
      alt: isNonEmptyString(b?.alt) ? b.alt : "",
    }))
    .filter((b: any) => b.id && b.type);
}

/** ---------- GET ---------- */
export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const slug = searchParams.get("slug");
    const publishedOnly = toBool(searchParams.get("published"));

    // SINGLE
    if (slug) {
      const q: any = { slug };
      if (publishedOnly) q.published = true;

      const item = await CaseStudy.findOne(q).lean();
      if (!item) return NextResponse.json({ message: "Not found" }, { status: 404 });

      return NextResponse.json({ item: serialize(item) }, { status: 200 });
    }

    // LIST
    const q: any = {};
    if (publishedOnly) q.published = true;

    const items = await CaseStudy.find(q).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ items: items.map(serialize) }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message || "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}

/** ---------- POST ---------- */
export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ message: "Invalid body" }, { status: 400 });
    }

    const title = isNonEmptyString(body.title) ? body.title.trim() : "";
    if (!title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    const baseSlugInput =
      isNonEmptyString(body.slug) && body.slug.trim() ? body.slug : title;

    const baseSlug = toSlug(baseSlugInput);
    if (!baseSlug) {
      return NextResponse.json(
        { message: "Slug/title produced an empty slug" },
        { status: 400 }
      );
    }

    const slug = await ensureUniqueSlug(baseSlug);

    const excerpt = isNonEmptyString(body.excerpt) ? body.excerpt : "";
    const image = isNonEmptyString(body.image) ? body.image.trim() : "";
    const tags = pickTags(body);
    const content_blocks = pickBlocks(body);

    const created = await CaseStudy.create({
      title,
      slug,
      excerpt,
      image,
      tags,
      content_blocks,
      published: Boolean(body.published),
    });

    return NextResponse.json({ item: serialize(created) }, { status: 201 });
  } catch (err: any) {
    if (err?.code === 11000) {
      return NextResponse.json({ message: "Slug already exists" }, { status: 409 });
    }
    return NextResponse.json(
      { message: err?.message || "Create failed" },
      { status: 500 }
    );
  }
}
