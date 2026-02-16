import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Settings } from "@/models/Settings";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (key) {
      const doc = await Settings.findOne({ key }).lean();
      return NextResponse.json({ key, value: doc ? doc.value : true });
    }

    const docs = await Settings.find().lean();
    const settings: Record<string, boolean> = {};
    for (const d of docs) {
      settings[d.key] = d.value;
    }
    return NextResponse.json({ settings });
  } catch (err: any) {
    console.error("[GET /api/settings] ERROR:", err);
    return NextResponse.json(
      { message: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();

    const body = await req.json().catch(() => null);
    if (!body || typeof body.key !== "string" || typeof body.value !== "boolean") {
      return NextResponse.json(
        { message: "key (string) and value (boolean) are required" },
        { status: 400 }
      );
    }

    const doc = await Settings.findOneAndUpdate(
      { key: body.key },
      { value: body.value },
      { upsert: true, new: true }
    );

    return NextResponse.json({ key: doc.key, value: doc.value });
  } catch (err: any) {
    console.error("[PUT /api/settings] ERROR:", err);
    return NextResponse.json(
      { message: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
