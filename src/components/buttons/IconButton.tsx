import React, { ElementType } from "react";

// Define prop types
interface Props {
  Icon: ElementType;
  action: () => void;
  label?: string;
  showStyles?: boolean;
  customContainerStyles?: string;
  customIconStyles?: string;
}

// Child component
const IconButton = ({
  Icon,
  action,
  label,
  showStyles,
  customContainerStyles,
  customIconStyles,
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
        <Icon className={customIconStyles} />
        {label && label}
      </button>
    </div>
  );
};

export default IconButton;
