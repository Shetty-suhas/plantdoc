import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { DiagnosisResult } from "@/app/actions";

interface DiagnosisState {
  result: DiagnosisResult | null;
}

const initialState: DiagnosisState = {
  result: null,
};

export const diagnosisSlice = createSlice({
  name: "diagnosis",
  initialState,
  reducers: {
    setDiagnosisResult: (state, action: PayloadAction<DiagnosisResult>) => {
      state.result = action.payload;
    },
    clearDiagnosisResult: (state) => {
      state.result = null;
    },
  },
});

export const { setDiagnosisResult, clearDiagnosisResult } =
  diagnosisSlice.actions;
export default diagnosisSlice.reducer;
