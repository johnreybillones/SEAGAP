import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Mascot from "../components/Mascot";
import Button3D from "../components/Button3D";
import StatPill from "../components/StatPill";
import ProgressBar from "../components/ProgressBar";
import AssistiveButton from "../components/AssistiveButton";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  { type: "MULTIPLE CHOICE", q: "What is the value of x in the equation: 2x + 8 = 20?", options: ["x = 4", "x = 6", "x = 8", "x = 14"], correct: 1, explanation: "Subtract 8 from both sides: 2x = 12, then divide by 2: x = 6" },
  { type: "MULTIPLE CHOICE", q: "Which of the following is a prime number?", options: ["15", "21", "29", "33"], correct: 2, explanation: "29 is only divisible by 1 and itself, making it a prime number." },
  { type: "MULTIPLE CHOICE", q: "What is the area of a circle with radius 5?", options: ["25π", "10π", "5π", "50π"], correct: 0, explanation: "Area = πr² = π × 5² = 25π" },
  { type: "MULTIPLE CHOICE", q: "Simplify: (3x²)(4x³)", options: ["7x⁵", "12x⁵", "12x⁶", "7x⁶"], correct: 1, explanation: "Multiply coefficients: 3×4=12. Add exponents: 2+3=5. Result: 12x⁵" },
];

