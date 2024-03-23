import { useQuery, UseQueryResult } from "react-query";
import apiClient from "../../../apiClient";
import { AxiosResponse } from "axios"; // Assuming apiClient is based on axios
import { MessagesData } from "../../interfaceTypes";

// Assuming the type of the data returned by the API

const fetchMessages = async (): Promise<MessagesData> => {
  const response: AxiosResponse<MessagesData> = await apiClient.get(
    `/messages`
  );
  return response.data;
};

const useMessages = (): UseQueryResult<MessagesData, Error> => {
  return useQuery<MessagesData, Error>(["messages"], () => fetchMessages());
};

export default useMessages;
