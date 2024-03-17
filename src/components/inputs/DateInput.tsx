import { Dispatch, SetStateAction } from "react";

interface Props {
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
  error: boolean;
}

const DateSelector = ({ selectedDate, setSelectedDate, error }: Props) => {
  // Handler to update state when the date changes
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div
      className={`rounded-[4px] px-[10px] ${error && "border border-red-500"}`}
    >
      <label htmlFor="dateSelector">Select a date: </label>
      <input
        type="date"
        id="dateSelector"
        value={selectedDate}
        onChange={handleDateChange}
        // Optional: Customize with min and max attributes
        // min="2020-01-01"
        // max="2024-12-31"
      />
      {/* Display the selected date */}
    </div>
  );
};

export default DateSelector;
