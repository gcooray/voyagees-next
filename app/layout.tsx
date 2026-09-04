import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    <html lang="en">
      <body>
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}