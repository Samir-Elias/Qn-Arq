import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import Link from "next/link";

export async function AdminBar() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  if (pathname.startsWith("/admin")) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return (
    <div className="fixed bottom-24 left-1/2 z-[80] -translate-x-1/2 sm:bottom-8">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/90 px-4 py-2 text-sm text-white shadow-xl backdrop-blur-md">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        <span className="font-medium">Modo admin</span>
        <div className="h-3 w-px bg-white/20" />
        <Link
          href="/admin"
          className="flex items-center gap-1 text-white/70 transition-colors hover:text-white"
        >
          Panel
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-3.5 w-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
