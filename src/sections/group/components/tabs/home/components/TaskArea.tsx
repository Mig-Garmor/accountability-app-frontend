import React from "react";

import { Task, UserType } from "../../../../interfaceTypes";
import { GoPlus } from "react-icons/go";
import IconButton from "../../../../../../components/buttons/IconButton";
import { useDispatch } from "react-redux";
import {
  storeCustomModalComponent,
  toggleCustomModal,
} from "../../../../../../features/generalStore/generalSlice";

interface Props {
  user: UserType | undefined;
}

function TaskArea({ user }: Props) {
  const dispatch = useDispatch();
  return (
    <div className="mb-[10px]">
      <div>TaskArea for {user?.name}</div>
      <div>
        {user?.tasks.map((task: Task) => (
          <p>{task.name}</p>
        ))}
      </div>
      <div>
        <IconButton
          Icon={<GoPlus />}
          action={() => {
            dispatch(storeCustomModalComponent("createNewTask"));
            dispatch(toggleCustomModal());
          }}
          label="Create new task"
          showStyles
        />
      </div>
    </div>
  );
}

export default TaskArea;
