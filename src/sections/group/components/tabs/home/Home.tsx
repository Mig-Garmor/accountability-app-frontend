import React from "react";
import { ChallengeType, GroupData } from "../../../interfaceTypes";
import Challenge from "./Challenge";
import IconButton from "../../../../../components/buttons/IconButton";
import { GoPlus } from "react-icons/go";
import { useDispatch } from "react-redux";
import {
  storeCustomModalComponent,
  toggleCustomModal,
} from "../../../../../features/generalStore/generalSlice";

interface Props {
  group: GroupData | undefined;
}

function Home({ group }: Props) {
  const dispatch = useDispatch();

  return (
    <div>
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
}

export default Home;
