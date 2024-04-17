import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalData } from "./interfaceTypes";
import { CurrentUser } from "../../types/interfaceTypes";
// import {} from "./interfaceTypes";

type CustomModalTypes =
  | "createNewChallenge"
  | "createNewTask"
  | "confirmLeaveGroup"
  | undefined;

interface InitialStateObject {
  accessToken: string | undefined;
  modalData: ModalData | undefined;
  modalOpen: boolean;
  customModalComponent: CustomModalTypes;
  customModalOpen: boolean;
  userInfo: CurrentUser | undefined;
}

const initialState: InitialStateObject = {
  accessToken: undefined,
  modalData: undefined,
  modalOpen: false,
  customModalComponent: undefined,
  customModalOpen: false,
  userInfo: undefined,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    storeAccessToken(state, action: PayloadAction<string | undefined>) {
      state.accessToken = action.payload;
    },
    storeModalData(state, action: PayloadAction<ModalData | undefined>) {
      state.modalData = action.payload;
    },
    toggleModal(state) {
      state.modalOpen = !state.modalOpen;
    },
    storeCustomModalComponent(state, action: PayloadAction<CustomModalTypes>) {
      state.customModalComponent = action.payload;
    },
    toggleCustomModal(state) {
      state.customModalOpen = !state.customModalOpen;
    },
    storeUserInfo(state, action: PayloadAction<CurrentUser | undefined>) {
      state.userInfo = action.payload;
    },
  },
});

export const {
  storeAccessToken,
  storeModalData,
  toggleModal,
  storeCustomModalComponent,
  toggleCustomModal,
  storeUserInfo,
} = generalSlice.actions;
export default generalSlice.reducer;
