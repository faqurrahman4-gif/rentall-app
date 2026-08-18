import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import TopNav from "../../components/ui/TopNav";
import Button from "../../components/ui/Button";
import { Textarea } from "../../components/ui/Input";
import { mockBookings, getItemById, getOwnerById } from "../../lib/mockData";
import { cn } from "../../lib/utils";

export default function ReviewPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const booking = mockBookings.find((b) => b.id === bookingId);
  const item = booking ? getItemById(booking.item_id) : undefined;
  const owner = booking ? getOwnerById(booking.owner_id) : undefined;

  function handleSubmit() {
    if (rating === 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/bookings");
    }, 800);
  }

  return (
    <div className="animate-fade-in">
      <TopNav title="Ulasan" back />

      <div className="px-4 py-6">
        {item && (
          <div className="mx-auto mb-6 flex max-w-xs flex-col items-center text-center">
            <img
              src={item.images[0]}
              alt={item.name}
              className="h-24 w-24 rounded-2xl object-cover"
            />
            <p className="mt-3 text-sm font-bold text-ink">{item.name}</p>
            <p className="text-xs text-muted">{owner?.name}</p>
          </div>
        )}

        <h2 className="text-center text-lg font-bold text-ink">
          Bagaimana sewanya?
        </h2>
        <p className="mt-1 text-center text-sm text-muted">
          Beri rating untuk membantu penyewa lain
        </p>

        <div className="mt-6 flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform active:scale-90"
            >
              <Star
                size={36}
                className={cn(
                  "transition-colors",
                  n <= (hover || rating)
                    ? "text-amber"
                    : "text-border"
                )}
                fill={n <= (hover || rating) ? "currentColor" : "none"}
              />
            </button>
          ))}
        </div>

        <div className="mt-6">
          <Textarea
            label="Komentar (opsional)"
            placeholder="Ceritakan pengalaman sewamu..."
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="mt-6 space-y-2">
          <Button size="block" loading={loading} onClick={handleSubmit}>
            Kirim Ulasan
          </Button>
          <Button
            variant="ghost"
            size="block"
            onClick={() => navigate("/bookings")}
          >
            Lewati
          </Button>
        </div>
      </div>
    </div>
  );
}
