import React, {
  Dispatch,
  ElementType,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import IconButton from "../buttons/IconButton";

interface ActionButtonType {
  icon: ElementType;
  iconColor?: string;
  label: string;
  action: () => void;
}

interface Props {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  setDisableExternalButton?: Dispatch<SetStateAction<boolean>>;
  actionButtons: ActionButtonType[];
}

function ActionButtonsPopup({
  isVisible,
  setIsVisible,
  setDisableExternalButton,
  actionButtons,
}: Props) {
  const popupRef = useRef<HTMLDivElement>(null); // Ref to track the popup div

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        isVisible
      ) {
        // If the click is outside the popup, set isVisible to false
        setDisableExternalButton && setDisableExternalButton(true);
        setIsVisible(false);
        setTimeout(() => {
          setDisableExternalButton && setDisableExternalButton(false);
        }, 120);
      }
    }

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts or re-renders
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsVisible]);

  useEffect(() => {}, []);
  return (
    <div
      ref={popupRef}
      className={`absolute flex justify-center right-[0px] top-[30px] border ${
        !isVisible && "hidden"
      }`}
    >
      {actionButtons.map((button: ActionButtonType, index: number) => {
        return (
          <div
            className="hover:bg-gray-200 px-[10px]"
            key={`actionButton-${index}`}
          >
            <IconButton
              Icon={button.icon}
              action={button.action}
              size={30}
              label={button.label}
              customIconStyles={`${button.iconColor}`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ActionButtonsPopup;
