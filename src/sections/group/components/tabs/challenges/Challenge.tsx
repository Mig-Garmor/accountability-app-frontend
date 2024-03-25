import React, { SetStateAction, useState, Dispatch } from "react";
import { ChallengeType } from "../../../interfaceTypes";
import CustomButton from "../../../../../components/buttons/CustomButton";
import { enterChallenge } from "../../../services/apiRequests";
import { useDispatch } from "react-redux";
import { toggleRefetchGroupData } from "../../../../../features/groupStore/groupSlice";

interface Props {
  challenge: ChallengeType;
  setActiveTab: Dispatch<SetStateAction<"home" | "challenges" | "inviteUsers">>;
}

function Challenge({ challenge, setActiveTab }: Props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col border border-black min-w-[230px] px-[10px] py-[10px] rounded-[4px]">
      <h1 className="text-xl text-center mb-[10px]">{`Challenge: ${challenge.id}`}</h1>
      <h2 className="text-md text-center mb-[10px]">
        Start date: {challenge.start_date}
      </h2>
      <CustomButton
        text={"Enter challenge"}
        action={async () => {
          setLoading(true);
          const response = await enterChallenge(challenge.id);
          if (response.data) {
            dispatch(toggleRefetchGroupData());
            setActiveTab("home");
          }
          setLoading(false);
        }}
        customStyles="w-[80%]"
        loading={loading}
      />
    </div>
  );
}

export default Challenge;
