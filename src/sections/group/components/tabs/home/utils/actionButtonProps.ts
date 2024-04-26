import { TiCancel } from "react-icons/ti";
import { MdCancel } from "react-icons/md";
import { store } from "../../../../../../features/store";
import {
  storeCustomModalComponent,
  toggleCustomModal,
} from "../../../../../../features/generalStore/generalSlice";

export const leaveChallenge = {
  icon: TiCancel,
  iconColor: "text-red-500",
  label: "Leave challenge",
};

export const removeUser = {
  iconName: MdCancel,
  label: "Remove User",
  action: () => {
    store.dispatch(storeCustomModalComponent("confirmRemoveGroupUser"));
    store.dispatch(toggleCustomModal());
  },
};
