import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/PageTransition";
import { SplashProvider } from "@/components/SplashProvider";
import { ServiceWorkerRegistrar } from "@/components/ServiceWorkerRegistrar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qn-arquitectura.vercel.app"),
  title: "QÑ Arquitectura | Arq. Juan Ignacio Flores — Mendoza",
  description:
    "Estudio de arquitectura en Mendoza. Diseño residencial, dirección de obra y remodelaciones. Arq. Juan Ignacio Flores.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "QÑ Arquitectura",
  },
  openGraph: {
    title: "QÑ Arquitectura | Arq. Juan Ignacio Flores",
    description:
      "Arquitectura residencial en Mendoza. Casas, duplex y departamentos con diseño contemporáneo.",
    url: "https://qn-arquitectura.vercel.app",
    siteName: "QÑ Arquitectura",
    images: [
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: "QÑ Arquitectura",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QÑ Arquitectura | Arq. Juan Ignacio Flores",
    description:
      "Arquitectura residencial en Mendoza. Casas, duplex y departamentos con diseño contemporáneo.",
    images: ["/logo.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f8f7",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Architect",
  name: "QÑ Arquitectura",
  founder: {
    "@type": "Person",
    name: "Juan Ignacio Flores",
    jobTitle: "Arquitecto",
  },
  description:
    "Estudio de arquitectura en Mendoza especializado en diseño residencial, dirección de obra y remodelaciones.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mendoza",
    addressCountry: "AR",
  },
  areaServed: "Mendoza, Argentina",
  url: "https://qn-arquitectura.vercel.app",
  image: "https://qn-arquitectura.vercel.app/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          rel="dns-prefetch"
          href="https://lajhpdivbjbvuezxrvdx.supabase.co"
        />
        <link
          rel="preconnect"
          href="https://lajhpdivbjbvuezxrvdx.supabase.co"
          crossOrigin="anonymous"
        />
        {/* PWA / Apple */}
        <link rel="apple-touch-icon" href="/favicon.ico" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${poppins.variable} antialiased bg-background text-foreground`}
      >
        <SplashProvider>
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </SplashProvider>
        <WhatsAppFAB />
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
