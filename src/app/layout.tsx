import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/PageTransition";

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
  title: "QÑ Arquitectura",
  description:
    "Estudio de arquitectura especializado en proyectos residenciales y comerciales de alto impacto visual.",
  openGraph: {
    title: "QÑ Arquitectura",
    description:
      "Proyectos arquitectónicos con enfoque en diseño contemporáneo y experiencias memorables.",
    url: "https://qn-arquitectura.vercel.app",
    siteName: "QÑ Arquitectura",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "QÑ Arquitectura",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QÑ Arquitectura",
    description:
      "Proyectos arquitectónicos con enfoque en diseño contemporáneo y experiencias memorables.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="dns-prefetch" href="https://lajhpdivbjbvuezxrvdx.supabase.co" />
        <link rel="preconnect" href="https://lajhpdivbjbvuezxrvdx.supabase.co" crossOrigin="anonymous" />
      </head>
      <body className={`${poppins.variable} antialiased bg-background text-foreground`}>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
