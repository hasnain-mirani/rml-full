import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/mongodb";
import { CaseStudy } from "@/models/CaseStudy";

export const dynamic = "force-dynamic";

/** Next 15: params might be Promise */
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

function pickTags(body: any): string[] | undefined {
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

  return undefined; // do not touch tags if missing
}

function pickBlocks(body: any) {
  const blocks = body?.content_blocks;
  if (!Array.isArray(blocks)) return undefined;

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

function pickPatch(body: any) {
  const patch: any = {
    title: typeof body.title === "string" ? body.title.trim() : undefined,
    excerpt: typeof body.excerpt === "string" ? body.excerpt : undefined,
    image: typeof body.image === "string" ? body.image.trim() : undefined,
    published: typeof body.published === "boolean" ? body.published : undefined,
    tags: pickTags(body),
    content_blocks: pickBlocks(body),
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

    const updated = await CaseStudy.findByIdAndUpdate(id, patch, {
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

    const deleted = await CaseStudy.findByIdAndDelete(id);

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
