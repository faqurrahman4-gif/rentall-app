import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Heart,
  Settings,
  LogOut,
  Package,
  Star,
  Wallet,
  ArrowRight,
} from "lucide-react";
import Avatar from "../../components/ui/Avatar";
import { mockUsers, mockBookings } from "../../lib/mockData";
import { formatRupiah } from "../../lib/utils";

const currentUser = mockUsers[0];

export default function ProfilePage() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Package, label: "Riwayat Sewa", path: "/bookings" },
    { icon: Heart, label: "Favorit", path: "/discover" },
    { icon: Settings, label: "Pengaturan", path: "/profile" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="bg-primary px-4 pb-8 pt-6 text-white">
        <div className="flex items-center gap-4">
          <Avatar
            src={currentUser.avatar_url}
            name={currentUser.name}
            size="lg"
          />
          <div>
            <h1 className="text-lg font-bold">{currentUser.name}</h1>
            <p className="text-sm text-white/70">{currentUser.email}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm">
            <p className="text-xl font-bold">{mockBookings.length}</p>
            <p className="text-[10px] text-white/70">Jumlah Sewa</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm">
            <p className="text-xl font-bold">{formatRupiah(150000)}</p>
            <p className="text-[10px] text-white/70">Saldo</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm">
            <p className="flex items-center justify-center gap-0.5 text-xl font-bold">
              <Star size={14} fill="currentColor" className="text-amber" />
              4.8
            </p>
            <p className="text-[10px] text-white/70">Rating</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="overflow-hidden rounded-card border border-border bg-card">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-bg ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <Icon size={20} className="text-muted" />
                <span className="flex-1 text-sm font-medium text-ink">
                  {item.label}
                </span>
                <ChevronRight size={18} className="text-muted" />
              </button>
            );
          })}
        </div>

        <button
          onClick={() => navigate("/owner/dashboard")}
          className="mt-4 flex w-full items-center gap-3 rounded-card bg-primary p-4 text-left text-white transition-all hover:bg-primary-dark active:scale-[0.98]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <Wallet size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">Jadi Pemilik</p>
            <p className="text-xs text-white/70">
              Sewakan barangmu dan dapat penghasilan
            </p>
          </div>
          <ArrowRight size={18} />
        </button>

        <button
          onClick={() => navigate("/login")}
          className="mt-4 flex w-full items-center justify-center gap-2 py-3 text-sm font-medium text-error transition-colors hover:bg-red-50"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </div>
  );
}
