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

export const createChallenge = async (groupId: number, startDate: string) => {
  try {
    const response = await apiClient.post("/challenge", {
      groupId: groupId,
      startDate: `${startDate}`,
    });
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};

export const requestToJoinGroup = async (groupId: number) => {
  try {
    const response = await apiClient.post("/messages/join", {
      groupId: groupId,
    });
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};

export const acceptJoinRequest = async (id: number) => {
  try {
    const response = await apiClient.post("/messages/join/accept", {
      messageId: id,
    });
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};
