import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import db from "./db";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";

export const options = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db as unknown as PrismaClient) as Adapter,
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60
  },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    async session({ session, user }) {
      session.user = user;
      return session;
    }
  },
  events: {
    async signIn({ user }) {
      console.log((user), "Signed in");
    }
  }
} satisfies AuthOptions;