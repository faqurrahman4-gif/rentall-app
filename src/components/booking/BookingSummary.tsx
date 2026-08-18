import type { Item } from "../../types";
import { formatRupiah } from "../../lib/utils";

interface BookingSummaryProps {
  item: Item;
  startDate: string;
  endDate: string;
  days: number;
  serviceFee: number;
  total: number;
}

export default function BookingSummary({
  item,
  startDate,
  endDate,
  days,
  serviceFee,
  total,
}: BookingSummaryProps) {
  return (
    <div className="space-y-3">
      <div className="flex gap-3 rounded-card border border-border bg-card p-3">
        <img
          src={item.images[0]}
          alt={item.name}
          className="h-16 w-16 rounded-lg object-cover"
        />
        <div className="flex flex-1 flex-col justify-center">
          <p className="text-sm font-bold text-ink">{item.name}</p>
          <p className="text-xs text-muted">
            {formatRupiah(item.price_per_day)}/hari
          </p>
        </div>
      </div>

      <div className="rounded-card border border-border bg-card p-4">
        <h3 className="mb-3 text-sm font-bold text-ink">Rincian Sewa</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Tanggal Mulai</span>
            <span className="font-medium text-ink">{startDate || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Tanggal Selesai</span>
            <span className="font-medium text-ink">{endDate || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Durasi</span>
            <span className="font-medium text-ink">{days} hari</span>
          </div>
        </div>
      </div>

      <div className="rounded-card border border-border bg-card p-4">
        <h3 className="mb-3 text-sm font-bold text-ink">Rincian Harga</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">
              {formatRupiah(item.price_per_day)} x {days} hari
            </span>
            <span className="font-medium text-ink">
              {formatRupiah(item.price_per_day * days)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Biaya Layanan (10%)</span>
            <span className="font-medium text-ink">{formatRupiah(serviceFee)}</span>
          </div>
          <div className="my-2 border-t border-border" />
          <div className="flex justify-between">
            <span className="font-bold text-ink">Total</span>
            <span className="text-lg font-bold text-primary">
              {formatRupiah(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
