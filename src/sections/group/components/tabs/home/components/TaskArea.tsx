import { Task, UserType } from "../../../../interfaceTypes";
import { GoPlus } from "react-icons/go";
import IconButton from "../../../../../../components/buttons/IconButton";
import { useDispatch } from "react-redux";
import {
  storeCustomModalComponent,
  toggleCustomModal,
} from "../../../../../../features/generalStore/generalSlice";
import TasksTable from "./TasksTable";
import { useEffect, useState } from "react";

interface Props {
  user: UserType | undefined;
  disabled?: boolean;
}

function TaskArea({ user, disabled }: Props) {
  const [tasksArray, setTasksArray] = useState<Task[] | undefined>(undefined);
  useEffect(() => {
    setTasksArray(user?.tasks.map((task: Task) => task));
  }, [user]);
  const dispatch = useDispatch();

  return (
    <div className="mb-[10px] min-w-0">
      <div className="mb-[20px]">Tasks: {user?.name}</div>
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
