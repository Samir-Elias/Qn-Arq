import { createClient } from "@/lib/supabase/server";
import type { ClickEvent } from "@/lib/types";

export async function recordClick(params: {
  project_id: string;
  event_type?: string;
  referrer?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  user_agent?: string | null;
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("click_events").insert({
    project_id: params.project_id,
    event_type: params.event_type ?? "whatsapp_click",
    referrer: params.referrer ?? null,
    utm_source: params.utm_source ?? null,
    utm_medium: params.utm_medium ?? null,
    utm_campaign: params.utm_campaign ?? null,
    user_agent: params.user_agent ?? null,
  });

  if (error) throw error;
}

export async function getClickStats(options?: {
  project_id?: string;
  days?: number;
}): Promise<ClickEvent[]> {
  const supabase = await createClient();

  let query = supabase
    .from("click_events")
    .select("*")
    .order("created_at", { ascending: false });

  if (options?.project_id) {
    query = query.eq("project_id", options.project_id);
  }

  if (options?.days) {
    const since = new Date();
    since.setDate(since.getDate() - options.days);
    query = query.gte("created_at", since.toISOString());
  }

  const { data, error } = await query;
  if (error) throw error;

  return (data ?? []) as ClickEvent[];
}
