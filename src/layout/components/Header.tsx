import React, { useState } from "react";
import { MdLogout, MdEmail } from "react-icons/md";
import IconButton from "../../components/buttons/IconButton";
import { logoutUser } from "../services/apiRequests";
import { useDispatch } from "react-redux";
import { storeAccessToken } from "../../features/generalStore/generalSlice";
import MessagesModal from "./messages/MessagesModal";

function Header() {
  const dispatch = useDispatch();
  const [showMessageModal, setShowMessageModal] = useState(false);

  return (
    <div className="flex bg-black w-full h-[30px] items-center justify-between px-[24px]">
      <div className="text-white">Accountability App</div>
      <div className="flex">
        <div className="relative">
          <IconButton
            Icon={
              <MdEmail
                color="white"
                style={{ marginRight: 20, cursor: "pointer" }}
              />
            }
            action={() => {
              console.log("Icon clicked");
              setShowMessageModal((prev) => !prev);
            }}
          />
          {showMessageModal ? <MessagesModal /> : null}
        </div>

        <IconButton
          Icon={
            <MdLogout
              color="white"
              style={{ marginRight: 20, cursor: "pointer" }}
            />
          }
          action={async () => {
            console.log("Logout Icon clicked");
            const response = await logoutUser();
            console.log("Logout response: ", response);
            if (response.status === 200) {
              localStorage.removeItem("token");
              dispatch(storeAccessToken(undefined));
            }
          }}
        />
      </div>
    </div>
  );
}

export default Header;
