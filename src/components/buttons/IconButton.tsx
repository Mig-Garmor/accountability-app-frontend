import React from "react";

// Define prop types
interface Props {
  Icon: React.ReactNode;
  action: () => void;
  label?: string;
  showStyles?: boolean;
  customContainerStyles?;
}

// Child component
const IconButton = ({
  Icon,
  action,
  label,
  showStyles,
  customContainerStyles,
}: Props) => {
  return (
    <div className={`${customContainerStyles} cursor-pointer`}>
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
    </div>
  );
};

export default IconButton;
