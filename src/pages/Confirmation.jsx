import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mascot from "../components/Mascot";
import Button3D from "../components/Button3D";

export default function Confirmation() {
  const navigate = useNavigate();
  const [xp, setXp] = useState(0);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowStats(true), 400);
    let current = 0;
    const interval = setInterval(() => {
      current += 5;
      if (current >= 50) { clearInterval(interval); current = 50; }
      setXp(current);
    }, 20);
    return () => { clearTimeout(t1); clearInterval(interval); };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Confetti */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 w-2 h-4 rounded-sm opacity-80"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: ["#00BFA5", "#FF5252", "#FFB300", "#7C4DFF", "#00C853"][i % 5],
            animation: `confetti-fall ${0.6 + Math.random() * 0.6}s ease-out ${Math.random() * 0.5}s forwards`,
          }}
        />
      ))}

      <div className="flex flex-col items-center gap-6 z-10">
        <Mascot emotion="celebrating" size="hero" />

        <div className="text-center space-y-2" style={{ animationDelay: "200ms" }}>
          <h1 className="text-4xl font-black text-foreground animate-count-up">Welcome, Champion! 🎉</h1>
          <p className="text-muted-foreground font-semibold">Your learning journey begins now</p>
        </div>

        {showStats && (
          <div className="bg-reward-tint border-2 border-reward rounded-2xl px-8 py-4 flex flex-col items-center gap-1 animate-count-up">
            <span className="text-xs font-extrabold tracking-widest text-reward uppercase">Bonus XP Earned</span>
            <span className="text-5xl font-black text-reward">+{xp}</span>
            <span className="text-sm font-bold text-reward/70">XP</span>
          </div>
        )}

        <div className="flex gap-6 text-center" style={{ opacity: showStats ? 1 : 0, transition: "opacity 0.5s 0.3s" }}>
          {[["🔥", "0", "Streak"], ["⭐", `${xp}`, "XP"], ["📚", "0", "Lessons"]].map(([icon, val, label]) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-2xl">{icon}</span>
              <span className="text-xl font-black text-foreground">{val}</span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 left-6 right-6">
        <Button3D fullWidth onClick={() => navigate("/")}>
          Start Learning 🚀
        </Button3D>
      </div>
    </div>
  );
}