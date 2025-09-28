"use client";

import { useState } from "react";

const DUMMY_PASSWORD = "samir-admin";

export default function AdminPage() {
  const [input, setInput] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input === DUMMY_PASSWORD) {
      setAuthorized(true);
      setError("");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  if (authorized) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
        <h1 className="text-2xl font-semibold">Admin dashboard coming soon</h1>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          Este panel será el espacio privado para gestionar proyectos, imágenes y
          contenido destacado. Próximamente integraremos autenticación robusta y
          funciones avanzadas.
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold text-center">
          Acceso restringido
        </h1>
        <p className="text-sm text-center text-muted-foreground">
          Ingresá la contraseña temporal para continuar.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Contraseña"
            className="w-full rounded-md border border-black/10 bg-background px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-black px-3 py-2 text-sm font-medium text-white transition hover:bg-black/90"
          >
            Ingresar
          </button>
        </form>
        {error ? (
          <p className="text-sm text-center text-red-500">{error}</p>
        ) : null}
      </div>
    </section>
  );
}

