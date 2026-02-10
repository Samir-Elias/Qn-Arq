"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/admin/(dashboard)/actions";

const navItems = [
  { href: "/admin", label: "Proyectos" },
  { href: "/admin/analytics", label: "Analíticas" },
];

export function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-row items-center justify-between border-b border-[var(--border)] bg-[var(--background)] px-4 py-3 md:w-56 md:flex-col md:items-stretch md:justify-start md:gap-6 md:border-b-0 md:border-r md:px-4 md:py-6">
      <div className="md:space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
          QÑ Admin
        </p>
        <p className="hidden text-xs text-[var(--muted)] md:block">
          {userEmail}
        </p>
      </div>

      <nav className="flex gap-1 md:flex-col">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm transition ${
                isActive
                  ? "bg-black text-white"
                  : "text-[var(--foreground)] hover:bg-black/5"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <form action={logout}>
        <button
          type="submit"
          className="rounded-md px-3 py-2 text-sm text-[var(--muted)] transition hover:bg-black/5 hover:text-[var(--foreground)]"
        >
          Salir
        </button>
      </form>
    </aside>
  );
}
