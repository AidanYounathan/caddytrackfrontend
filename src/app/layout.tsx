import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Dancing_Script } from "next/font/google";
import { Courgette } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "@/Context/Context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Caddy Track",
  description: "Created By: Aidan Younathan, Ellie Rasuli, and Mike Heckerman",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppWrapper>
          {children}
        </AppWrapper>
        </body>
    </html>
  );
}
