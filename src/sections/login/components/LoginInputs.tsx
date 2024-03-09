import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import { LoginComponents } from "../types/types";
import TextInput from "../../../components/inputs/TextInput";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email: boolean;
  password: boolean;
}

interface Props {
  formDataLogin: FormData;
  setFormDataLogin: Dispatch<SetStateAction<FormData>>;
  setActiveComponent: Dispatch<SetStateAction<LoginComponents>>;
  errors: Partial<FormErrors>; // Add this line
}

function LoginInputs({
  formDataLogin,
  setFormDataLogin,
  setActiveComponent,
  errors,
}: Props) {
  useEffect(() => {
    const resetInputs = () => {
      setFormDataLogin({ email: "", password: "" });
    };

    return () => resetInputs();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Explicitly type the event
    const { name, value } = e.target;
    setFormDataLogin((prevState) => ({
      ...prevState,
      [name]: value, // Assert that value is a string
    }));
  };

  return (
    <div className="flex flex-col w-full items-center text-white">
      <div className="flex justify-center mb-[20px]">
        <h2 className="text-[30px]">Login</h2>
      </div>

      <TextInput
        label="Email"
        name="email"
        value={formDataLogin.email}
        onChange={handleChange}
        placeholder="Enter your name"
        error={errors.email}
      />
      <div className="mb-[20px]" />
      <TextInput
        label="Password"
        name="password"
        value={formDataLogin.password}
        onChange={handleChange}
        placeholder="Enter your name"
        error={errors.password}
        password
      />
      <div className="mb-[20px]" />
      <div
        onClick={() => setActiveComponent("register")}
        className="flex justify-center underline"
      >
        <p> Don't have an account?</p>
      </div>
    </div>
  );
}

export default LoginInputs;
