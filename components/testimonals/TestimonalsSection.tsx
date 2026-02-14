"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

export type Testimonial = {
  name: string;
  text: string;
  image: string;
  linkEnabled: boolean;
  linkUrl?: string;
  published: boolean;
};

export default function TestimonialEditor({
  initial,
  onSave,
}: {
  initial: Testimonial;
  onSave: (v: Testimonial) => Promise<void>;
}) {
  const [v, setV] = useState(initial);
  const [saving, setSaving] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState<string>("");

  const previewSrc = useMemo(() => {
    if (localPreview) return localPreview;
    return v.image || "";
  }, [localPreview, v.image]);

  async function handlePickFile(file: File | null) {
    setImageFile(file);

    if (localPreview) URL.revokeObjectURL(localPreview);
    setLocalPreview("");

    if (file) {
      const url = URL.createObjectURL(file);
      setLocalPreview(url);
    }
  }

  return (
    <div className="bg-white">
      {/* Top bar */}
      <div className="flex flex-col gap-3 border-b border-zinc-200 bg-white p-3 sm:p-4 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-zinc-900 sm:text-lg md:text-xl">
              New Testimonial
            </h2>
            <p className="mt-0.5 text-xs text-zinc-600 sm:mt-1 sm:text-sm">
              Add a review with optional link toggle.
            </p>
          </div>

          <button
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              try {
                let imageUrl = v.image || "";
                if (imageFile) imageUrl = await uploadToCloudinary(imageFile);

                await onSave({
                  ...v,
                  image: imageUrl,
                  linkUrl: v.linkEnabled ? (v.linkUrl || "") : "",
                });

                if (localPreview) URL.revokeObjectURL(localPreview);
                setLocalPreview("");
                setImageFile(null);
              } finally {
                setSaving(false);
              }
            }}
            className="inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 active:scale-[0.99] disabled:opacity-60 sm:w-auto sm:rounded-2xl"
          >
            {saving ? "Saving..." : "Save Testimonial"}
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-6">
        <div className="grid gap-4 sm:gap-5 md:gap-6 lg:grid-cols-12">
          {/* Left */}
          <div className="space-y-4 sm:space-y-5 lg:col-span-7">
            <Card title="Person / Company name">
              <input
                placeholder="e.g. Acme Inc. / John Doe"
                className="mt-2 h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 sm:h-12 sm:rounded-2xl sm:px-4"
                value={v.name}
                onChange={(e) => setV({ ...v, name: e.target.value })}
              />
            </Card>

            <Card title="Review text">
              <textarea
                placeholder="Write the testimonial..."
                className="mt-2 w-full rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 min-h-[160px] sm:min-h-[240px] sm:rounded-2xl sm:p-4"
                value={v.text}
                onChange={(e) => setV({ ...v, text: e.target.value })}
              />
            </Card>

            <Card title="Optional link">
              <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 sm:gap-4 sm:rounded-2xl sm:px-4 sm:py-3">
                <div>
                  <div className="text-xs font-medium text-zinc-900 sm:text-sm">
                    Enable link
                  </div>
                  <div className="text-[10px] text-zinc-500 sm:text-xs">
                    Show &quot;Visit&quot; link on the testimonial.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setV({
                      ...v,
                      linkEnabled: !v.linkEnabled,
                      linkUrl: !v.linkEnabled ? v.linkUrl || "" : "",
                    })
                  }
                  className={`relative h-7 w-12 shrink-0 rounded-full border transition ${
                    v.linkEnabled
                      ? "bg-emerald-500 border-emerald-500"
                      : "bg-white border-zinc-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition ${
                      v.linkEnabled ? "left-5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>

              <input
                disabled={!v.linkEnabled}
                placeholder="https://company.com (optional)"
                className={`mt-2 h-10 w-full rounded-xl border px-3 text-sm outline-none transition sm:mt-3 sm:h-12 sm:rounded-2xl sm:px-4 ${
                  v.linkEnabled
                    ? "border-zinc-200 bg-white text-zinc-900 focus:border-zinc-400"
                    : "border-zinc-200 bg-zinc-50 text-zinc-500"
                }`}
                value={v.linkUrl || ""}
                onChange={(e) => setV({ ...v, linkUrl: e.target.value })}
              />
            </Card>

            <Card title="Publish">
              <div className="mt-2 flex items-center justify-between">
                <div className="text-xs text-zinc-700 sm:text-sm">
                  {v.published ? "Published" : "Draft"}
                </div>

                <button
                  type="button"
                  onClick={() => setV({ ...v, published: !v.published })}
                  className={`relative h-7 w-12 shrink-0 rounded-full border transition ${
                    v.published
                      ? "bg-emerald-500 border-emerald-500"
                      : "bg-zinc-100 border-zinc-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition ${
                      v.published ? "left-5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            </Card>
          </div>

          {/* Right */}
          <div className="space-y-4 sm:space-y-5 lg:col-span-5">
            <Card title="Photo / Company logo" subtitle="Upload to Cloudinary on save.">
              <div className="mt-2 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 sm:mt-3 sm:rounded-2xl">
                <div className="relative aspect-[4/3]">
                  {previewSrc ? (
                    <Image
                      src={previewSrc}
                      alt="Testimonial"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 420px"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-xs text-zinc-500 sm:text-sm">
                      No image selected
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3 grid gap-2 sm:mt-4">
                <label className="cursor-pointer rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-center text-xs font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlePickFile(e.target.files?.[0] || null)}
                  />
                  {imageFile ? "Change image" : "Upload image"}
                </label>

                {(imageFile || v.image) && (
                  <button
                    type="button"
                    onClick={() => {
                      handlePickFile(null);
                      setV({ ...v, image: "" });
                    }}
                    className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm"
                  >
                    Remove image
                  </button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4 md:rounded-3xl md:p-5">
      <div>
        <div className="text-xs font-semibold text-zinc-900 sm:text-sm">{title}</div>
        {subtitle ? <div className="mt-0.5 text-[10px] text-zinc-500 sm:mt-1 sm:text-xs">{subtitle}</div> : null}
      </div>
      {children}
    </section>
  );
}
