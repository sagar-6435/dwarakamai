import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DWARAKA MAI DIGITAL STUDIO",
  description: "Your one-stop destination for premium gifting, decor, photography, and unforgettable events. Personalized gifts, couple gifts, event management and more.",
  keywords: "Photography, Videography, Personalized Gifts, Event Decor, Digital Studio",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-brand-black text-foreground font-sans pt-18 md:pt-18">
        <Navbar />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

