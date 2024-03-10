"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="h-fit w-full flex flex-row justify-between items-center bg-white rounded-b-md shadow px-5 py-2">
      <div className="cursor-pointer" title="Nextjs">
        <Image
          src="/nextjs-outline.svg"
          width={40}
          height={40}
          alt="Nextjs"
        />
      </div>
      <nav className="gap-3 py-2 flex flex-row justify-end items-center ">
        <Link className={`font-semibold text-sm py-2.5 px-5 rounded-full ${pathname == "/" ? "bg-blue-500/20 hover:bg-blue-500/25 active:bg-blue-500/30 text-blue-500" : "active:bg-zinc-200 hover:bg-zinc-100"}`} href="/">Home</Link>
        <Link className={`font-semibold text-sm py-2.5 px-5 rounded-full ${pathname == "/profile" ? "bg-blue-500/20 hover:bg-blue-500/25 active:bg-blue-500/30 text-blue-500" : "active:bg-zinc-200 hover:bg-zinc-100"}`} href="/profile">Profile</Link>
        <Link className={`font-semibold text-sm py-2.5 px-5 rounded-full ${pathname == "/register" ? "bg-blue-500/20 hover:bg-blue-500/25 active:bg-blue-500/30 text-blue-500" : "active:bg-zinc-200 hover:bg-zinc-100"}`} href="/register">Register</Link>
        <Link className={`font-semibold text-sm py-2.5 px-5 rounded-full ${pathname == "/login" ? "bg-blue-500/20 hover:bg-blue-500/25 active:bg-blue-500/30 text-blue-500" : "active:bg-zinc-200 hover:bg-zinc-100"}`} href="/login">Login</Link>
        <Link className={`font-semibold text-sm py-2.5 px-5 rounded-full ${pathname == "/logout" ? "bg-blue-500/20 hover:bg-blue-500/25 active:bg-blue-500/30 text-blue-500" : "active:bg-zinc-200 hover:bg-zinc-100"}`} href="/logout">Logout</Link>
      </nav>
    </header>
  )
}