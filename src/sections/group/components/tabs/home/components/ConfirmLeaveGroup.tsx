import { useState } from "react";

import CustomButton from "../../../../../../components/buttons/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  storeUserInfo,
  toggleCustomModal,
} from "../../../../../../features/generalStore/generalSlice";
import { exitGroup } from "../../../../services/apiRequests";
import { RootState } from "../../../../../../features/store";
import {
  storeActiveChallenge,
  storeGroupId,
} from "../../../../../../features/groupStore/groupSlice";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

function ConfirmLeaveGroup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.general);
  const { groupId } = useSelector((state: RootState) => state.group);

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
            const response = await exitGroup(groupId, userInfo?.id);
            if (response?.success) {
              //@ts-expect-error groupId unused variable
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { groupId, ...tempUserInfo } = userInfo;
              dispatch(storeActiveChallenge(undefined));
              dispatch(storeGroupId(undefined));
              dispatch(storeUserInfo(tempUserInfo));
              localStorage.removeItem("groupId");
              handleRemoveData();
              navigate("/");
              console.log("RESPONSE remove user from group: ", response);
              toast.success("User successfully removed from group");
            } else {
              toast.error("Could not remove user from group");
            }

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
