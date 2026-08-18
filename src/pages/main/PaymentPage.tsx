import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { QrCode, Landmark, CreditCard, Check } from "lucide-react";
import TopNav from "../../components/ui/TopNav";
import Button from "../../components/ui/Button";
import { getItemById } from "../../lib/mockData";
import { formatRupiah } from "../../lib/utils";
import { cn } from "../../lib/utils";

type Method = "qris" | "transfer" | "kartu";

const methods: { key: Method; label: string; desc: string; icon: typeof QrCode }[] = [
  { key: "qris", label: "QRIS", desc: "Scan untuk membayar instan", icon: QrCode },
  { key: "transfer", label: "Transfer Bank", desc: "BCA, Mandiri, BNI", icon: Landmark },
  { key: "kartu", label: "Kartu Kredit/Debit", desc: "Visa, Mastercard", icon: CreditCard },
];

export default function PaymentPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const itemId = params.get("item_id") ?? "";
  const total = parseInt(params.get("total") ?? "0", 10);
  const [selected, setSelected] = useState<Method>("qris");
  const [loading, setLoading] = useState(false);

  const item = getItemById(itemId);

  function handlePay() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/bookings");
    }, 1200);
  }

  return (
    <div className="animate-fade-in">
      <TopNav title="Pembayaran" back />

      <div className="space-y-4 px-4 py-4">
        <div className="rounded-card bg-primary p-5 text-center text-white">
          <p className="text-xs text-white/70">Total Pembayaran</p>
          <p className="mt-1 text-3xl font-bold">{formatRupiah(total)}</p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-ink">Metode Pembayaran</h3>
          <div className="space-y-2">
            {methods.map((m) => {
              const Icon = m.icon;
              const isActive = selected === m.key;
              return (
                <button
                  key={m.key}
                  onClick={() => setSelected(m.key)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-card border p-4 transition-all",
                    isActive
                      ? "border-primary bg-primary-light"
                      : "border-border bg-card hover:border-primary/30"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      isActive ? "bg-primary text-white" : "bg-bg text-muted"
                    )}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-bold text-ink">{m.label}</p>
                    <p className="text-xs text-muted">{m.desc}</p>
                  </div>
                  {isActive && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check size={12} className="text-white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {item && (
          <div className="rounded-card border border-border bg-card p-3">
            <p className="text-xs text-muted">Untuk sewa</p>
            <p className="text-sm font-bold text-ink">{item.name}</p>
          </div>
        )}

        <Button size="block" loading={loading} onClick={handlePay}>
          Bayar {formatRupiah(total)}
        </Button>
      </div>
    </div>
  );
}
