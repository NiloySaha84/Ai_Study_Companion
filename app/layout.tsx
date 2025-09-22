import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduFlow",
  description: "AI-Powered Learning Experience Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ClerkProvider appearance={{ variables: { colorPrimary: 'hsl(220 100% 50%)' }} }>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
}