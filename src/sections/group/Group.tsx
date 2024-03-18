import useGroup from "./services/hooks/useGroup"; // Update the path accordingly
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import IconButton from "../../components/buttons/IconButton";
import { GoPlus } from "react-icons/go";
import {
  storeCustomModalComponent,
  toggleCustomModal,
} from "../../features/generalStore/generalSlice";
import { useEffect, useState } from "react";
import Challenge from "./components/Challenge";
import { ChallengeType } from "./interfaceTypes";

const Group = () => {
  const dispatch = useDispatch();

  const { groupId, refetchGroupData } = useSelector(
    (state: RootState) => state.group
  );
  const {
    data: group,
    error,
    isLoading,
    refetch,
  } = useGroup(groupId ? groupId : 0);

  const [componentLoaded, setComponentLoaded] = useState(false);

  useEffect(() => {
    if (componentLoaded) {
      refetch();
    }
    setComponentLoaded(true);
  }, [refetchGroupData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="p-[20px]">
      <h1 className="text-3xl mb-[30px]">Group Details</h1>
      {/* Render your group details here */}
      {/* <pre>{JSON.stringify(group, null, 2)}</pre> */}
      <div className="grid grid-cols-2 gap-4">
        {group?.challenges.map((challenge: ChallengeType) => (
          <Challenge challenge={challenge} />
        ))}
        <div className="flex min-w-[230px] items-center justify-center px-[10px] py-[10px]">
          <IconButton
            Icon={<GoPlus />}
            action={() => {
              dispatch(storeCustomModalComponent("createNewChallenge"));
              dispatch(toggleCustomModal());
            }}
            label="Create new Challenge"
            showStyles
          />
        </div>
      </div>
    </div>
  );
};

export default Group;
