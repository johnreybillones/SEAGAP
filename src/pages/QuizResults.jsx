import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Mascot from "../components/Mascot";
import Button3D from "../components/Button3D";
import StatPill from "../components/StatPill";

export default function QuizResults() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const score = state?.score || 3;
  const total = state?.total || 4;
  const xpEarned = state?.xp ? state.xp - 350 + score * 30 : score * 30;
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 60;

  const [displayPct, setDisplayPct] = useState(0);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    let cur = 0;
    const interval = setInterval(() => {
      cur += 2;
      if (cur >= pct) { cur = pct; clearInterval(interval); setShowStats(true); }
      setDisplayPct(cur);
    }, 10);
    return () => clearInterval(interval);
  }, [pct]);

  const stats = [
    { icon: "🎯", label: "Score", value: `${score}/${total}` },
    { icon: "⭐", label: "XP Earned", value: `+${xpEarned}` },
    { icon: "✅", label: "Accuracy", value: `${pct}%` },
    { icon: "⏱", label: "Time", value: "2:34" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-6 relative overflow-hidden font-nunito">
      {/* Confetti */}
      {passed && [...Array(25)].map((_, i) => (
        <div key={i} className="absolute top-0 w-2 h-4 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: ["#00BFA5", "#FF5252", "#FFB300", "#7C4DFF", "#00C853"][i % 5],
            animation: `confetti-fall ${0.5 + Math.random() * 0.8}s ease-out ${Math.random() * 0.4}s forwards`,
          }}
        />
      ))}

      <div className="flex flex-col items-center gap-6 pt-20 w-full">
        <Mascot emotion={passed ? "celebrating" : "encouraging"} size="hero" />

        <div className="text-center">
          <h1 className="text-4xl font-black">{passed ? "Amazing! 🎉" : "Keep Going! 💪"}</h1>
          <p className="text-muted-foreground font-semibold mt-1">
            {passed ? "You nailed that quiz!" : "Review and try again — you've got this!"}
          </p>
        </div>

        {/* Score ring */}
        <div className="relative w-36 h-36">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#E5E5E5" strokeWidth="12" />
            <circle
              cx="60" cy="60" r="50" fill="none"
              stroke={passed ? "hsl(var(--success))" : "hsl(var(--reward))"}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - displayPct / 100)}`}
              style={{ transition: "stroke-dashoffset 0.5s ease-out" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black">{displayPct}%</span>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Score</span>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 gap-3 w-full transition-all duration-500 ${showStats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {stats.map((s, i) => (
            <div key={i} className="bg-card border-2 border-border rounded-2xl p-4 flex flex-col items-center gap-1"
              style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="text-2xl">{s.icon}</span>
              <span className="text-xl font-black">{s.value}</span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">{s.label}</span>
            </div>
          ))}
        </div>

        {/* XP Badge */}
        {showStats && (
          <div className="bg-reward-tint border-2 border-reward rounded-2xl px-8 py-3 flex items-center gap-3 animate-count-up">
            <span className="text-3xl">⭐</span>
            <div>
              <p className="text-xs font-extrabold text-reward uppercase tracking-wide">XP Earned</p>
              <p className="text-3xl font-black text-reward">+{xpEarned}</p>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-6 pb-12 pt-4 bg-gradient-to-t from-background via-background to-transparent space-y-3">
        <Button3D fullWidth variant="secondary" size="md" onClick={() => navigate("/quiz/demo")}>
          Review Answers
        </Button3D>
        <Button3D fullWidth onClick={() => navigate("/")}>
          Continue →
        </Button3D>
      </div>
    </div>
  );
}