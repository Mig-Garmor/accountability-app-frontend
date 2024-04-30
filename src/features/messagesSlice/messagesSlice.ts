import { createSlice } from "@reduxjs/toolkit";

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
    toggleRefetchMessages(state) {
      state.refetchMessages = !state.refetchMessages;
    },
    toggleMessagesSuccessFlag(state) {
      state.messagesSuccessFlag = !state.messagesSuccessFlag;
    },
  },
});

export const { toggleRefetchMessages, toggleMessagesSuccessFlag } =
  messagesSlice.actions;
export default messagesSlice.reducer;
