import { useState } from "react";

import CustomButton from "../../../../../../components/buttons/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleCustomModal } from "../../../../../../features/generalStore/generalSlice";
import { removeUserFromChallenge } from "../../../../services/apiRequests";
import { RootState } from "../../../../../../features/store";
import { toast } from "react-toastify";
import { storeUserToRemove } from "../../../../../../features/modalStore/modalSlice";
import { storeActiveChallenge } from "../../../../../../features/groupStore/groupSlice";

function ConfirmRemoveUserFromChallenge() {
  const dispatch = useDispatch();

  const { activeChallengeStore } = useSelector(
    (state: RootState) => state.group
  );

  const { userToRemove } = useSelector((state: RootState) => state.modal);

  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h1 className="mb-[10px]">
        Do you really want to remove this user from the group?
      </h1>

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
            if (userToRemove && activeChallengeStore?.id) {
              console.log("Leaving group");
              const response = await removeUserFromChallenge(
                activeChallengeStore?.id,
                userToRemove
              );

              if (response?.success) {
                console.log("RESPONSE remove user from group: ", response);
                setLoading(false);
                toast.success("Removed user successfully");
                const tempUsersArray = activeChallengeStore?.users?.filter(
                  (user) => user.id !== userToRemove
                );

                console.log("LEFTOVER USERS ARRAY: ", tempUsersArray);

                const tempActiveChallengesObject = {
                  ...activeChallengeStore,
                  users: tempUsersArray,
                };

                dispatch(storeActiveChallenge(tempActiveChallengesObject));
              } else toast.error("Failed to remove user");

              dispatch(storeUserToRemove(undefined));
              dispatch(toggleCustomModal());
            }
          }}
          text={"Remove user"}
          loading={loading}
          customStyles="from-red-900 to-red-800"
        />
      </div>
    </div>
  );
}

export default ConfirmRemoveUserFromChallenge;
