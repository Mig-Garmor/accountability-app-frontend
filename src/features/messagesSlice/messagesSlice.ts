import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateObject {
  refetchMessages: boolean;
}

const initialState: InitialStateObject = {
  refetchMessages: false,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setRefetchMessages(state, action: PayloadAction<boolean>) {
      state.refetchMessages = action.payload;
    },
  },
});

export const { setRefetchMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
