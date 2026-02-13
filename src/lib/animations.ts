import type { Variants, Transition } from "framer-motion";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

// Hero entrance — staggered parent
export const HERO_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Hero children — slide up with clipPath reveal
export const HERO_ITEM: Variants = {
  hidden: { opacity: 0, y: 25, clipPath: "inset(0 0 40% 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

// Featured project — enters after hero text
export const FEATURED_REVEAL: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.5 },
  },
};

// Shared scroll-reveal variants
export const SCROLL_REVEAL_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const CARD_REVEAL_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const HEADER_REVEAL_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20, clipPath: "inset(0 0 100% 0)" },
  visible: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" },
};

// Stagger orchestrator for parent containers
export const STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// Shared transition with expo-out easing
export const SCROLL_REVEAL_TRANSITION: Transition = {
  duration: 0.6,
  ease: EASE_OUT_EXPO,
};

// Section reveal — for additional sections throughout the page
export const SECTION_REVEAL_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    clipPath: "inset(0 0 100% 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.8,
      ease: EASE_OUT_EXPO,
    },
  },
};

// Viewport trigger configs
export const VIEWPORT_CONFIG = { once: true, amount: 0.2 } as const;
export const VIEWPORT_CONFIG_HEADER = { once: true, amount: 0.5 } as const;

// Export EASE_OUT_EXPO for reuse
export { EASE_OUT_EXPO };
