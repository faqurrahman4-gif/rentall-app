import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { cn } from "../../lib/utils";

interface TopNavProps {
  title?: string;
  back?: boolean;
  rightIcon?: ReactNode;
  transparent?: boolean;
  className?: string;
}

export default function TopNav({
  title,
  back = false,
  rightIcon,
  transparent = false,
  className,
}: TopNavProps) {
  const navigate = useNavigate();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-14 items-center gap-3 px-4",
        transparent
          ? "bg-transparent"
          : "border-b border-border bg-card/95 backdrop-blur-lg",
        className
      )}
    >
      {back && (
        <button
          onClick={() => navigate(-1)}
          className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full hover:bg-bg"
        >
          <ChevronLeft size={22} className="text-ink" />
        </button>
      )}
      {title && (
        <h1 className="flex-1 truncate text-base font-bold text-ink">{title}</h1>
      )}
      {!title && <div className="flex-1" />}
      {rightIcon}
    </header>
  );
}
