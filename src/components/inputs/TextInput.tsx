import React, { ChangeEvent } from "react";

interface TextInputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: boolean;
  password?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  password,
}) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={name} className="mb-2 text-sm font-medium text-white">
          {label}
        </label>
      )}
      <input
        type={password ? "password" : "text"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`p-2 border rounded-md focus:outline-none focus:ring-2 
        text-black
        ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      />
    </div>
  );
};

export default TextInput;
