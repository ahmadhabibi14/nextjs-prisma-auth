"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface PrviderProps extends React.PropsWithChildren {
  session: Session | null;
}
export default function Provider({ children, session }: PrviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}