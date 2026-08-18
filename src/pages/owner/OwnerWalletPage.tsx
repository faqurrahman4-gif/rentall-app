import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ArrowDownToLine, X, Landmark } from "lucide-react";
import Button from "../../components/ui/Button";
import { Input, Select } from "../../components/ui/Input";
import { mockBookings, getItemById } from "../../lib/mockData";
import { formatRupiah, formatDate } from "../../lib/utils";

const transactions = mockBookings.map((b) => ({
  id: b.id,
  itemName: getItemById(b.item_id)?.name ?? "Sewa",
  date: b.created_at,
  amount: b.total_price,
}));

const balance = transactions.reduce((sum, t) => sum + t.amount, 0);

export default function OwnerWalletPage() {
  const navigate = useNavigate();
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  function handleWithdraw() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowWithdraw(false);
      setBank("");
      setAccount("");
      setAmount("");
    }, 1000);
  }

  return (
    <div className="animate-fade-in">
      <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-card/95 px-2 backdrop-blur-lg">
        <button
          onClick={() => navigate("/owner/dashboard")}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-bg"
        >
          <ChevronLeft size={22} className="text-ink" />
        </button>
        <h1 className="flex-1 text-base font-bold text-ink">Dompet</h1>
      </header>

      <div className="space-y-4 px-4 py-4">
        <div className="rounded-card bg-primary p-5 text-white">
          <p className="text-xs text-white/70">Saldo Tersedia</p>
          <p className="mt-1 text-3xl font-bold">{formatRupiah(balance)}</p>
          <button
            onClick={() => setShowWithdraw(true)}
            className="mt-4 flex items-center gap-2 rounded-btn bg-white/15 px-4 py-2.5 text-sm font-semibold backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            <ArrowDownToLine size={16} />
            Tarik Saldo
          </button>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-ink">Riwayat Transaksi</h3>
          <div className="space-y-2">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-3 rounded-card border border-border bg-card p-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light">
                  <Landmark size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink">{t.itemName}</p>
                  <p className="text-xs text-muted">{formatDate(t.date)}</p>
                </div>
                <span className="text-sm font-bold text-primary">
                  +{formatRupiah(t.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showWithdraw && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center">
          <div className="w-full max-w-app animate-slide-up rounded-t-3xl bg-card p-5 sm:rounded-3xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-ink">Tarik Saldo</h3>
              <button
                onClick={() => setShowWithdraw(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-bg"
              >
                <X size={18} className="text-muted" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-primary-light p-3 text-center">
                <p className="text-xs text-muted">Saldo Tersedia</p>
                <p className="text-xl font-bold text-primary">
                  {formatRupiah(balance)}
                </p>
              </div>

              <Input
                label="Jumlah Penarikan"
                placeholder="50000"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {amount && (
                <p className="-mt-2 text-xs text-muted">
                  {formatRupiah(parseInt(amount, 10) || 0)}
                </p>
              )}

              <Select
                label="Bank"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
              >
                <option value="">Pilih bank</option>
                <option value="BCA">BCA</option>
                <option value="Mandiri">Mandiri</option>
                <option value="BNI">BNI</option>
                <option value="BRI">BRI</option>
              </Select>

              <Input
                label="Nomor Rekening"
                placeholder="1234567890"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />

              <Button
                size="block"
                loading={loading}
                onClick={handleWithdraw}
                disabled={!amount || !bank || !account}
              >
                Tarik {amount ? formatRupiah(parseInt(amount, 10)) : "Saldo"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
