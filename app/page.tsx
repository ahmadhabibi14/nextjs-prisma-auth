"use client"
import { toast } from "react-toastify";

export default function Home() {
  const cepok = () => {
    toast.success("Cepok");
  };
  return (
    <div className="flex flex-col gap-4">
      <p>Hello world !!!</p>
      <div className="">
        <button
          onClick={cepok}
          className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 rounded-full py-2 px-5 text-sm"
        >
          Cepok
        </button>
      </div>
    </div>
  );
}
