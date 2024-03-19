// apiRequests.ts
import apiClient from "../../../apiClient";

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await apiClient.post("/login", data);
    // Assuming success if we reach this line
    return { success: true, data: response.data };
  } catch (error) {
    console.error("There was an error!", error);
    // Return or throw an object indicating failure and containing the error
    return { success: false, error: error };
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
    // Assuming success if we reach this line
    return { success: true, data: response.data };
  } catch (error) {
    console.error("There was an error!", error);
    // Return or throw an object indicating failure and containing the error
    return { success: false, error: error };
  }
};
