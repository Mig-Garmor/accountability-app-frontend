import { useState } from "react";
import { UserType } from "../../../interfaceTypes";
import CustomButton from "../../../../../components/buttons/CustomButton";
import { inviteUser } from "../../../services/apiRequests";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../features/store";
import { toast } from "react-toastify";
import { APIResponse } from "../../../../../types/interfaceTypes";
import { CgRemove } from "react-icons/cg";
import IconButton from "../../../../../components/buttons/IconButton";
import {
  storeCustomModalComponent,
  toggleCustomModal,
} from "../../../../../features/generalStore/generalSlice";
import { storeUserToRemove } from "../../../../../features/modalStore/modalSlice";

interface Props {
  user: UserType;
}

function User({ user }: Props) {
  const dispatch = useDispatch();
  const { groupId, groupUserPermission } = useSelector(
    (state: RootState) => state.group
  );

  const [loading, setLoading] = useState(false);

  const isMember = () => {
    return groupId === user.groupId ? true : false;
  };

  return (
    <div className="flex flex-col border border-black h-fit w-[200px] px-[10px] py-[10px] rounded-[4px]">
      {groupUserPermission === "ADMIN" && (
        <IconButton
          Icon={CgRemove}
          action={() => {
            dispatch(storeUserToRemove(user.id));
            dispatch(storeCustomModalComponent("confirmRemoveUserFromGroup"));
            dispatch(toggleCustomModal());
          }}
        />
      )}

      <h1 className="text-xl text-center mb-[10px]">{user.name}</h1>
      <CustomButton
        text={groupId === user.groupId ? "Group member" : "Invite User"}
        action={async () => {
          //Send user invite
          setLoading(true);
          if (groupId) {
            const response: APIResponse = await inviteUser(groupId, user.id);
            console.log("INVITE USER RESPONSE: ", response);
            if (response.success) {
              toast.success("Invite sent successfully");
            } else {
              console.log("RESPONSE ERROR: ", response);
              toast.error(response?.message);
            }
          }
          setLoading(false);
        }}
        disabled={isMember()}
        customStyles={`w-[80%] ${
          groupId === user.groupId && "from-yellow-500 to-yellow-500 text-black"
        }`}
        loading={loading}
      />
    </div>
  );
}

export default User;
