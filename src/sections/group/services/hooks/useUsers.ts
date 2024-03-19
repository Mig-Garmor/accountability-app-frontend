import { useEffect, useState } from "react";
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

  return useQuery<UsersData, Error>(["users"], () => fetchUsers(), {
    enabled: isFocused,
  });
};

export default useUsers;
