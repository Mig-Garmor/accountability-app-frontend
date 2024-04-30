// ModalComponent.jsx (or .tsx if using TypeScript)

import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import CreateChallengeModal from "../../sections/home/components/CreateChallengeModal";
import CreateNewTask from "../../sections/group/components/tabs/challenges/tasks/CreateNewTask";
import ConfirmLeaveGroup from "../../sections/group/components/tabs/home/components/ConfirmLeaveGroup";
import ConfirmDeleteChallenge from "../../sections/group/components/tabs/challenges/components/ConfirmDeleteChallenge";
import ConfirmLeaveChallenge from "../../sections/group/components/tabs/challenges/components/ConfirmLeaveChallenge";
import ConfirmRemoveUserFromChallenge from "../../sections/group/components/tabs/home/components/ConfirmRemoveUserFromChallenge";
import ConfirmRemoveUserFromGroup from "../../sections/group/components/tabs/inviteUsers/components/ConfirmRemoveUserFromGroup";

const CustomModal = () => {
  const { customModalOpen, customModalComponent } = useSelector(
    (state: RootState) => state.general
  );

  //Modal is not shown
  if (!customModalOpen) return null;

  const renderModal = () => {
    switch (customModalComponent) {
      case "createNewTask":
        return <CreateNewTask />;
      //Group
      case "confirmLeaveGroup":
        return <ConfirmLeaveGroup />;
      case "confirmRemoveUserFromGroup":
        return <ConfirmRemoveUserFromGroup />;
      //Challenge
      case "createNewChallenge":
        return <CreateChallengeModal />;
      case "confirmDeleteChallenge":
        return <ConfirmDeleteChallenge />;
      case "confirmLeaveChallenge":
        return <ConfirmLeaveChallenge />;
      case "confirmRemoveUserFromChallenge":
        return <ConfirmRemoveUserFromChallenge />;

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md">
        {renderModal()}
      </div>
    </div>
  );
};

export default CustomModal;
