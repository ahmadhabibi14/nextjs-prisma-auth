import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Header from "@ext/components/header";
import { getServerSession } from "next-auth";
import Provider from "@ext/components/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={clsx("max-w-[680px] mx-auto w-full", inter.className)}>
        <Provider session={session}>
          <Header />
        </Provider>
        <main>{children}</main>
      </body>
    </html>
  );
}
