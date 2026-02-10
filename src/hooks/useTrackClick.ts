"use client";

import { useSearchParams } from "next/navigation";

export function useTrackClick() {
  const searchParams = useSearchParams();

  const trackWhatsAppClick = async (projectId: string) => {
    try {
      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: projectId,
          event_type: "whatsapp_click",
          referrer: document.referrer || null,
          utm_source: searchParams.get("utm_source"),
          utm_medium: searchParams.get("utm_medium"),
          utm_campaign: searchParams.get("utm_campaign"),
        }),
      });
    } catch {
      // Fail silently — tracking no debe bloquear al usuario
    }
  };

  return { trackWhatsAppClick };
}
