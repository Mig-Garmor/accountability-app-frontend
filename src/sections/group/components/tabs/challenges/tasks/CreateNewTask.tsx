import React, { ChangeEvent, useEffect, useState } from "react";
import { TaskFormData, TaskFormErrors } from "../../../../interfaceTypes";
import TextInput from "../../../../../../components/inputs/TextInput";
import CustomButton from "../../../../../../components/buttons/CustomButton";
import { useDispatch } from "react-redux";
import { toggleCustomModal } from "../../../../../../features/generalStore/generalSlice";

function CreateNewTask() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<TaskFormData>({
    name: "",
  });

  const [errors, setErrors] = useState<Partial<TaskFormErrors>>({});

  useEffect(() => {
    const resetInputs = () => {
      setFormData({ name: "" });
    };

    return () => resetInputs();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Explicitly type the event
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Assert that value is a string
    }));
  };

  const validateNewTask = () => {
    const tempErrors: Partial<TaskFormErrors> = {};
    // Email validation

    const nameTrimmed = formData.name.trim();
    tempErrors.name = nameTrimmed === "";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === false);
  };

  return (
    <div>
      <h1 className="mb-[10px]">Create new task</h1>
      <TextInput
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter task name"
        error={errors.name}
      />
      <div className="flex gap-[10px] mt-[10px]">
        <CustomButton
          action={() => {
            dispatch(toggleCustomModal());
          }}
          text={"Cancel"}
          customStyles="from-red-900 to-red-800"
        />
        <CustomButton
          action={() => {
            if (validateNewTask()) {
              console.log("POST request new task");
            }
          }}
          text={"Create task"}
        />
      </div>
    </div>
  );
}

export default CreateNewTask;
