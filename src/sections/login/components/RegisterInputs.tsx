import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import { LoginComponents } from "../types/types";
import TextInput from "../../../components/inputs/TextInput";

interface FormData {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

interface FormErrors {
  name: boolean;
  email: boolean;
  password: boolean;
  repeatPassword;
}

interface Props {
  formDataRegister: FormData;
  setFormDataRegister: Dispatch<SetStateAction<FormData>>;
  setActiveComponent: Dispatch<SetStateAction<LoginComponents>>;
  errors: Partial<FormErrors>; // Add this line
}

function RegisterInputs({
  formDataRegister,
  setFormDataRegister,
  setActiveComponent,
  errors,
}: Props) {
  useEffect(() => {
    const resetInputs = () => {
      setFormDataRegister({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
      });
    };

    return () => resetInputs();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Explicitly type the event
    const { name, value } = e.target;
    setFormDataRegister((prevState) => ({
      ...prevState,
      [name]: value, // Assert that value is a string
    }));
  };

  return (
    <div className="flex flex-1 flex-col items-center text-white">
      <div className="flex justify-center mb-[20px]">
        <h2 className="text-[30px]">Register</h2>
      </div>
      <div className="flex flex-col w-full overflow-y-scroll">
        <TextInput
          label="Name"
          name="name"
          value={formDataRegister.name}
          onChange={handleChange}
          placeholder="Enter your name"
          error={errors.name}
        />
        <div className="mb-[20px]"></div>
        <TextInput
          label="Email"
          name="email"
          value={formDataRegister.email}
          onChange={handleChange}
          placeholder="Enter your email"
          error={errors.email}
        />
        <div className="mb-[20px]"></div>
        <TextInput
          label="Password"
          name="password"
          value={formDataRegister.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={errors.password}
          password
        />
        <div className="mb-[20px]"></div>
        <TextInput
          label="Repeat password"
          name="repeatPassword"
          value={formDataRegister.repeatPassword}
          onChange={handleChange}
          placeholder="Repeat your password"
          error={errors.repeatPassword}
          password
        />
      </div>
      <div className="mb-[20px]" />
      <div
        onClick={() => setActiveComponent("login")}
        className="flex justify-center underline"
      >
        <p>Go to Login</p>
      </div>
      <div className="mb-[20px]" />
    </div>
  );
}

export default RegisterInputs;
