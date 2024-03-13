import React from "react";
import { MdLogout, MdEmail } from "react-icons/md";
import IconButton from "../../components/buttons/IconButton";
import { logoutUser } from "../services/apiRequests";
import { useDispatch } from "react-redux";
import { storeAccessToken } from "../../features/generalStore/generalSlice";

function Header() {
  const dispatch = useDispatch();
  return (
    <div className="flex bg-black w-full h-[30px] items-center justify-between px-[24px]">
      <div className="text-white">Accountability App</div>
      <div className="flex">
        <IconButton
          Icon={
            <MdEmail
              color="white"
              style={{ marginRight: 20, cursor: "pointer" }}
            />
          }
          action={() => {
            console.log("Icon clicked");
          }}
        />
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
