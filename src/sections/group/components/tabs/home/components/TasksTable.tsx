import React from "react";
import { TasksTableProps } from "../../../../interfaceTypes";

const TasksTable: React.FC<TasksTableProps> = ({ tasks }) => {
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
          {Array.from({ length: 28 }, () => (
            <col style={{ width: "calc((100% - 500px) / 28)" }} />
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
