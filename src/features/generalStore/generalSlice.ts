import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import {} from "./interfaceTypes";

interface InitialStateObject {
  accessToken: string | undefined;
}

const initialState: InitialStateObject = {
  accessToken: undefined,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    storeAccessToken(state, action: PayloadAction<string | undefined>) {
      state.accessToken = action.payload;
    },
  },
});

export const { storeAccessToken } = generalSlice.actions;
export default generalSlice.reducer;
