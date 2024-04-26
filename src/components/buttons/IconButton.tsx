import { ElementType, useState } from "react";

interface ActionProp {
  iconName: ElementType;
  iconSize?: number;
  label: string;
  action: () => void;
}

// Define prop types
interface Props {
  Icon: ElementType;
  action: () => void;
  label?: string;
  size?: number;
  showStyles?: boolean;
  customContainerStyles?: string;
  customIconStyles?: string;
  actionModal?: boolean;
  actionProps?: ActionProp[];
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
  actionModal,
  actionProps,
}: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className={`${customContainerStyles} cursor-pointer relative`}>
      <button
        className={`flex items-center ${
          showStyles && "border rounded-[4px] px-[10px] py-[10px]"
        }`}
        onClick={
          actionModal
            ? () => {
                setModalOpen((prev) => !prev);
              }
            : () => {
                action();
              }
        }
      >
        <Icon className={`mr-[5px] ${customIconStyles}`} size={size} />
        <p className="truncate">{label && label}</p>
      </button>
      {actionModal && modalOpen && actionProps && (
        <div className="absolute flex justify-center py-[5px] px-[5px] w-fit border top-[20px] left-[-150px]">
          {actionProps.map((props: ActionProp, index: number) => {
            const ActionIcon = props.iconName;
            return (
              <div
                className="flex items-center hover:bg-gray-200 p-[5px]"
                onClick={() => {
                  props.action();
                }}
                key={index}
              >
                <ActionIcon />
                <p className="ml-[5px]">{props.label}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IconButton;
