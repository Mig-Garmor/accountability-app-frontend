import React from "react";
import { ChallengeType } from "../../../interfaceTypes";
import CustomButton from "../../../../../components/buttons/CustomButton";

interface Props {
  challenge: ChallengeType;
}

function Challenge({ challenge }: Props) {
  return (
    <div className="flex flex-col border border-black min-w-[230px] px-[10px] py-[10px] rounded-[4px]">
      <h1 className="text-xl text-center mb-[10px]">{`Challenge: ${challenge.id}`}</h1>
      <h2 className="text-md text-center mb-[10px]">
        Start date: {challenge.start_date}
      </h2>
      <CustomButton
        text={"Enter challenge"}
        action={() => {}}
        customStyles="w-[80%]"
      />
    </div>
  );
}

export default Challenge;
