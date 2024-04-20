import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChallengeType,
  ChallengeTypeLite,
} from "../../sections/group/interfaceTypes";
// import {} from "./interfaceTypes";

type UserPermissions = "ADMIN" | "USER";

interface InitialStateObject {
  groupId: number | undefined;
  refetchGroupData: boolean;
  //Challenges
  challengeId: number | undefined;
  activeChallengeStore: ChallengeType | undefined;
  refetchActiveChallengeData: boolean;
  groupChallenges: ChallengeTypeLite[] | undefined;
  //Permissions
  groupUserPermission: UserPermissions | undefined;
}

const initialState: InitialStateObject = {
  groupId: undefined,
  refetchGroupData: false,
  //Challenges
  challengeId: undefined,
  activeChallengeStore: undefined,
  refetchActiveChallengeData: false,
  groupChallenges: undefined,
  //Permissions
  groupUserPermission: undefined,
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
    storeActiveChallenge(
      state,
      action: PayloadAction<ChallengeType | undefined>
    ) {
      state.activeChallengeStore = action.payload;
    },
    toggleRefetchActiveChallengeData(state) {
      state.refetchActiveChallengeData = !state.refetchActiveChallengeData;
    },
    storeGroupChallenges(
      state,
      action: PayloadAction<ChallengeTypeLite[] | undefined>
    ) {
      state.groupChallenges = action.payload;
    },
    //Permissions
    storeGroupUserPermission(state, action: PayloadAction<UserPermissions>) {
      state.groupUserPermission = action.payload;
    },
  },
});

export const {
  storeGroupId,
  toggleRefetchGroupData,
  //Challenges
  storeChallengeId,
  storeActiveChallenge,
  toggleRefetchActiveChallengeData,
  storeGroupChallenges,
  //Permissions
  storeGroupUserPermission,
} = generalSlice.actions;
export default generalSlice.reducer;
