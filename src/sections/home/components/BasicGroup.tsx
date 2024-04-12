import React from "react";
import { GroupBasic } from "../utils/interfaceTypes";

interface Props {
  group: GroupBasic;
}
function BasicGroup({ group }: Props) {
  return (
    <div className="w-[200px] border border-black rounded-[5px] p-[10px] shrink-0">
      <h1 className="flex justify-center text-[16px] font-bold mb-[20px]">{`Group: ${group.groupId}`}</h1>
      <p className="text-[12px]">{`Number of members: ${group.numberOfMembers}`}</p>
      <p className="text-[12px]">{`Number of Challenges: ${group.numberOfChallenges}`}</p>
    </div>
  );
}

export default BasicGroup;
