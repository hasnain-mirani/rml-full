import * as React from "react";
import { cn } from "@/lib/utils";

interface UnderlineTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const UnderlineTextarea = React.forwardRef<
  HTMLTextAreaElement,
  UnderlineTextareaProps
>(({ label, className, ...props }, ref) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-[#2B1B3F]">
        {label}
      </label>

      <textarea
        ref={ref}
        rows={3}
        className={cn(
          "w-full resize-none border-0 border-b border-[#D6CCE6] bg-transparent px-0 py-2 text-sm text-[#2B1B3F] outline-none",
          "focus:border-[#6F2DBD] focus:ring-0",
          className
        )}
        {...props}
      />
    </div>
  );
});

UnderlineTextarea.displayName = "UnderlineTextarea";
