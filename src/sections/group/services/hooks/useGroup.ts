import { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import apiClient from "../../../../apiClient";
import { AxiosResponse } from "axios"; // Assuming apiClient is based on axios
import { GroupData } from "../../interfaceTypes";

// Assuming the type of the data returned by the API

const fetchGroup = async (groupId: number): Promise<GroupData> => {
  const response: AxiosResponse<GroupData> = await apiClient.get(
    `/group/${groupId}`
  );
  return response.data;
};

const useGroup = (groupId: number): UseQueryResult<GroupData, Error> => {
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

  return useQuery<GroupData, Error>(
    ["group", groupId],
    () => fetchGroup(groupId),
    {
      enabled: isFocused && !!groupId,
    }
  );
};

export default useGroup;
