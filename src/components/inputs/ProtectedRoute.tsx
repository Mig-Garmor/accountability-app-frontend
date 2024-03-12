// ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { storeAccessToken } from "../../features/generalStore/generalSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: RootState) => state.general);

  const tokenLocalStorage = localStorage.getItem("token");

  if (!accessToken && !tokenLocalStorage) {
    // User not logged in, redirect to login page
    return <Navigate to="/login" />;
  } else if (tokenLocalStorage) {
    //If token exists in local storage save in variable
    dispatch(storeAccessToken(tokenLocalStorage));
  }

  return <>{children}</>;
};

export default ProtectedRoute;
