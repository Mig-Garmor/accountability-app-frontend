import { useState } from "react";

import CustomButton from "../../../../../../components/buttons/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleCustomModal } from "../../../../../../features/generalStore/generalSlice";
import { exitGroup } from "../../../../services/apiRequests";
import { RootState } from "../../../../../../features/store";
import {
  storeActiveChallenge,
  storeGroupId,
} from "../../../../../../features/groupStore/groupSlice";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

function ConfirmLeaveGroup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.general);
  const { activeChallengeStore } = useSelector(
    (state: RootState) => state.group
  );

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  function handleRemoveData() {
    // Replace 'activeChallenge' with your specific query key
    queryClient.removeQueries("activeChallenge", { exact: true });
  }

  return (
    <div>
      <h1 className="mb-[10px]">Do you really want to leave the Group</h1>

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
            console.log("Leaving group");
            const response = await exitGroup(
              userInfo?.id,
              activeChallengeStore?.group_id
            );
            dispatch(storeActiveChallenge(undefined));
            dispatch(storeGroupId(undefined));
            localStorage.removeItem("groupId");
            handleRemoveData();
            navigate("/");
            console.log("RESPONSE remove user from group: ", response);
            setLoading(false);
            dispatch(toggleCustomModal());
          }}
          text={"Leave Group"}
          loading={loading}
          customStyles="from-red-900 to-red-800"
        />
      </div>
    </div>
  );
}

export default ConfirmLeaveGroup;
