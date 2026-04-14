import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ChatWidget from "@/components/ChatWidget";
import NewsletterModal from "@/components/home/NewsletterModal";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DT's Vacation & Travel | Intentionally Adventurous",
  description: "Meticulously planned travel, destination weddings, and corporate logistics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col font-body antialiased bg-off-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <NewsletterModal />
        <ChatWidget />
      </body>
    </html>
  );
}
