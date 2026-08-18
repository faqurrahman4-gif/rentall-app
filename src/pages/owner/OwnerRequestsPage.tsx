import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import BookingRequestCard from "../../components/owner/BookingRequestCard";
import { mockBookings, getItemById, getOwnerById } from "../../lib/mockData";
import type { Booking } from "../../types";

export default function OwnerRequestsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>(() =>
    mockBookings.map((b) => ({
      ...b,
      item: getItemById(b.item_id),
      renter: getOwnerById(b.renter_id),
    }))
  );

  function handleAction(id: string, status: Booking["status"]) {
    setBookings((bs) =>
      bs.map((b) => (b.id === id ? { ...b, status } : b))
    );
  }

  const pending = bookings.filter((b) => b.status === "requested");
  const processed = bookings.filter((b) => b.status !== "requested");

  return (
    <div className="animate-fade-in">
      <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-card/95 px-2 backdrop-blur-lg">
        <button
          onClick={() => navigate("/owner/dashboard")}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-bg"
        >
          <ChevronLeft size={22} className="text-ink" />
        </button>
        <h1 className="flex-1 text-base font-bold text-ink">Permintaan Sewa</h1>
      </header>

      <div className="space-y-4 px-4 py-4">
        {pending.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-bold text-ink">
              Menunggu Konfirmasi ({pending.length})
            </h3>
            <div className="space-y-3">
              {pending.map((b) => (
                <BookingRequestCard
                  key={b.id}
                  booking={b}
                  onAccept={(id) => handleAction(id, "confirmed")}
                  onReject={(id) => handleAction(id, "cancelled")}
                />
              ))}
            </div>
          </div>
        )}

        {processed.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-bold text-muted">Riwayat</h3>
            <div className="space-y-3">
              {processed.map((b) => (
                <BookingRequestCard
                  key={b.id}
                  booking={b}
                  showActions={false}
                />
              ))}
            </div>
          </div>
        )}

        {pending.length === 0 && processed.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm font-medium text-muted">
              Belum ada permintaan sewa
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
