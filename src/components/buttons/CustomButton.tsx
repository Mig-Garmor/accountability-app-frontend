import React from "react";

interface Props {
  action: () => void;
  text: string;
  customStyles?: string;
}

function CustomButton({ text, action, customStyles }: Props) {
  return (
    <div className="flex justify-center w-full">
      <div
        className={`flex justify-center items-center bg-gradient-to-r from-gray-900 to-gray-800 h-[40px] w-[100%] text-white font-light rounded-[5px]
         hover:cursor-pointer ${customStyles}`}
        onClick={action}
      >
        {text}
      </div>
    </div>
  );
}

export default CustomButton;
