export type LoginComponents = "login" | "register";

export interface LoginResponse {
  token: string;
  group_id: number;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginErrors {
  email: boolean;
  password: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface RegisterFormErrors {
  name: boolean;
  email: boolean;
  password: boolean;
  repeatPassword: boolean;
}
