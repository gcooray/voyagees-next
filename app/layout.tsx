import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Hire Trusted Private Drivers & Tours in Sri Lanka | voyaGees",
  description: "Book reliable private drivers and tours with voyaGees. Safe, flexible, and affordable travel across Sri Lanka with verified local drivers and clean vehicles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* 🌐 GLOBAL NAVBAR */}
        <Navbar />

        {/* 📄 PAGE CONTENT */}
        <main>{children}</main>

        {/* 🦶 GLOBAL FOOTER */}
        <Footer />
      </body>
    </html>
  );
}