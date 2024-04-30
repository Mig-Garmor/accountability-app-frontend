import React, { useState } from "react";
import { MessageType } from "../../interfaceTypes";
import CustomButton from "../../../components/buttons/CustomButton";
import { acceptInvite } from "../../services/apiRequests";
import { APIResponse } from "../../../types/interfaceTypes";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  storeGroupId,
  toggleRefetchGroupData,
} from "../../../features/groupStore/groupSlice";
import { useNavigate } from "react-router-dom";
import { acceptJoinRequest } from "../../../sections/home/services/apiRequests";
import { toggleRefetchMessages } from "../../../features/messagesSlice/messagesSlice";

interface Props {
  message: MessageType | undefined;
}

function Message({ message }: Props) {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [loading, setLoading] = useState(false);

  const renderMessage = () => {
    switch (message?.type) {
      case "INVITE":
        return (
          <div className="">
            <p className="mb-[5px] text-center text-[14px]">
              {message.content}
            </p>
            <CustomButton
              action={async () => {
                setLoading(true);
                const response: APIResponse = await acceptInvite(message.id);
                console.log("RESPONSE: ", response);
                if (response.success) {
                  toast.success("Invitation accepted");
                  dispatch(storeGroupId(response.data.data.groupId));
                  localStorage.setItem("groupId", response.data.data.groupId);
                  dispatch(toggleRefetchGroupData());
                  navigation("/group");
                } else {
                  toast.error(response.message);
                }
                setLoading(false);
                dispatch(toggleRefetchMessages());
              }}
              text={"Accept"}
              customStyles="w-fit px-[20px] text-[14px]"
              loading={loading}
            />
          </div>
        );
      case "JOIN":
        return (
          <div className="">
            <p className="mb-[5px] text-center text-[14px]">
              {message.content}
            </p>
            <CustomButton
              action={async () => {
                setLoading(true);
                const response = await acceptJoinRequest(message.id);
                console.log("Response JOIN: ", response);
                if (response.success) {
                  toast.success("Group Join accepted");
                  // dispatch(storeGroupId(response.data.data.groupId));
                  // localStorage.setItem(
                  //   "groupId",
                  //   response.data.data.groupId.toString()
                  // );
                  // navigation("/group");
                } else {
                  toast.error(response.message);
                }
                setLoading(false);
                dispatch(toggleRefetchMessages());
              }}
              text={"Include"}
              customStyles="w-fit px-[20px] text-[14px]"
              loading={loading}
            />
          </div>
        );
    }
  };
  return (
    <div className="flex border border-b-black bg-gray-200 py-[10px] px-[5px]">
      {renderMessage()}
    </div>
  );
}

export default Message;
