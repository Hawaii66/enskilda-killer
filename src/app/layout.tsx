import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import type { Metadata } from "next";
import MicrosoftAuthProvider from "@/components/MicrosoftAuthProvider";
import GameStateWrapper from "@/components/GameStateWrapper";

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
        <GameStateWrapper>
          <body className="min-h-screen flex flex-col items-center justify-center">
            <Header />
            <main className="flex-grow w-full">{children}</main>

            <Footer />
          </body>
        </GameStateWrapper>
      </MicrosoftAuthProvider>
    </html>
  );
}
