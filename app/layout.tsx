import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider"; // <-- ADD THIS

// ... (keep your existing font config and metadata)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased selection:bg-accent selection:text-black`}>
        <AuthProvider> {/* <-- WRAP CHILDREN HERE */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}