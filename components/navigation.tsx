import Link from "next/link";
import { FaLeaf } from "react-icons/fa";

export function Navigation() {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <FaLeaf className="text-green-500" size={32} />
          <span className="text-xl font-bold">PlantDoc</span>
        </Link>

        <div className="space-x-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          {/* <Link
            href="/diagnosis-result"
            className="text-gray-600 hover:text-gray-900"
          >
            Diagnosis Result
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
