import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, MapPin } from "lucide-react";
import CategoryChips from "../../components/items/CategoryChips";
import ItemGrid from "../../components/items/ItemGrid";
import { mockItems, categories } from "../../lib/mockData";

export default function DiscoverPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("Semua");

  const filtered =
    activeCat === "Semua"
      ? mockItems
      : mockItems.filter((i) => i.category === activeCat);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="animate-fade-in">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 px-4 py-3 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-1.5 text-sm font-medium text-ink">
            <MapPin size={16} className="text-primary" />
            <span>5 km</span>
            <span className="text-muted">·</span>
            <span className="text-muted">Samarinda</span>
          </button>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-bg">
            <Bell size={20} className="text-ink" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber ring-2 ring-card" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="mt-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari barang untuk disewa..."
              className="w-full rounded-xl border border-border bg-bg py-3 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </form>

        <div className="mt-3">
          <CategoryChips
            categories={categories}
            active={activeCat}
            onSelect={setActiveCat}
          />
        </div>
      </header>

      <div className="px-4 py-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-ink">Populer di sekitarmu</h2>
          <button
            onClick={() => navigate("/search")}
            className="text-xs font-semibold text-primary"
          >
            Lihat semua
          </button>
        </div>
        <ItemGrid items={filtered} />
      </div>
    </div>
  );
}
