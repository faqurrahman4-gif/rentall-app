import { formatRupiah } from "../../lib/utils";

interface EarningsSummaryProps {
  monthEarnings: number;
  newBookings: number;
}

export default function EarningsSummary({
  monthEarnings,
  newBookings,
}: EarningsSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-card border border-border bg-card p-4">
        <p className="text-xs font-medium text-muted">Penghasilan Bulan Ini</p>
        <p className="mt-1 text-xl font-bold text-primary">
          {formatRupiah(monthEarnings)}
        </p>
      </div>
      <div className="rounded-card border border-border bg-card p-4">
        <p className="text-xs font-medium text-muted">Booking Baru</p>
        <p className="mt-1 text-xl font-bold text-ink">{newBookings}</p>
      </div>
    </div>
  );
}
