// apiRequests.ts
import apiClient from "../../../apiClient";

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    // Using the apiClient instead of axios directly
    const response = await apiClient.post("/login", data);
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post(
      `${import.meta.env.VITE_BACKEND_URL}/register`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};
