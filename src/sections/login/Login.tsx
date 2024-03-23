import React, { useEffect, useState } from "react";

import CustomButton from "../../components/buttons/CustomButton";
import LoginInputs from "./components/LoginInputs";
import RegisterInputs from "./components/RegisterInputs";
import {
  LoginComponents,
  LoginErrors,
  LoginFormData,
  LoginResponse,
  RegisterFormData,
  RegisterFormErrors,
} from "./types/types";
import { loginUser, registerUser } from "./services/apiRequests";
import { useDispatch, useSelector } from "react-redux";
import { storeAccessToken } from "../../features/generalStore/generalSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../features/store";
import { storeGroupId } from "../../features/groupStore/groupSlice";
import { toast } from "react-toastify";

function Login() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state: RootState) => state.general);

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
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errorsRegister, setErrorsRegister] = useState<
    Partial<RegisterFormErrors>
  >({});

  //- Register Form

  //Navigate to Main Page
  useEffect(() => {
    if (accessToken) {
      navigation("/");
    }
  }, [accessToken]);
  //- Navigate to Main Page

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

  const handleLoginRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateLogin()) {
      const response: LoginResponse = await loginUser(formDataLogin);
      console.log("Login successful:", response);
      if (response.success && response.data) {
        // Handle successful login (e.g., redirecting the user, storing the login state)
        if (response.data?.group_id) {
          dispatch(storeGroupId(response.data.group_id));
          localStorage.setItem("groupId", response.data.group_id.toString());
        }
        dispatch(storeAccessToken(response.data.token));
        localStorage.setItem("token", response.data.token);
      } else {
        toast.error(
          response.error.message ? response.error.message : "An error occured"
        );
        console.log("Login error: ", response.error);
      }

      setErrorsLogin({ email: true, password: true });
    }
  };

  const validateRegister = () => {
    const tempErrors: Partial<RegisterFormErrors> = {};
    // Name validation
    tempErrors.name = formDataRegister.name ? false : true;
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

  const handleRegisterRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateRegister()) {
      console.log("Validated Data:", formDataRegister);
      const response = await registerUser(formDataRegister);
      if (response.success) {
        toast.success("Registered successfully");
        setActiveComponent("login");
      } else {
        toast.error("An error occurred");
      }
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
