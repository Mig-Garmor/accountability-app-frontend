import { useQuery, UseQueryResult } from "react-query";
import apiClient from "../../../../apiClient";
import { AxiosResponse } from "axios"; // Assuming apiClient is based on axios
import { UsersData } from "../../interfaceTypes";

// Assuming the type of the data returned by the API

const fetchUsers = async (): Promise<UsersData> => {
  const response: AxiosResponse<UsersData> = await apiClient.get(`/users`);
  return response.data;
};

const useUsers = (): UseQueryResult<UsersData, Error> => {
  return useQuery<UsersData, Error>(["users"], () => fetchUsers(), {});
};

export default useUsers;
