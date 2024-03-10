"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="h-fit w-full flex flex-row justify-center items-center">
      <nav className="gap-3 w-full py-2 flex flex-row justify-center items-center bg-white rounded-b-md shadow">
        <Link className={`font-semibold text-sm py-2.5 px-5 active:bg-zinc-200 hover:bg-zinc-100 rounded-full ${pathname == "/" ? "bg-blue-500/20 hover:bg-blue-500/25 text-blue-500" : ""}`} href="/">Home</Link>
        <Link className={`font-semibold text-sm py-2.5 px-5 active:bg-zinc-200 hover:bg-zinc-100 rounded-full ${pathname == "/register" ? "bg-blue-500/20 hover:bg-blue-500/25 text-blue-500" : ""}`} href="/register">Register</Link>
        <Link className={`font-semibold text-sm py-2.5 px-5 active:bg-zinc-200 hover:bg-zinc-100 rounded-full ${pathname == "/login" ? "bg-blue-500/20 hover:bg-blue-500/25 text-blue-500" : ""}`} href="/login">Login</Link>
        <Link className={`font-semibold text-sm py-2.5 px-5 active:bg-zinc-200 hover:bg-zinc-100 rounded-full ${pathname == "/profile" ? "bg-blue-500/20 hover:bg-blue-500/25 text-blue-500" : ""}`} href="/profile">Profile</Link>
      </nav>
    </header>
  )
}