import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/mongodb";
import { Portfolio } from "@/models/portfolio";

export const dynamic = "force-dynamic";

/** Next params might be Promise (same as testimonial) */
type Ctx = { params: Promise<{ id: string }> | { id: string } };

function serialize(doc: any) {
  if (!doc) return doc;
  const d = typeof doc.toObject === "function" ? doc.toObject() : doc;
  return { ...d, _id: String(d._id) };
}

function cleanId(raw: unknown) {
  return decodeURIComponent(String(raw ?? "")).trim();
}

function isObjectId(id: string) {
  const is24Hex = /^[0-9a-fA-F]{24}$/.test(id);
  const mongooseOk =
    typeof (mongoose as any).isValidObjectId === "function"
      ? (mongoose as any).isValidObjectId(id)
      : mongoose.Types.ObjectId.isValid(id);
  return is24Hex && mongooseOk;
}

async function getId(ctx: Ctx) {
  const p = await ctx.params;
  return cleanId((p as any)?.id);
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

/** ✅ whitelist portfolio fields (adjust if your schema differs) */
function pickPatch(body: any) {
  const patch: any = {
    title: typeof body.title === "string" ? body.title.trim() : undefined,
    excerpt: typeof body.excerpt === "string" ? body.excerpt.trim() : undefined,
    image: typeof body.image === "string" ? body.image.trim() : undefined,
    published: typeof body.published === "boolean" ? body.published : undefined,

    tags: Array.isArray(body.tags)
      ? body.tags
          .map((t: any) => (isNonEmptyString(t) ? t.trim() : ""))
          .filter(Boolean)
          .slice(0, 30)
      : undefined,

    content_blocks: Array.isArray(body.content_blocks) ? body.content_blocks : undefined,
  };

  Object.keys(patch).forEach((k) => patch[k] === undefined && delete patch[k]);
  return patch;
}

export async function PUT(req: Request, ctx: Ctx) {
  try {
    const id = await getId(ctx);

    if (!id || !isObjectId(id)) {
      return NextResponse.json({ message: "Invalid id", id }, { status: 400 });
    }

    await dbConnect();

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ message: "Invalid body" }, { status: 400 });
    }

    const patch = pickPatch(body);

    const updated = await Portfolio.findByIdAndUpdate(id, patch, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ item: serialize(updated) }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message || "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  try {
    const id = await getId(ctx);

    if (!id || !isObjectId(id)) {
      return NextResponse.json({ message: "Invalid id", id }, { status: 400 });
    }

    await dbConnect();

    const deleted = await Portfolio.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message || "Delete failed" },
      { status: 500 }
    );
  }
}
