"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Logout() {
  const [loading, setLoading] = useState<boolean>(false);
  const onSignOut = async () => {
    setLoading(true);

    await signOut()
      .then(() => {
        toast.success("Logout Successful");
      })
      .catch((error) => {
        toast.error(error as string);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        <p>Click this button to logout 👇</p>
        <button
          onClick={onSignOut}
          disabled={loading}
          className="bg-red-500/10 hover:bg-red-500/15 text-red-500 py-2.5 px-5 font-semibold text-sm rounded-full"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}
