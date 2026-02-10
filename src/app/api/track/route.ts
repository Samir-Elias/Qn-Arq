import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      project_id,
      event_type,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign,
    } = body;

    if (!project_id) {
      return NextResponse.json(
        { error: "project_id required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const user_agent = request.headers.get("user-agent");

    const { error } = await supabase.from("click_events").insert({
      project_id,
      event_type: event_type ?? "whatsapp_click",
      referrer: referrer ?? request.headers.get("referer"),
      utm_source: utm_source ?? null,
      utm_medium: utm_medium ?? null,
      utm_campaign: utm_campaign ?? null,
      user_agent,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to record event" },
      { status: 500 }
    );
  }
}
