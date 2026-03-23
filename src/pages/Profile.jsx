import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { isDemoMode } from "@/lib/demo-mode";
import { demoUser } from "@/lib/demo-data";
import { ChevronLeft, Edit2, Settings } from "lucide-react";
import Button3D from "../components/Button3D";
import BottomTabBar from "../components/BottomTabBar";
import AssistiveButton from "../components/AssistiveButton";

const ACHIEVEMENTS = [
  { icon: "🏆", label: "First Win", earned: true },
  { icon: "🔥", label: "7-Day Streak", earned: true },
  { icon: "⭐", label: "100 XP", earned: true },
  { icon: "🎯", label: "Perfect Score", earned: false },
  { icon: "📚", label: "5 Courses", earned: false },
  { icon: "🤝", label: "Team Player", earned: false },
  { icon: "💡", label: "Hint Master", earned: false },
  { icon: "🌟", label: "Top 10", earned: false },
];

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isDemoMode) {
      setUser(demoUser);
      return;
    }

    base44.auth.me()
      .then(setUser)
      .catch(error => {
        console.error("Profile user load failed, using demo user:", error);
        setUser(demoUser);
      });
  }, []);

  // Generate 7-week heatmap
  const heatmap = Array.from({ length: 49 }, () => {
    const rand = Math.random();
    return rand > 0.5 ? (rand > 0.8 ? 3 : rand > 0.65 ? 2 : 1) : 0;
  });
  const heatColors = ["bg-border", "bg-primary/30", "bg-primary/60", "bg-primary"];

  const STAT_ROWS = [
    { icon: "🔥", label: "Streak", value: "7" },
    { icon: "⭐", label: "Total XP", value: "8,850" },
    { icon: "🏆", label: "Rank", value: "#6" },
    { icon: "📚", label: "Courses", value: "3" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 font-nunito">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-primary to-primary/60 pt-14 pb-8 px-4">
        <button onClick={() => navigate(-1)} className="absolute top-14 left-4 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <ChevronLeft size={20} className="text-white" />
        </button>
        <button className="absolute top-14 right-4 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <Settings size={18} className="text-white" />
        </button>

        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-white/30 border-4 border-white flex items-center justify-center text-4xl font-black text-white">
              {user?.full_name?.[0] || "U"}
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Edit2 size={13} className="text-primary" />
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black text-white">{user?.full_name || "Champion"}</h2>
            <p className="text-white/70 text-sm font-semibold">Grade 10 · Ateneo HS</p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6 pt-6">
        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2">
          {STAT_ROWS.map(s => (
            <div key={s.label} className="bg-card border-2 border-border rounded-2xl p-3 flex flex-col items-center gap-1 min-w-0">
              <span className="text-xl leading-none">{s.icon}</span>
              <span className="text-l font-black leading-none whitespace-nowrap tabular-nums">{s.value}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide whitespace-nowrap text-center leading-tight">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Streak heatmap */}
        <div>
          <h3 className="text-base font-black mb-3">Activity — Last 7 Weeks</h3>
          <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
            {heatmap.map((v, i) => (
              <div key={i} className={`aspect-square rounded-sm ${heatColors[v]}`} />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2 justify-end">
            <span className="text-[10px] text-muted-foreground font-semibold">Less</span>
            {heatColors.map((c, i) => <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />)}
            <span className="text-[10px] text-muted-foreground font-semibold">More</span>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-base font-black mb-3">Achievements</h3>
          <div className="grid grid-cols-4 gap-3">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} className={`flex flex-col items-center gap-1 ${!a.earned && "opacity-40"}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${a.earned ? "bg-reward-tint border-2 border-reward shadow-3d-reward" : "bg-muted border-2 border-border"}`}>
                  {a.earned ? a.icon : "🔒"}
                </div>
                <span className="text-[10px] font-bold text-center text-muted-foreground leading-tight">{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button3D fullWidth variant="secondary" size="md" onClick={() => {}}>
            <Edit2 size={16} /> Edit Profile
          </Button3D>
          <Button3D
            fullWidth
            variant="ghost"
            size="sm"
            onClick={() => {
              if (isDemoMode) {
                navigate("/welcome");
                return;
              }
              base44.auth.logout();
            }}
          >
            Sign Out
          </Button3D>
        </div>
      </div>

      <AssistiveButton />
      <BottomTabBar />
    </div>
  );
}