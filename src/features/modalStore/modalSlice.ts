import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateObject {
  challengeToDelete: number | undefined;
}

const initialState: InitialStateObject = {
  challengeToDelete: undefined,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    storeChallengeToDelete(state, action: PayloadAction<number | undefined>) {
      state.challengeToDelete = action.payload;
    },
  },
});

export const { storeChallengeToDelete } = modalSlice.actions;
export default modalSlice.reducer;
