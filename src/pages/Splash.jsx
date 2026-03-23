import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mascot from "../components/Mascot";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/welcome"), 2500);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary/80 to-accent relative overflow-hidden">
      {/* BG decorative circles */}
      <div className="absolute top-[-80px] right-[-60px] w-64 h-64 rounded-full bg-white/10" />
      <div className="absolute bottom-[-60px] left-[-40px] w-48 h-48 rounded-full bg-white/10" />

      <div className="flex flex-col items-center gap-6 z-10">
        <Mascot emotion="greeting" size="hero" />
        <div className="text-center">
          <h1 className="text-5xl font-black text-white tracking-tight drop-shadow-lg">SEAGAP</h1>
          <p className="text-white/80 text-base font-semibold mt-1">Your AI Learning Companion</p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-white"
              style={{ animation: `mascot-pulse 1s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}