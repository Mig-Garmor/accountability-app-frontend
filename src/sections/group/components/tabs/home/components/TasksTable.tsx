import { useEffect, useState } from "react";
import { ChallengeType, CompletedTask, Task } from "../../../../interfaceTypes";
import {
  deleteTask,
  // deleteTask,
  sendCompletedTask,
} from "../../../../services/apiRequests";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../features/store";

import { RiDeleteBin6Line } from "react-icons/ri";

import IconButton from "../../../../../../components/buttons/IconButton";
import { storeActiveChallenge } from "../../../../../../features/groupStore/groupSlice";
import { toast } from "react-toastify";

interface Props {
  tasks: Task[] | undefined;
  isDisabled?: boolean;
  userId: number;
}

const TasksTable = ({ tasks, isDisabled, userId }: Props) => {
  const dispatch = useDispatch();

  const { activeChallengeStore } = useSelector(
    (state: RootState) => state.group
  );

  const [checkboxStates, setCheckboxStates] = useState<{
    [key: string]: boolean;
  }>({});

  // Initialize checkboxStates based on tasks prop
  useEffect(() => {
    const initialStates = {};
    tasks?.forEach((task, rowIndex) => {
      console.log("Task: ", task);
      Array.from({ length: 28 }).forEach((_, columnIndex) => {
        const key = `checkbox-${rowIndex}-${columnIndex + 1}`;
        initialStates[key] = task.completed_tasks.some(
          (completedTask: CompletedTask) =>
            completedTask.day === columnIndex + 1
        );
      });
    });
    console.log("Checked boxes: ", initialStates);
    setCheckboxStates(initialStates);
  }, [tasks]);

  useEffect(() => {
    console.log("Checkbox states: ", checkboxStates);
  }, [checkboxStates]);

  // No changes here, but remember you're working with 4 weeks
  const weeks = Array.from({ length: 4 }, (_, i) => `Week ${i + 1}`);
  const daysPerWeek = 7;

  const removeTaskFromActiveChallenge = (taskToRemove: { id: number }) => {
    if (activeChallengeStore && activeChallengeStore.users) {
      // Clone the activeChallengeStore object deeply
      const tempActiveChallenge: ChallengeType = {
        ...activeChallengeStore,
        users: activeChallengeStore.users.map((user) => {
          // Only modify the user object that matches userId
          if (user.id === userId) {
            return {
              ...user,
              // Recreate the tasks array without the task to remove
              tasks: user.tasks.filter((task) => task.id !== taskToRemove.id),
            };
          }
          // Return other users unmodified
          return user;
        }),
      };

      dispatch(storeActiveChallenge(tempActiveChallenge));
    }
  };

  return (
    <div className="border border-black w-[100%] overflow-x-auto relative">
      <table
        style={{
          width: "100%",
          minWidth: 1000,
          tableLayout: "fixed",
        }}
      >
        <colgroup>
          <col style={{ width: "200px" }} />
          {Array.from({ length: 28 }, (_, index) => (
            <col
              key={`day-${index}`}
              style={{ width: "calc((100% - 500px) / 28)" }}
            />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th
              style={{
                position: "sticky",
                left: 0,
                backgroundColor: "#fff",
                zIndex: 1,
              }}
            >
              {/* Empty header for the first column */}
            </th>
            {weeks.map((week) => (
              // Spanning each "Week" header across 7 columns
              <th
                key={week}
                colSpan={daysPerWeek}
                style={{ textAlign: "center", border: "1px solid black" }}
              >
                {week}
              </th>
            ))}
          </tr>
          <tr>
            <th
              style={{
                position: "sticky",
                left: 0,
                backgroundColor: "#fff",
                zIndex: 1,
              }}
            ></th>
            {Array.from({ length: 28 }, (_, i) => (
              // Rendering day numbers below the week headers
              <th key={i + 1} style={{ textAlign: "center" }}>
                {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task: { id: number; name: string }, rowIndex) => (
            <tr key={task.id}>
              <td
                className="border"
                style={{
                  position: "sticky",
                  left: 0,
                  backgroundColor: "#fff",
                  zIndex: 1,
                }}
              >
                <div className="flex justify-start items-center gap-[10px] px-[10px]">
                  <p className="break-all">{task.name}</p>
                  {isDisabled ?? (
                    <IconButton
                      Icon={RiDeleteBin6Line}
                      action={async () => {
                        console.log(`Delete task: `, task.name);
                        const response = await deleteTask(task.id);
                        console.log("RESPONSE delete task: ", response);
                        if (response.success) {
                          console.log("DELETE: ", response);
                          //Remove task from activeChallenge
                          removeTaskFromActiveChallenge(task);
                          toast.success("Task successfully deleted");
                        } else {
                          toast.error(response.message);
                        }
                      }}
                      customIconStyles="hover:text-red-600"
                    />
                  )}
                </div>
              </td>
              {Array.from({ length: 28 }, (_, columnIndex) => (
                <td key={columnIndex} className="border text-center">
                  <input
                    type="checkbox"
                    id={`checkbox-${rowIndex}-${columnIndex + 1}`}
                    name={`checkbox-${rowIndex}-${columnIndex + 1}`}
                    disabled={isDisabled}
                    onChange={async (e) => {
                      const target = e.target as HTMLInputElement;
                      const checkboxId = target.id;
                      // Immediately update the UI
                      console.log(
                        "Changed checkbox: ",
                        checkboxStates[checkboxId]
                      );
                      const updatedCheckboxes = {
                        ...checkboxStates,
                        [checkboxId]: !checkboxStates[checkboxId],
                      };

                      console.log("UPDATED CHECKBOXES: ", updatedCheckboxes);

                      setCheckboxStates(updatedCheckboxes);

                      console.log("Checkbox task: ", task);
                      console.log("Checkbox day: ", columnIndex + 1);
                      const response = await sendCompletedTask({
                        task_id: task.id,
                        day: columnIndex + 1,
                      });

                      console.log("RESPONSE: ", response);
                      // Optionally handle the response to re-sync in case of failure
                    }}
                    checked={
                      checkboxStates[
                        `checkbox-${rowIndex}-${columnIndex + 1}`
                      ] || false
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
