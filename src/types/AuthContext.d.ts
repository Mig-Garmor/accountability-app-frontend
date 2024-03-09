// AuthContext.d.ts
import React from "react";

export interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }>;

export function useAuth(): AuthContextType;
