"use client";

import { useState, useEffect } from "react";

type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea";
  value: string;
  rows?: number;
};

type ContentEditModalProps = {
  title: string;
  fields: Field[];
  onSave: (data: FormData) => Promise<void>;
  onClose: () => void;
};

export function ContentEditModal({
  title,
  fields,
  onSave,
  onClose,
}: ContentEditModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onSave(new FormData(e.currentTarget));
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 disabled:opacity-50";

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-h-[90dvh] overflow-y-auto rounded-t-2xl bg-[var(--background)] p-6 shadow-2xl sm:max-w-lg sm:rounded-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-black/5 hover:text-[var(--foreground)]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="mb-1 block text-sm font-medium">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  defaultValue={field.value}
                  rows={field.rows ?? 4}
                  disabled={loading}
                  className={inputClass}
                />
              ) : (
                <input
                  type="text"
                  name={field.name}
                  defaultValue={field.value}
                  disabled={loading}
                  className={inputClass}
                />
              )}
            </div>
          ))}

          {error ? <p className="text-sm text-red-500">{error}</p> : null}

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black/85 disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="cursor-pointer rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-medium transition-colors hover:bg-black/5"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
