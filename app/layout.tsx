import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokeApp",
  description: "PokeApp by Carlos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <header className="bg-pokemonlogoblue py-5">
            <h1 className="text-center text-5xl text-pokemonlogoyellow">
              PokeApp
            </h1>
          </header>
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
