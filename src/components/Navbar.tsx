"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Planos", href: "/planos" },
  { label: "Proceso", href: "/proceso" },
  { label: "Testimonios", href: "/testimonios" },
  { label: "FAQ", href: "/faq" },
  { label: "Contacto", href: "/#contacto" },
];

const MENU_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const MENU_ITEM = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setHasScrolled(currentY > 10);
    if (currentY > lastScrollY && currentY > 80) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(currentY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href.startsWith("/") && !href.startsWith("/#") && pathname === href;

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-shadow ${
          hasScrolled
            ? "bg-[var(--background)]/80 backdrop-blur-xl shadow-[0_1px_0_var(--border)]"
            : "bg-transparent"
        }`}
        initial={{ y: 0 }}
        animate={{ y: isVisible || isOpen ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1">
            <span className="text-lg font-bold tracking-tight">QÑ</span>
            <span className="hidden text-sm font-light tracking-wide text-[var(--muted)] lg:inline">
              Arquitectura
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-light transition-colors hover:text-[var(--foreground)] ${
                  isActive(link.href)
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted)]"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="navActive"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-[var(--accent)]"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Hamburger — mobile */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] p-0 lg:hidden"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <motion.span
              className="block h-[1.5px] w-5 bg-[var(--foreground)]"
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 3.25 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-[1.5px] w-5 bg-[var(--foreground)]"
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -3.25 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--foreground)]"
            variants={MENU_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link) => (
                <motion.div key={link.href} variants={MENU_ITEM}>
                  <Link
                    href={link.href}
                    className={`text-3xl font-light tracking-tight transition-opacity hover:opacity-70 sm:text-4xl ${
                      isActive(link.href)
                        ? "text-[var(--accent)]"
                        : "text-[var(--background)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div className="mt-10" variants={MENU_ITEM}>
              <span className="text-xs font-light uppercase tracking-[0.3em] text-[var(--background)]/40">
                QÑ Arquitectura
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
