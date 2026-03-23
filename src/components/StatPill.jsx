import { cn } from "@/lib/utils";

export default function StatPill({ icon, value, variant = "default", className = "", animate = false }) {
  const variants = {
    default: "bg-muted text-foreground",
    reward: "bg-reward-tint text-reward",
    primary: "bg-primary-tint text-primary",
    success: "bg-success-tint text-success",
    error: "bg-error-tint text-error",
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1 px-3 h-7 rounded-full text-xs font-extrabold",
      variants[variant],
      animate && "animate-streak-pulse",
      className
    )}>
      <span>{icon}</span>
      <span>{value}</span>
    </div>
  );
}