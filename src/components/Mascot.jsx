const MASCOT_URL = "/mascot.png";

const EMOTION_ANIMATIONS = {
  greeting: "animate-mascot-wave",
  celebrating: "animate-mascot-bounce",
  surprised: "animate-mascot-shake",
  thinking: "animate-mascot-think",
  encouraging: "animate-mascot-pulse",
  sleeping: "animate-mascot-sleep",
  urgent: "animate-mascot-urgent",
};

const SIZE_MAP = {
  hero: "w-40 h-40",
  medium: "w-20 h-20",
  small: "w-12 h-12",
};

export default function Mascot({ emotion = "greeting", size = "medium", className = "" }) {
  const animClass = EMOTION_ANIMATIONS[emotion] || "animate-mascot-pulse";
  const sizeClass = SIZE_MAP[size] || SIZE_MAP.medium;

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img
        src={MASCOT_URL}
        alt={`SEAGAP mascot — ${emotion}`}
        className={`${sizeClass} ${animClass} object-contain drop-shadow-lg select-none`}
        draggable={false}
      />
    </div>
  );
}