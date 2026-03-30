# QÑ Arquitectura — Documentación del Proyecto

## Resumen

Landing page + panel admin para **QÑ Arquitectura** (Arq. Juan Ignacio Flores, Mendoza, Argentina). Arquitectura residencial — casas, duplex, departamentos. Diseño mobile-first, estilo editorial con tipografía cinematográfica.

**Stack:** Next.js 15 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · Supabase (PostgreSQL + Auth + Storage) · Framer Motion 12 · Vercel (deploy + analytics)

**URLs:**
- Producción: `https://qn-arquitectura.vercel.app`
- Admin: `https://qn-arquitectura.vercel.app/admin`

---

## Arquitectura

```
src/
├── app/
│   ├── layout.tsx              # Root layout (font, meta, analytics, splash, SW)
│   ├── page.tsx                # Home — SSR: proyecto destacado + categorías
│   ├── error.tsx               # Error boundary
│   ├── not-found.tsx           # 404
│   ├── loading.tsx             # Skeleton loader
│   ├── sitemap.ts              # SEO sitemap
│   ├── api/
│   │   ├── projects/route.ts   # GET proyectos (público)
│   │   └── track/route.ts      # POST eventos de click (analíticas custom)
│   └── admin/
│       ├── login/page.tsx      # Login con Supabase Auth
│       └── (dashboard)/
│           ├── layout.tsx      # Layout protegido + sidebar
│           ├── page.tsx        # Dashboard: lista proyectos + stats
│           ├── analytics/      # Analíticas de clicks (30 días)
│           └── projects/       # CRUD proyectos + gestión de imágenes
├── components/
│   ├── Navbar.tsx              # Header sticky, menú fullscreen mobile, glass blur
│   ├── HomeContent.tsx         # Orquestador: hero + categorías + tabs + about
│   ├── FeaturedProject.tsx     # Card destacada con preview de imágenes
│   ├── ProjectCard.tsx         # Card de proyecto con hover y prefetch
│   ├── ProjectModal.tsx        # Modal galería: swipe, flechas, teclado, thumbnails
│   ├── AboutSection.tsx        # Bio del arquitecto + servicios + CTA WhatsApp
│   ├── Footer.tsx              # Links, contacto, redes sociales
│   ├── WhatsAppFAB.tsx         # Botones flotantes: WhatsApp + Instagram
│   ├── SplashScreen.tsx        # Splash animado (primera visita)
│   ├── SplashProvider.tsx      # Gate splash con sessionStorage
│   ├── PageTransition.tsx      # Transiciones entre páginas
│   ├── ServiceWorkerRegistrar.tsx
│   └── admin/
│       ├── ProjectForm.tsx     # Crear/editar proyecto + toggle destacado
│       ├── ImageUploader.tsx   # Upload de imágenes a Supabase Storage
│       └── ImageManager.tsx    # Reordenar, eliminar, marcar principal
├── lib/
│   ├── types.ts                # Tipos: Project, ProjectImage, ClickEvent
│   ├── animations.ts           # Variantes Framer Motion, easings, viewport configs
│   ├── analytics.ts            # Helpers: trackProjectView, trackWhatsAppClick, etc.
│   ├── data/
│   │   ├── projects.ts         # Fetchers SSR: getProjects, getFeaturedProject
│   │   └── clicks.ts           # recordClick, getClickStats
│   └── supabase/
│       ├── client.ts           # Cliente browser (SSR-safe)
│       ├── server.ts           # Cliente server con cookies
│       └── middleware.ts       # Auth middleware para /admin
├── hooks/
│   └── useTrackClick.ts        # Hook cliente: POST a /api/track con UTM params
└── middleware.ts               # Next.js middleware → protección de rutas admin
```

---

## Base de Datos (Supabase)

### Tablas

**projects**
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | UUID (PK) | Auto-generado |
| title | text | Nombre del proyecto |
| description | text | Descripción opcional |
| category | text | Departamentos, Duplex, Casas, Planos, Otros |
| featured | boolean | Solo 1 proyecto destacado a la vez |
| created_at | timestamptz | Fecha de creación |
| updated_at | timestamptz | Auto-actualizado por trigger |

**project_images**
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | UUID (PK) | Auto-generado |
| project_id | UUID (FK) | Referencia a projects (cascade delete) |
| storage_path | text | Path en bucket `project-images` |
| url | text | URL pública de la imagen |
| display_order | integer | Orden de visualización |
| is_main | boolean | Imagen principal (card + preview) |
| created_at | timestamptz | |

**click_events**
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | UUID (PK) | Auto-generado |
| project_id | UUID (FK) | Proyecto clickeado |
| event_type | text | `whatsapp_click` por defecto |
| referrer | text | Referrer del navegador |
| utm_source/medium/campaign | text | Parámetros UTM |
| user_agent | text | User agent capturado server-side |
| created_at | timestamptz | |

