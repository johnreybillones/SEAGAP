import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Bot, Languages, X } from "lucide-react";
import Mascot from "./Mascot";
import { cn } from "@/lib/utils";

const FAB_POSITION_KEY = "seagap.assistiveFab.position";

export default function AssistiveButton(props) {
  const { onAITutor, onLanguage, hideAITutor = false } = props || {};
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [side, setSide] = useState("right");
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const draggingRef = useRef(false);
  const initializedRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const buttonStartRef = useRef({ x: 0, y: 0 });
  const boundsRef = useRef({ left: 0, top: 0, right: 0, bottom: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const sideRef = useRef("right");
  const pointerIdRef = useRef(null);
  const snapTimeoutRef = useRef(null);

  const BUTTON_SIZE = 56;
  const EDGE_MARGIN = 16;
  const TOP_LIMIT = 88;
  const BOTTOM_LIMIT = 116;

  const actions = useMemo(() => {
    const baseActions = [
      { icon: Languages, label: "Language", color: "bg-accent text-accent-foreground shadow-3d-accent", onClick: onLanguage },
    ];

    if (!hideAITutor) {
      baseActions.unshift({ icon: Bot, label: "AI Tutor", color: "bg-primary text-primary-foreground shadow-3d-primary", onClick: onAITutor });
    }

    return baseActions;
  }, [hideAITutor, onAITutor, onLanguage]);

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

  const menuHeight = actions.length * 44 + (actions.length - 1) * 8;
  const bounds = boundsRef.current;
  const spaceAbove = position.y - bounds.top;
  const spaceBelow = bounds.bottom - (position.y + BUTTON_SIZE);
  const openUp = spaceAbove >= menuHeight + 12 || spaceAbove >= spaceBelow;

  if (!isReady) {
    return null;
  }

  return (
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
              onClick={() => { onClick?.(); setOpen(false); }}
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
        className="w-14 h-14 rounded-full bg-primary shadow-3d-primary press-3d active:translate-y-[5px] active:shadow-none flex items-center justify-center"
        aria-label="AI Assist"
      >
        {open ? <X size={22} className="text-white" /> : <Mascot emotion="greeting" size="small" className="w-9 h-9" />}
      </button>
    </div>
  );
}