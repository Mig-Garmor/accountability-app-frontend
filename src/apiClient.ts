// apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Example: 'https://api.yourservice.com/'
  // You can add more default settings here
  headers: {
    "Content-Type": "application/json",
    // Any other default headers
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error handling
    if (error.response) {
      // Handle HTTP errors
      throw new Error(error.response.data.error.message);
    } else {
      // Network errors or others
      throw new Error("Network error or unexpected error occurred");
    }
  }
);

export default apiClient;
