import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import db from "./db";
import type { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Sign in",
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await db.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) {
          throw new Error("invalid email");
        }

        if (!(await compare(password, user.password))) {
          throw new Error("invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          username: user.username,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db as unknown as PrismaClient) as Adapter,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!credentials) {
        return false;
      }
      if (user) {
        return true;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          randomKey: Math.random(),
        };
      }
      return token;
    },
  },
  events: {
    async signIn({ user }) {
      console.log(user, "Signed in");
    },
  },
} satisfies AuthOptions;
