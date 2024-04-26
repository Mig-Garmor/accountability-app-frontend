import LoadingSpinner from "../LoadingSpinner";

interface Props {
  action: () => void;
  text: string;
  customStyles?: string;
  loading?: boolean;
  disabled?: boolean;
}

function CustomButton({
  text,
  action,
  customStyles,
  loading,
  disabled,
}: Props) {
  return (
    <div className="flex justify-center w-full">
      <div
        className={`flex justify-center items-center bg-gradient-to-r from-gray-900 to-gray-800 h-[40px] w-[100%] text-white rounded-[5px]
         ${
           disabled ? "hover:cursor-auto" : "hover:cursor-pointer"
         } ${customStyles}`}
        onClick={disabled ? () => {} : action}
      >
        {loading ? (
          <>
            text <LoadingSpinner />
          </>
        ) : (
          text
        )}
      </div>
    </div>
  );
}

export default CustomButton;
