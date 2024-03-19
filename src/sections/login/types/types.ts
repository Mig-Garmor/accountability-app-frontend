export type LoginComponents = "login" | "register";

export interface LoginResponse {
  success: boolean;
  data?: { token: string; group_id: number };
  error?: any; // Adjusting to accept any type of error
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
