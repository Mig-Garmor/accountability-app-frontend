import React, { Dispatch, SetStateAction } from "react";
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
  setActiveTab: Dispatch<SetStateAction<"home" | "challenges" | "inviteUsers">>;
}

function Challenges({ group, setActiveTab }: Props) {
  const dispatch = useDispatch();

  return (
    <div>
      {/* Render your group details here */}
      {/* <pre>{JSON.stringify(group, null, 2)}</pre> */}
      <div className="grid grid-cols-2 gap-4">
        {group?.challenges.map((challenge: ChallengeType, index: number) => (
          <Challenge
            key={index}
            challenge={challenge}
            setActiveTab={setActiveTab}
          />
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

export default Challenges;
