import { cn } from "@/lib/utils";

const VARIANTS = {
  primary: "bg-primary text-primary-foreground shadow-3d-primary",
  success: "bg-success text-success-foreground shadow-3d-success",
  error: "bg-error text-error-foreground shadow-3d-error",
  reward: "bg-reward text-reward-foreground shadow-3d-reward",
  secondary: "bg-secondary text-secondary-foreground shadow-3d-gray border-2 border-border",
  ghost: "bg-transparent text-primary border-2 border-primary",
  white: "bg-white text-foreground shadow-3d-gray border border-border",
  disabled: "bg-[#E5E5E5] text-[#AFAFAF] cursor-not-allowed",
};

const SIZES = {
  lg: "h-14 px-6 text-base font-extrabold",
  md: "h-12 px-6 text-sm font-extrabold",
  sm: "h-10 px-5 text-sm font-bold",
};

export default function Button3D({
  children,
  variant = "primary",
  size = "lg",
  className = "",
  fullWidth = false,
  disabled = false,
  onClick,
  ...props
}) {
  const v = disabled ? "disabled" : variant;
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-nunito transition-all duration-75",
        "press-3d select-none",
        VARIANTS[v],
        SIZES[size],
        fullWidth && "w-full",
        !disabled && "active:translate-y-[5px] active:shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}