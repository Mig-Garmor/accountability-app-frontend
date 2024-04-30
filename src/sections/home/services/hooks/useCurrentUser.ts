import { useQuery, UseQueryResult } from "react-query";
import apiClient from "../../../../apiClient";
import { AxiosResponse } from "axios"; // Assuming apiClient is based on axios
import { CurrentUser } from "../../../../types/interfaceTypes";

// Assuming the type of the data returned by the API

const fetchCurrentUser = async (): Promise<CurrentUser> => {
  const response: AxiosResponse<CurrentUser> = await apiClient.get(
    `/users/current`
  );
  return response.data;
};

const useCurrentUser = (): UseQueryResult<CurrentUser, Error> => {
  return useQuery<CurrentUser, Error>(
    ["currentUser"],
    () => fetchCurrentUser(),
    { staleTime: 1 * 1 * 1000 }
  );
};

export default useCurrentUser;
