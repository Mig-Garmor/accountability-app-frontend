import { useEffect, useState } from "react";
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

const useGroup = (groupId: number): UseQueryResult<ChallengeType, Error> => {
  const [isFocused, setIsFocused] = useState<boolean>(document.hasFocus());

  useEffect(() => {
    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return useQuery<ChallengeType, Error>(
    ["activeChallenge"],
    () => fetchActiveChallenge(groupId),
    {
      enabled: isFocused && !!groupId,
    }
  );
};

export default useGroup;
