import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enskilda Killer",
  description: "Official website for follwing the game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center">
        <Header />
        <main className="flex-grow">{children}</main>
        <Link
          href={"https://oldenskildakiller.vercel.app"}
          className="text-blue-500 font-bold text-2xl"
        >
          Se förra året
        </Link>
        <img
          src={
            "https://stbonifacevets.co.uk/sites/stbonifacevets.co.uk/files/userfiles/website-construction-graphic-4.jpg"
          }
        />
        <Footer />
      </body>
    </html>
  );
}
