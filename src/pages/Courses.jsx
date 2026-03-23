import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { isDemoMode } from "@/lib/demo-mode";
import { demoCourses } from "@/lib/demo-data";
import { Search } from "lucide-react";
import ProgressBar from "../components/ProgressBar";
import BottomTabBar from "../components/BottomTabBar";
import AssistiveButton from "../components/AssistiveButton";
import SkeletonCard from "../components/SkeletonCard";
import StatPill from "../components/StatPill";

const SUBJECTS = ["All", "Math", "Science", "English", "History", "Art"];
const MOCK = demoCourses;

export default function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isDemoMode) {
      setCourses(MOCK);
      setLoading(false);
      return;
    }

    base44.entities.Course.list()
      .then(c => {
        setCourses(c.length > 0 ? c : MOCK);
      })
      .catch(error => {
        console.error("Courses data load failed, using demo data:", error);
        setCourses(MOCK);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const display = courses.filter(c =>
    (filter === "All" || c.subject === filter) &&
    (c.title?.toLowerCase().includes(search.toLowerCase()))
  );

  const diffColor = { Beginner: "bg-success-tint text-success", Intermediate: "bg-reward-tint text-reward", Advanced: "bg-error-tint text-error" };

  return (
    <div className="min-h-screen bg-background pb-24 font-nunito">
      <div className="px-4 pt-14 pb-2">
        <h1 className="text-2xl font-black">Courses</h1>
        <p className="text-muted-foreground text-sm font-semibold">Explore all your subjects</p>
      </div>

      {/* Search */}
      <div className="px-4 py-2 relative">
        <Search size={16} className="absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search courses..."
          className="w-full bg-card border-2 border-border rounded-2xl pl-9 pr-4 py-3 text-sm font-semibold focus:border-primary outline-none transition-colors"
        />
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 px-4 py-2 overflow-x-auto">
        {SUBJECTS.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`flex-shrink-0 px-4 h-8 rounded-full text-xs font-extrabold uppercase tracking-wide transition-all press-3d ${filter === s ? "bg-primary text-primary-foreground shadow-3d-primary active:translate-y-[3px]" : "bg-card border-2 border-border text-muted-foreground active:translate-y-[3px]"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Course grid */}
      <div className="px-4 pt-2 grid grid-cols-1 gap-4">
        {loading ? [1, 2, 3].map(i => <SkeletonCard key={i} />) : display.map((c, i) => (
          <button
            key={c.id || i}
            onClick={() => navigate(`/course/${c.id}`)}
            className="bg-card border-2 border-border rounded-2xl overflow-hidden text-left press-3d active:translate-y-[5px] shadow-3d-gray w-full"
          >
            <div className="h-28 bg-gradient-to-br from-primary/70 to-accent/50 relative flex items-center justify-center">
              <span className="text-5xl">{c.emoji || "📖"}</span>
              <div className="absolute top-3 right-3">
                <span className={`text-[10px] font-extrabold px-2 py-1 rounded-full uppercase ${diffColor[c.difficulty] || "bg-muted text-muted-foreground"}`}>
                  {c.difficulty}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <p className="text-base font-extrabold">{c.title}</p>
                <p className="text-xs font-semibold text-muted-foreground">{c.instructor_name}</p>
              </div>
              <ProgressBar value={c.progress || 0} max={100} />
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground">{c.progress || 0}% complete</span>
                <StatPill icon="⭐" value={`${c.total_xp || 500} XP`} variant="reward" />
              </div>
            </div>
          </button>
        ))}
      </div>

      <AssistiveButton />
      <BottomTabBar />
    </div>
  );
}