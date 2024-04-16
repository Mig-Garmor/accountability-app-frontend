import React, { useEffect } from "react";
import { MessagesData, MessageType } from "../../interfaceTypes";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Message from "./Message";

interface Props {
  messages: MessagesData | undefined;
  error: Error | null;
  loading: boolean;
}

function MessagesModal({ messages, error, loading }: Props) {
  useEffect(() => {
    console.log("Messages: ", messages);
  }, [messages]);

  if (error) return null;

  return (
    <div className="absolute flex flex-col w-[200px] max-h-[200px] overflow-y-scroll bg-gray-500 rounded-[4px] top-[25px] right-0">
      {loading ? (
        <LoadingSpinner />
      ) : messages?.data && messages?.data?.length > 0 ? (
        messages?.data?.flat().map((message: MessageType) => {
          return <Message message={message} />;
        })
      ) : (
        <div className="flex justify-center items-center text-gray-200 p-[10px]">
          No messages to show
        </div>
      )}
    </div>
  );
}

export default MessagesModal;
