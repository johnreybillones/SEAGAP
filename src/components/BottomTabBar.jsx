import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/courses", icon: BookOpen, label: "Courses" },
  { path: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { path: "/profile", icon: User, label: "Profile" },
];

export default function BottomTabBar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border safe-area-pb">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-4">
        {TABS.map(({ path, icon: Icon, label }) => {
          const active = pathname === path || (path !== "/" && pathname.startsWith(path));
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all min-w-[44px] min-h-[44px] justify-center",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className={cn("relative", active && "after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-primary")}>
                <Icon size={22} strokeWidth={active ? 2.5 : 2} />
              </div>
              <span className={cn("text-[11px] font-extrabold tracking-wide uppercase", active ? "text-primary" : "text-muted-foreground")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}