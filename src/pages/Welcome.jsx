import { useNavigate } from "react-router-dom";
import Mascot from "../components/Mascot";
import Button3D from "../components/Button3D";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top hero area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 gap-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/10 scale-125 animate-ring-pulse" />
          <Mascot emotion="greeting" size="hero" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black text-foreground tracking-tight">Learn. Play. Win.</h1>
          <p className="text-muted-foreground text-base font-medium max-w-xs mx-auto">
            SEAGAP makes studying feel like a game — offline-ready, AI-powered, and built for champions.
          </p>
        </div>
      </div>

      {/* CTA area */}
      <div className="px-6 pb-12 space-y-3">
        <Button3D fullWidth onClick={() => navigate("/register")}>
          Get Started 🚀
        </Button3D>
        <Button3D fullWidth variant="ghost" size="sm" onClick={() => navigate("/login")}>
          Log In
        </Button3D>
      </div>
    </div>
  );
}