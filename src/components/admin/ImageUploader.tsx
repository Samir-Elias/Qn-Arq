"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { uploadImage } from "@/app/admin/(dashboard)/projects/image-actions";

type ImageUploaderProps = {
  projectId: string;
  currentImageCount: number;
};

export function ImageUploader({
  projectId,
  currentImageCount,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isMain, setIsMain] = useState(currentImageCount === 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      await uploadImage(projectId, formData, {
        is_main: isMain,
        display_order: isMain ? 0 : currentImageCount,
      });

      // Reset
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setIsMain(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir imagen");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    if (fileInputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);
      fileInputRef.current.files = dt.files;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-[var(--border)] p-6 transition hover:border-black/30"
      >
        {preview ? (
          <div className="relative h-40 w-full max-w-xs overflow-hidden rounded-lg">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <p className="text-sm text-[var(--muted)]">
            Arrastrá una imagen o hacé click para seleccionar
          </p>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="text-sm"
        />
      </div>

      {preview ? (
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isMain}
              onChange={(e) => setIsMain(e.target.checked)}
              className="h-4 w-4 rounded"
            />
            Imagen principal
          </label>

          <button
            type="button"
            onClick={handleUpload}
            disabled={loading}
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/90 disabled:opacity-50"
          >
            {loading ? "Subiendo..." : "Subir imagen"}
          </button>
        </div>
      ) : null}

      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : null}
    </div>
  );
}
