import { useState } from "react";
import BottomTabBar from "../components/BottomTabBar";
import Button3D from "../components/Button3D";
import StatPill from "../components/StatPill";
import AssistiveButton from "../components/AssistiveButton";

const TABS_LB = ["SCHOOL", "REGIONAL", "NATIONAL"];
const PLAYERS = [
  { name: "Maria Santos", xp: 12840, school: "Ateneo HS", rank: 1 },
  { name: "Juan Cruz", xp: 11510, school: "La Salle", rank: 2 },
  { name: "Ana Reyes", xp: 10200, school: "UST HS", rank: 3 },
  { name: "Carlos Lim", xp: 9700, school: "FEU HS", rank: 4 },
  { name: "Sofia Tan", xp: 9200, school: "Miriam College", rank: 5 },
  { name: "You", xp: 8850, school: "Your School", rank: 6, isUser: true },
  { name: "Paolo Garcia", xp: 8400, school: "DLSZ", rank: 7 },
  { name: "Lea Bautista", xp: 7900, school: "Assumption", rank: 8 },
  { name: "Mark Dela Cruz", xp: 7100, school: "San Beda", rank: 9 },
  { name: "Nina Ramos", xp: 6800, school: "Poveda", rank: 10 },
];

export default function Leaderboard() {
  const [tab, setTab] = useState(0);
  const top3 = PLAYERS.slice(0, 3);
  const rest = PLAYERS.slice(3);
  const MEDAL = ["🥇", "🥈", "🥉"];
  const PODIUM_BG = ["bg-reward-tint border-reward", "bg-muted border-border", "bg-[#CD7F32]/10 border-[#CD7F32]/40"];

  return (
    <div className="min-h-screen bg-background pb-24 font-nunito">
      <div className="px-4 pt-14 pb-2">
        <h1 className="text-2xl font-black">Leaderboard 🏆</h1>
      </div>

      {/* Tab bar */}
      <div className="flex border-b-2 border-border mx-4">
        {TABS_LB.map((t, i) => (
          <button key={t} onClick={() => setTab(i)}
            className={`flex-1 py-3 text-[11px] font-extrabold uppercase tracking-widest transition-all ${tab === i ? "text-primary border-b-2 border-primary -mb-0.5" : "text-muted-foreground"}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-end justify-center gap-3">
          {[top3[1], top3[0], top3[2]].map((p, i) => {
            const realRank = i === 0 ? 2 : i === 1 ? 1 : 3;
            const heights = ["h-24", "h-32", "h-20"];
            const bgPodium = ["bg-muted", "bg-reward-tint", "bg-[#CD7F32]/10"];
            return (
              <div key={p.rank} className={`flex-1 flex flex-col items-center gap-2`}>
                <div className="w-12 h-12 rounded-full bg-primary-tint border-2 border-primary flex items-center justify-center text-lg font-black">
                  {p.name[0]}
                </div>
                <p className="text-xs font-extrabold text-center leading-tight">{p.name.split(" ")[0]}</p>
                <StatPill icon="⭐" value={p.xp.toLocaleString()} variant="reward" className="text-[10px]" />
                <div className={`w-full ${heights[i]} ${bgPodium[i]} border-2 ${PODIUM_BG[realRank - 1]} rounded-t-2xl flex items-start justify-center pt-2 text-2xl`}>
                  {MEDAL[realRank - 1]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rest of list */}
      <div className="px-4 space-y-2">
        {rest.map((p, i) => {
          const isDemotion = i >= rest.length - 3;
          return (
            <div key={p.rank}
              style={{ "--lb-enter-index": i }}
              className={`leaderboard-row leaderboard-row--bottom flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${p.isUser ? "bg-primary-tint border-primary" : isDemotion ? "bg-error-tint/30 border-error/20" : "bg-card border-border"}`}>
              <span className="text-sm font-black w-7 text-center text-muted-foreground">#{p.rank}</span>
              <div className="w-9 h-9 rounded-full bg-primary-tint border-2 border-primary flex items-center justify-center text-sm font-black">
                {p.name[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-extrabold">{p.name}</p>
                <p className="text-xs text-muted-foreground font-semibold">{p.school}</p>
              </div>
              <StatPill icon="⭐" value={p.xp.toLocaleString()} variant={p.isUser ? "primary" : "reward"} />
            </div>
          );
        })}
      </div>

      <div className="px-4 pt-4">
        <Button3D fullWidth variant="secondary" size="md">🤝 Challenge a Friend</Button3D>
      </div>

      <AssistiveButton />
      <BottomTabBar />
    </div>
  );
}