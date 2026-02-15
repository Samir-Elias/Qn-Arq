import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--accent)]">
        Error 404
      </p>
      <h1 className="mt-3 text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-7xl">
        Página
        <br />
        <span className="font-light">no encontrada</span>
      </h1>
      <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-[var(--muted)]">
        La página que buscás no existe o fue movida.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 bg-[var(--foreground)] px-6 py-3 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-80"
      >
        Volver al inicio
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          />
        </svg>
      </Link>
    </main>
  );
}
