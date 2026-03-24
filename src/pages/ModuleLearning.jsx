import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, X } from "lucide-react";
import { demoCourses, demoModules, demoModuleSequences } from "@/lib/demo-data";
import { useAssistiveLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Mascot from "../components/Mascot";
import Button3D from "../components/Button3D";
import StatPill from "../components/StatPill";
import ProgressBar from "../components/ProgressBar";
import AssistiveButton from "../components/AssistiveButton";

const DEFAULT_SEQUENCE = demoModuleSequences.m1;

export default function ModuleLearning() {
  const navigate = useNavigate();
  const { courseId, moduleId } = useParams();
  const { translateText: tx } = useAssistiveLanguage();
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);
  const [pendingResult, setPendingResult] = useState({ score: 0, xp: 0 });

  const course = demoCourses.find((item) => item.id === courseId) || demoCourses[0];
  const module = demoModules.find((item) => item.id === moduleId) || demoModules[0];
  const sequence = demoModuleSequences[moduleId] || DEFAULT_SEQUENCE;
  const step = sequence[stepIndex];
  const totalSteps = sequence.length;
  const quizSteps = sequence.filter((item) => item.type === "quiz");
  const currentQuizNumber = step.type === "quiz" ? quizSteps.findIndex((item) => item.id === step.id) + 1 : null;
  const isLastStep = stepIndex === totalSteps - 1;
  const isCorrect = submitted && selected === step.correct;

  const progressValue = useMemo(() => {
    if (step.type === "lesson") {
      return stepIndex + 1;
    }
    return stepIndex + (submitted ? 1 : 0.6);
  }, [step.type, stepIndex, submitted]);

  const resetQuizState = () => {
    setSelected(null);
    setSubmitted(false);
    setShowFeedback(false);
  };

  const goToNextStep = () => {
    const nextScore = submitted ? pendingResult.score : score;
    const nextXp = submitted ? pendingResult.xp : earnedXp;
    resetQuizState();

    if (isLastStep) {
      navigate("/quiz-results", {
        state: {
          score: nextScore,
          total: quizSteps.length,
          xp: 350 + nextXp,
          passedTitle: `${module.title} complete`,
          retryTitle: "Module finished",
          passedMessage: "You finished the module and cleared the final quiz.",
          retryMessage: "You reached the end. Review the lessons and take the module again anytime.",
          continuePath: `/course/${courseId}`,
          continueLabel: "Back to Course →",
          reviewPath: `/course/${courseId}/module/${moduleId}`,
          reviewLabel: "Review Module",
        },
      });
      return;
    }

    setStepIndex((current) => current + 1);
  };

  const handleLessonContinue = () => {
    goToNextStep();
  };

  const handleSubmitQuiz = () => {
    if (selected === null || submitted) return;

    const answeredCorrectly = selected === step.correct;
    const nextScore = answeredCorrectly ? score + 1 : score;
    const nextXp = answeredCorrectly ? earnedXp + (step.xpReward || 20) : earnedXp;

    setSubmitted(true);
    setPendingResult({ score: nextScore, xp: nextXp });
    setScore(nextScore);
    setEarnedXp(nextXp);
    setTimeout(() => setShowFeedback(true), 250);
  };

  const optionState = (index) => {
    if (!submitted) return selected === index ? "selected" : "default";
    if (index === step.correct) return "correct";
    if (index === selected && index !== step.correct) return "wrong";
    return "default";
  };

  const optionStyles = {
    default: "bg-card border-[#E5E5E5] shadow-3d-gray text-foreground",
    selected: "bg-primary-tint border-primary shadow-3d-primary text-foreground",
    correct: "bg-success-tint border-success shadow-3d-success text-foreground",
    wrong: "bg-error-tint border-error text-foreground",
  };

  const optionIndicator = {
    default: (index) => <span className="w-7 h-7 rounded-full border-2 border-border flex items-center justify-center text-xs font-black">{["A", "B", "C", "D"][index]}</span>,
    selected: () => <span className="w-7 h-7 rounded-full bg-primary flex items-center justify-center"><span className="w-3 h-3 rounded-full bg-white" /></span>,
    correct: () => <span className="w-7 h-7 rounded-full bg-success flex items-center justify-center text-white text-xs font-black">✓</span>,
    wrong: () => <span className="w-7 h-7 rounded-full bg-error flex items-center justify-center text-white text-xs font-black">✗</span>,
  };

  return (
    <div className="h-full min-h-0 bg-background flex flex-col font-nunito relative overflow-hidden">
      <div className="flex items-center gap-3 px-4 pt-14 pb-2">
        <button onClick={() => setShowExit(true)} className="p-2 rounded-xl hover:bg-muted" aria-label="Exit module">
          <X size={22} />
        </button>
        <div className="flex-1">
          <ProgressBar value={progressValue} max={totalSteps} />
          <p className="mt-1 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
            {tx(course.title)} · {tx(module.title)}
          </p>
        </div>
        <div className="flex gap-2">
          <StatPill icon="📚" value={`${stepIndex + 1}/${totalSteps}`} />
          <StatPill icon="⭐" value={350 + earnedXp} variant="primary" />
        </div>
      </div>

      {step.type === "lesson" ? (
        <>
          <div className="flex-1 overflow-y-auto px-4 pb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-2xl bg-card border-2 border-border flex items-center justify-center">
                  <ChevronLeft size={18} />
                </button>
                <div className="flex-1">
                  <p className="text-[11px] font-extrabold uppercase tracking-widest text-primary">{tx(step.section)}</p>
                  <h1 className="text-2xl font-black leading-tight">{tx(step.title)}</h1>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden border-2 border-border bg-card shadow-3d-gray">
                <img src={step.image} alt={tx(step.title)} className="w-full h-48 object-cover" />
                <div className="px-4 py-2 bg-secondary/80 border-t border-border">
                  <p className="text-xs font-bold text-muted-foreground">{tx(step.imageCaption)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mascot emotion="thinking" size="small" />
                <div className="bg-card border-2 border-border rounded-2xl rounded-tl-sm px-4 py-3 flex-1">
                  <p className="text-sm font-semibold text-muted-foreground">{tx(step.subtitle)}</p>
                </div>
              </div>

              <div className="rounded-3xl bg-card border-2 border-border p-5 space-y-4 shadow-3d-gray">
                {step.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 font-medium text-foreground">
                    {tx(paragraph)}
                  </p>
                ))}
              </div>

              <div className="rounded-3xl bg-primary-tint border-2 border-primary/20 p-5 space-y-3">
                <p className="text-xs font-extrabold uppercase tracking-widest text-primary">{tx("Key Takeaways")}</p>
                <div className="space-y-2">
                  {step.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-2">
                      <span className="mt-1 text-primary font-black">•</span>
                      <p className="text-sm font-semibold text-foreground">{tx(highlight)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 pb-8 pt-3 bg-gradient-to-t from-background via-background to-transparent">
            <Button3D fullWidth onClick={handleLessonContinue}>
              {isLastStep ? tx("Continue →") : tx("Continue Lesson →")}
            </Button3D>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 flex flex-col px-4 gap-3 min-h-0">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground">{tx(step.stage)}</p>

            <div className="flex items-center gap-3">
              <Mascot emotion={step.isFinal ? "encouraging" : "thinking"} size="small" />
              <div className="bg-card border-2 border-border rounded-2xl rounded-tl-sm px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                {step.isFinal ? tx("Final quiz for this module. Take your time.") : tx("Quick practice check before the next lesson page.")}
              </div>
            </div>

            <div className="rounded-3xl bg-card border-2 border-border p-4 shadow-3d-gray">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-primary">
                    {tx("Quiz")} {currentQuizNumber} {tx("of")} {quizSteps.length}
                  </p>
                  <h1 className="text-xl font-black">{tx(step.title)}</h1>
                </div>
                <StatPill icon="⭐" value={`+${step.xpReward || 20}`} variant="reward" />
              </div>
              <p className="text-base font-bold leading-snug">{tx(step.prompt)}</p>
            </div>

            <div className="space-y-1.5">
              {step.options.map((option, index) => {
                const state = optionState(index);
                return (
                  <button
                    key={option}
                    onClick={() => !submitted && setSelected(index)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left text-sm font-bold transition-all press-3d",
                      optionStyles[state],
                      !submitted && "active:translate-y-[3px] active:shadow-none"
                    )}
                  >
                    {optionIndicator[state](index)}
                    <span className="flex-1">{tx(option)}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2">
              <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wide">
                {step.isFinal ? tx("FINAL") : tx("PRACTICE")}
              </span>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(currentQuizNumber / quizSteps.length) * 100}%` }}
                />
              </div>
              <span className="text-[11px] font-extrabold text-primary">{currentQuizNumber}/{quizSteps.length}</span>
            </div>

            <div className="flex-1 min-h-[110px] flex items-center justify-center pb-6">
              <Button3D className="w-full max-w-[360px]" disabled={selected === null || submitted} onClick={handleSubmitQuiz}>
                {step.isFinal ? tx("Submit Final Quiz") : tx("Check Answer")}
              </Button3D>
            </div>
          </div>
        </>
      )}

      {showFeedback && step.type === "quiz" && (
        <div className="fixed inset-0 z-[70] prototype-fixed-layer prototype-layer-rounded pointer-events-none">
          <div className={cn(
            "absolute left-3 right-3 bottom-4 rounded-3xl p-5 space-y-3 animate-slide-up pointer-events-auto",
            isCorrect ? "bg-success-tint border-t-4 border-success" : "bg-error-tint border-t-4 border-error"
          )}>
            <div className="flex items-center gap-3">
              <Mascot emotion={isCorrect ? "celebrating" : "surprised"} size="small" />
              <div>
                <p className={cn("text-xl font-black", isCorrect ? "text-success" : "text-error")}>
                  {isCorrect ? tx("Correct!") : tx("Not quite yet")}
                </p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{tx(step.explanation)}</p>
              </div>
            </div>
            <Button3D fullWidth variant={isCorrect ? "success" : "error"} onClick={goToNextStep}>
              {isLastStep ? tx("See Results 🏆") : tx("Continue →")}
            </Button3D>
          </div>
        </div>
      )}

      {showExit && (
        <div className="fixed inset-0 z-50 flex items-end prototype-fixed-layer prototype-layer-rounded">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowExit(false)} />
          <div className="relative bg-card rounded-t-3xl p-6 w-full space-y-4 animate-slide-up">
            <div className="flex justify-center">
              <Mascot emotion="urgent" size="medium" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-black">{tx("Leave this module?")}</h3>
              <p className="text-muted-foreground text-sm font-semibold mt-1">{tx("Your current lesson progress will be lost.")}</p>
            </div>
            <Button3D fullWidth variant="error" onClick={() => navigate(`/course/${courseId}`)}>{tx("Yes, Leave")}</Button3D>
            <Button3D fullWidth variant="secondary" onClick={() => setShowExit(false)}>{tx("Keep Learning")}</Button3D>
          </div>
        </div>
      )}

      <AssistiveButton />
    </div>
  );
}
