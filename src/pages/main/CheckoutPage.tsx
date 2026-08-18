import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopNav from "../../components/ui/TopNav";
import Button from "../../components/ui/Button";
import BookingSummary from "../../components/booking/BookingSummary";
import { getItemById } from "../../lib/mockData";
import { daysBetween, formatDate } from "../../lib/utils";

export default function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = id ? getItemById(id) : undefined;

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [startDate, setStartDate] = useState(today.toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(tomorrow.toISOString().split("T")[0]);

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

  const days = daysBetween(startDate, endDate);
  const subtotal = item.price_per_day * days;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  function handleContinue() {
    const params = new URLSearchParams({
      item_id: item!.id,
      start: startDate,
      end: endDate,
      total: total.toString(),
      fee: serviceFee.toString(),
    });
    navigate(`/payment?${params.toString()}`);
  }

  return (
    <div className="animate-fade-in">
      <TopNav title="Checkout" back />

      <div className="space-y-4 px-4 py-4">
        <div className="rounded-card border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-bold text-ink">Pilih Tanggal</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Tanggal Mulai
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Tanggal Selesai
              </label>
              <input
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        <BookingSummary
          item={item}
          startDate={formatDate(startDate)}
          endDate={formatDate(endDate)}
          days={days}
          serviceFee={serviceFee}
          total={total}
        />

        <Button size="block" onClick={handleContinue}>
          Lanjut ke Pembayaran
        </Button>
      </div>
    </div>
  );
}
