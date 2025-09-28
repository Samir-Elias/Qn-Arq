import { NextRequest, NextResponse } from "next/server";
import projectsData from "@/data/projectsData";

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get("id");

  if (idParam) {
    const id = Number(idParam);
    const project = projectsData.find((item) => item.id === id);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  }

  return NextResponse.json(projectsData);
}

