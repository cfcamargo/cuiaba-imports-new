import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header/header-component";
import Footer from "@/components/layout/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cuiabá Imports",
  description:
    "Descubra os melhores eletrônicos na nossa loja. Smartphones, TVs e mais. Produtos autênticos das melhores marcas. Entrega rápida. Atendimento ao cliente de qualidade. Visite-nos agora!",
  keywords: [
    "celulares",
    "iphone",
    "starlink",
    "notebook",
    "apple",
    "samsung",
    "perfume",
    "alexa",
    "eletronicos",
    "smartwatch",
    "tv",
    "receptor",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
