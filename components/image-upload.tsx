"use client";

import { useState, useRef, useEffect } from "react";
import { NeoButton } from "@/components/ui/neo-button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";

interface ImageUploadProps {
  onUpload: (imageData: {
    base64: string;
    mimeType: string;
    filename: string; 
  }) => Promise<void>;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function ImageUpload({ onUpload }: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const router = useRouter();

  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API is not supported in your browser");
      }

      const constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = resolve;
          }
        });
        await videoRef.current.play();
      }

      streamRef.current = stream;
      setIsCameraActive(true);
      setError(null);
    } catch (err: any) {
      console.error("Camera access error:", err);
      setError(
        err.name === "NotAllowedError"
          ? "Camera access denied. Please grant camera permissions in your browser settings."
          : "Failed to start camera. Please make sure your device has a working camera."
      );
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0);
    const imageDataUrl = canvas.toDataURL("image/jpeg");

    // Create a File object for the captured image
    fetch(imageDataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "camera-capture.jpg", {
          type: "image/jpeg",
        });
        setSelectedFile(file);
        setSelectedImage(imageDataUrl);
      });

    stopCamera();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    setSelectedFile(null);
    setSelectedImage(null);

    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return "Please upload a valid image file (JPEG, PNG, or WebP)";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 5MB";
    }
    return null;
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;

        try {
          await onUpload({
            base64,
            mimeType: selectedFile.type,
            filename: selectedFile.name, // Include the filename here
          });

          router.push("/diagnosis-result");
        } catch (error) {
          console.error("Upload error:", error);
          setError("Failed to process image. Please try again.");
        }
      };

      reader.onerror = () => {
        setError("Failed to read image file");
        setIsLoading(false);
      };

      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error("Upload error:", error);
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4">
        {!isCameraActive ? (
          <>
            <input
              type="file"
              accept={ALLOWED_FILE_TYPES.join(",")}
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <div className="flex w-full max-w-xs gap-4">
              <label
                htmlFor="image-upload"
                className="flex-1 cursor-pointer rounded-lg border-2 border-black bg-[#F3F707] px-6 py-3 text-center font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:bg-[#E6EA00] active:translate-y-0.5"
              >
                Upload Image
              </label>
              <button
                onClick={startCamera}
                className="flex items-center justify-center rounded-lg border-2 border-black bg-[#F3F707] px-4 py-3 font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:bg-[#E6EA00] active:translate-y-0.5"
              >
                <Camera className="h-6 w-6" />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full max-w-md space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex gap-4">
              <NeoButton
                variant="primary"
                onClick={captureImage}
                className="flex-1"
              >
                Capture
              </NeoButton>
              <NeoButton variant="secondary" onClick={stopCamera}>
                Cancel
              </NeoButton>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-lg bg-red-100 p-3 text-red-600">
            {error}
          </div>
        )}

        {selectedImage && !error && (
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Image
              src={selectedImage}
              alt="Selected plant leaf"
              fill
              className="object-cover"
            />
          </div>
        )}

        {selectedImage && !error && (
          <NeoButton
            variant="primary"
            onClick={handleUpload}
            disabled={isLoading || !selectedFile}
            className="w-full"
          >
            {isLoading ? "Processing..." : "Start Diagnosis"}
          </NeoButton>
        )}
      </div>
    </div>
  );
}