import React from "react";
import { MdLogout, MdEmail } from "react-icons/md";
import IconButton from "../../components/buttons/IconButton";

function Header() {
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
          action={() => {
            console.log("Icon clicked");
          }}
        />
      </div>
    </div>
  );
}

export default Header;
