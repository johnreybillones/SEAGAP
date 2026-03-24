import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { isDemoMode } from "@/lib/demo-mode";
import { demoCourses, demoModules } from "@/lib/demo-data";
import { useAssistiveLanguage } from "@/lib/i18n";
import { ChevronLeft, Lock, X } from "lucide-react";
import Button3D from "../components/Button3D";
import StatPill from "../components/StatPill";
import ProgressBar from "../components/ProgressBar";
import AssistiveButton from "../components/AssistiveButton";
import BottomTabBar from "../components/BottomTabBar";

const TABS = ["MODULES", "QUIZZES", "ASSIGNMENTS", "STUDENTS"];
const MOCK_MODULES = demoModules;
const MODULE_STATUSES = ["complete", "complete", "available", "available", "locked", "locked"];
const MODULE_META = {
  complete: {
    badge: "Completed",
    badgeClass: "bg-success-tint text-success",
    buttonLabel: "Review",
    buttonVariant: "secondary",
    cardClass: "bg-card border-border",
    summary: "Finished and ready to review anytime.",
  },
  available: {
    badge: "Open",
    badgeClass: "bg-primary-tint text-primary",
    buttonLabel: "Start Module",
    buttonVariant: "primary",
    cardClass: "bg-card border-border",
    summary: "Open now and ready for students.",
  },
  locked: {
    badge: "Locked",
    badgeClass: "bg-muted text-muted-foreground",
    buttonLabel: "Locked",
    buttonVariant: "secondary",
    cardClass: "bg-muted/50 border-border opacity-70",
    summary: "Professor has not opened this module yet.",
  },
};

