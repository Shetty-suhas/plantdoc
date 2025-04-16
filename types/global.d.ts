import type { DiagnosisResult } from "@/app/actions";

declare global {
  var __DIAGNOSIS_RESULT__: DiagnosisResult | undefined;
}
