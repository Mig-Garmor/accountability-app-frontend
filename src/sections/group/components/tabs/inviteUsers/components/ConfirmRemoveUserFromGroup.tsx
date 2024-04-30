import { useState } from "react";

import CustomButton from "../../../../../../components/buttons/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleCustomModal } from "../../../../../../features/generalStore/generalSlice";
import { exitGroup } from "../../../../services/apiRequests";
import { RootState } from "../../../../../../features/store";
import { toast } from "react-toastify";
import { storeUserToRemove } from "../../../../../../features/modalStore/modalSlice";
import {
  storeActiveChallenge,
  storeUsersData,
} from "../../../../../../features/groupStore/groupSlice";
import { UserType } from "../../../../interfaceTypes";

function ConfirmRemoveUserFromGroup() {
  const dispatch = useDispatch();

  const { groupId, activeChallengeStore, usersDataStore } = useSelector(
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
            if (userToRemove && groupId) {
              console.log("Leaving group");
              const response = await exitGroup(groupId, userToRemove);

              if (response?.success) {
                console.log("RESPONSE remove user from group: ", response);
                setLoading(false);
                toast.success("Removed user successfully");

                //Remove user from active challenge UI
                const isUserToRemoveInActiveChallenge =
                  activeChallengeStore?.users?.find(
                    (user) => user.id !== userToRemove
                  );
                if (isUserToRemoveInActiveChallenge && activeChallengeStore) {
                  const tempUsersArray = activeChallengeStore?.users?.filter(
                    (user) => user.id !== userToRemove
                  );

                  console.log("LEFTOVER USERS ARRAY: ", tempUsersArray);

                  const tempActiveChallengesObject = {
                    ...activeChallengeStore,
                    users: tempUsersArray,
                  };
                  dispatch(storeActiveChallenge(tempActiveChallengesObject));
                }

                //Remove user from list of users to invite
                if (usersDataStore) {
                  const tempUsersArray: UserType[] = usersDataStore.users.map(
                    (user) => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      const { groupId, ...userProps } = user;
                      if (user.id !== userToRemove) {
                        return user;
                      } else return userProps;
                    }
                  );
                  const completeUserDataArray = {
                    ...usersDataStore,
                    users: tempUsersArray,
                  };
                  dispatch(storeUsersData(completeUserDataArray));
                }
              } else toast.error("Failed to remove user");

              dispatch(storeUserToRemove(undefined));
              dispatch(toggleCustomModal());
              setLoading(false);
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

export default ConfirmRemoveUserFromGroup;
