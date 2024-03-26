import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import {} from "./interfaceTypes";

interface InitialStateObject {
  groupId: number | undefined;
  refetchGroupData: boolean;
  //Challenges
  challengeId: number | undefined;
  refetchActiveChallengeData: boolean;
}

const initialState: InitialStateObject = {
  groupId: undefined,
  refetchGroupData: false,
  //Challenges
  challengeId: undefined,
  refetchActiveChallengeData: false,
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
    //Challenges
    storeChallengeId(state, action: PayloadAction<number | undefined>) {
      state.challengeId = action.payload;
    },
    toggleRefetchActiveChallengeData(state) {
      state.refetchActiveChallengeData = !state.refetchActiveChallengeData;
    },
  },
});

export const {
  storeGroupId,
  toggleRefetchGroupData,
  //Challenges
  storeChallengeId,
  toggleRefetchActiveChallengeData,
} = generalSlice.actions;
export default generalSlice.reducer;
