"use client";

import { useState } from "react";
import Image from "next/image";
import {
  deleteImage,
  reorderImages,
} from "@/app/admin/(dashboard)/projects/image-actions";
import type { ProjectImage } from "@/lib/types";

type ImageManagerProps = {
  projectId: string;
  images: ProjectImage[];
};

export function ImageManager({ projectId, images }: ImageManagerProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSetMain = async (imageId: string) => {
    setLoading(imageId);
    try {
      const newOrders = images.map((img, index) => ({
        id: img.id,
        display_order: img.id === imageId ? 0 : index + 1,
        is_main: img.id === imageId,
      }));
      await reorderImages(projectId, newOrders);
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async (imageId: string) => {
    const confirmed = window.confirm("¿Eliminar esta imagen?");
    if (!confirmed) return;

    setLoading(imageId);
    try {
      await deleteImage(imageId, projectId);
    } finally {
      setLoading(null);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    [newImages[index - 1], newImages[index]] = [
      newImages[index],
      newImages[index - 1],
    ];

    setLoading("reorder");
    try {
      const newOrders = newImages.map((img, i) => ({
        id: img.id,
        display_order: i,
        is_main: i === 0 ? true : false,
      }));
      await reorderImages(projectId, newOrders);
    } finally {
      setLoading(null);
    }
  };

  if (images.length === 0) {
    return (
      <p className="text-sm text-[var(--muted)]">
        No hay imágenes. Subí la primera.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="group relative overflow-hidden rounded-xl border border-[var(--border)]"
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={image.url}
              alt={`Imagen ${index + 1}`}
              fill
              className="object-cover"
              sizes="(min-width: 640px) 33vw, 50vw"
            />
          </div>

          {/* Badges */}
          <div className="absolute left-2 top-2 flex gap-1">
            {image.is_main ? (
              <span className="rounded-full bg-black px-2 py-0.5 text-[10px] font-medium text-white">
                Principal
              </span>
            ) : null}
            {!image.is_main && image.display_order <= 3 ? (
              <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-black">
                Prioritaria
              </span>
            ) : null}
          </div>

          {/* Actions overlay */}
          <div className="absolute inset-x-0 bottom-0 flex gap-1 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
            {!image.is_main ? (
              <button
                type="button"
                onClick={() => handleSetMain(image.id)}
                disabled={loading !== null}
                className="rounded bg-white/90 px-2 py-1 text-[10px] font-medium text-black transition hover:bg-white disabled:opacity-50"
              >
                Hacer principal
              </button>
            ) : null}

            {index > 0 ? (
              <button
                type="button"
                onClick={() => handleMoveUp(index)}
                disabled={loading !== null}
                className="rounded bg-white/90 px-2 py-1 text-[10px] font-medium text-black transition hover:bg-white disabled:opacity-50"
              >
                ↑
              </button>
            ) : null}

            <button
              type="button"
              onClick={() => handleDelete(image.id)}
              disabled={loading !== null}
              className="rounded bg-red-500/90 px-2 py-1 text-[10px] font-medium text-white transition hover:bg-red-500 disabled:opacity-50"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
