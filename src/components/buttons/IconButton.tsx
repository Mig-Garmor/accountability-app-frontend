import React from "react";

// Define prop types
interface Props {
  Icon: React.ReactNode;
  action: () => void;
  label?: string;
  showStyles?: boolean;
}

// Child component
const IconButton = ({ Icon, action, label, showStyles }: Props) => {
  return (
    <button
      className={`flex items-center ${
        showStyles && "border rounded-[4px] px-[10px] py-[5px]"
      }`}
      onClick={() => {
        action();
      }}
    >
      {Icon}
      {label && label}
    </button>
  );
};

export default IconButton;
