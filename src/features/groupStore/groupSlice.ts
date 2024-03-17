import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import {} from "./interfaceTypes";

interface InitialStateObject {
  groupId: number | undefined;
  refetchGroupData: boolean;
}

const initialState: InitialStateObject = {
  groupId: undefined,
  refetchGroupData: false,
};

const generalSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    storeGroupId(state, action: PayloadAction<number | undefined>) {
      state.groupId = action.payload;
    },
    toggleRefetchGroupData(state) {
      state.refetchGroupData = !state.refetchGroupData;
    },
  },
});

export const { storeGroupId, toggleRefetchGroupData } = generalSlice.actions;
export default generalSlice.reducer;
