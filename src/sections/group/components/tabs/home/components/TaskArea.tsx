import { Task, UserType } from "../../../../interfaceTypes";
import { GoPlus } from "react-icons/go";
import IconButton from "../../../../../../components/buttons/IconButton";
import { useDispatch, useSelector } from "react-redux";
import {
  storeCustomModalComponent,
  toggleCustomModal,
} from "../../../../../../features/generalStore/generalSlice";
import TasksTable from "./TasksTable";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { removeUser } from "../utils/actionButtonProps";
import { RootState } from "../../../../../../features/store";
import { storeUserToRemove } from "../../../../../../features/modalStore/modalSlice";

interface Props {
  user: UserType | undefined;
  disabled?: boolean;
}

function TaskArea({ user, disabled }: Props) {
  const { userInfo } = useSelector((state: RootState) => state.general);
  const { groupUserPermission } = useSelector(
    (state: RootState) => state.group
  );

  const [tasksArray, setTasksArray] = useState<Task[] | undefined>(undefined);
  useEffect(() => {
    setTasksArray(user?.tasks.map((task: Task) => task));
  }, [user]);
  const dispatch = useDispatch();

  return (
    <div className="mb-[10px] min-w-0">
      <div className="flex justify-between mb-[20px]">
        <p>Tasks: {user?.name}</p>
        {user?.id !== userInfo?.id && groupUserPermission === "ADMIN" && (
          <div
            onClick={() => {
              dispatch(storeUserToRemove(user?.id));
            }}
          >
            <IconButton
              Icon={BsThreeDotsVertical}
              action={() => {}}
              actionModal
              actionProps={[removeUser]}
            />
          </div>
        )}
      </div>
      {user?.tasks && user?.tasks?.length > 0 ? (
        <div className="overflow-hidden min-w-0">
          <TasksTable
            tasks={tasksArray}
            isDisabled={disabled}
            userId={user.id}
          />
        </div>
      ) : (
        <div>No tasks added yet</div>
      )}
      {disabled ? null : (
        <div className="mt-[10px]">
          <IconButton
            Icon={GoPlus}
            action={() => {
              dispatch(storeCustomModalComponent("createNewTask"));
              dispatch(toggleCustomModal());
            }}
            label="Create new task"
            showStyles
          />
        </div>
      )}
    </div>
  );
}

export default TaskArea;
