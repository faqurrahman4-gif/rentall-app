import { useState, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Trash2, Camera, X } from "lucide-react";
import Button from "../../components/ui/Button";
import { Input, Textarea, Select } from "../../components/ui/Input";
import Badge from "../../components/ui/Badge";
import { mockItems, categories } from "../../lib/mockData";
import { placeholderImage } from "../../lib/utils";
import { formatRupiah } from "../../lib/utils";

export default function OwnerEditListingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = mockItems.find((i) => i.id === id && i.owner_id === "u1");

  const [form, setForm] = useState({
    name: existing?.name ?? "",
    category: existing?.category ?? "",
    price: existing ? String(existing.price_per_day) : "",
    description: existing?.description ?? "",
    condition: existing?.condition ?? "",
    is_active: existing?.is_active ?? true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>(existing?.images ?? []);

  function update(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function addImage() {
    setImages((imgs) => [...imgs, placeholderImage(`edit-${imgs.length}-${Date.now()}`)]);
  }

  function removeImage(idx: number) {
    setImages((imgs) => imgs.filter((_, i) => i !== idx));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!form.category) newErrors.category = "Kategori wajib dipilih";
    if (!form.price.trim()) newErrors.price = "Harga wajib diisi";
    if (!form.description.trim()) newErrors.description = "Deskripsi wajib diisi";
    if (!form.condition) newErrors.condition = "Kondisi wajib dipilih";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/owner/listings");
    }, 800);
  }

  if (!existing) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm text-muted">Barang tidak ditemukan</p>
        <Button className="mt-4" onClick={() => navigate("/owner/listings")}>
          Kembali
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-card/95 px-2 backdrop-blur-lg">
        <button
          onClick={() => navigate("/owner/listings")}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-bg"
        >
          <ChevronLeft size={22} className="text-ink" />
        </button>
        <h1 className="flex-1 text-base font-bold text-ink">Edit Barang</h1>
        <button
          onClick={() => navigate("/owner/listings")}
          className="flex h-9 w-9 items-center justify-center rounded-full text-error hover:bg-red-50"
        >
          <Trash2 size={18} />
        </button>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4 px-4 py-4">
        <div className="flex items-center justify-between rounded-card border border-border bg-card p-3">
          <span className="text-sm font-medium text-ink">Status</span>
          <button
            type="button"
            onClick={() => update("is_active", !form.is_active)}
            className="flex items-center gap-2"
          >
            <Badge variant={form.is_active ? "green" : "gray"}>
              {form.is_active ? "Aktif" : "Nonaktif"}
            </Badge>
          </button>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Foto</label>
          <div className="grid grid-cols-3 gap-2">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-lg border border-border"
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            {images.length < 6 && (
              <button
                type="button"
                onClick={addImage}
                className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-border text-muted hover:border-primary/40 hover:text-primary"
              >
                <Camera size={20} />
                <span className="text-[10px]">Tambah</span>
              </button>
            )}
          </div>
        </div>

        <Input
          label="Nama Barang"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          error={errors.name}
        />

        <Select
          label="Kategori"
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
          error={errors.category}
        >
          <option value="">Pilih kategori</option>
          {categories.filter((c) => c !== "Semua").map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>

        <Input
          label="Harga per Hari (Rp)"
          type="number"
          value={form.price}
          onChange={(e) => update("price", e.target.value)}
          error={errors.price}
        />
        {form.price && (
          <p className="-mt-2 text-xs text-muted">
            {formatRupiah(parseInt(form.price, 10) || 0)}/hari
          </p>
        )}

        <Textarea
          label="Deskripsi"
          rows={4}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          error={errors.description}
        />

        <Select
          label="Kondisi"
          value={form.condition}
          onChange={(e) => update("condition", e.target.value)}
          error={errors.condition}
        >
          <option value="">Pilih kondisi</option>
          <option value="Baru">Baru</option>
          <option value="Sangat Baik">Sangat Baik</option>
          <option value="Baik">Baik</option>
          <option value="Cukup">Cukup</option>
        </Select>

        <Button type="submit" size="block" loading={loading}>
          Simpan Perubahan
        </Button>
      </form>
    </div>
  );
}
