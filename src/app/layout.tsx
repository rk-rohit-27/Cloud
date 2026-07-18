import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import AppProviders from "@/components/AppProviders";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZypherHost — Next-Gen Game & VPS Hosting",
  description:
    "Blazing-fast game servers & VPS hosting with DDoS protection, NVMe SSDs, and instant deployment. Minecraft, FiveM, Rust & more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`} 
      suppressHydrationWarning
    >
      <body 
        className="min-h-screen flex flex-col w-full" 
        suppressHydrationWarning={true} 
      >
        <ThemeProvider>
          <AppProviders>{children}</AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}