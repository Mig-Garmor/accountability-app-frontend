import { useDispatch, useSelector } from "react-redux";
import { toggleCustomModal } from "../../../features/generalStore/generalSlice";
import { useState } from "react";
import DateInput from "../../../components/inputs/DateInput";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { createChallenge } from "../services/apiRequests";
import { RootState } from "../../../features/store";
import { toggleRefetchGroupData } from "../../../features/groupStore/groupSlice";

function CreateChallengeModal() {
  const dispatch = useDispatch();

  const { groupId } = useSelector((state: RootState) => state.group);

  const [startDate, setStartDate] = useState("");
  const [startDateError, setStartDateError] = useState(false);

  const [loading, setLoading] = useState(false);

  const isIsoStringEarlierThanNow = (isoString) => {
    const inputDate = new Date(isoString);
    const currentDate = new Date();

    return inputDate < currentDate;
  };

  const failedValidations = () => {
    let error = false;
    if (startDate === "" || isIsoStringEarlierThanNow(startDate)) {
      console.log("StarDate failed");
      setStartDateError(true);

      error = true;
    } else {
      console.log("StarDate success");
      setStartDateError(false);
      error = false;
    }

    return error;
  };

  return (
    <div>
      <div className="flex justify-center mb-[20px]">
        <h2 className="text-[30px]">Create new challenge</h2>
      </div>
      <DateInput
        selectedDate={startDate}
        setSelectedDate={setStartDate}
        error={startDateError}
      />
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
              if (!failedValidations()) {
                const response = await createChallenge(groupId, startDate);
                console.log("CREATE CHALLENGE RESPONSE: ", response);
                dispatch(toggleRefetchGroupData());
                dispatch(toggleCustomModal());
              }
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
