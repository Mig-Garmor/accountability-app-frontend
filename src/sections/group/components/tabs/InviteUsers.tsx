import React from "react";
import { UsersData } from "../../interfaceTypes";

interface Props {
  users: UsersData | undefined;
}

function InviteUsers({ users }: Props) {
  return (
    <div>
      InviteUsers <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}

export default InviteUsers;
