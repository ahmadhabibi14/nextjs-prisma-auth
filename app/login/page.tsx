"use client";

import React, { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";
import InputBox from "@/components/inputbox";
import { toast } from "react-toastify";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    await signIn("credentials", {
      redirect: false,
      email: formValues.email,
      password: formValues.password,
    })
      .then((response) => {
        if (response?.ok) {
          toast.success("Login Successful");
          setTimeout(() => (window.location.href = "/"), 3000);
        } else {
          toast.error(response?.error as string);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error as string);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col">
      <form className="flex flex-col w-[450px] gap-4" onSubmit={onSubmit}>
        <InputBox
          label="Email"
          name="email"
          id="email"
          type="email"
          placeholder="email@example.com"
          value={formValues.email}
          onChange={handleChange}
          required
        />
        <InputBox
          label="Password"
          name="password"
          id="password"
          type="password"
          placeholder="secretpassword994"
          value={formValues.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          disabled={loading || !formValues.email || !formValues.password}
          className="disabled:bg-zinc-200 disabled:text-zinc-700 disabled:cursor-not-allowed bg-blue-500 py-2 rounded-full text-white font-semibold hover:bg-blue-400 select-none flex flex-row justify-center"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
