import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Bot, Languages, MessageCircle, Send, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { demoCourses, demoModules, demoModuleSequences } from "@/lib/demo-data";
import { LANGUAGE_OPTIONS, useAssistiveLanguage } from "@/lib/i18n";
import Mascot from "./Mascot";
import { cn } from "@/lib/utils";

const FAB_POSITION_KEY = "seagap.assistiveFab.position";

const genericWelcome = "What can I help you with?";
const genericModulePrompt = "Ask anything about this lesson, module, or quiz.";
const genericTranslatorPrompt = "Switch the app text on the fly while you study.";

export default function AssistiveButton(props) {
  const { hideAITutor = false } = props || {};
  const location = useLocation();
  const { language, setLanguage, translateText: tx, languageLabel } = useAssistiveLanguage();
  const [open, setOpen] = useState(false);
  const [activeSheet, setActiveSheet] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState(() => ([{
    id: "welcome",
    role: "assistant",
    text: genericWelcome,
  }]));
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [side, setSide] = useState("right");
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasUnreadModuleTip, setHasUnreadModuleTip] = useState(false);

  const draggingRef = useRef(false);
  const initializedRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const buttonStartRef = useRef({ x: 0, y: 0 });
  const boundsRef = useRef({ left: 0, top: 0, right: 0, bottom: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const sideRef = useRef("right");
  const pointerIdRef = useRef(null);
  const snapTimeoutRef = useRef(null);
  const chatBodyRef = useRef(null);
  const lastModuleKeyRef = useRef(null);

  const BUTTON_SIZE = 56;
  const EDGE_MARGIN = 16;
  const TOP_LIMIT = 88;
  const BOTTOM_LIMIT = 116;

  const moduleMatch = location.pathname.match(/^\/course\/([^/]+)\/module\/([^/]+)$/);
  const courseId = moduleMatch?.[1];
  const moduleId = moduleMatch?.[2];
  const currentCourse = demoCourses.find((item) => item.id === courseId) || null;
  const currentModule = demoModules.find((item) => item.id === moduleId) || null;
  const currentSequence = moduleId ? demoModuleSequences[moduleId] || demoModuleSequences.m1 : null;
  const isModuleScreen = Boolean(moduleMatch && currentModule);

  const moduleBreakdown = useMemo(() => {
    if (!isModuleScreen || !currentModule || !currentSequence) return null;

    const lessonTitles = currentSequence
      .filter((item) => item.type === "lesson")
      .map((item, index) => `${index + 1}. ${tx(item.title)}`);

    const quizCount = currentSequence.filter((item) => item.type === "quiz").length;
    const summaryLines = [
      `${tx("Module breakdown ready")}: ${tx(currentModule.title)}`,
      currentCourse ? `${tx(currentCourse.title)}` : null,
      currentModule.description ? tx(currentModule.description) : null,
      lessonTitles.length > 0 ? lessonTitles.join("\n") : null,
      `${quizCount} ${tx("Quizzes").toLowerCase()} total, including one final module quiz.`,
    ].filter(Boolean);

    return summaryLines.join("\n\n");
  }, [currentCourse, currentModule, currentSequence, isModuleScreen, tx]);

  useEffect(() => {
    if (!isModuleScreen || !moduleBreakdown || !moduleId) {
      lastModuleKeyRef.current = null;
      setHasUnreadModuleTip(false);
      return;
    }

    if (lastModuleKeyRef.current !== moduleId) {
      const moduleMessageId = `module-breakdown-${moduleId}`;
      setMessages((current) => {
        const withoutOldBreakdowns = current.filter((item) => !item.id?.startsWith("module-breakdown-"));
        return [
          ...withoutOldBreakdowns,
          { id: moduleMessageId, role: "assistant", text: moduleBreakdown, accent: true },
        ];
      });
      setHasUnreadModuleTip(true);
      lastModuleKeyRef.current = moduleId;
    }
  }, [isModuleScreen, moduleBreakdown, moduleId]);

  useEffect(() => {
    if (activeSheet === "chat" && isModuleScreen) {
      setHasUnreadModuleTip(false);
    }
  }, [activeSheet, isModuleScreen]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, activeSheet]);

  const openChat = () => {
    setActiveSheet("chat");
    setOpen(false);
  };

  const openTranslate = () => {
    setActiveSheet("language");
    setOpen(false);
  };

  const actions = useMemo(() => {
    const baseActions = [
      { icon: Languages, label: tx("Language"), color: "bg-accent text-accent-foreground shadow-3d-accent", onClick: openTranslate },
    ];

    if (!hideAITutor) {
      baseActions.unshift({ icon: Bot, label: tx("AI Tutor"), color: "bg-primary text-primary-foreground shadow-3d-primary", onClick: openChat });
    }

    return baseActions;
  }, [hideAITutor, tx]);

  const getBounds = () => {
    const prototypeDevice = document.querySelector(".mobile-prototype .prototype-device");
    if (prototypeDevice) {
      const rect = prototypeDevice.getBoundingClientRect();
      return { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom };
    }
    return { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight };
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const placeAtDefault = () => {
    const bounds = getBounds();
    boundsRef.current = bounds;
    const x = bounds.right - EDGE_MARGIN - BUTTON_SIZE;
    const maxY = bounds.bottom - BOTTOM_LIMIT - BUTTON_SIZE;
    const y = clamp(bounds.bottom - 210, bounds.top + TOP_LIMIT, maxY);
    positionRef.current = { x, y };
    setPosition({ x, y });
    sideRef.current = "right";
    setSide("right");
    setIsSnapping(false);
  };

  const savePosition = (nextPosition, nextSide) => {
    try {
      window.localStorage.setItem(
        FAB_POSITION_KEY,
        JSON.stringify({ x: nextPosition.x, y: nextPosition.y, side: nextSide })
      );
    } catch {
      // Ignore storage failures and continue with in-memory behavior.
    }
  };

  const restorePosition = () => {
    try {
      const raw = window.localStorage.getItem(FAB_POSITION_KEY);
      if (!raw) return false;

      const parsed = JSON.parse(raw);
      const bounds = getBounds();
      boundsRef.current = bounds;
      const minX = bounds.left + EDGE_MARGIN;
      const maxX = bounds.right - EDGE_MARGIN - BUTTON_SIZE;
      const minY = bounds.top + TOP_LIMIT;
      const maxY = bounds.bottom - BOTTOM_LIMIT - BUTTON_SIZE;

      const restoredSide = parsed?.side === "left" ? "left" : "right";
      const restored = {
        x: clamp(Number.isFinite(parsed?.x) ? parsed.x : (restoredSide === "left" ? minX : maxX), minX, maxX),
        y: clamp(Number.isFinite(parsed?.y) ? parsed.y : bounds.bottom - 210, minY, maxY),
      };

      positionRef.current = restored;
      sideRef.current = restoredSide;
      setPosition(restored);
      setSide(restoredSide);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    sideRef.current = side;
  }, [side]);

  useLayoutEffect(() => {
    if (!initializedRef.current) {
      const restored = restorePosition();
      if (!restored) {
        placeAtDefault();
      }
      initializedRef.current = true;
      setIsReady(true);
    }

    const onResize = () => {
      const bounds = getBounds();
      boundsRef.current = bounds;
      const minX = bounds.left + EDGE_MARGIN;
      const maxX = bounds.right - EDGE_MARGIN - BUTTON_SIZE;
      const minY = bounds.top + TOP_LIMIT;
      const maxY = bounds.bottom - BOTTOM_LIMIT - BUTTON_SIZE;

      const next = {
        x: sideRef.current === "left" ? minX : maxX,
        y: clamp(positionRef.current.y, minY, maxY),
      };
      positionRef.current = next;
      setPosition(next);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
    };
  }, []);

  const snapToNearestSide = (x, y) => {
    const bounds = boundsRef.current;
    const leftX = bounds.left + EDGE_MARGIN;
    const rightX = bounds.right - EDGE_MARGIN - BUTTON_SIZE;
    const center = bounds.left + (bounds.right - bounds.left) / 2;
    const nextSide = x + BUTTON_SIZE / 2 < center ? "left" : "right";
    sideRef.current = nextSide;
    setSide(nextSide);
    const next = { x: nextSide === "left" ? leftX : rightX, y };
    setIsSnapping(true);
    positionRef.current = next;
    setPosition(next);
    savePosition(next, nextSide);
    if (snapTimeoutRef.current) {
      clearTimeout(snapTimeoutRef.current);
    }
    snapTimeoutRef.current = setTimeout(() => setIsSnapping(false), 240);
  };

  const handlePointerDown = (event) => {
    const bounds = getBounds();
    boundsRef.current = bounds;
    pointerIdRef.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    draggingRef.current = false;
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    buttonStartRef.current = position;
  };

  const handlePointerMove = (event) => {
    if (pointerIdRef.current !== event.pointerId) return;

    const dx = event.clientX - pointerStartRef.current.x;
    const dy = event.clientY - pointerStartRef.current.y;
    if (!draggingRef.current && Math.hypot(dx, dy) > 6) {
      draggingRef.current = true;
      setIsDragging(true);
      setIsSnapping(false);
      setOpen(false);
    }
    if (!draggingRef.current) return;

    const bounds = boundsRef.current;
    const minX = bounds.left + EDGE_MARGIN;
    const maxX = bounds.right - EDGE_MARGIN - BUTTON_SIZE;
    const minY = bounds.top + TOP_LIMIT;
    const maxY = bounds.bottom - BOTTOM_LIMIT - BUTTON_SIZE;

    const next = {
      x: clamp(buttonStartRef.current.x + dx, minX, maxX),
      y: clamp(buttonStartRef.current.y + dy, minY, maxY),
    };
    positionRef.current = next;
    setPosition(next);
  };

  const handlePointerUp = (event) => {
    if (pointerIdRef.current !== event.pointerId) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    pointerIdRef.current = null;
    if (draggingRef.current) {
      draggingRef.current = false;
      setIsDragging(false);
      snapToNearestSide(positionRef.current.x, positionRef.current.y);
      return;
    }
    setIsDragging(false);
    setOpen((prev) => !prev);
  };

  const sendChatMessage = () => {
    const trimmed = messageInput.trim();
    if (!trimmed) return;

    const userMessage = { id: `user-${Date.now()}`, role: "user", text: trimmed };
    const lower = trimmed.toLowerCase();
    let reply = genericWelcome;

    if (isModuleScreen && currentModule) {
      if (lower.includes("summary") || lower.includes("breakdown") || lower.includes("module")) {
        reply = moduleBreakdown || currentModule.description || genericModulePrompt;
      } else if (lower.includes("quiz")) {
        reply = `This module has ${currentSequence?.filter((item) => item.type === "quiz").length || 0} quizzes, and the last one is the final module quiz.`;
      } else {
        reply = `${currentModule.title} focuses on ${currentModule.description?.toLowerCase() || "the lesson you are currently viewing"}. Start with the key takeaways, then use the checkpoint quizzes to test yourself before the final quiz.`;
      }
    } else if (location.pathname.startsWith("/course/")) {
      reply = "You can ask for a course summary, quiz prep tips, or help understanding the current module and assignments.";
    } else if (location.pathname.startsWith("/quiz/")) {
      reply = "I can explain the current question, break down the solution, or help you review common mistakes after each item.";
    } else {
      reply = "I can help you summarize a lesson, explain a math concept, or guide you through your next step in the course.";
    }

    setMessages((current) => [
      ...current,
      userMessage,
      { id: `assistant-${Date.now()}`, role: "assistant", text: reply },
    ]);
    setMessageInput("");
  };

  const menuHeight = actions.length * 44 + (actions.length - 1) * 8;
  const bounds = boundsRef.current;
  const spaceAbove = position.y - bounds.top;
  const spaceBelow = bounds.bottom - (position.y + BUTTON_SIZE);
  const openUp = spaceAbove >= menuHeight + 12 || spaceAbove >= spaceBelow;

  if (!isReady) {
    return null;
  }

  return (
    <>
      <div
        className="fixed z-50 prototype-fixed-fab"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${BUTTON_SIZE}px`,
          height: `${BUTTON_SIZE}px`,
          transition: isSnapping && !isDragging ? "left 220ms cubic-bezier(0.22, 1, 0.36, 1), top 220ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {open && (
          <div
            className={cn(
              "absolute flex flex-col gap-2 animate-slide-up",
              side === "right" ? "right-0 items-end" : "left-0 items-start"
            )}
            style={openUp ? { bottom: `${BUTTON_SIZE + 8}px` } : { top: `${BUTTON_SIZE + 8}px` }}
          >
            {actions.map(({ icon: Icon, label, color, onClick }) => (
              <button
                key={label}
                onPointerDown={(event) => event.stopPropagation()}
                onPointerUp={(event) => event.stopPropagation()}
                onClick={() => onClick?.()}
                className={cn("flex items-center gap-2 px-4 h-11 rounded-full font-extrabold text-sm press-3d active:translate-y-[5px] active:shadow-none", color)}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        )}
        <button
          type="button"
          className="relative w-14 h-14 rounded-full bg-primary shadow-3d-primary press-3d active:translate-y-[5px] active:shadow-none flex items-center justify-center"
          aria-label="AI Assist"
        >
          {hasUnreadModuleTip && !hideAITutor && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-error border-2 border-background" />
          )}
          {open ? <X size={22} className="text-white" /> : <Mascot emotion="greeting" size="small" className="w-9 h-9" />}
        </button>
      </div>

      {activeSheet === "chat" && !hideAITutor && (
        <div className="fixed inset-0 z-[70] prototype-fixed-layer prototype-layer-rounded">
          <div className="absolute inset-0 bg-black/45" onClick={() => setActiveSheet(null)} />
          <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl p-5 space-y-4 animate-slide-up border-t-2 border-border">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-primary-tint border-2 border-primary flex items-center justify-center">
                  <MessageCircle size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-lg font-black">{tx("AI Tutor")}</p>
                  <p className="text-xs font-semibold text-muted-foreground">
                    {isModuleScreen ? tx(genericModulePrompt) : tx(genericWelcome)}
                  </p>
                </div>
              </div>
              <button onClick={() => setActiveSheet(null)} className="p-2 rounded-xl hover:bg-muted">
                <X size={18} />
              </button>
            </div>

            <div ref={chatBodyRef} className="max-h-[50vh] overflow-y-auto space-y-3 pr-1">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm font-medium whitespace-pre-line",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : message.accent
                          ? "bg-reward-tint border-2 border-reward/30 text-foreground"
                          : "bg-muted text-foreground"
                    )}
                  >
                    {message.role === "assistant" ? tx(message.text) : message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border-2 border-border bg-background px-3 py-2 flex items-end gap-2">
              <textarea
                value={messageInput}
                onChange={(event) => setMessageInput(event.target.value)}
                placeholder={tx("Type your question...")}
                rows={2}
                className="flex-1 bg-transparent outline-none resize-none text-sm font-medium"
              />
              <button
                onClick={sendChatMessage}
                className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-3d-primary press-3d active:translate-y-[5px] active:shadow-none"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeSheet === "language" && (
        <div className="fixed inset-0 z-[70] prototype-fixed-layer prototype-layer-rounded">
          <div className="absolute inset-0 bg-black/45" onClick={() => setActiveSheet(null)} />
          <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl p-5 space-y-4 animate-slide-up border-t-2 border-border">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-accent/10 border-2 border-accent/20 flex items-center justify-center">
                  <Languages size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-lg font-black">{tx("Choose a language")}</p>
                  <p className="text-xs font-semibold text-muted-foreground">{tx(genericTranslatorPrompt)}</p>
                </div>
              </div>
              <button onClick={() => setActiveSheet(null)} className="p-2 rounded-xl hover:bg-muted">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              {LANGUAGE_OPTIONS.map((option) => {
                const active = language === option.code;
                return (
                  <button
                    key={option.code}
                    onClick={() => {
                      setLanguage(option.code);
                      setActiveSheet(null);
                    }}
                    className={cn(
                      "w-full rounded-2xl border-2 px-4 py-4 text-left press-3d active:translate-y-[5px] flex items-center justify-between gap-3",
                      active ? "bg-primary-tint border-primary shadow-3d-primary" : "bg-card border-border shadow-3d-gray"
                    )}
                  >
                    <div>
                      <p className="text-sm font-extrabold">{option.nativeLabel}</p>
                      <p className="text-xs font-semibold text-muted-foreground">{option.label}</p>
                    </div>
                    <span className={cn(
                      "text-[10px] font-extrabold px-2 py-1 rounded-full uppercase",
                      active ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    )}>
                      {active ? languageLabel : tx("Language")}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border-2 border-dashed border-border px-4 py-3 bg-background">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{tx("Language")}</p>
              <p className="text-sm font-semibold text-foreground mt-1">{tx("Applied instantly on supported learning screens.")}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
