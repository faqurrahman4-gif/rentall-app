import { cn } from "../../lib/utils";

interface CategoryChipsProps {
  categories: string[];
  active: string;
  onSelect: (cat: string) => void;
}

export default function CategoryChips({
  categories,
  active,
  onSelect,
}: CategoryChipsProps) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95",
            active === cat
              ? "bg-primary text-white shadow-sm"
              : "bg-card border border-border text-muted hover:border-primary/30 hover:text-ink"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
