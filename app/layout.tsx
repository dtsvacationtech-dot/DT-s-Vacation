import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NewsletterModal from "@/components/home/NewsletterModal";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { EnquiryProvider } from "@/context/EnquiryContext";
import GlobalEnquiryModal from "@/components/ui/GlobalEnquiryModal";

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
      <body className="min-h-screen flex flex-col font-body antialiased bg-[#000814] text-white overflow-x-hidden w-full">
        <EnquiryProvider>
          <Navbar />
          <main className="flex-grow">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <NewsletterModal />
          <GlobalEnquiryModal />
        </EnquiryProvider>
      </body>
    </html>
  );
}
