import { WifiOff } from "lucide-react";
import Mascot from "./Mascot";

export default function OfflineBanner() {
  return (
    <div className="flex items-center gap-2 bg-warning-tint border-b-2 border-reward px-4 py-2">
      <WifiOff size={16} className="text-reward flex-shrink-0" />
      <span className="text-sm font-bold text-reward flex-1">You're offline — using downloaded content</span>
      <Mascot emotion="sleeping" size="small" className="w-8 h-8" />
    </div>
  );
}