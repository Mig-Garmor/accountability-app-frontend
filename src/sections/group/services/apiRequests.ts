import apiClient from "../../../apiClient";

//Requests well structured - Request example

const handleApiResponse = (response) => {
  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    console.log("RESPONSE target: ", response);
    return {
      success: false,
      message: response || "An error occurred.",
      data: null,
    };
  }
};

const handleApiError = (error) => {
  if (error.response) {
    // Handle specific status codes
    switch (error.response.status) {
      case 409: {
        // Conflict, such as "user already invited"
        const conflictMessage =
          error.response.data.message ||
          "Conflict error, operation not permitted.";
        return { success: false, message: conflictMessage, data: null };
      }
      default: {
        // General error handling for other status codes
        const errorMessage =
          error.response.data && error.response.data.message
            ? error.response.data.message
            : "An error occurred.";
        return { success: false, message: errorMessage, data: null };
      }
    }
  } else if (error.request) {
    // The request was made but no response was received
    return { success: false, message: "No response from server.", data: null };
  } else {
    // Something happened in setting up the request that triggered an Error
    const errorMessage = error.message || "Error setting up the request.";
    return { success: false, message: errorMessage, data: null };
  }
};

export const inviteUser = async (groupId: number, targetUserId: number) => {
  try {
    const response = await apiClient.post("/messages/invite", {
      groupId: groupId,
      targetUserId: targetUserId,
    });
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const enterChallenge = async (challengeId: number) => {
  try {
    const response = await apiClient.post("/challenge/enter", {
      challengeId: challengeId,
    });
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const createNewTask = async (taskData: {
  name: string;
  challengeId: number;
}) => {
  try {
    const response = await apiClient.post("/tasks", taskData);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const sendCompletedTask = async (messageData: {
  task_id: number;
  day: number;
}) => {
  try {
    const response = await apiClient.post("/completedTask", messageData);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    const response = await apiClient.delete(`/tasks/${taskId}`);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};
