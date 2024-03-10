import { ChangeEvent, HTMLInputTypeAttribute } from "react";

type inputProps = {
  value: any;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder: string;
  id: string;
  label: string;
};

export default function InputBox({ ...inputProps }: inputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputProps.id} className="text-xs ml-4">
        {inputProps.label}
      </label>
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
    </div>
  );
}
