import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../../components/ui/TopNav";
import { StatusBadge } from "../../components/ui/Badge";
import { mockBookings, getItemById, getOwnerById } from "../../lib/mockData";
import { formatDateShort, formatRupiah, cn } from "../../lib/utils";
import type { BookingStatus } from "../../types";

type Tab = "upcoming" | "ongoing" | "completed";

const tabs: { key: Tab; label: string; statuses: BookingStatus[] }[] = [
  { key: "upcoming", label: "Akan Datang", statuses: ["requested", "confirmed"] },
  { key: "ongoing", label: "Berjalan", statuses: ["ongoing"] },
  { key: "completed", label: "Selesai", statuses: ["returned", "cancelled"] },
];

export default function BookingsPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("upcoming");

  const currentTab = tabs.find((t) => t.key === tab)!;
  const bookings = mockBookings.filter((b) =>
    currentTab.statuses.includes(b.status)
  );

  return (
    <div className="animate-fade-in">
      <TopNav title="Sewaku" />

      <div className="no-scrollbar sticky top-14 z-30 flex gap-1 border-b border-border bg-card px-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "relative px-3 py-3 text-sm font-semibold transition-colors",
              tab === t.key ? "text-primary" : "text-muted"
            )}
          >
            {t.label}
            <span
              className={cn(
                "absolute bottom-0 left-3 right-3 h-0.5 rounded-full transition-opacity",
                tab === t.key ? "bg-primary opacity-100" : "opacity-0"
              )}
            />
          </button>
        ))}
      </div>

      <div className="space-y-3 px-4 py-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => {
            const item = getItemById(booking.item_id);
            const owner = getOwnerById(booking.owner_id);
            return (
              <div
                key={booking.id}
                onClick={() => navigate(`/review/${booking.id}`)}
                className="cursor-pointer rounded-card border border-border bg-card p-3 transition-all hover:shadow-md active:scale-[0.98]"
              >
                <div className="flex gap-3">
                  <img
                    src={item?.images[0]}
                    alt={item?.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-bold text-ink">{item?.name}</p>
                      <StatusBadge status={booking.status} />
                    </div>
                    <p className="mt-0.5 text-xs text-muted">{owner?.name}</p>
                    <p className="mt-1 text-xs text-muted">
                      {formatDateShort(booking.start_date)} -{" "}
                      {formatDateShort(booking.end_date)}
                    </p>
                    <p className="mt-auto text-sm font-bold text-primary">
                      {formatRupiah(booking.total_price)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm font-medium text-muted">
              Belum ada sewa di kategori ini
            </p>
            <button
              onClick={() => navigate("/discover")}
              className="mt-3 text-sm font-semibold text-primary"
            >
              Mulai sewa sekarang
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
