import { useLocation, useNavigate } from "react-router-dom";
import { Compass, MessageSquare, Package, User } from "lucide-react";
import { cn } from "../../lib/utils";

const tabs = [
  { label: "Jelajah", path: "/discover", icon: Compass },
  { label: "Pesan", path: "/inbox", icon: MessageSquare },
  { label: "Sewaku", path: "/bookings", icon: Package },
  { label: "Profil", path: "/profile", icon: User },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-app -translate-x-1/2 border-t border-border bg-card/95 backdrop-blur-lg nav-safe-bottom">
      <div className="flex items-stretch justify-around px-2 py-2">
        {tabs.map((tab) => {
          const active =
            location.pathname === tab.path ||
            (tab.path !== "/discover" && location.pathname.startsWith(tab.path));
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-1 flex-col items-center gap-0.5 py-1 transition-colors"
            >
              <Icon
                size={22}
                className={cn(
                  "transition-colors",
                  active ? "text-primary" : "text-muted"
                )}
                strokeWidth={active ? 2.5 : 2}
              />
              <span
                className={cn(
                  "text-[10px] font-semibold transition-colors",
                  active ? "text-primary" : "text-muted"
                )}
              >
                {tab.label}
              </span>
              <span
                className={cn(
                  "h-1 w-1 rounded-full transition-opacity",
                  active ? "bg-primary opacity-100" : "opacity-0"
                )}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
