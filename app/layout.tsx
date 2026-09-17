import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NewsletterModal from "@/components/home/NewsletterModal";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { EnquiryProvider } from "@/context/EnquiryContext";
import GlobalEnquiryModal from "@/components/ui/GlobalEnquiryModal";
import PromotionsModal from "@/components/home/PromotionsModal";
import ExtensionErrorSuppressor from "@/components/ExtensionErrorSuppressor";

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

// Inline script executed immediately before any browser extensions or Next.js overlays can capture errors
const extensionSuppressorScript = `
(function() {
  function isExt(s) {
    if (!s) return false;
    var t = String(s).toLowerCase();
    return t.indexOf("chrome-extension:") !== -1 ||
           t.indexOf("moz-extension:") !== -1 ||
           t.indexOf("inpage.js") !== -1 ||
           t.indexOf("nkbihfbeogaeaoehlefnkodbefgpgknn") !== -1 ||
           t.indexOf("metamask") !== -1 ||
           t.indexOf("ethereum") !== -1 ||
           t.indexOf("failed to connect to metamask") !== -1 ||
           t.indexOf("metamask extension not found") !== -1;
  }
  window.addEventListener("error", function(e) {
    var str = (e.message || "") + " " + (e.filename || "") + " " + (e.error && e.error.stack ? e.error.stack : "");
    if (isExt(str)) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return true;
    }
  }, true);
  window.addEventListener("unhandledrejection", function(e) {
    var r = e.reason;
    var str = typeof r === "string" ? r : (r && (r.message || r.stack)) ? (r.message + " " + (r.stack || "")) : "";
    if (isExt(str)) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return true;
    }
  }, true);
  var origErr = console.error;
  console.error = function() {
    var args = Array.prototype.slice.call(arguments);
    var str = args.map(function(a) { return typeof a === "object" ? JSON.stringify(a) : String(a); }).join(" ");
    if (isExt(str)) return;
    return origErr.apply(console, arguments);
  };
})();
`;

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
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: extensionSuppressorScript }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-body antialiased bg-[#000814] text-white overflow-x-hidden w-full">
        <EnquiryProvider>
          <ExtensionErrorSuppressor />
          <Navbar />
          <main className="flex-grow">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <NewsletterModal />
          <GlobalEnquiryModal />
          <PromotionsModal />
        </EnquiryProvider>
      </body>
    </html>
  );
}
