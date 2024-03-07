import NextAuth from "next-auth/next";
import { options } from "@ext/lib/auth";

const handler = NextAuth(options);

export { handler as GET, handler as POST };