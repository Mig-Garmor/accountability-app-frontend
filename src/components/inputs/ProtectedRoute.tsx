// ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { accessToken } = useSelector((state: RootState) => state.general);

  if (!accessToken) {
    // User not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
