"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Credenciales incorrectas");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-center text-xl font-semibold">
          Acceso restringido
        </h1>
        <p className="text-center text-sm text-[var(--muted)]">
          Ingresá tus credenciales para continuar.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full rounded-md border border-black/10 bg-[var(--background)] px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            className="w-full rounded-md border border-black/10 bg-[var(--background)] px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-black px-3 py-2 text-sm font-medium text-white transition hover:bg-black/90 disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        {error ? (
          <p className="text-center text-sm text-red-500">{error}</p>
        ) : null}
      </div>
    </section>
  );
}
