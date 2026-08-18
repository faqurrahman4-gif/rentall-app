import type { Booking } from "../../types";
import { StatusBadge } from "../ui/Badge";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import { formatDateShort, formatRupiah } from "../../lib/utils";

interface BookingRequestCardProps {
  booking: Booking;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  showActions?: boolean;
}

export default function BookingRequestCard({
  booking,
  onAccept,
  onReject,
  showActions = true,
}: BookingRequestCardProps) {
  const renterName = booking.renter?.name ?? "Penyewa";
  const itemName = booking.item?.name ?? "Barang";

  return (
    <div className="rounded-card border border-border bg-card p-3">
      <div className="flex items-center gap-3">
        <Avatar
          src={booking.renter?.avatar_url}
          name={renterName}
          size="sm"
        />
        <div className="flex-1">
          <p className="text-sm font-bold text-ink">{renterName}</p>
          <p className="text-xs text-muted">{itemName}</p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg bg-bg px-3 py-2 text-xs">
        <span className="text-muted">
          {formatDateShort(booking.start_date)} -{" "}
          {formatDateShort(booking.end_date)}
        </span>
        <span className="font-bold text-primary">
          {formatRupiah(booking.total_price)}
        </span>
      </div>

      {showActions &&
        (booking.status === "requested" ? (
          <div className="mt-3 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onReject?.(booking.id)}
            >
              Tolak
            </Button>
            <Button
              size="sm"
              className="flex-1"
              onClick={() => onAccept?.(booking.id)}
            >
              Terima
            </Button>
          </div>
        ) : null)}
    </div>
  );
}
