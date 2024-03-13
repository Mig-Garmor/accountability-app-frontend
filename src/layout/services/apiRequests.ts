// apiRequests.ts
import apiClient from "../../apiClient";

export const logoutUser = async () => {
  try {
    // Using the apiClient instead of axios directly
    const response = await apiClient.post("/logout");
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};
