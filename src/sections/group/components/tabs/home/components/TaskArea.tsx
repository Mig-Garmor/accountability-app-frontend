import React from "react";

import { UserType } from "../../../../interfaceTypes";
import { GoPlus } from "react-icons/go";
import IconButton from "../../../../../../components/buttons/IconButton";

interface Props {
  user: UserType | undefined;
}

function TaskArea({ user }: Props) {
  return (
    <div className="mb-[10px]">
      <div>TaskArea for {user?.name}</div>
      <div>
        <IconButton
          Icon={<GoPlus />}
          action={() => {}}
          label="Create new task"
          showStyles
        />
      </div>
    </div>
  );
}

export default TaskArea;
