import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateObject {
  refetchMessages: boolean;
  messagesSuccessFlag: boolean;
}

const initialState: InitialStateObject = {
  refetchMessages: false,
  messagesSuccessFlag: false,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setRefetchMessages(state, action: PayloadAction<boolean>) {
      state.refetchMessages = action.payload;
    },
    toggleMessagesSuccessFlag(state) {
      state.messagesSuccessFlag = !state.messagesSuccessFlag;
    },
  },
});

export const { setRefetchMessages, toggleMessagesSuccessFlag } =
  messagesSlice.actions;
export default messagesSlice.reducer;
