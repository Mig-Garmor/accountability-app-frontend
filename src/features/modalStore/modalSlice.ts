import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateObject {
  challengeToDelete: number | undefined;
  challengeToLeave: number | undefined;
}

const initialState: InitialStateObject = {
  challengeToDelete: undefined,
  challengeToLeave: undefined,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    storeChallengeToDelete(state, action: PayloadAction<number | undefined>) {
      state.challengeToDelete = action.payload;
    },
    storeChallengeToLeave(state, action: PayloadAction<number | undefined>) {
      state.challengeToLeave = action.payload;
    },
  },
});

export const { storeChallengeToDelete, storeChallengeToLeave } =
  modalSlice.actions;
export default modalSlice.reducer;
