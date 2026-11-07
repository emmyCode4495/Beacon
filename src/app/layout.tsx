import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Archivo's width axis gives us wide, signage-style headlines from one family.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

// Used only for codes, countdowns and the gateway log.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Beacon: sell the spare hours of your Starlink",
  description:
    "Neighbours buy hours of Wi-Fi from your Starlink with a code locked to one device. Access ends on time and your real password stays private.",
};

export const viewport: Viewport = {
  themeColor: "#EDF0F4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG">
      <body className={`${archivo.variable} ${plexMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
