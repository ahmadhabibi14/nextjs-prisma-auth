"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <button
        onClick={onSignOut}
        disabled={loading}
        className="bg-red-500 hover:bg-red-400 py-2 px-10 rounded-full text-white"
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