export default function QuizScreen() {
  const navigate = useNavigate();
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [xpFloat, setXpFloat] = useState(false);
  const [shakeIdx, setShakeIdx] = useState(null);
  const [streak, setStreak] = useState(7);
  const [xp, setXp] = useState(350);
  const [correctCount, setCorrectCount] = useState(0);

  const q = QUESTIONS[qIndex];
  const isCorrect = submitted && selected === q.correct;
  const isWrong = submitted && selected !== null && selected !== q.correct;

  const handleSelect = (i) => {
    if (submitted) return;
    setSelected(i);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    if (selected === q.correct) {
      setCorrectCount(c => c + 1);
      setTimeout(() => { setXp(x => x + 30); setXpFloat(true); setTimeout(() => setXpFloat(false), 1000); }, 300);
    } else {
      setShakeIdx(selected);
      setTimeout(() => setShakeIdx(null), 600);
    }
    setTimeout(() => setShowSheet(true), 500);
  };

  const handleContinue = () => {
    setShowSheet(false);
    setTimeout(() => {
      if (qIndex < QUESTIONS.length - 1) {
        setQIndex(i => i + 1);
        setSelected(null);
        setSubmitted(false);
      } else {
        navigate("/quiz-results", { state: { score: correctCount + (isCorrect ? 1 : 0), total: QUESTIONS.length, xp } });
      }
    }, 200);
  };

  const optionState = (i) => {
    if (!submitted) return selected === i ? "selected" : "default";
    if (i === q.correct) return "correct";
    if (i === selected && i !== q.correct) return "wrong";
    return "default";
  };

  const OPTION_STYLES = {
    default: "bg-card border-[#E5E5E5] shadow-3d-gray text-foreground",
    selected: "bg-primary-tint border-primary shadow-3d-primary text-foreground",
    correct: "bg-success-tint border-success shadow-3d-success text-foreground",
    wrong: "bg-error-tint border-error text-foreground",
  };

  const OPTION_INDICATOR = {
    default: (i) => <span className="w-7 h-7 rounded-full border-2 border-border flex items-center justify-center text-xs font-black">{["A","B","C","D"][i]}</span>,
    selected: (i) => <span className="w-7 h-7 rounded-full bg-primary flex items-center justify-center"><span className="w-3 h-3 rounded-full bg-white" /></span>,
    correct: () => <span className="w-7 h-7 rounded-full bg-success flex items-center justify-center text-white text-xs font-black">✓</span>,
    wrong: () => <span className="w-7 h-7 rounded-full bg-error flex items-center justify-center text-white text-xs font-black">✗</span>,
  };

  return (
    <div className="quiz-screen-root min-h-screen bg-background flex flex-col font-nunito relative overflow-hidden">
      {/* Top HUD */}
      <div className="flex items-center gap-3 px-4 pt-14 pb-3">
        <button onClick={() => setShowExit(true)} className="p-2 rounded-xl hover:bg-muted" aria-label="Exit quiz">
          <X size={22} />
        </button>
        <div className="flex-1">
          <ProgressBar value={qIndex + (submitted ? 1 : 0)} max={QUESTIONS.length} />
        </div>
        <div className="flex gap-2">
          <StatPill icon="🔥" value={streak} variant="reward" animate />
          <div className="relative">
            <StatPill icon="⭐" value={xp} variant="primary" />
            {xpFloat && <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-reward text-xs font-black animate-xp-float">+30</div>}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-4 gap-4">
        {/* Type label */}
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground">{q.type}</p>

        {/* Mascot speech bubble */}
        <div className="flex items-center gap-3">
          <Mascot emotion="thinking" size="small" />
          <div className="bg-card border-2 border-border rounded-2xl rounded-tl-sm px-3 py-2 text-sm font-semibold text-muted-foreground">
            Choose the best answer below
          </div>
        </div>

        {/* Question */}
        <p className="text-lg font-bold leading-snug">{q.q}</p>

        {/* Answer options */}
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const state = optionState(i);
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left text-sm font-bold transition-all press-3d",
                  OPTION_STYLES[state],
                  state !== "wrong" && "active:translate-y-[3px] active:shadow-none",
                  shakeIdx === i && "animate-mascot-shake"
                )}
              >
                {OPTION_INDICATOR[state](i)}
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Live leaderboard strip */}
        <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2">
          <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wide">LIVE</span>
          {[{ name: "Maria", score: 420, avatar: "M" }, { name: "Juan", score: 380, avatar: "J" }, { name: "You", score: xp, avatar: "Y", isUser: true }].map((p, i) => (
            <div key={i} className={cn("flex items-center gap-1 flex-1 justify-center", p.isUser && "text-primary")}>
              <div className={cn("w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center", p.isUser ? "bg-primary text-white" : "bg-muted")}>{p.avatar}</div>
              <span className="text-[11px] font-extrabold">{p.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Submit button */}
      <div className="px-4 pb-8 pt-3">
        <Button3D fullWidth disabled={selected === null && !submitted} onClick={handleSubmit} variant={submitted ? "secondary" : "primary"}>
          {submitted ? "Submitted" : "Check Answer"}
        </Button3D>
      </div>

      {/* Feedback sheet */}
      {showSheet && (
        <div className="fixed inset-0 z-50 prototype-fixed-layer prototype-layer-rounded pointer-events-none">
          <div className={cn("absolute left-0 right-0 bottom-0 rounded-t-3xl p-6 space-y-4 animate-slide-up pointer-events-auto", isCorrect ? "bg-success-tint border-t-4 border-success" : "bg-error-tint border-t-4 border-error")}>
            <div className="flex items-center gap-3">
              <Mascot emotion={isCorrect ? "celebrating" : "surprised"} size="small" />
              <div>
                <p className={cn("text-xl font-black", isCorrect ? "text-success" : "text-error")}>
                  {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                </p>
                {!isCorrect && <p className="text-sm font-semibold text-foreground mt-0.5">{q.explanation}</p>}
              </div>
            </div>
            {isCorrect && <p className="text-sm font-semibold text-success/80">{q.explanation}</p>}
            <Button3D fullWidth variant={isCorrect ? "success" : "error"} onClick={handleContinue}>
              {qIndex < QUESTIONS.length - 1 ? "Continue →" : "See Results 🏆"}
            </Button3D>
          </div>
        </div>
      )}

      {/* Exit confirmation */}
      {showExit && (
        <div className="fixed inset-0 z-50 flex items-end prototype-fixed-layer prototype-layer-rounded">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowExit(false)} />
          <div className="relative bg-card rounded-t-3xl p-6 w-full space-y-4 animate-slide-up">
            <Mascot emotion="urgent" size="medium" className="mx-auto" />
            <div className="text-center">
              <h3 className="text-xl font-black">Leave the quiz?</h3>
              <p className="text-muted-foreground text-sm font-semibold mt-1">Your progress will be lost</p>
            </div>
            <Button3D fullWidth variant="error" onClick={() => navigate(-1)}>Yes, Leave</Button3D>
            <Button3D fullWidth variant="secondary" onClick={() => setShowExit(false)}>Keep Going!</Button3D>
          </div>
        </div>
      )}

      <AssistiveButton />
    </div>
  );
}