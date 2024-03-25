import React from "react";
import { UserType } from "../../../interfaceTypes";
import User from "./User";
import LoadingSpinner from "../../../../../components/LoadingSpinner";

interface Props {
  users: UserType[] | undefined;
  loading: boolean;
}

function InviteUsers({ users, loading }: Props) {
  console.log("USERS: ", users);
  return (
    <div className="flex h-fit flex-wrap justify-start gap-[5px]">
      {loading ? (
        <LoadingSpinner />
      ) : (
        users?.map((user: UserType, index: number) => {
          return <User key={index} user={user} />;
        })
      )}
    </div>
  );
}

export default InviteUsers;
