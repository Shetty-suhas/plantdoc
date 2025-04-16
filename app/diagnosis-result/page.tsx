import { NeoButton } from "@/components/ui/neo-button";
import Image from "next/image";
import Link from "next/link";
import type { DiagnosisResult } from "../actions";

// Fallback image for demo
const FALLBACK_IMAGE =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC08MTY3LjIyOUFTRjo/Tj4yMklgSj47WHFBRUllcXJBUkpNYnD/2wBDARUXFx4aHR4eHUJBOEFCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkL/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

export default function DiagnosisResult() {
  const result = (globalThis.__DIAGNOSIS_RESULT__ as DiagnosisResult) || {
    plant_name: "Unknown Plant",
    location: "Unknown",
    diseases_treated: "Not specified",
    preparation_methods: "Not specified",
    uploaded_image: FALLBACK_IMAGE, // Default to fallback image
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold">Diagnosis Result</h1>

        <div className="rounded-lg border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <img
                  src={result.uploaded_image || FALLBACK_IMAGE} // Use uploaded image if available
                  alt="Uploaded plant leaf"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              {result.plant_name && (
                <div className="rounded-lg border-2 border-black p-4 text-center font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  Plant: {result.plant_name}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div>
              <h2 className="mb-4 border-b-2 border-black pb-2 text-xl font-bold">
                Plant Information
              </h2>

              {/* Location */}
              <div className="rounded-lg border-2 border-black p-4 leading-tight shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="mb-2 font-bold">Location:</h3>
                <p className="leading-tight text-gray-700">{result.location}</p>
              </div>

              {/* Diseases Treated */}
              <div className="rounded-lg border-2 border-black p-4 leading-tight shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-4">
                <h3 className="mb-2 font-bold">Diseases Treated:</h3>
                <p className="leading-tight text-gray-700">{result.diseases_treated}</p>
              </div>

              {/* Preparation Methods */}
              <div className="rounded-lg border-2 border-black p-4 leading-tight shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-4">
                <h3 className="mb-2 font-bold">Preparation Methods:</h3>
                <p className="leading-tight text-gray-700">{result.preparation_methods}</p>
              </div>
            </div>
          </div>

          {/* Button Section */}
          <div className="mt-8 flex justify-between">
            <Link href="/">
              <NeoButton variant="outline">Upload More Images</NeoButton>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}