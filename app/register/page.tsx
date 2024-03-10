"use client";

import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import InputBox from "@/components/inputbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormData = {
  username: string;
  fullName: string;
  email: string;
  password: string;
};

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormData>({
    username: "",
    fullName: "",
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

    await axios
      .post("/api/register", formValues)
      .then((response) => {
        toast.success(response.data.message);
        console.log(response);
      })
      .catch((error) => {
        toast.error(error.response.data.errors);
        console.log(error);
      })
      .finally(() => {
        setFormValues({
          username: "",
          fullName: "",
          email: "",
          password: "",
        });
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col">
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
      <form className="flex flex-col w-[450px] gap-4" onSubmit={onSubmit}>
        <InputBox
          label="Username"
          name="username"
          id="username"
          type="text"
          placeholder="username123"
          value={formValues.username}
          onChange={handleChange}
        />
        <InputBox
          label="Full Name"
          name="fullName"
          id="fullName"
          type="text"
          placeholder="Gojo Satoru"
          value={formValues.fullName}
          onChange={handleChange}
        />
        <InputBox
          label="Email"
          name="email"
          id="email"
          type="email"
          placeholder="email@example.com"
          value={formValues.email}
          onChange={handleChange}
        />
        <InputBox
          label="Password"
          name="password"
          id="password"
          type="password"
          placeholder="secretpassword994"
          value={formValues.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="disable:bg-blue-400 bg-blue-500 py-2 rounded-full text-white font-semibold hover:bg-blue-400 flex flex-row justify-center"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
