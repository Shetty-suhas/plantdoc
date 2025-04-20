"use server";

export type DiagnosisResult = {
  plant_name_traditional: string;
  plant_name_cnn: string;
  location: string;
  diseases_treated: string;
  preparation_methods: string;
  uploaded_image: string;
  confidence: number;
  top_3_predictions: { plant: string; confidence: number }[];
};

interface ImageData {
  base64: string;
  mimeType: string;
  filename: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

export async function analyzeImage(imageData: ImageData): Promise<DiagnosisResult> {
  try {
    // Convert base64 to Blob for file upload
    const base64Data = imageData.base64.replace(/^data:image\/\w+;base64,/, "");
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: imageData.mimeType });

    const formData = new FormData();
    formData.append("image", blob, imageData.filename);

    const response = await fetch(`${BACKEND_URL}/api/predict`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Prediction failed");
    }

    const backendResult = await response.json();

    return {
      plant_name_traditional: backendResult.plant_name_traditional || "Unknown",
      plant_name_cnn: backendResult.plant_name_cnn || "Unknown",
      location: backendResult.location || "Unknown",
      diseases_treated: backendResult.diseases_treated || "Not specified",
      preparation_methods: backendResult.preparation_methods || "Not specified",
      uploaded_image: backendResult.uploaded_image || "",
      confidence: backendResult.confidence || 0,
      top_3_predictions: backendResult.top_3_predictions || [],
    };
  } catch (error) {
    console.error("Error analyzing image with backend:", error);
    throw error;
  }
}

export async function processImageUpload(imageData: ImageData): Promise<void> {
  try {
    const result = await analyzeImage(imageData);
    globalThis.__DIAGNOSIS_RESULT__ = { ...result };
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}