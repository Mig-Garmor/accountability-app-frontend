import { useState } from "react";

import CustomButton from "../../../../../../components/buttons/CustomButton";

import { useQueryClient } from "react-query";

import { useDispatch, useSelector } from "react-redux";
import { toggleCustomModal } from "../../../../../../features/generalStore/generalSlice";
import { removeChallengeFromGroup } from "../../../../services/apiRequests";
import { RootState } from "../../../../../../features/store";
import {
  storeGroupChallenges,
  storeGroupData,
} from "../../../../../../features/groupStore/groupSlice";

function ConfirmDeleteChallenge() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { challengeToDelete } = useSelector((state: RootState) => state.modal);
  const { groupChallenges, groupDataStored } = useSelector(
    (state: RootState) => state.group
  );

  const [loading, setLoading] = useState(false);

  const removeDeletedChallengeFromArray = () => {
    const tempArray = groupChallenges?.filter(
      (challenge) => challenge.id !== challengeToDelete
    );
    if (tempArray?.length === 0) {
      if (groupDataStored) {
        const tempGroupData = { ...groupDataStored, activeChallenge: false };
        dispatch(storeGroupData(tempGroupData));
      }
      queryClient.invalidateQueries("group");
    }
    dispatch(storeGroupChallenges(tempArray));
  };

  return (
    <div>
      <h1 className="mb-[10px]">Do you really want to delete this challenge</h1>

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
            console.log("Delete challenge");
            const response = await removeChallengeFromGroup(challengeToDelete);
            if (response?.success) {
              dispatch(toggleCustomModal());
              removeDeletedChallengeFromArray();
              console.log("RESPONSE remove challenge from group: ", response);
            }

            setLoading(false);
          }}
          text={"Delete Challenge"}
          loading={loading}
          customStyles="from-red-900 to-red-800"
        />
      </div>
    </div>
  );
}

export default ConfirmDeleteChallenge;
