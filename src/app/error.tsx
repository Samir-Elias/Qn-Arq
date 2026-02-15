"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--accent)]">
        Error
      </p>
      <h1 className="mt-3 text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-7xl">
        Algo salió
        <br />
        <span className="font-light">mal</span>
      </h1>
      <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-[var(--muted)]">
        Hubo un problema al cargar esta página. Intentá de nuevo.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center gap-2 bg-[var(--foreground)] px-6 py-3 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-80"
      >
        Reintentar
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
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
          />
        </svg>
      </button>
    </main>
  );
}
