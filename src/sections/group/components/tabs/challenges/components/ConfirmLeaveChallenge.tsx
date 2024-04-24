import { useState } from "react";

import CustomButton from "../../../../../../components/buttons/CustomButton";

import { useQueryClient } from "react-query";

import { useDispatch, useSelector } from "react-redux";
import { toggleCustomModal } from "../../../../../../features/generalStore/generalSlice";
import { exitChallenge } from "../../../../services/apiRequests";
import { RootState } from "../../../../../../features/store";
import {
  storeGroupChallenges,
  storeGroupData,
} from "../../../../../../features/groupStore/groupSlice";

function ConfirmLeaveChallenge() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { challengeToLeave } = useSelector((state: RootState) => state.modal);
  const { groupChallenges, groupDataStored, activeChallengeStore } =
    useSelector((state: RootState) => state.group);

  const [loading, setLoading] = useState(false);

  const updateChallengeStatusInGroup = () => {
    const tempArray = groupChallenges?.map((challenge) => {
      if (challenge && challenge.id === challengeToLeave) {
        return { ...challenge, userIsAssociated: false };
      }
      return challenge;
    });

    if (
      groupDataStored &&
      activeChallengeStore &&
      activeChallengeStore.id === challengeToLeave
    ) {
      const tempGroupData = { ...groupDataStored, activeChallenge: false };
      dispatch(storeGroupData(tempGroupData));
    }
    queryClient.invalidateQueries("group");

    dispatch(storeGroupChallenges(tempArray));
  };

  return (
    <div>
      <h1 className="mb-[10px]">Do you really want to leave this challenge</h1>

      <div className="flex gap-[10px] mt-[10px]">
        <CustomButton
          action={() => {
            dispatch(toggleCustomModal());
          }}
          text={"Cancel"}
        />
        <CustomButton
          action={async () => {
            setLoading(true);
            console.log("Leave challenge");
            const response = await exitChallenge(challengeToLeave);
            if (response?.success) {
              dispatch(toggleCustomModal());
              updateChallengeStatusInGroup();
              console.log("RESPONSE remove challenge from group: ", response);
            }

            setLoading(false);
          }}
          text={"Exit Challenge"}
          loading={loading}
          customStyles="from-red-900 to-red-800"
        />
      </div>
    </div>
  );
}

export default ConfirmLeaveChallenge;
