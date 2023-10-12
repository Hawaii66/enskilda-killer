import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import type { Metadata } from "next";
import MicrosoftAuthProvider from "@/components/MicrosoftAuthProvider";

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
      <MicrosoftAuthProvider>
        <body className="min-h-screen flex flex-col items-center justify-center">
          <Header />
          <main className="flex-grow">{children}</main>

          <Footer />
        </body>
      </MicrosoftAuthProvider>
    </html>
  );
}
