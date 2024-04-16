import { useState } from "react";
import { requestToJoinGroup } from "../services/apiRequests";
import { GroupBasic } from "../utils/interfaceTypes";
import LoadingSpinner from "../../../components/LoadingSpinner";

interface Props {
  group: GroupBasic;
}
function BasicGroup({ group }: Props) {
  const [loadingRequest, setLoadingRequest] = useState(false);
  return (
    <div className="flex flex-col w-[200px] border border-black rounded-[5px] p-[10px] shrink-0">
      <h1 className="flex justify-center text-[16px] font-bold mb-[20px]">{`Group: ${group.groupId}`}</h1>
      <p className="text-[12px]">{`Number of members: ${group.numberOfMembers}`}</p>
      <p className="text-[12px]">{`Number of Challenges: ${group.numberOfChallenges}`}</p>
      <div
        className="flex justify-center mt-[10px]"
        onClick={async () => {
          setLoadingRequest(true);
          const response = await requestToJoinGroup(group.groupId);
          console.log("Response: ", response);
          setLoadingRequest(false);
        }}
      >
        <div className="flex px-[10px] py-[5px] rounded-[5px] border border-black cursor-pointer active:bg-gray-200">
          Join
        </div>
        {loadingRequest && <LoadingSpinner />}
      </div>
    </div>
  );
}

export default BasicGroup;
