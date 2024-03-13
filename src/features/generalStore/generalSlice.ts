import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalData } from "./interfaceTypes";
// import {} from "./interfaceTypes";

interface InitialStateObject {
  accessToken: string | undefined;
  modalData: ModalData | undefined;
  modalOpen: boolean;
}

const initialState: InitialStateObject = {
  accessToken: undefined,
  modalData: undefined,
  modalOpen: false,
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
  },
});

export const { storeAccessToken, storeModalData, toggleModal } =
  generalSlice.actions;
export default generalSlice.reducer;
