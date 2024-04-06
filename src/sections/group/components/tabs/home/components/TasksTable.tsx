import { useEffect, useState } from "react";
import { CompletedTask, Task } from "../../../../interfaceTypes";
import { sendCompletedTask } from "../../../../services/apiRequests";

interface Props {
  tasks: Task[] | undefined;
  isDisabled?: boolean;
}

const TasksTable = ({ tasks, isDisabled }: Props) => {
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
          {tasks?.map((task, rowIndex) => (
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
                {task.name}
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
