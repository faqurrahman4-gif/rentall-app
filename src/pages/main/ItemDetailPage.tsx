import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Star, MapPin, Shield, Clock, MessageCircle } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { getItemById, getOwnerById } from "../../lib/mockData";
import { formatRupiah } from "../../lib/utils";

export default function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imgIdx, setImgIdx] = useState(0);

  const item = id ? getItemById(id) : undefined;
  const owner = item ? getOwnerById(item.owner_id) : undefined;

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm text-muted">Barang tidak ditemukan</p>
        <Button className="mt-4" onClick={() => navigate("/discover")}>
          Kembali ke Jelajah
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-24">
      <div className="relative">
        <div className="aspect-[4/3] w-full overflow-hidden bg-bg">
          <img
            src={item.images[imgIdx]}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        </div>
        <button
          onClick={() => navigate(-1)}
          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm"
        >
          <ChevronLeft size={22} className="text-white" />
        </button>
        {item.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {item.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === imgIdx ? "w-6 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="px-4 py-4">
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-lg font-bold text-ink">{item.name}</h1>
          <span className="shrink-0 text-lg font-bold text-primary">
            {formatRupiah(item.price_per_day)}
            <span className="text-xs font-medium text-muted">/hari</span>
          </span>
        </div>

        <div className="mt-2 flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1 font-semibold text-amber">
            <Star size={14} fill="currentColor" />
            {item.rating?.toFixed(1)}
          </span>
          <span className="text-muted">({item.review_count} ulasan)</span>
          <span className="flex items-center gap-1 text-muted">
            <MapPin size={14} />
            {item.distance} km
          </span>
        </div>

        <div className="mt-2">
          <Badge variant="green">{item.category}</Badge>
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <h2 className="mb-2 text-sm font-bold text-ink">Deskripsi</h2>
          <p className="text-sm leading-relaxed text-muted">
            {item.description}
          </p>
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <h2 className="mb-2 text-sm font-bold text-ink">Kondisi</h2>
          <Badge variant="default">{item.condition}</Badge>
        </div>

        {owner && (
          <div className="mt-4 border-t border-border pt-4">
            <h2 className="mb-3 text-sm font-bold text-ink">Pemilik</h2>
            <div className="flex items-center gap-3 rounded-card border border-border bg-card p-3">
              <img
                src={owner.avatar_url ?? ""}
                alt={owner.name}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-primary-light"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-ink">{owner.name}</p>
                  {owner.is_verified && (
                    <Badge variant="verified">
                      <Shield size={10} />
                      Terverifikasi
                    </Badge>
                  )}
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                  <Clock size={12} />
                  Biasanya membalas dalam 1 jam
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-app -translate-x-1/2 gap-3 border-t border-border bg-card/95 p-4 backdrop-blur-lg nav-safe-bottom">
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          leftIcon={<MessageCircle size={18} />}
          onClick={() => navigate(`/inbox/${item.owner_id}`)}
        >
          Tanya Pemilik
        </Button>
        <Button
          size="lg"
          className="flex-1"
          onClick={() => navigate(`/checkout/${item.id}`)}
        >
          Sewa Sekarang
        </Button>
      </div>
    </div>
  );
}
