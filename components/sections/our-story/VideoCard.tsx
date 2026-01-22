"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function VideoCard({
  videoUrl,
  title,
}: {
  videoUrl: string; // YouTube embed URL or direct mp4
  title?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative w-full max-w-4xl rounded-[26px] bg-[var(--purple)] shadow-[0_18px_45px_rgba(83,35,143,0.18)]"
      >
        {/* Height similar to figma */}
        <div className="h-[320px] w-full md:h-[420px]" />

        {/* play circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/25 ring-1 ring-white/30 transition group-hover:scale-105">
            <PlayIcon />
          </div>
        </div>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl border-none bg-black p-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={videoUrl}
              title={title ?? "Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function PlayIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9 7l10 5-10 5V7z"
        fill="white"
        opacity="0.95"
      />
    </svg>
  );
}