### RLS (Row Level Security)
- **projects / project_images:** lectura pública, escritura solo autenticado
- **click_events:** insert público (tracking anónimo), lectura solo autenticado

### Storage
- Bucket: `project-images` (público)

---

## Server Actions

| Acción | Archivo | Descripción |
|--------|---------|-------------|
| `createProject` | projects/actions.ts | Crea proyecto, maneja toggle featured |
| `updateProject` | projects/actions.ts | Actualiza datos del proyecto |
| `deleteProject` | projects/actions.ts | Elimina proyecto + imágenes del storage |
| `toggleFeatured` | projects/actions.ts | Cambia destacado (max 1) |
| `uploadImage` | projects/image-actions.ts | Sube imagen a Supabase Storage |
| `deleteImage` | projects/image-actions.ts | Elimina de Storage + DB |
| `reorderImages` | projects/image-actions.ts | Reordena + marca principal |
| `logout` | (dashboard)/actions.ts | Cierra sesión y redirige |

---

## API Routes

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/projects` | GET | Todos los proyectos o uno por `?id=` |
| `/api/track` | POST | Registra evento de click en Supabase |

---

## Analíticas

### Vercel Analytics (automáticas)
- `@vercel/analytics` — pageviews, visitantes, dispositivos
- `@vercel/speed-insights` — Core Web Vitals

### Custom Events (via `track()`)
| Evento | Source | Se trackea cuando... |
|--------|--------|---------------------|
| `project_view` | HomeContent | Se abre un proyecto en modal |
| `whatsapp_click` | FAB, About, Footer, Modal | Click en CTA de WhatsApp |
| `instagram_click` | FAB, Footer | Click en enlace de Instagram |
| `gallery_navigate` | Modal | Navega entre imágenes (flechas, swipe, thumbnails) |

### Custom DB Tracking (via `/api/track`)
- Se registra en tabla `click_events` con UTM params, referrer, user_agent
- Hook `useTrackClick` en el modal de proyecto

---

## Autenticación y Seguridad

- **Auth:** Supabase Auth (email/password)
- **Middleware:** `src/middleware.ts` → protege `/admin/*` excepto `/admin/login`
- **Flujo:** Si no hay sesión válida → redirect a `/admin/login`
- **RLS:** Todas las tablas tienen Row Level Security activo
- **Nota:** El endpoint `/api/track` es público (intencional para tracking anónimo)

---

## PWA

- **Manifest:** `/public/manifest.json` — nombre, colores, íconos
- **Service Worker:** `/public/sw.js` — cache-first para estáticos, network-first para API
- **Íconos:** `/public/icons/icon-192.png`, `/public/icons/icon-512.png`
- **Apple Touch Icon:** `/icons/icon-192.png`
- **Splash Screen:** Animado con Framer Motion, gate por sessionStorage

---

## SEO

- **Metadata:** título, descripción, OG tags, Twitter cards en `layout.tsx`
- **OG Image:** `/public/og-image.png` (1200x630, estilo splash)
- **JSON-LD:** Schema `Architect` con datos del estudio
- **Sitemap:** `/src/app/sitemap.ts`
- **robots.txt:** `/public/robots.txt`

---

## Variables de Entorno

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Pública | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Pública | Anon key (safe para cliente) |
| `SUPABASE_SERVICE_ROLE_KEY` | Privada | Solo server — operaciones privilegiadas |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Pública | `5492612455281` (con código país, sin +) |

---

## Dependencias Principales

| Paquete | Versión | Uso |
|---------|---------|-----|
| next | 15.5.x | Framework |
| react | 19.1.x | UI |
| @supabase/ssr | 0.8.x | Cliente Supabase SSR-safe |
| @supabase/supabase-js | 2.95.x | SDK Supabase |
| @headlessui/react | 2.2.x | Dialog accesible (modal) |
| framer-motion | 12.23.x | Animaciones |
| @vercel/analytics | 1.6.x | Tracking |
| @vercel/speed-insights | 1.3.x | Performance |
| tailwindcss | 4.x | CSS |

---

## Scripts

```bash
npm run dev        # Dev con Turbopack
npm run build      # Build producción
npm run start      # Server producción
npm run lint       # ESLint
```

---

## Persona del Proyecto

- **Arquitecto:** Juan Ignacio Flores (NO usar "Nacho" en la web)
- **Estudio:** QÑ Arquitectura
- **Ubicación:** Mendoza, Argentina
- **Especialidad:** Residencial — casas, duplex, departamentos
- **Contacto:** WhatsApp `+54 9 261 245-5281`
- **Instagram:** `@arquitectura.qn`
- **Dev:** Samir (primo del arquitecto, atribución en mensajes de WhatsApp)

---

## Estado Actual

- **Producción:** Desplegado en Vercel
- **Admin:** Funcional — CRUD completo de proyectos e imágenes
- **Pendiente:** Refuerzo de seguridad en admin (rate limiting, RBAC) — no urgente
- **Scoring:** 9/10 chances de éxito en su estado actual
