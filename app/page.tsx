import { ImageUpload } from "@/components/image-upload";
import Image from "next/image";
import { processImageUpload } from "./actions";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Welcome Card */}
        <div className="mb-8 rounded-lg border-2 border-black bg-[#FAFBE7] p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="mb-4 text-3xl font-bold">Welcome to PlantDoc</h1>
          <p className="mb-6 leading-tight text-gray-700">
            Upload an image of a plant leaf to diagnose potential diseases using
            our advanced AI technology.
          </p>
          <ImageUpload onUpload={processImageUpload} />
        </div>

        {/* Performance Metrics Section */}
        <div className="mb-8 rounded-lg border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 border-b-2 border-black pb-2 text-2xl font-bold">
            AI Performance Metrics
          </h2>
          <p className="mb-4 leading-tight text-gray-700">
            Our model delivers exceptional performance in plant species recognition.
          </p>
          
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {/* Accuracy Card */}
            <div className="rounded-lg bg-green-50 p-4 text-center">
              <h3 className="text-lg font-semibold text-green-800">Accuracy</h3>
              <p className="text-3xl font-bold text-green-700">98.9%</p>
            </div>
            
            {/* Precision Card */}
            <div className="rounded-lg bg-blue-50 p-4 text-center">
              <h3 className="text-lg font-semibold text-blue-800">Precision</h3>
              <p className="text-3xl font-bold text-blue-700">99%</p>
            </div>
            
            {/* Recall Card */}
            <div className="rounded-lg bg-purple-50 p-4 text-center">
              <h3 className="text-lg font-semibold text-purple-800">Recall</h3>
              <p className="text-3xl font-bold text-purple-700">99%</p>
            </div>
            
            {/* F1 Score Card */}
            <div className="rounded-lg bg-amber-50 p-4 text-center">
              <h3 className="text-lg font-semibold text-amber-800">F1 Score</h3>
              <p className="text-3xl font-bold text-amber-700">99%</p>
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Based on evaluation of 30 plant species across 91 test samples</p>
          </div>
        </div>

        {/* About Section */}
        <div className="rounded-lg border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 border-b-2 border-black pb-2 text-2xl font-bold">
            About Our AI Technology
          </h2>
          <p className="mb-6 leading-tight text-gray-700">
            PlantDoc uses state-of-the-art machine learning algorithms to
            accurately identify plant diseases. Our technology is trained on a
            diverse dataset of plant images, ensuring high accuracy and
            reliability in diagnosis. Experience the future of plant health
            monitoring with PlantDoc.
          </p>
          <div className="flex justify-center">
            <div className="relative h-48 w-64 overflow-hidden">
              <Image
                src="/images/plantdoc-logo.png"
                alt="Plant leaf scanning visualization"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}