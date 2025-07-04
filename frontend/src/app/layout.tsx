import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/provider";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Margelet",
  description: "a new messenger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
