import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock } from "lucide-react";
import Button from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!form.email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Format email tidak valid";
    if (!form.phone.trim()) newErrors.phone = "Nomor telepon wajib diisi";
    if (!form.password.trim()) newErrors.password = "Password wajib diisi";
    else if (form.password.length < 6)
      newErrors.password = "Password minimal 6 karakter";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/discover");
    }, 1000);
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-8 mt-6">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary">
          <span className="text-2xl font-bold text-white">R</span>
        </div>
        <h1 className="text-2xl font-bold text-ink">Buat Akun Baru</h1>
        <p className="mt-1 text-sm text-muted">
          Mulai sewa dan sewakan dengan mudah
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nama Lengkap"
          placeholder="Nama kamu"
          leftIcon={<User size={18} />}
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          error={errors.name}
        />
        <Input
          label="Email"
          placeholder="email@contoh.com"
          leftIcon={<Mail size={18} />}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
          type="email"
        />
        <Input
          label="Nomor Telepon"
          placeholder="0812 xxxx xxxx"
          leftIcon={<Phone size={18} />}
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          error={errors.phone}
          type="tel"
        />
        <Input
          label="Password"
          placeholder="Minimal 6 karakter"
          leftIcon={<Lock size={18} />}
          value={form.password}
          onChange={(e) => update("password", e.target.value)}
          error={errors.password}
          type="password"
        />

        <Button type="submit" size="block" loading={loading}>
          Daftar
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Sudah punya akun?{" "}
        <button
          onClick={() => navigate("/login")}
          className="font-semibold text-primary"
        >
          Masuk di sini
        </button>
      </p>
    </div>
  );
}
