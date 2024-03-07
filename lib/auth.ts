import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "./db";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";

export const options = {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        const userCredentials = {
          email: credentials?.username,
          password: credentials?.password,
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/login`,
          {
            method: "POST",
            body: JSON.stringify(userCredentials),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      },
      credentials: {
        username: { label: "Username" },
        password: {  label: "Password", type: "password" }
      },
    }),
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