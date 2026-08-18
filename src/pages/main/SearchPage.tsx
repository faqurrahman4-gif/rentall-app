import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, ChevronLeft } from "lucide-react";
import ItemGrid from "../../components/items/ItemGrid";
import CategoryChips from "../../components/items/CategoryChips";
import { mockItems, categories } from "../../lib/mockData";

export default function SearchPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [activeCat, setActiveCat] = useState("Semua");

  const filtered = mockItems.filter((item) => {
    const matchCat = activeCat === "Semua" || item.category === activeCat;
    const matchQuery =
      !query ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="animate-fade-in">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 px-4 py-3 backdrop-blur-lg">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-bg"
          >
            <ChevronLeft size={22} className="text-ink" />
          </button>
          <form onSubmit={handleSubmit} className="flex-1">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari barang..."
                className="w-full rounded-xl border border-border bg-bg py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </form>
        </div>
        <div className="mt-3">
          <CategoryChips
            categories={categories}
            active={activeCat}
            onSelect={setActiveCat}
          />
        </div>
      </header>

      <div className="px-4 py-4">
        <p className="mb-3 text-xs text-muted">
          {filtered.length} hasil ditemukan
        </p>
        {filtered.length > 0 ? (
          <ItemGrid items={filtered} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search size={40} className="mb-3 text-muted/40" />
            <p className="text-sm font-medium text-muted">
              Tidak ada barang ditemukan
            </p>
            <p className="mt-1 text-xs text-muted">
              Coba kata kunci atau kategori lain
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
