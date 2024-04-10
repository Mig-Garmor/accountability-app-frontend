import React, { ElementType } from "react";

// Define prop types
interface Props {
  Icon: ElementType;
  action: () => void;
  label?: string;
  size?: number;
  showStyles?: boolean;
  customContainerStyles?: string;
  customIconStyles?: string;
}

// Child component
const IconButton = ({
  Icon,
  action,
  label,
  size,
  showStyles,
  customContainerStyles,
  customIconStyles,
}: Props) => {
  return (
    <div className={`${customContainerStyles} cursor-pointer`}>
      <button
        className={`flex items-center ${
          showStyles && "border rounded-[4px] px-[10px] py-[10px]"
        }`}
        onClick={() => {
          action();
        }}
      >
        <Icon className={`mr-[5px] ${customIconStyles}`} size={size} />
        <p className="truncate">{label && label}</p>
      </button>
    </div>
  );
};

export default IconButton;
