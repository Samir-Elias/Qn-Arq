"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Sobre Mí", href: "#sobre-mi" },
  { label: "Contacto", href: "#contacto" },
];

const MENU_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
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

  // Lock scroll when menu is open
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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

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
          <Link href="/" className="flex items-baseline gap-1 !p-0">
            <span className="text-lg font-bold tracking-tight">QÑ</span>
            <span className="hidden text-sm font-light tracking-wide text-[var(--muted)] lg:inline">
              Arquitectura
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-light text-[var(--muted)] transition-colors hover:text-[var(--foreground)] !p-0"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Hamburger — mobile */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden !p-0"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <motion.span
              className="block h-[1.5px] w-5 bg-[var(--foreground)]"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 3.25 : 0,
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-[1.5px] w-5 bg-[var(--foreground)]"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -3.25 : 0,
              }}
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
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link) => (
                <motion.div key={link.href} variants={MENU_ITEM}>
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className="text-4xl font-light tracking-tight text-[var(--background)] transition-opacity hover:opacity-70 sm:text-5xl !p-0"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="mt-12"
              variants={MENU_ITEM}
            >
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
