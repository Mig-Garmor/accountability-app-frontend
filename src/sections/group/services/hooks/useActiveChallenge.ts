import { useQuery, UseQueryResult } from "react-query";
import apiClient from "../../../../apiClient";
import { AxiosResponse } from "axios"; // Assuming apiClient is based on axios
import { ChallengeType } from "../../interfaceTypes";

// Assuming the type of the data returned by the API

const fetchActiveChallenge = async (
  groupId: number
): Promise<ChallengeType> => {
  const response: AxiosResponse<ChallengeType> = await apiClient.get(
    `/group/${groupId}/activeChallenge`
  );
  return response.data;
};

const useActiveChallenge = (
  groupId: number,
  shouldFetch: boolean | undefined
): UseQueryResult<ChallengeType, Error> => {
  return useQuery<ChallengeType, Error>(
    ["activeChallenge"],
    () => fetchActiveChallenge(groupId),
    {
      enabled: shouldFetch,
    }
  );
};

export default useActiveChallenge;
