"use client";

import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  useState,
} from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type inputProps = {
  value: any;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder: string;
  id: string;
  label: string;
  required?: boolean;
};

export default function InputBox({ ...inputProps }: inputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div
      className={`flex flex-col gap-1 ${
        inputProps.type === "password" ? "relative" : ""
      }`}
    >
      <label htmlFor={inputProps.id} className="text-xs ml-4">
        {inputProps.label}
        {inputProps.required && <span className="text-red-500"> *</span>}
      </label>

      {inputProps.type === "password" ? (
        <>
          <input
            autoComplete="off"
            id={inputProps.id}
            type={showPassword ? "text" : "password"}
            value={inputProps.value}
            onChange={inputProps.onChange}
            placeholder={inputProps.placeholder}
            name={inputProps.name}
            className="caret-blue-500 border border-zinc-200 py-2 px-5 rounded-full focus:outline focus:border-blue-500 focus:outline-blue-500"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
            className="absolute right-1 top-[24px] cursor-pointer group hover:bg-blue-500/10 p-2 rounded-full"
          >
            {showPassword ? (
              <FiEyeOff
                size={20}
                className="stroke-zinc-600 group-hover:stroke-blue-500"
              />
            ) : (
              <FiEye
                size={20}
                className="stroke-zinc-600 group-hover:stroke-blue-500"
              />
            )}
          </button>
        </>
      ) : (
        <input
          autoComplete="off"
          id={inputProps.id}
          type={inputProps.type}
          value={inputProps.value}
          onChange={inputProps.onChange}
          placeholder={inputProps.placeholder}
          name={inputProps.name}
          className="caret-blue-500 border border-zinc-200 py-2 px-5 rounded-full focus:outline focus:border-blue-500 focus:outline-blue-500"
        />
      )}
    </div>
  );
}
