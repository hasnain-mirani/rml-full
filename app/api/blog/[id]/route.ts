import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import mongoose from "mongoose";

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

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isValidHttpUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function pickImageUrl(body: Record<string, unknown>): string {
  const candidates: unknown[] = [
    body?.image,
    body?.imageUrl,
    body?.secure_url,
    (body?.image as Record<string, unknown>)?.secure_url,
  ];

  for (const c of candidates) {
    if (isNonEmptyString(c)) {
      const s = c.trim();
      if (isValidHttpUrl(s)) return s;
      if (s.startsWith("/")) return s;
    }
  }

  return "";
}

type RouteCtx = { params: Promise<{ id: string }> };

/** GET /api/blog/:id — single blog by MongoDB _id */
export async function GET(_req: Request, ctx: RouteCtx) {
  try {
    await dbConnect();
    const { id } = await ctx.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    const item = await Blog.findById(id).lean();
    if (!item) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ item });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    console.error("[GET /api/blog/:id]", msg);
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}

/** PUT /api/blog/:id — update blog */
export async function PUT(req: Request, ctx: RouteCtx) {
  try {
    await dbConnect();
    const { id } = await ctx.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    const existing = await Blog.findById(id);
    if (!existing) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    if (isNonEmptyString(body.title)) existing.title = body.title.trim();

    if (isNonEmptyString(body.slug)) {
      const newSlug = toSlug(body.slug);
      if (newSlug && newSlug !== existing.slug) {
        const taken = await Blog.exists({ slug: newSlug, _id: { $ne: id } });
        if (taken) {
          return NextResponse.json(
            { message: "Slug already in use" },
            { status: 409 }
          );
        }
        existing.slug = newSlug;
      }
    }

    if (body.category !== undefined)
      existing.category = isNonEmptyString(body.category)
        ? body.category.trim()
        : "General";

    if (body.excerpt !== undefined) existing.excerpt = body.excerpt ?? "";
    if (body.content !== undefined) existing.content = body.content ?? "";
    if (body.published !== undefined) existing.published = Boolean(body.published);

    const img = pickImageUrl(body);
    if (img) existing.image = img;

    await existing.save();

    return NextResponse.json({ item: existing });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    console.error("[PUT /api/blog/:id]", msg);
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}

/** DELETE /api/blog/:id — remove blog */
export async function DELETE(_req: Request, ctx: RouteCtx) {
  try {
    await dbConnect();
    const { id } = await ctx.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    console.error("[DELETE /api/blog/:id]", msg);
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
