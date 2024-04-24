import { Dispatch, SetStateAction, useState } from "react";
import { ChallengeTypeLite } from "../../../interfaceTypes";
import Challenge from "./Challenge";
import IconButton from "../../../../../components/buttons/IconButton";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  storeCustomModalComponent,
  toggleCustomModal,
} from "../../../../../features/generalStore/generalSlice";
import { RootState } from "../../../../../features/store";

import { IoSettingsSharp } from "react-icons/io5";
import ActionButtonsPopup from "../../../../../components/popups/ActionButtonsPopup";

import { leaveGroup } from "./utils/actionButtonProps";

interface Props {
  setActiveTab: Dispatch<SetStateAction<"home" | "challenges" | "inviteUsers">>;
}

function Challenges({ setActiveTab }: Props) {
  const dispatch = useDispatch();

  const { groupUserPermission, groupChallenges } = useSelector(
    (state: RootState) => state.group
  );

  const [isActionButtonsVisible, setIsActionButtonsVisible] = useState(false);
  const [isSettingsButtonDisabled, setIsSettingsButtonDisabled] =
    useState(false);

  return (
    <div className="w-full">
      {/* Render your group details here */}
      <div className="flex w-full justify-between">
        <h1 className="text-3xl mb-[40px]">Available challenges</h1>
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

      <div className="flex gap-[20px] flex-wrap">
        {groupChallenges && groupChallenges.length > 0
          ? groupChallenges.map(
              (challenge: ChallengeTypeLite, index: number) => (
                <Challenge
                  key={index}
                  challenge={challenge}
                  setActiveTab={setActiveTab}
                />
              )
            )
          : groupUserPermission !== "ADMIN" && (
              <div>No challenges yet. Ask Admin to create new challenges</div>
            )}
        {groupUserPermission === "ADMIN" && (
          <div className="flex min-w-[230px] items-center justify-center px-[10px] py-[10px]">
            <IconButton
              Icon={GoPlus}
              action={() => {
                dispatch(storeCustomModalComponent("createNewChallenge"));
                dispatch(toggleCustomModal());
              }}
              label="Create new Challenge"
              showStyles
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Challenges;
