import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Voyagees",
  description: "Sri Lanka Tour Driver Booking Platform",
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