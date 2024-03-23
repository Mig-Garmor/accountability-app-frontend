import React, { useState } from "react";
import { MessageType } from "../../interfaceTypes";
import CustomButton from "../../../components/buttons/CustomButton";
import { acceptInvite } from "../../services/apiRequests";
import { APIResponse } from "../../../types/interfaceTypes";
import { toast } from "react-toastify";

interface Props {
  message: MessageType | undefined;
}

function Message({ message }: Props) {
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
                } else {
                  toast.error(response.message);
                }
                setLoading(false);
              }}
              text={"Accept"}
              customStyles="w-[50%] h-[20px] py-[15px] text-[14px]"
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
