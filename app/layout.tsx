import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

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
      <body
        className={clsx(
          inter.className,
          "flex flex-col h-screen overflow-hidden"
        )}
      >
        <div>
          <header className="px-5 py-3 border border-b border-stone-200">
            <h1 className="text-xl font-semibold">PokeApp</h1>
          </header>
        </div>
        <div className="overflow-y-scroll w-full flex justify-center">
          <div className="max-w-6xl">{children}</div>
        </div>
      </body>
    </html>
  );
}
