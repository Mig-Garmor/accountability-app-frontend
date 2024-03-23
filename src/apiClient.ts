import axios from "axios";
import { ActionTypes as GeneralActionTypes } from "./features/generalStore/actionTypes";
import { store } from "./features/store";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    // Any other default headers
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // If a token exists, add it to the request's Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Modify the response interceptor to handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error is a 401 Unauthorized response
    if (error.response && error.response.status === 401) {
      // If so, remove the token from localStorage
      localStorage.removeItem("token");
      //Remove accessToken from store
      store.dispatch({
        type: GeneralActionTypes.REMOVE_ACCESS_TOKEN,
        payload: undefined,
      });
    }

    // Handle other HTTP errors or network errors
    if (error.response) {
      if (error?.response?.data?.error?.message) {
        console.log("ERROR API CLIENT: ", error.response);
        // Handle HTTP errors
        throw new Error(error.response.data.error.message);
      } else {
        console.log("ERROR API CLIENT: ", error.response);
        throw new Error(error.response.data.message);
      }
    } else {
      // Network errors or others
      throw new Error("Network error or unexpected error occurred");
    }

    // Ensure the rejection is handled if the condition above doesn't match
    return Promise.reject(error);
  }
);

export default apiClient;
