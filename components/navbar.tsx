"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/types/user";

export default function Navbar({ user }: { user: User }) {
  const pathname = usePathname();

  return (
    <header className="select-none h-fit w-full flex flex-row justify-between items-center bg-white rounded-b-md shadow px-5 py-2">
      <div className="flex flex-row items-center gap-5">
        <div className="cursor-pointer" title="Nextjs">
          <Image
            src="/nextjs-outline.svg"
            width={40}
            height={40}
            alt="Nextjs"
          />
        </div>
        <nav className="gap-3 py-2 flex flex-row justify-end items-center ">
          <Link
            className={`font-semibold text-sm py-2.5 px-5 rounded-full ${
              pathname == "/"
                ? "bg-blue-500/10 hover:bg-blue-500/20 active:bg-blue-500/25 text-blue-500"
                : "active:bg-zinc-200 hover:bg-zinc-100"
            }`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`font-semibold text-sm py-2.5 px-5 rounded-full ${
              pathname == "/profile"
                ? "bg-blue-500/10 hover:bg-blue-500/20 active:bg-blue-500/25 text-blue-500"
                : "active:bg-zinc-200 hover:bg-zinc-100"
            }`}
            href="/profile"
          >
            Profile
          </Link>

          {!user ? (
            <>
              <Link
                className={`font-semibold text-sm py-2.5 px-5 rounded-full ${
                  pathname == "/register"
                    ? "bg-blue-500/10 hover:bg-blue-500/20 active:bg-blue-500/25 text-blue-500"
                    : "active:bg-zinc-200 hover:bg-zinc-100"
                }`}
                href="/register"
              >
                Register
              </Link>
              <Link
                className={`font-semibold text-sm py-2.5 px-5 rounded-full ${
                  pathname == "/login"
                    ? "bg-blue-500/10 hover:bg-blue-500/20 active:bg-blue-500/25 text-blue-500"
                    : "active:bg-zinc-200 hover:bg-zinc-100"
                }`}
                href="/login"
              >
                Login
              </Link>
            </>
          ) : (
            <Link
              className={`font-semibold text-sm py-2.5 px-5 rounded-full ${
                pathname == "/logout"
                  ? "bg-blue-500/10 hover:bg-blue-500/20 active:bg-blue-500/25 text-blue-500"
                  : "active:bg-zinc-200 hover:bg-zinc-100"
              }`}
              href="/logout"
            >
              Logout
            </Link>
          )}
        </nav>
      </div>
      <div>
        {user && (
          <span className="text-xs font-semibold w-fit py-2 px-5 bg-emerald-500/10 text-emerald-600 rounded-full">
            {user.fullName}
          </span>
        )}
      </div>
    </header>
  );
}
