import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import type { Metadata } from "next";
import GameStateWrapper from "@/components/Contexts/GameStateWrapper";
import AllUsersWrapper from "@/components/Contexts/AllUsersWrapper";
import AllGroupsWrapper from "@/components/Contexts/AllGroupsWrapper";
import AllCirclesWrapper from "@/components/Contexts/AllCirclesWrapper";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { AxiomWebVitals } from "next-axiom";
import AllLitigationReasonsWrapper from "@/components/Contexts/AllLitigationReasons";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

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
      <head>
        <Script
          id="nextjs-google-adsense"
          src={
            "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1555847445754750"
          }
          crossOrigin="anonymous"
        />
      </head>
      <AxiomWebVitals />
      <ClerkProvider>
        <GameStateWrapper>
          <AllUsersWrapper>
            <AllGroupsWrapper>
              <AllCirclesWrapper>
                <AllLitigationReasonsWrapper>
                  <body>
                    <div className="min-h-screen flex flex-col items-center justify-center font-serif">
                      <Header />
                      <main className="flex-grow w-full">{children}</main>

                      <Footer />
                    </div>
                    <Toaster />
                    <Analytics />
                  </body>
                </AllLitigationReasonsWrapper>
              </AllCirclesWrapper>
            </AllGroupsWrapper>
          </AllUsersWrapper>
        </GameStateWrapper>
      </ClerkProvider>
    </html>
  );
}
