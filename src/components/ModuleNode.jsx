import { cn } from "@/lib/utils";

const NODE_STATES = {
  complete: { bg: "bg-success", shadow: "shadow-3d-success", icon: "✓", textColor: "text-white" },
  partial: { bg: "bg-success/70", shadow: "shadow-3d-success", icon: "⭐", textColor: "text-white" },
  active: { bg: "bg-primary", shadow: "shadow-3d-primary", icon: "⭐", textColor: "text-white" },
  locked: { bg: "bg-[#E5E5E5]", shadow: "shadow-3d-gray", icon: "🔒", textColor: "text-[#AFAFAF]" },
  legendary: { bg: "bg-gradient-to-br from-reward to-reward-dark", shadow: "shadow-3d-reward", icon: "👑", textColor: "text-white" },
};

export default function ModuleNode({ module, status = "locked", stars = 0, offset = 0, onClick }) {
  const s = NODE_STATES[status] || NODE_STATES.locked;

  return (
    <div className="flex flex-col items-center" style={{ marginLeft: `${offset}px` }}>
      <button
        onClick={onClick}
        className={cn(
          "w-[68px] h-[68px] rounded-full flex items-center justify-center text-2xl press-3d transition-all",
          s.bg, s.shadow,
          "active:translate-y-[5px] active:shadow-none",
          status === "active" && "ring-4 ring-primary/30 animate-ring-pulse"
        )}
        aria-label={module.title}
      >
        <span className={s.textColor}>{s.icon}</span>
      </button>

      {/* Stars below */}
      <div className="flex gap-0.5 mt-3.5">
        {[1, 2, 3].map(i => (
          <span key={i} className={`text-sm ${i <= stars ? "text-reward" : "text-border"}`}>★</span>
        ))}
      </div>

      <p className="text-xs font-bold text-center mt-1 max-w-[80px] leading-tight text-muted-foreground">{module.title}</p>
    </div>
  );
}