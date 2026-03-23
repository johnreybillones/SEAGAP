import { cn } from "@/lib/utils";

export default function ProgressBar({ value = 0, max = 100, className = "", variant = "primary" }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const fillColor = variant === "error" ? "bg-error" : "bg-primary";

  return (
    <div className={cn("relative h-4 rounded-full bg-[#E5E5E5] overflow-hidden", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-500 relative progress-gloss", fillColor)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}