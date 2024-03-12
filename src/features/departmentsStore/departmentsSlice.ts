import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DepartmentsItemData } from "./interfaceTypes";

interface InitialStateObject {
  departmentsSuccessFlag: boolean;
  departmentId: number;
  allDepartmentData: Array<DepartmentsItemData> | undefined;
  individualDepartmentData: DepartmentsItemData | undefined;
}

const initialState: InitialStateObject = {
  departmentsSuccessFlag: false,
  departmentId: 0,
  allDepartmentData: undefined,
  individualDepartmentData: undefined,
};

const departmentSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleDepartmentSuccessFlag(state) {
      state.departmentsSuccessFlag = !state.departmentsSuccessFlag;
    },
    storeDepartmentId(state, action: PayloadAction<number>) {
      state.departmentId = action.payload;
    },
    storeAllDepartmentData(
      state,
      action: PayloadAction<Array<DepartmentsItemData>>
    ) {
      state.allDepartmentData = action.payload;
    },
    storeIndividualDepartmentData(
      state,
      action: PayloadAction<DepartmentsItemData>
    ) {
      state.individualDepartmentData = action.payload;
    },
  },
});

export const {
  toggleDepartmentSuccessFlag,
  storeDepartmentId,
  storeAllDepartmentData,
  storeIndividualDepartmentData,
} = departmentSlice.actions;
export default departmentSlice.reducer;
