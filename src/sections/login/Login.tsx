import React, { useState } from "react";

import CustomButton from "../../components/CustomButton";
import LoginInputs from "./components/LoginInputs";
import RegisterInputs from "./components/RegisterInputs";
import { LoginComponents } from "./types/types";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginErrors {
  email: boolean;
  password: boolean;
}

interface RegisterFormData {
  name: string;
  surname: string;
  userName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

interface RegisterFormErrors {
  name: boolean;
  surname: boolean;
  userName: boolean;
  email: boolean;
  password: boolean;
  repeatPassword: boolean;
}

function Login() {
  const [activeComponent, setActiveComponent] =
    useState<LoginComponents>("login");

  //Login Form
  const [formDataLogin, setFormDataLogin] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errorsLogin, setErrorsLogin] = useState<Partial<LoginErrors>>({});

  //- Login Form

  //Register Form
  const [formDataRegister, setFormDataRegister] = useState<RegisterFormData>({
    name: "",
    surname: "",
    userName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errorsRegister, setErrorsRegister] = useState<
    Partial<RegisterFormErrors>
  >({});

  //- Register Form

  const renderButtonText = () => {
    switch (activeComponent) {
      case "login":
        return "Login";
      case "register":
        return "Register";
    }
  };

  const validateLogin = () => {
    const tempErrors: Partial<LoginErrors> = {};
    // Email validation
    tempErrors.email = formDataLogin.email
      ? /\S+@\S+\.\S+/.test(formDataLogin.email)
        ? false
        : true
      : true;
    // Password validation (basic example, can be extended)
    tempErrors.password = formDataLogin.password ? false : true;

    setErrorsLogin(tempErrors);
    return Object.values(tempErrors).every((x) => x === false);
  };

  const handleLoginRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateLogin()) {
      console.log("Validated Data:", formDataLogin);
      // Here you would handle submission, such as sending data to a server
    }
  };

  const validateRegister = () => {
    const tempErrors: Partial<RegisterFormErrors> = {};
    // Name validation
    tempErrors.name = formDataRegister.name ? false : true;
    // Surname validation
    tempErrors.surname = formDataRegister.surname ? false : true;
    // Username validation
    tempErrors.userName = formDataRegister.userName ? false : true;
    // Email validation
    tempErrors.email = formDataRegister.email
      ? /\S+@\S+\.\S+/.test(formDataRegister.email)
        ? false
        : true
      : true;
    // Password validation
    tempErrors.password = formDataRegister.password ? false : true;
    // Repeat Password validation and check if passwords match
    tempErrors.repeatPassword =
      formDataRegister.repeatPassword &&
      formDataRegister.password === formDataRegister.repeatPassword
        ? false
        : true;

    setErrorsRegister(tempErrors);
    return Object.values(tempErrors).every((x) => x === false);
  };

  const handleRegisterRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateRegister()) {
      console.log("Validated Data:", formDataRegister);
      // Here you would handle the register submission, such as sending data to a server
    }
  };
  const renderInputComponent = () => {
    switch (activeComponent) {
      case "login":
        return (
          <LoginInputs
            formDataLogin={formDataLogin}
            setFormDataLogin={setFormDataLogin}
            setActiveComponent={setActiveComponent}
            errors={errorsLogin}
          />
        );
      case "register":
        return (
          <RegisterInputs
            formDataRegister={formDataRegister}
            setFormDataRegister={setFormDataRegister}
            setActiveComponent={setActiveComponent}
            errors={errorsRegister}
          />
        );
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center h-screen bg-gradient-to-r from-gray-900 to-gray-600">
      <div
        className="flex flex-col shrink-1 justify-between items-center rounded-[10px] min-h-[400px] max-h-[90%] w-[600px] px-[20px] py-[20px] 
      bg-gradient-to-r from-cyan-800 to-cyan-700
      "
      >
        <div className="flex flex-1 w-[80%] min-h-0">
          {renderInputComponent()}
        </div>
        <CustomButton
          text={renderButtonText()}
          customStyles="w-[50%]"
          //@ts-expect-error:button can accept any type of function
          action={
            activeComponent === "login"
              ? handleLoginRequest
              : handleRegisterRequest
          }
        />
      </div>
    </div>
  );
}

export default Login;
