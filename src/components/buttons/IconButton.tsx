import React from "react";

// Define prop types
interface Props {
  Icon: React.ReactNode;
  label?: string;
  action: () => void;
}

// Child component
const IconButton = ({ Icon, label, action }: Props) => {
  return (
    <button
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
