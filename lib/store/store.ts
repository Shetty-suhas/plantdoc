import { configureStore } from "@reduxjs/toolkit";
import diagnosisReducer from "./diagnosisSlice";

export const store = configureStore({
  reducer: {
    diagnosis: diagnosisReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
