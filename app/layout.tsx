import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";

// 1. Initialize the font correctly
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURA | Redefine Your Boundaries",
  description: "A premium fitness experience designed for elite performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased selection:bg-accent selection:text-black`}>
        {/* 2. Wrap the app in the AuthProvider */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}