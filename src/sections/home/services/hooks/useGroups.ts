import { useQuery, UseQueryResult } from "react-query";
import apiClient from "../../../../apiClient";
import { AxiosResponse } from "axios"; // Assuming apiClient is based on axios
import { GroupBasic } from "../../utils/interfaceTypes";

// Assuming the type of the data returned by the API

interface GroupsResponse {
  message: string;
  data: GroupBasic[];
}

const fetchGroups = async (): Promise<GroupsResponse> => {
  const response: AxiosResponse<GroupsResponse> = await apiClient.get(
    `/groups`
  );
  return response.data;
};

const useGroups = (): UseQueryResult<GroupsResponse, Error> => {
  return useQuery<GroupsResponse, Error>(["basicGroups"], () => fetchGroups());
};

export default useGroups;
