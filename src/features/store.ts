import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./generalStore/generalSlice";
import groupSlice from "./groupStore/groupSlice";
import messagesSlice from "./messagesSlice/messagesSlice";

export const store = configureStore({
  reducer: {
    general: generalSlice,
    group: groupSlice,
    messages: messagesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
