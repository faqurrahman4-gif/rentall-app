import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, Pencil } from "lucide-react";
import Badge from "../../components/ui/Badge";
import { mockItems } from "../../lib/mockData";
import { formatRupiah } from "../../lib/utils";

const ownerItems = mockItems.filter((i) => i.owner_id === "u1");

export default function OwnerListingsPage() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-card/95 px-2 backdrop-blur-lg">
        <button
          onClick={() => navigate("/owner/dashboard")}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-bg"
        >
          <ChevronLeft size={22} className="text-ink" />
        </button>
        <h1 className="flex-1 text-base font-bold text-ink">Barang Saya</h1>
      </header>

      <div className="space-y-3 px-4 py-4">
        {ownerItems.length > 0 ? (
          ownerItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/owner/listings/${item.id}/edit`)}
              className="flex w-full items-center gap-3 rounded-card border border-border bg-card p-3 text-left transition-all hover:shadow-md active:scale-[0.98]"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="h-16 w-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-ink">{item.name}</p>
                <p className="text-xs text-muted">{formatRupiah(item.price_per_day)}/hari</p>
                <div className="mt-1">
                  <Badge variant={item.is_active ? "green" : "gray"}>
                    {item.is_active ? "Aktif" : "Nonaktif"}
                  </Badge>
                </div>
              </div>
              <Pencil size={18} className="text-muted" />
            </button>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm font-medium text-muted">
              Belum ada barang
            </p>
            <p className="mt-1 text-xs text-muted">
              Upload barang pertamamu untuk mulai menyewakan
            </p>
          </div>
        )}
      </div>

      <button
        onClick={() => navigate("/owner/listings/new")}
        className="fixed bottom-6 left-1/2 z-40 flex h-14 w-14 -translate-x-1/2 translate-y-0 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark active:scale-90"
      >
        <Plus size={26} />
      </button>
    </div>
  );
}
