import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Recipe Book",
  description: "Search, save, and share your favorite recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`h-full ${playfair.variable} ${dmSans.variable}`}>
        <body className="min-h-full flex flex-col noise-bg">
          <Header />
          <main className="flex-1 relative z-10">{children}</main>
          <footer className="relative z-10 border-t border-warm-lighter py-8 text-center">
            <p className="font-body text-sm text-warm">
              Recipe Book &mdash; made with care
            </p>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
