import type { Metadata } from "next";
import { Cormorant_Garamond, Raleway, Cinzel, Lora } from "next/font/google";
import "./globals.css";

// 🎨 TIPOGRAFIE MINIMALIST CHIC - Cormorant Garamond + Raleway
// Cormorant Garamond - serif rafinat, literar, sofisticat pentru titluri
const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

// Lora - serif cald, poetic, cu suport complet pentru diacritice românești
const lora = Lora({
  variable: "--font-italiana",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Cinzel - inspirat din Roma antică, premium pentru butoane
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// Raleway - elegant, thin, sofisticat pentru body
const raleway = Raleway({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/**
 * 🔍 SEO METADATA
 */
export const metadata: Metadata = {
  title: "Vibe Caffè — Cafea cu suflet",
  description: "Descoperă aromele autentice ale cafelei de specialitate într-un ambient modern și prietenos. Boabe proaspăt prăjite, bariști experimentați, WiFi gratuit.",
  keywords: ["cafenea bucuresti", "cafea specialitate", "coffee shop", "vibe coffee"],
  authors: [{ name: "Vibe Coffee Team" }],
  openGraph: {
    title: "Vibe Coffee - Cafea de Specialitate",
    description: "Locul perfect pentru cafeaua ta zilnică",
    type: "website",
    locale: "ro_RO",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body
        className={`${cormorant.variable} ${raleway.variable} ${cinzel.variable} ${lora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
