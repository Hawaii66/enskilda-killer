import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import type { Metadata } from "next";
import MicrosoftAuthProvider from "@/components/MicrosoftAuthProvider";
import GameStateWrapper from "@/components/Contexts/GameStateWrapper";
import AllUsersWrapper from "@/components/Contexts/AllUsersWrapper";
import AllGroupsWrapper from "@/components/Contexts/AllGroupsWrapper";

export const metadata: Metadata = {
  title: "Enskilda Killer",
  description: "Official website for follwing the game",
};

export const revalidate = 0;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <MicrosoftAuthProvider>
        <GameStateWrapper>
          <AllUsersWrapper>
            <AllGroupsWrapper>
              <body className="min-h-screen flex flex-col items-center justify-center">
                <Header />
                <main className="flex-grow w-full">{children}</main>

                <Footer />
              </body>
            </AllGroupsWrapper>
          </AllUsersWrapper>
        </GameStateWrapper>
      </MicrosoftAuthProvider>
    </html>
  );
}
