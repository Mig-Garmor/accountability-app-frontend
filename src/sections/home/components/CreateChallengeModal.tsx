import { useDispatch, useSelector } from "react-redux";
import { toggleCustomModal } from "../../../features/generalStore/generalSlice";
import { useState } from "react";
import DateInput from "../../../components/inputs/DateInput";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { createChallenge } from "../services/apiRequests";
import { RootState } from "../../../features/store";

function CreateChallengeModal() {
  const dispatch = useDispatch();

  const { groupId } = useSelector((state: RootState) => state.group);

  const [startDate, setStartDate] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div className="flex justify-center mb-[20px]">
        <h2 className="text-[30px]">Create new challenge</h2>
      </div>
      <DateInput selectedDate={startDate} setSelectedDate={setStartDate} />
      <div className="mb-[20px]" />
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => {
            dispatch(toggleCustomModal());
          }}
          className="py-2 px-4 bg-gray-300 hover:bg-gray-400 rounded text-black"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            setLoading(true);
            if (groupId) {
              const response = await createChallenge(groupId);
              console.log("CREATE CHALLENGE RESPONSE: ", response);
            }

            setLoading(false);
          }}
          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded text-white"
        >
          {loading ? <LoadingSpinner /> : "Create Challenge"}
        </button>
      </div>
    </div>
  );
}

export default CreateChallengeModal;
