import apiClient from "../../../apiClient";

export const createGroup = async () => {
  try {
    const response = await apiClient.post("/group");
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};

export const createChallenge = async (groupId: number) => {
  try {
    const response = await apiClient.post("/challenge", { groupId: groupId });
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};
