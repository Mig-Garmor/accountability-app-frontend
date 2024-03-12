import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./generalStore/generalSlice";

// import departmentsStore from "./departmentsStore/departmentsSlice";
// import catalogSlice from "./catalogStore/catalogSlice";

export const store = configureStore({
  reducer: {
    // departments: departmentsStore,
    // catalog: catalogSlice,
    general: generalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
