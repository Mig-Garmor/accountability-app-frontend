import axios from "axios";

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/login`,
      data
    );
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
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/register`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};
