import { SetStateAction, useState, Dispatch } from "react";
import { ChallengeTypeLite } from "../../../interfaceTypes";
import { enterChallenge } from "../../../services/apiRequests";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";

import { toggleRefetchGroupData } from "../../../../../features/groupStore/groupSlice";

import IconButton from "../../../../../components/buttons/IconButton";
import CustomButton from "../../../../../components/buttons/CustomButton";
import {
  storeCustomModalComponent,
  toggleCustomModal,
} from "../../../../../features/generalStore/generalSlice";
import { storeChallengeToDelete } from "../../../../../features/modalStore/modalSlice";
import { RootState } from "../../../../../features/store";
import { toast } from "react-toastify";

interface Props {
  challenge: ChallengeTypeLite;
  setActiveTab: Dispatch<SetStateAction<"home" | "challenges" | "inviteUsers">>;
}

function Challenge({ challenge, setActiveTab }: Props) {
  const dispatch = useDispatch();

  const { groupUserPermission, activeChallengeStore } = useSelector(
    (state: RootState) => state.group
  );
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col items-center border border-black w-[230px] px-[10px] py-[10px] rounded-[4px] relative">
      {groupUserPermission === "ADMIN" && (
        <div className="absolute right-[5px]">
          <IconButton
            action={() => {
              console.log("Delete Challenge");
              dispatch(storeChallengeToDelete(challenge.id));
              dispatch(storeCustomModalComponent("confirmDeleteChallenge"));
              dispatch(toggleCustomModal());
            }}
            Icon={IoClose}
          />
        </div>
      )}

      {challenge.id === activeChallengeStore?.id &&
      challenge.userIsAssociated ? (
        <div className="h-[20px] w-[20px] absolute left-[5px] top-[5px] rounded-full bg-green-500" />
      ) : (
        //This should mark the upcoming challenge with a gray
        challenge.userIsAssociated && (
          <div className="h-[20px] w-[20px] absolute left-[5px] top-[5px] rounded-full bg-red-500" />
        )
      )}

      <h1 className="text-xl text-center mb-[10px]">{`Challenge: ${challenge.id}`}</h1>
      <h2 className="text-md text-center mb-[10px]">
        Start date: {challenge.start_date}
      </h2>
      {challenge.userIsAssociated ? (
        <div className="w-[80%] text-center border border-gray-200 rounded-[4px] bg-yellow-300">
          You are a member
        </div>
      ) : (
        <CustomButton
          text={"Enter challenge"}
          action={async () => {
            setLoading(true);
            const response = await enterChallenge(challenge.id);
            if (response.data) {
              dispatch(toggleRefetchGroupData());
              setActiveTab("home");
            } else {
              toast.error(response.message);
            }
            setLoading(false);
          }}
          customStyles="w-[80%]"
          loading={loading}
        />
      )}
    </div>
  );
}

export default Challenge;
