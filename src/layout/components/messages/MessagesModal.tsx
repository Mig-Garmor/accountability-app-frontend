import React from "react";
import { MessagesData, MessageType } from "../../interfaceTypes";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Message from "./Message";

interface Props {
  messages: MessagesData | undefined;
  error: Error | null;
  loading: boolean;
}

function MessagesModal({ messages, error, loading }: Props) {
  if (error) return null;
  return (
    <div className="absolute flex flex-col w-[200px] h-[200px] overflow-y-scroll bg-gray-500 rounded-[4px] top-[25px] right-0">
      {loading ? (
        <LoadingSpinner />
      ) : (
        messages?.data.map((message: MessageType) => {
          return <Message message={message} />;
        })
      )}
    </div>
  );
}

export default MessagesModal;
