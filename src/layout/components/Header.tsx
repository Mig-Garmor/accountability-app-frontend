import { useEffect, useState } from "react";
import { MdLogout, MdEmail } from "react-icons/md";
import IconButton from "../../components/buttons/IconButton";
import { logoutUser } from "../services/apiRequests";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";

import { storeAccessToken } from "../../features/generalStore/generalSlice";

import MessagesModal from "./messages/MessagesModal";
import useMessages from "../services/hooks/useMessages";

function Header() {
  const dispatch = useDispatch();

  const { refetchMessages } = useSelector((state: RootState) => state.messages);

  const [showMessageModal, setShowMessageModal] = useState(false);

  //Fetch messages
  const {
    data: messages,
    error: messagesError,
    isLoading: messagesLoading,
    refetch,
  } = useMessages();

  useEffect(() => {
    refetch();
  }, [refetchMessages]);

  return (
    <div className="flex bg-black w-full h-[30px] items-center justify-between px-[24px]">
      <div className="text-white">Accountability App</div>
      <div className="flex">
        <div className="relative">
          <IconButton
            Icon={MdEmail}
            action={() => {
              console.log("Icon clicked");
              setShowMessageModal((prev) => !prev);
            }}
            customContainerStyles={"mr-[20px] cursor-pointer"}
            customIconStyles={"text-white"}
          />
          {showMessageModal ? (
            <MessagesModal
              messages={messages}
              error={messagesError}
              loading={messagesLoading}
            />
          ) : null}
        </div>

        <IconButton
          Icon={MdLogout}
          action={async () => {
            console.log("Logout Icon clicked");
            const response = await logoutUser();
            console.log("Logout response: ", response);
            if (response.status === 200) {
              localStorage.removeItem("token");
              dispatch(storeAccessToken(undefined));
            }
          }}
          customContainerStyles={"mr-[20px] cursor-pointer"}
          customIconStyles={"text-white"}
        />
      </div>
    </div>
  );
}

export default Header;
