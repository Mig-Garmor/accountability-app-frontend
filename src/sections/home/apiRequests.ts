import apiClient from "../../apiClient";

export const createGroup = async () => {
  try {
    const response = await apiClient.post("/create-group");
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};
