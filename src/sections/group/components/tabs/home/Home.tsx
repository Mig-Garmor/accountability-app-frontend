import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import {
  ChallengeType,
  CompletedTask,
  UserType,
} from "../../../interfaceTypes";

import { storeActiveChallenge } from "../../../../../features/groupStore/groupSlice";
import { RootState } from "../../../../../features/store";

import { IoSettingsSharp } from "react-icons/io5";

import { leaveGroup } from "./utils/actionButtonProps";

import TaskArea from "./components/TaskArea";
import IconButton from "../../../../../components/buttons/IconButton";
import ActionButtonsPopup from "../../../../../components/popups/ActionButtonsPopup";
import {
  storeCustomModalComponent,
  toggleCustomModal,
} from "../../../../../features/generalStore/generalSlice";

interface Props {
  loading: boolean;
}

function Home({ loading }: Props) {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.general);
  const { activeChallengeStore } = useSelector(
    (state: RootState) => state.group
  );

  // Ref to hold the latest value
  const activeChallengeStoreRef = useRef(activeChallengeStore);

  const [isActionButtonsVisible, setIsActionButtonsVisible] = useState(false);
  const [isSettingsButtonDisabled, setIsSettingsButtonDisabled] =
    useState(false);

  const calculateEndDate = (startDate: string) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 30);
    return date.toISOString().split("T")[0];
  };

  const currentUserChallengeInfo: UserType | undefined =
    activeChallengeStore?.users?.find(
      (user: UserType) => user.id === userInfo?.id
    );

  // Update the ref each time the state changes
  useEffect(() => {
    activeChallengeStoreRef.current = activeChallengeStore;
  }, [activeChallengeStore]);

  useEffect(() => {
    // Listen for messages from the backend
    window.Echo.channel("tasks").listen(".TaskCompleted", (e) => {
      console.log("Task completed from backend:", e.message);
      const incomingData: { completedTask: CompletedTask; userId: number } =
        e.message;

      const currentActiveChallengeStore = {
        ...activeChallengeStoreRef?.current,
      };

      console.log("START Active challenge: ", currentActiveChallengeStore);

      if (currentActiveChallengeStore && currentActiveChallengeStore.users) {
        // Create a new array of users, updating as necessary
        const updatedUsers = currentActiveChallengeStore.users.map((user) => {
          if (user.id !== incomingData.userId) {
            // If it's not the targeted user, return the user as is
            return user;
          }

          // For the targeted user, update their tasks
          const updatedTasks = user.tasks.map((task) => {
            // If the task isn't the one completed, return it as is
            if (task.id !== incomingData.completedTask.task_id) {
              return task;
            }

            // Check if the task is already completed
            const taskAlreadyCompleted = task.completed_tasks.some(
              (ct) => ct.id === incomingData.completedTask.id
            );

            console.log("--TASK: ", task);

            let updatedCompletedTasks;
            if (taskAlreadyCompleted) {
              // If the task is already completed, filter it out
              updatedCompletedTasks = task.completed_tasks.filter(
                (ct) => ct.id !== incomingData.completedTask.id
              );
            } else {
              // If it's a new completion, add it to the list
              updatedCompletedTasks = [
                ...task.completed_tasks,
                incomingData.completedTask,
              ];
            }

            // console.log("UPDATED COMPLETED TASKS: ", updatedCompletedTasks);

            // Return the updated task with the new completed tasks array
            return { ...task, completed_tasks: updatedCompletedTasks };
          });

          // Return the updated user with the new tasks array
          return { ...user, tasks: updatedTasks };
        });

        // Update the entire active challenge store with the new users array
        const updatedActiveChallengeStore = {
          ...currentActiveChallengeStore,
          users: updatedUsers,
        };

        // At this point, you'd typically dispatch an action to update the Redux store with updatedActiveChallengeStore

        dispatch(
          storeActiveChallenge(updatedActiveChallengeStore as ChallengeType)
        );
      }
    });

    // Handle unsubscription to avoid memory leaks
    return () => {
      window.Echo.leaveChannel("tasks");
    };
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full min-w-0">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl mb-[30px]">{`Challenge ${activeChallengeStore?.id}`}</h1>
            <div className="flex relative">
              <IconButton
                Icon={IoSettingsSharp}
                size={20}
                action={() => {
                  if (!isSettingsButtonDisabled)
                    setIsActionButtonsVisible((prev) => !prev);
                }}
              />
              <ActionButtonsPopup
                isVisible={isActionButtonsVisible}
                setIsVisible={setIsActionButtonsVisible}
                setDisableExternalButton={setIsSettingsButtonDisabled}
                actionButtons={[
                  {
                    ...leaveGroup,
                    action: async () => {
                      dispatch(storeCustomModalComponent("confirmLeaveGroup"));
                      dispatch(toggleCustomModal());
                    },
                  },
                ]}
              />
            </div>
          </div>
          {activeChallengeStore ? (
            <div className="mb-[20px]">
              <div>
                <h2>Start Date: {activeChallengeStore.start_date}</h2>
                <h2>
                  End Date: {calculateEndDate(activeChallengeStore.start_date)}
                </h2>
              </div>
            </div>
          ) : null}
          {/* <pre>{JSON.stringify(activeChallenge, null, 2)}</pre> */}
          {/* Main user section */}
          <TaskArea user={currentUserChallengeInfo} />

          {/* Other users */}
          {activeChallengeStore?.users?.map((user: UserType) => {
            if (user.id !== userInfo?.id) {
              return (
                <TaskArea
                  key={`user-${user.id}-task-area-`}
                  user={user}
                  disabled
                />
              );
            }
          })}
        </div>
      )}
    </>
  );
}

export default Home;
