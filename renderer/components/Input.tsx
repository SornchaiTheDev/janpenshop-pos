import { ChangeEvent } from "react";
import type { HTMLInputTypeAttribute } from "react";

interface Props {
  name?: string;
  value: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  onChange: (value: string) => void;
}

function Input({ name, placeholder, value, onChange, type = "text" }: Props) {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div>
      <label className="text-neutral-700">{placeholder}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onInputChange}
        className="w-full p-2 mt-2 border rounded-md outline-none placeholder:py-2 focus:ring-2 ring-offset-1 ring-zinc-400"
      />
    </div>
  );
}

export default Input;
