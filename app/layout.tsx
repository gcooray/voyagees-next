import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/analytics/Analytics";

// Self-hosted via next/font instead of the globals.css @import this replaced —
// removes the render-blocking request to fonts.googleapis.com and gets
// font-display: swap with no extra network round trip.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.voyagees.com"),

  title: {
    default: "Hire Trusted Private Drivers & Tours in Sri Lanka | voyaGees",
    template: "%s | voyaGees",
  },

  description:
    "Book reliable private drivers and tours with voyaGees. Safe, flexible, and affordable travel across Sri Lanka with verified local drivers and clean vehicles.",

  alternates: {
    canonical: "https://www.voyagees.com/",
  },

  openGraph: {
    title: "Hire Trusted Private Drivers & Tours in Sri Lanka | voyaGees",
    description:
      "Book reliable private drivers and tours with voyaGees. Safe, flexible, and affordable travel across Sri Lanka with verified local drivers and clean vehicles.",
    url: "https://www.voyagees.com/",
    siteName: "voyaGees",
    type: "website",
    locale: "en_US",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <Navbar />

        <main>{children}</main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}