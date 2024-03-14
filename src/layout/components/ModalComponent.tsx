// ModalComponent.jsx (or .tsx if using TypeScript)

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { createGroup } from "../../sections/home/apiRequests";

const ModalComponent = ({ onCancel, onAccept }) => {
  const { modalData, modalOpen } = useSelector(
    (state: RootState) => state.general
  );

  const modalContent = {
    body: "This is the modal body default text",
    buttonLeft: "Cancel",
    buttonRight: "Accept",
  };

  let acceptAction = () => {
    onAccept();
  };

  if (!modalOpen) return null;

  switch (modalData?.name) {
    case "createGroup":
      modalContent.body = "Are you sure you want to create a new group?";
      modalContent.buttonRight = "Create group";
      acceptAction = async () => {
        const response = await createGroup();
        console.log("Response: Create Group: ", response);
        onAccept();
      };
      break;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md">
        <div className="mb-4">{modalContent.body}</div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="py-2 px-4 bg-gray-300 hover:bg-gray-400 rounded text-black"
          >
            {modalContent.buttonLeft}
          </button>
          <button
            onClick={acceptAction}
            className="py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded text-white"
          >
            {modalContent.buttonRight}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
