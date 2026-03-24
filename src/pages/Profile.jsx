import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { base44 } from "@/api/base44Client";
import { isDemoMode } from "@/lib/demo-mode";
import { demoUser } from "@/lib/demo-data";
import { ChartContainer } from "@/components/ui/chart";
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

const SKILL_DATA = [
  { skill: "Equations", mastery: 86, target: 92 },
  { skill: "Word Problems", mastery: 72, target: 85 },
  { skill: "Quiz Speed", mastery: 64, target: 80 },
  { skill: "Recall", mastery: 78, target: 88 },
  { skill: "Practice", mastery: 82, target: 90 },
  { skill: "Attendance", mastery: 91, target: 94 },
];

const FRIENDS = [
  { name: "Maria Santos", streak: 12, focus: "Word Problems", status: "Studying now", avatar: "M" },
  { name: "Juan Cruz", streak: 9, focus: "Equations", status: "Finished Module 2", avatar: "J" },
  { name: "Ana Reyes", streak: 6, focus: "Practice Quiz", status: "Needs a nudge", avatar: "A" },
];

const RETENTION_CARDS = [
  { label: "Recall Rate", value: "81%", note: "Up 6% this week", tone: "primary" },
  { label: "Best Study Window", value: "7:00 PM", note: "Based on 3 strong sessions", tone: "reward" },
  { label: "Review Due", value: "2 modules", note: "Module 1 and Applied Problems", tone: "error" },
];

const MODULE_PROGRESS = [
  { title: "Introduction to Linear Equations", score: "Strong", accuracy: "92%", review: "Tomorrow", tone: "success" },
  { title: "Solving One-Step Equations", score: "Steady", accuracy: "84%", review: "Today", tone: "primary" },
  { title: "Applied Problems", score: "Needs review", accuracy: "68%", review: "Tonight", tone: "error" },
];

const SCHEDULE_MAP = [
  ["Mon", "6 PM", 3],
  ["Tue", "7 PM", 2],
  ["Wed", "6 PM", 0],
  ["Thu", "8 PM", 3],
  ["Fri", "7 PM", 1],
  ["Sat", "10 AM", 2],
  ["Sun", "4 PM", 1],
];

