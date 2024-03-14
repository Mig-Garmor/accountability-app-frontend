import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import {} from "./interfaceTypes";

interface InitialStateObject {
  groupId: number | undefined;
}

const initialState: InitialStateObject = {
  groupId: undefined,
};

const generalSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    storeGroupId(state, action: PayloadAction<number | undefined>) {
      state.groupId = action.payload;
    },
  },
});

export const { storeGroupId } = generalSlice.actions;
export default generalSlice.reducer;
