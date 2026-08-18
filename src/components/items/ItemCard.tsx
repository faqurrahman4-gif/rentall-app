import { useNavigate } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import type { Item } from "../../types";
import { formatRupiah } from "../../lib/utils";

interface ItemCardProps {
  item: Item;
  className?: string;
}

export default function ItemCard({ item, className }: ItemCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/item/${item.id}`)}
      className={`group cursor-pointer overflow-hidden rounded-card border border-border bg-card transition-all duration-200 hover:shadow-lg hover:shadow-black/5 active:scale-[0.98] ${className ?? ""}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-bg">
        <img
          src={item.images[0]}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {item.distance != null && (
          <span className="absolute bottom-2 left-2 flex items-center gap-0.5 rounded-full bg-black/60 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
            <MapPin size={10} />
            {item.distance} km
          </span>
        )}
      </div>
      <div className="p-2.5">
        <div className="flex items-start justify-between gap-1">
          <span className="line-clamp-1 text-sm font-bold text-ink">
            {item.name}
          </span>
          <span className="shrink-0 text-sm font-bold text-primary">
            {formatRupiah(item.price_per_day)}
            <span className="text-[10px] font-medium text-muted">/hari</span>
          </span>
        </div>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="flex items-center gap-0.5 text-xs font-semibold text-amber">
            <Star size={12} fill="currentColor" />
            {item.rating?.toFixed(1) ?? "5.0"}
          </span>
          <span className="text-[10px] text-muted">
            ({item.review_count ?? 0} ulasan)
          </span>
        </div>
      </div>
    </div>
  );
}
