import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beacon — Share unlimited internet on your terms",
  description:
    "Temporary, device-bound Wi-Fi access powered by Starlink. Neighbors pay for the time they need. You stay in control.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-ink-950 text-ink-50`}
      >
        <div className="ambient" aria-hidden />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
