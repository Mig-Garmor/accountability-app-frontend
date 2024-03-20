import { UserType } from "../../../interfaceTypes";
import CustomButton from "../../../../../components/buttons/CustomButton";

interface Props {
  user: UserType;
}

function User({ user }: Props) {
  return (
    <div className="flex flex-col border border-black h-[100px] w-[200px] px-[10px] py-[10px] rounded-[4px]">
      <h1 className="text-xl text-center mb-[10px]">{user.name}</h1>
      <CustomButton
        text={"Invite User"}
        action={() => {
          //Send user invite
        }}
        customStyles="w-[80%]"
      />
    </div>
  );
}

export default User;
