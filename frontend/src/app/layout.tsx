import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

const primarySans = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const headingSerif = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amy Accommodation",
  description: "High-end booking experience for Amy Accommodation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${primarySans.variable} ${headingSerif.variable} antialiased`}
      >
        <Navbar />
        <div className="pt-20">{children}</div>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