export default function CoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { translateText: tx } = useAssistiveLanguage();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [sheet, setSheet] = useState(null);

  useEffect(() => {
    const load = async () => {
      const fallbackCourse = demoCourses.find(c => c.id === id) || {
        id,
        title: "Mathematics Grade 10",
        instructor_name: "Ms. Santos",
        description: "Master the fundamentals of Grade 10 Math"
      };

      if (isDemoMode) {
        setCourse(fallbackCourse);
        setModules(MOCK_MODULES);
        return;
      }

      try {
        const [courses, mods] = await Promise.all([
          base44.entities.Course.list(),
          base44.entities.Module.filter({ course_id: id }),
        ]);
        setCourse(courses.find(c => c.id === id) || fallbackCourse);
        setModules(mods.length > 0 ? mods : MOCK_MODULES);
      } catch (error) {
        console.error("Course page data load failed, using demo data:", error);
        setCourse(fallbackCourse);
        setModules(MOCK_MODULES);
      }
    };
    load();
  }, [id]);

  const moduleList = (modules.length > 0 ? modules : MOCK_MODULES).map((module, index) => ({
    ...module,
    moduleNumber: index + 1,
    status: MODULE_STATUSES[index] || "locked",
  }));

  const openModule = (module) => {
    navigate(`/course/${id}/module/${module.id}`);
  };

  return (
    <div className="min-h-screen bg-background pb-24 font-nunito">
      {/* Header */}
      <div className="relative h-52">
        <img src="/illustrations/course-hero.svg" className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <button onClick={() => navigate(-1)} className="absolute top-14 left-4 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center">
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-black text-white">{tx(course?.title || "")}</h1>
          <p className="text-white/70 text-sm font-semibold">{course?.instructor_name}</p>
        </div>
        <div className="absolute top-14 right-4">
          <StatPill icon="⭐" value="750 XP" variant="reward" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 py-3">
        <ProgressBar value={37} max={100} />
        <p className="text-xs font-bold text-muted-foreground mt-1">{tx("37% complete")}</p>
      </div>

      {/* Secondary tabs */}
      <div className="flex border-b-2 border-border overflow-x-auto">
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setActiveTab(i)}
            className={`flex-1 min-w-[80px] py-3 text-[11px] font-extrabold uppercase tracking-widest transition-all ${activeTab === i ? "text-primary border-b-2 border-primary -mb-0.5" : "text-muted-foreground"}`}
          >
            {tx(t)}
          </button>
        ))}
      </div>

      {/* Modules tab */}
      {activeTab === 0 && (
        <div className="px-4 py-4 space-y-3">
          <div className="rounded-2xl border-2 border-primary/20 bg-primary-tint px-4 py-3">
            <p className="text-xs font-extrabold uppercase tracking-widest text-primary">{tx("Course Modules")}</p>
            <p className="text-sm font-semibold text-foreground mt-1">{tx("Modules near the end stay locked until your professor opens them.")}</p>
          </div>

          {moduleList.map((module) => {
            const meta = MODULE_META[module.status];
            const locked = module.status === "locked";
            return (
              <div
                key={module.id}
                className={`rounded-2xl border-2 p-4 space-y-3 ${meta.cardClass} ${locked ? "" : "press-3d shadow-3d-gray active:translate-y-[5px] cursor-pointer"}`}
                onClick={() => !locked && setSheet(module)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black ${locked ? "bg-card border-2 border-border text-muted-foreground" : "bg-primary-tint border-2 border-primary text-primary"}`}>
                        {locked ? <Lock size={14} /> : module.moduleNumber}
                      </span>
                      <div>
                        <p className="font-extrabold text-sm">{tx(module.title)}</p>
                        <p className="text-xs font-semibold text-muted-foreground">
                          {locked ? `${tx("Module")} ${module.moduleNumber} · ${tx("Awaiting release")}` : `${tx("Module")} ${module.moduleNumber}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2 py-1 rounded-full uppercase ${meta.badgeClass}`}>
                    {tx(meta.badge)}
                  </span>
                </div>

                <p className="text-sm font-semibold text-muted-foreground">
                  {tx(module.description || meta.summary)}
                </p>

                <div className="flex flex-wrap gap-2">
                  <StatPill icon="⭐" value={`+${module.xp_reward || 150} XP`} variant="reward" />
                  <StatPill icon="⏱" value="~15 min" />
                  {locked ? (
                    <StatPill icon="🔒" value={tx("Professor Locked")} />
                  ) : module.status === "complete" ? (
                    <StatPill icon="✅" value={tx("Done")} variant="success" />
                  ) : (
                    <StatPill icon="📘" value={tx("Ready")} variant="primary" />
                  )}
                </div>

                <Button3D
                  fullWidth
                  size="sm"
                  variant={locked ? "secondary" : meta.buttonVariant}
                  disabled={locked}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (!locked) {
                      setSheet(module);
                    }
                  }}
                >
                  {tx(meta.buttonLabel)}
                </Button3D>
              </div>
            );
          })}
        </div>
      )}

      {/* Quizzes tab */}
      {activeTab === 1 && (
        <div className="px-4 py-4 space-y-3">
            {[
            { title: "Unit 1 Quiz", xp: 100, time: "15 min", best: "92%", status: "completed" },
            { title: "Unit 2 Quiz", xp: 120, time: "20 min", best: null, status: "available" },
            { title: "Midterm Quiz", xp: 200, time: "30 min", best: null, status: "locked" },
          ].map((q, i) => (
            <div key={i} className={`bg-card border-2 rounded-2xl p-4 space-y-2 press-3d shadow-3d-gray active:translate-y-[5px] ${q.status === "locked" ? "opacity-50 border-border" : "border-border cursor-pointer"}`}
              onClick={() => q.status !== "locked" && navigate("/quiz/demo")}>
              <div className="flex items-center justify-between">
                <p className="font-extrabold text-sm">{tx(q.title)}</p>
                <span className={`text-[10px] font-extrabold px-2 py-1 rounded-full uppercase ${q.status === "completed" ? "bg-success-tint text-success" : q.status === "locked" ? "bg-muted text-muted-foreground" : "bg-primary-tint text-primary"}`}>
                  {tx(q.status)}
                </span>
              </div>
              <div className="flex gap-3">
                <StatPill icon="⭐" value={`+${q.xp} XP`} variant="reward" />
                <StatPill icon="⏱" value={q.time} />
                {q.best && <StatPill icon="🏆" value={q.best} variant="success" />}
              </div>
              {q.status !== "locked" && (
                <Button3D size="sm" variant={q.status === "completed" ? "secondary" : "primary"} className="w-full mt-1"
                  onClick={e => { e.stopPropagation(); navigate("/quiz/demo"); }}>
                  {q.status === "completed" ? tx("Review") : tx("Start Quiz")}
                </Button3D>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Assignments tab */}
      {activeTab === 2 && (
        <div className="px-4 py-4 space-y-3">
            {[
            { title: "Problem Set 1", due: "Mar 25", difficulty: "Easy", status: "Submitted" },
            { title: "Essay on Algebra", due: "Mar 28", difficulty: "Medium", status: "Pending" },
            { title: "Group Project", due: "Apr 5", difficulty: "Hard", status: "Pending" },
          ].map((a, i) => (
            <div key={i} className="bg-card border-2 border-border rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-extrabold text-sm">{tx(a.title)}</p>
                <span className={`text-[10px] font-extrabold px-2 py-1 rounded-full uppercase ${a.status === "Submitted" ? "bg-success-tint text-success" : "bg-reward-tint text-reward"}`}>
                  {tx(a.status)}
                </span>
              </div>
              <div className="flex gap-2">
                <StatPill icon="📅" value={`${tx("Due")} ${a.due}`} />
                <StatPill icon="⚡" value={tx(a.difficulty)} variant={a.difficulty === "Hard" ? "error" : a.difficulty === "Medium" ? "reward" : "success"} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Students tab */}
      {activeTab === 3 && (
        <div className="px-4 py-4 space-y-2">
          {[
            { name: "Maria Santos", xp: 2840, rank: 1, school: "Ateneo HS" },
            { name: "Juan Cruz", xp: 2510, rank: 2, school: "La Salle" },
            { name: "Ana Reyes", xp: 2200, rank: 3, school: "UST HS" },
            { name: "You", xp: 1850, rank: 4, school: "Your School", isUser: true },
            { name: "Carlos Lim", xp: 1700, rank: 5, school: "FEU HS" },
          ].map((s, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-2xl ${s.isUser ? "bg-primary-tint border-2 border-primary" : "bg-card border-2 border-border"}`}>
              <span className={`text-base font-black w-7 text-center ${i === 0 ? "text-reward" : i === 1 ? "text-muted-foreground" : "text-muted-foreground"}`}>
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${s.rank}`}
              </span>
              <div className="w-9 h-9 rounded-full bg-primary-tint border-2 border-primary flex items-center justify-center text-sm font-black">
                {s.name[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-extrabold">{s.name}</p>
                <p className="text-xs text-muted-foreground font-semibold">{s.school}</p>
              </div>
              <StatPill icon="⭐" value={s.xp.toLocaleString()} variant="reward" />
            </div>
          ))}
        </div>
      )}

      {/* Module bottom sheet */}
      {sheet && (
        <div className="fixed inset-0 z-[70] prototype-fixed-layer prototype-layer-rounded" onClick={() => setSheet(null)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl p-6 space-y-4 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black">{tx(sheet.title)}</h3>
              <button onClick={() => setSheet(null)} className="p-2 rounded-xl hover:bg-muted"><X size={18} /></button>
            </div>
            <p className="text-muted-foreground text-sm font-semibold">{tx(sheet.description || "Complete this module to earn XP and unlock the next challenge.")}</p>
            <div className="flex gap-3">
              <StatPill icon="⭐" value={`+${sheet.xp_reward || 150} XP`} variant="reward" />
              <StatPill icon="⏱" value="~15 min" />
            </div>
            <div className="flex gap-3">
              <Button3D fullWidth variant="secondary" size="md" onClick={() => setSheet(null)}>
                {sheet.status === "complete" ? tx("Review") : tx("Maybe Later")}
              </Button3D>
              <Button3D
                fullWidth
                size="md"
                onClick={() => {
                  const nextModule = sheet;
                  setSheet(null);
                  openModule(nextModule);
                }}
              >
                {sheet.status === "complete" ? tx("Review Module") : tx("Start Module →")}
              </Button3D>
            </div>
          </div>
        </div>
      )}

      <AssistiveButton />
      <BottomTabBar />
    </div>
  );
}
