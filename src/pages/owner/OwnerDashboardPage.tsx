import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, Inbox, TrendingUp } from "lucide-react";
import EarningsSummary from "../../components/owner/EarningsSummary";
import { mockItems, mockBookings, getItemById } from "../../lib/mockData";
import { formatRupiah } from "../../lib/utils";
import { mockUsers } from "../../lib/mockData";

const currentUser = mockUsers[0];

const ownerItems = mockItems.filter((i) => i.owner_id === "u1");
const ownerBookings = mockBookings.filter((b) => b.owner_id === "u1");

export default function OwnerDashboardPage() {
  const navigate = useNavigate();

  const monthEarnings = ownerBookings.reduce(
    (sum, b) => sum + b.total_price,
    0
  );
  const newBookings = ownerBookings.filter(
    (b) => b.status === "requested"
  ).length;

  return (
    <div className="animate-fade-in">
      <div className="bg-primary px-4 pb-6 pt-4 text-white">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/profile")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
          >
            <ChevronLeft size={22} />
          </button>
          <span className="text-sm font-semibold">Dashboard Pemilik</span>
          <div className="w-9" />
        </div>

        <div className="mt-6">
          <p className="text-sm text-white/70">
            Halo {currentUser.name.split(" ")[0]} 👋
          </p>
          <p className="mt-0.5 text-xs text-white/60">
            Kelola barang dan penghasilanmu
          </p>
        </div>
      </div>

      <div className="-mt-3 space-y-4 px-4 py-4">
        <EarningsSummary
          monthEarnings={monthEarnings}
          newBookings={newBookings}
        />

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("/owner/listings/new")}
            className="flex flex-col items-center gap-2 rounded-card border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light">
              <Plus size={20} className="text-primary" />
            </div>
            <span className="text-sm font-semibold text-ink">
              Upload Barang Baru
            </span>
          </button>
          <button
            onClick={() => navigate("/owner/requests")}
            className="flex flex-col items-center gap-2 rounded-card border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-light">
              <Inbox size={20} className="text-amber" />
            </div>
            <span className="text-sm font-semibold text-ink">
              Lihat Permintaan
            </span>
          </button>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-ink">Barang Teratas</h3>
            <button
              onClick={() => navigate("/owner/listings")}
              className="text-xs font-semibold text-primary"
            >
              Kelola semua
            </button>
          </div>
          {ownerItems.length > 0 ? (
            <div className="space-y-2">
              {ownerItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-card border border-border bg-card p-3"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-ink">{item.name}</p>
                    <p className="text-xs text-muted">{item.category}</p>
                  </div>
                  <span className="text-sm font-bold text-primary">
                    {formatRupiah(item.price_per_day)}/hari
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-card border border-dashed border-border bg-card p-6 text-center">
              <TrendingUp size={28} className="mx-auto mb-2 text-muted/40" />
              <p className="text-sm text-muted">
                Belum ada barang. Mulai sewakan sekarang!
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate("/owner/listings")}
            className="rounded-card border border-border bg-card p-3 text-center text-xs font-semibold text-ink hover:bg-bg"
          >
            Daftar Barang
          </button>
          <button
            onClick={() => navigate("/owner/wallet")}
            className="rounded-card border border-border bg-card p-3 text-center text-xs font-semibold text-ink hover:bg-bg"
          >
            Dompet
          </button>
        </div>
      </div>
    </div>
  );
}
