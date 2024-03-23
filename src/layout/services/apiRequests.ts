import apiClient from "../../apiClient";

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
  console.log("ERROR: ", error);
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

export const acceptInvite = async (messageId: number) => {
  try {
    // Using the apiClient instead of axios directly
    const response = await apiClient.post("/messages/invite/accept", {
      messageId: messageId,
    });
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};
