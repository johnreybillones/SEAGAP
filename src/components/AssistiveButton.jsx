import { useState } from "react";
import { Bot, Languages, Lightbulb, X } from "lucide-react";
import Mascot from "./Mascot";
import { cn } from "@/lib/utils";

export default function AssistiveButton({ onAITutor, onHint, onLanguage }) {
  const [open, setOpen] = useState(false);

  const actions = [
    { icon: Bot, label: "AI Tutor", color: "bg-primary text-primary-foreground shadow-3d-primary", onClick: onAITutor },
    { icon: Lightbulb, label: "Hint", color: "bg-reward text-reward-foreground shadow-3d-reward", onClick: onHint },
    { icon: Languages, label: "Language", color: "bg-accent text-accent-foreground shadow-3d-accent", onClick: onLanguage },
  ];

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="flex flex-col items-end gap-2 animate-slide-up">
          {actions.map(({ icon: Icon, label, color, onClick }) => (
            <button
              key={label}
              onClick={() => { onClick?.(); setOpen(false); }}
              className={cn("flex items-center gap-2 px-4 h-11 rounded-full font-extrabold text-sm press-3d active:translate-y-[5px] active:shadow-none", color)}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-primary shadow-3d-primary press-3d active:translate-y-[5px] active:shadow-none flex items-center justify-center"
        aria-label="AI Assist"
      >
        {open ? <X size={22} className="text-white" /> : <Mascot emotion="greeting" size="small" className="w-9 h-9" />}
      </button>
    </div>
  );
}