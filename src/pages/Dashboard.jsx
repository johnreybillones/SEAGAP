import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Bell, ChevronRight } from "lucide-react";
import Mascot from "../components/Mascot";
import Button3D from "../components/Button3D";
import StatPill from "../components/StatPill";
import ProgressBar from "../components/ProgressBar";
import BottomTabBar from "../components/BottomTabBar";
import AssistiveButton from "../components/AssistiveButton";
import SkeletonCard from "../components/SkeletonCard";
import OfflineBanner from "../components/OfflineBanner";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const CHALLENGES = [
  { title: "Speed Round", desc: "Answer 10 questions in 60s", xp: 150, time: "2h left", icon: "⚡" },
  { title: "Perfect Score", desc: "Get 100% on any quiz today", xp: 200, time: "5h left", icon: "🎯" },
  { title: "Study Buddy", desc: "Help a teammate with a hint", xp: 75, time: "10h left", icon: "🤝" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => { window.removeEventListener("online", handleOnline); window.removeEventListener("offline", handleOffline); };
  }, []);

  useEffect(() => {
    const load = async () => {
      const [u, c] = await Promise.all([base44.auth.me(), base44.entities.Course.list()]);
      setUser(u);
      setCourses(c);
      setLoading(false);
    };
    load();
  }, []);

  const streakDays = [true, true, true, true, false, false, false];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-background pb-24 font-nunito">
      {isOffline && <OfflineBanner />}

      {/* Top bar */}
      <div className="px-4 pt-14 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/profile")} className="w-10 h-10 rounded-full bg-primary-tint border-2 border-primary flex items-center justify-center text-lg font-black press-3d active:translate-y-[2px]">
            {user?.full_name?.[0] || "U"}
          </button>
          <div>
            <p className="text-xs font-bold text-muted-foreground">{greeting},</p>
            <p className="text-base font-black text-foreground leading-tight">{user?.full_name || "Champion"} 👋</p>
          </div>
        </div>
        <button className="relative p-2 rounded-2xl bg-card border-2 border-border press-3d active:translate-y-[2px] shadow-3d-gray">
          <Bell size={20} />
          <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
        </button>
      </div>

      <div className="px-4 space-y-6">
        {/* Streak Widget */}
        <div className="bg-gradient-to-br from-reward-tint to-reward/10 border-2 border-reward/30 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-streak-pulse inline-block">🔥</span>
              <div>
                <p className="text-lg font-black text-foreground">7-Day Streak!</p>
                <p className="text-xs font-bold text-muted-foreground">Keep it going!</p>
              </div>
            </div>
            <StatPill icon="🔥" value="7" variant="reward" animate />
          </div>
          <div className="flex gap-1.5">
            {DAYS.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-full aspect-square rounded-xl flex items-center justify-center text-xs font-black ${streakDays[i] ? "bg-reward text-white shadow-3d-reward" : "bg-card border-2 border-border text-muted-foreground"}`}>
                  {streakDays[i] ? "🔥" : d}
                </div>
                <span className="text-[10px] font-bold text-muted-foreground">{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Learning */}
        {loading ? <SkeletonCard /> : courses[0] && (
          <div className="bg-card border-2 border-border rounded-2xl overflow-hidden shadow-3d-gray">
            <div className="relative h-32 bg-gradient-to-br from-primary to-primary/60">
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80"
                className="w-full h-full object-cover opacity-40"
                alt=""
              />
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <p className="text-xs font-extrabold text-white/70 uppercase tracking-widest">Continue Learning</p>
                <p className="text-xl font-black text-white">{courses[0].title}</p>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-muted-foreground">Chapter 3 of 8</span>
                <StatPill icon="⭐" value="+120 XP" variant="reward" />
              </div>
              <ProgressBar value={37} max={100} />
              <Button3D fullWidth size="md" onClick={() => navigate(`/course/${courses[0].id}`)}>
                Resume →
              </Button3D>
            </div>
          </div>
        )}

        {/* My Courses */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black">My Courses</h2>
            <button className="text-primary text-sm font-bold flex items-center gap-1" onClick={() => navigate("/courses")}>
              See all <ChevronRight size={14} />
            </button>
          </div>
          {loading ? (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[1, 2].map(i => <SkeletonCard key={i} className="min-w-[200px]" />)}
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
              {(courses.length > 0 ? courses : MOCK_COURSES).slice(0, 4).map((c, i) => (
                <button
                  key={c.id || i}
                  onClick={() => navigate(c.id ? `/course/${c.id}` : "#")}
                  className="min-w-[180px] bg-card border-2 border-border rounded-2xl overflow-hidden press-3d active:translate-y-[5px] shadow-3d-gray flex-shrink-0 text-left"
                >
                  <div className="h-24 bg-gradient-to-br from-primary/80 to-accent/60 relative">
                    <div className="absolute bottom-2 left-2 text-xl">{["📐", "🔬", "📚", "🌍"][i % 4]}</div>
                  </div>
                  <div className="p-3 space-y-2">
                    <p className="text-sm font-extrabold leading-tight">{c.title || MOCK_COURSES[i]?.title}</p>
                    <ProgressBar value={[45, 20, 80, 10][i % 4]} max={100} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-muted-foreground">{[45, 20, 80, 10][i % 4]}%</span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${["bg-primary-tint text-primary", "bg-reward-tint text-reward", "bg-success-tint text-success", "bg-accent/10 text-accent"][i % 4]}`}>
                        {c.difficulty || ["Beginner", "Advanced", "Intermediate", "Beginner"][i % 4]}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Daily Challenges */}
        <div>
          <h2 className="text-lg font-black mb-3">Daily Challenges</h2>
          <div className="space-y-3">
            {CHALLENGES.map((c, i) => (
              <div key={i} className="bg-card border-2 border-border rounded-2xl p-4 flex items-center gap-3 press-3d active:translate-y-[5px] shadow-3d-gray cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-primary-tint flex items-center justify-center text-2xl flex-shrink-0">{c.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-sm">{c.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{c.desc}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StatPill icon="⭐" value={`+${c.xp}`} variant="reward" />
                  <span className="text-[10px] font-bold text-muted-foreground">{c.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-lg font-black mb-3">Achievements</h2>
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-2">
            {[
              { icon: "🏆", label: "First Win", earned: true },
              { icon: "🔥", label: "7 Day Streak", earned: true },
              { icon: "⭐", label: "100 XP", earned: true },
              { icon: "🎯", label: "Perfect Score", earned: false },
              { icon: "📚", label: "5 Courses", earned: false },
              { icon: "🤝", label: "Team Player", earned: false },
            ].map((a, i) => (
              <div key={i} className={`flex-shrink-0 w-16 flex flex-col items-center gap-1 ${!a.earned && "opacity-40"}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${a.earned ? "bg-reward-tint border-2 border-reward shadow-3d-reward" : "bg-muted border-2 border-border"}`}>
                  {a.earned ? a.icon : "🔒"}
                </div>
                <span className="text-[10px] font-bold text-center text-muted-foreground leading-tight">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AssistiveButton />
      <BottomTabBar />
    </div>
  );
}

const MOCK_COURSES = [
  { title: "Mathematics Grade 10", difficulty: "Intermediate" },
  { title: "Science Fundamentals", difficulty: "Beginner" },
  { title: "English Literature", difficulty: "Advanced" },
  { title: "World History", difficulty: "Beginner" },
];