const CHART_CONFIG = {
  mastery: {
    label: "Current",
    color: "hsl(var(--primary))",
  },
  target: {
    label: "Goal",
    color: "hsl(var(--accent))",
  },
};

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
      .catch((error) => {
        console.error("Profile user load failed, using demo user:", error);
        setUser(demoUser);
      });
  }, []);

  const heatmap = Array.from({ length: 28 }, (_, index) => {
    const pattern = [3, 2, 1, 0, 2, 3, 1];
    return pattern[index % pattern.length];
  });
  const heatColors = ["bg-border", "bg-primary/25", "bg-primary/50", "bg-primary"];

  const statRows = [
    { icon: "🔥", label: "Streak", value: "7" },
    { icon: "⭐", label: "Total XP", value: "8,850" },
    { icon: "🏆", label: "Rank", value: "#6" },
    { icon: "🧠", label: "Recall", value: "81%" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 font-nunito">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/60 pt-14 pb-8 px-4">
        <div className="absolute -top-8 -left-6 h-28 w-28 rounded-full bg-white/10 blur-sm" />
        <div className="absolute top-10 right-10 h-20 w-20 rounded-full bg-accent/20 blur-md" />
        <div className="absolute bottom-0 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full bg-white/10 blur-2xl" />
        <button onClick={() => navigate(-1)} className="absolute top-14 left-4 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <ChevronLeft size={20} className="text-black" />
        </button>
        <button className="absolute top-14 right-4 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <Settings size={18} className="text-black" />
        </button>

        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="absolute inset-[-12px] rounded-full bg-gradient-to-br from-white/20 via-accent/20 to-transparent" />
            <div className="relative w-24 h-24 rounded-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_rgba(255,255,255,0.14)_55%,_rgba(255,255,255,0.08))] border-4 border-white shadow-[0_10px_25px_rgba(0,0,0,0.15)] flex items-center justify-center text-4xl font-black text-white backdrop-blur-sm">
              <div className="absolute inset-2 rounded-full border border-white/20" />
              <span className="relative">{user?.full_name?.[0] || "U"}</span>
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Edit2 size={13} className="text-primary" />
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black text-black">{user?.full_name || "Champion"}</h2>
            <p className="text-black/70 text-sm font-semibold">Grade 10 · Ateneo HS</p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6 pt-6">
        <div className="grid grid-cols-4 gap-2">
          {statRows.map((stat) => (
            <div key={stat.label} className="bg-card border-2 border-border rounded-2xl p-3 flex flex-col items-center gap-1 min-w-0">
              <span className="text-xl leading-none">{stat.icon}</span>
              <span className="text-l font-black leading-none whitespace-nowrap tabular-nums">{stat.value}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide whitespace-nowrap text-center leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card border-2 border-border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-black">Activity</h3>
                <p className="text-xs font-semibold text-muted-foreground">Last 4 weeks</p>
              </div>
              <span className="text-xs font-extrabold px-2 py-1 rounded-full bg-reward-tint text-reward">Consistent</span>
            </div>
            <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
              {heatmap.map((value, index) => (
                <div key={index} className={`aspect-square rounded-[4px] ${heatColors[value]}`} />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2 justify-end">
              <span className="text-[10px] text-muted-foreground font-semibold">Less</span>
              {heatColors.map((color, index) => <div key={index} className={`w-2.5 h-2.5 rounded-sm ${color}`} />)}
              <span className="text-[10px] text-muted-foreground font-semibold">More</span>
            </div>
          </div>

          <div className="bg-card border-2 border-border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-black">Study Rhythm</h3>
                <p className="text-xs font-semibold text-muted-foreground">Best times to study and review</p>
              </div>
              <span className="text-xs font-extrabold px-2 py-1 rounded-full bg-primary-tint text-primary">Timed</span>
            </div>
            <div className="space-y-2">
              {SCHEDULE_MAP.map(([day, slot, strength]) => (
                <div key={`${day}-${slot}`} className="flex items-center gap-2">
                  <span className="w-10 text-[10px] font-extrabold uppercase text-muted-foreground">{day}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${strength === 3 ? "bg-primary" : strength === 2 ? "bg-reward" : strength === 1 ? "bg-accent" : "bg-border"}`}
                      style={{ width: `${(strength / 3) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-[10px] font-bold text-muted-foreground text-right">{slot}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card border-2 border-border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-black">Skill Map</h3>
                <p className="text-xs font-semibold text-muted-foreground">Current mastery vs target by module skill</p>
            </div>
            <span className="text-xs font-extrabold px-2 py-1 rounded-full bg-primary-tint text-primary">Live Profile</span>
          </div>
          <ChartContainer config={CHART_CONFIG} className="mx-auto h-[260px] w-full max-w-[320px]">
            <RadarChart data={SKILL_DATA} outerRadius="72%">
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--foreground))", fontSize: 11, fontWeight: 700 }} />
              <Radar dataKey="target" stroke="var(--color-target)" fill="var(--color-target)" fillOpacity={0.14} strokeWidth={2} />
              <Radar dataKey="mastery" stroke="var(--color-mastery)" fill="var(--color-mastery)" fillOpacity={0.34} strokeWidth={2.5} />
            </RadarChart>
          </ChartContainer>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="rounded-2xl bg-primary-tint px-3 py-2">
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-primary">Top Strength</p>
              <p className="text-sm font-black mt-1">Attendance + Equations</p>
            </div>
            <div className="rounded-2xl bg-error-tint px-3 py-2">
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-error">Needs Review</p>
              <p className="text-sm font-black mt-1">Quiz speed and word problems</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-base font-black mb-3">Learning Snapshot</h3>
          <div className="grid grid-cols-1 gap-3">
            {RETENTION_CARDS.map((card) => (
              <div key={card.label} className="bg-card border-2 border-border rounded-2xl p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">{card.label}</p>
                  <p className="text-sm font-semibold text-muted-foreground mt-1">{card.note}</p>
                </div>
                <span className={`text-lg font-black px-3 py-2 rounded-2xl ${card.tone === "primary" ? "bg-primary-tint text-primary" : card.tone === "reward" ? "bg-reward-tint text-reward" : "bg-error-tint text-error"}`}>
                  {card.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-black">Module Progress</h3>
            <span className="text-xs font-bold text-muted-foreground">Spaced review</span>
          </div>
          <div className="space-y-3">
            {MODULE_PROGRESS.map((module) => (
              <div key={module.title} className="bg-card border-2 border-border rounded-2xl p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-extrabold">{module.title}</p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1">Next review: {module.review}</p>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2 py-1 rounded-full uppercase ${module.tone === "success" ? "bg-success-tint text-success" : module.tone === "primary" ? "bg-primary-tint text-primary" : "bg-error-tint text-error"}`}>
                    {module.score}
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-muted-foreground">Recall accuracy</span>
                    <span className="text-xs font-extrabold">{module.accuracy}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${module.tone === "success" ? "bg-success" : module.tone === "primary" ? "bg-primary" : "bg-error"}`}
                      style={{ width: module.accuracy }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-black">Friends</h3>
            <span className="text-xs font-bold text-muted-foreground">Study circle</span>
          </div>
          <div className="space-y-3">
            {FRIENDS.map((friend) => (
              <div key={friend.name} className="bg-card border-2 border-border rounded-2xl p-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary-tint border-2 border-primary flex items-center justify-center text-sm font-black text-primary">
                  {friend.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-extrabold">{friend.name}</p>
                  <p className="text-xs font-semibold text-muted-foreground truncate">{friend.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-extrabold text-primary">{friend.streak} day streak</p>
                  <p className="text-[10px] font-semibold text-muted-foreground">{friend.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base font-black mb-3">Achievements</h3>
          <div className="grid grid-cols-4 gap-3">
            {ACHIEVEMENTS.map((achievement, index) => (
              <div key={index} className={`flex flex-col items-center gap-1 ${!achievement.earned && "opacity-40"}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${achievement.earned ? "bg-reward-tint border-2 border-reward shadow-3d-reward" : "bg-muted border-2 border-border"}`}>
                  {achievement.earned ? achievement.icon : "🔒"}
                </div>
                <span className="text-[10px] font-bold text-center text-muted-foreground leading-tight">{achievement.label}</span>
              </div>
            ))}
          </div>
        </div>

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
