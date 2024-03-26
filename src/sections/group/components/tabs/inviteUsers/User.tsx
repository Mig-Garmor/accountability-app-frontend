import { useState } from "react";
import { UserType } from "../../../interfaceTypes";
import CustomButton from "../../../../../components/buttons/CustomButton";
import { inviteUser } from "../../../services/apiRequests";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../features/store";
import { toast } from "react-toastify";
import { APIResponse } from "../../../../../types/interfaceTypes";

interface Props {
  user: UserType;
}

function User({ user }: Props) {
  const { groupId } = useSelector((state: RootState) => state.group);

  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col border border-black h-[100px] w-[200px] px-[10px] py-[10px] rounded-[4px]">
      <h1 className="text-xl text-center mb-[10px]">{user.name}</h1>
      <CustomButton
        text={"Invite User"}
        action={async () => {
          //Send user invite
          setLoading(true);
          if (groupId) {
            const response: APIResponse = await inviteUser(groupId, user.id);
            if (response.data) {
              toast.success("Invite sent successfully");
            } else {
              console.log("RESPONSE ERROR: ", response);
              toast.error(response?.message);
            }
          }
          setLoading(false);
        }}
        customStyles="w-[80%]"
        loading={loading}
      />
    </div>
  );
}

export default User;