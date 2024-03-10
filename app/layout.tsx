import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nextjs with Prisma and NextAuth", 
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen">
      <body className="bg-zinc-50 min-h-screen max-w-4xl mx-auto w-full font-sans text-zinc-700">
        <Navbar />
        <main className="min-h-[90vh] my-5 bg-white rounded-md shadow p-5">
          {children}
        </main>
      </body>
    </html>
  );
}
