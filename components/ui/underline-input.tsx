import * as React from "react";
import { cn } from "@/lib/utils";

interface UnderlineInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helper?: string;
}

export const UnderlineInput = React.forwardRef<
  HTMLInputElement,
  UnderlineInputProps
>(({ label, helper, className, ...props }, ref) => {
  return (
    <div className="space-y-1">
      {/* Label */}
      <label className="block text-sm font-medium text-[#2B1B3F]">
        {label}
      </label>

      {/* Input */}
      <input
        ref={ref}
        className={cn(
          "w-full border-0 border-b border-[#D6CCE6] bg-transparent px-0 py-2 text-sm text-[#2B1B3F] outline-none",
          "focus:border-[#6F2DBD] focus:ring-0",
          className
        )}
        {...props}
      />

      {/* Helper text */}
      {helper && (
        <p className="text-xs text-[#7A6A91]">{helper}</p>
      )}
    </div>
  );
});

UnderlineInput.displayName = "UnderlineInput";
