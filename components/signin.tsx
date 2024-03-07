"use client";

import { Label } from "./label";
import { Input } from "./input";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await signIn("email", { email, callbackUrl: "/me " });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-96">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="gojosatoru@proton.me"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        disabled={loading}
        type="submit"
        className="bg-zinc-900 py-2 text-zinc-100 shadow hover:bg-zinc-900/90 w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        Send me a magic link
      </button>
    </form>
  );
}
