import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const { data, error } = await supabase
      .from("projects")
      .select("*, images:project_images(*)")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(data);
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*, images:project_images(*)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { message: "Error fetching projects" },
      { status: 500 }
    );
  }

  return NextResponse.json(data ?? []);
}
