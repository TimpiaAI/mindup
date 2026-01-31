import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PathFinder - Găsește-ți direcția în carieră",
  description: "Platformă care ajută studenții și tinerii să-și găsească cariera potrivită bazându-se pe skillurile, experiențele și pasiunile lor reale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
