"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useDebounce } from "@/lib/hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/neo-tooltip";

interface Plant {
  id: number;
  common_name: string;
  scientific_name: string;
  image_url: string | null;
  cycle: string;
  watering: string;
  sunlight: string;
  growth_rate: string;
  maintenance: string;
  poisonous: boolean;
  description: string | null;
}

interface PaginationInfo {
  current_page: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export default function Encyclopedia() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const debouncedSearch = useDebounce(searchTerm, 500);

  async function searchPlants(query: string, pageNum: number = 1) {
    if (!query) {
      setPlants([]);
      setPagination(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("Searching for plants:", query, "page:", pageNum);
      const response = await fetch(
        `/api/species/search?q=${encodeURIComponent(query)}&page=${pageNum}`
      );

      const data = await response.json();
      console.log("Search response:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            `Search failed with status: ${response.status}`
        );
      }

      if (!data.plants || !Array.isArray(data.plants)) {
        console.error("Unexpected response format:", data);
        throw new Error("Invalid response format from server");
      }

      console.log(`Found ${data.plants.length} plants`);
      setPlants(data.plants);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Search error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to search plants. Please try again later."
      );
      setPlants([]);
      setPagination(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (debouncedSearch) {
      setPage(1); // Reset to first page on new search
      searchPlants(debouncedSearch, 1);
    }
  }, [debouncedSearch]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    searchPlants(searchTerm, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <TooltipProvider>
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">Plant Encyclopedia</h1>
            <p className="text-gray-600">
              Discover and learn about different plant species from around the
              world
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border-2 border-black bg-white px-4 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-[#F3F707]"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 rounded-lg border-2 border-red-500 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {/* Plants Grid */}
          {isLoading ? (
            <div className="flex justify-center">
              <div className="h-32 w-32 animate-spin rounded-full border-4 border-[#F3F707] border-t-transparent"></div>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {plants.map((plant) => (
                  <div
                    key={plant.id}
                    className="overflow-hidden rounded-lg border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1"
                  >
                    <div className="relative h-48 w-full">
                      {plant.image_url ? (
                        <Image
                          src={plant.image_url}
                          alt={plant.common_name}
                          width={400}
                          height={300}
                          className="h-full w-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100">
                          <span className="text-gray-400">
                            No image available
                          </span>
                        </div>
                      )}
                      {plant.poisonous && (
                        <div className="absolute right-2 top-2 rounded-full border-2 border-black bg-red-500 px-2 py-1 text-xs font-bold text-white">
                          ⚠️ Poisonous
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <Tooltip delayDuration={200}>
                        <TooltipTrigger asChild>
                          <div className="group cursor-help">
                            <h3 className="mb-1 text-lg font-bold transition-colors group-hover:text-[#F3F707]">
                              {plant.common_name}
                            </h3>
                            <p className="mb-3 text-sm italic text-gray-600">
                              {plant.scientific_name}
                            </p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="max-w-sm space-y-2">
                            <p className="font-semibold">About this plant:</p>
                            <p className="text-gray-700">
                              {plant.description || "No description available"}
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>

                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="font-semibold">Life Cycle:</span>
                            <p className="text-gray-600">{plant.cycle}</p>
                          </div>
                          <div>
                            <span className="font-semibold">Watering:</span>
                            <p className="text-gray-600">{plant.watering}</p>
                          </div>
                        </div>

                        <div>
                          <span className="font-semibold">Sunlight:</span>
                          <p className="text-gray-600">{plant.sunlight}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="font-semibold">Growth Rate:</span>
                            <p className="text-gray-600">{plant.growth_rate}</p>
                          </div>
                          <div>
                            <span className="font-semibold">Maintenance:</span>
                            <p className="text-gray-600">{plant.maintenance}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && (
                <div className="mt-8 flex justify-center gap-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={!pagination.has_prev}
                    className="rounded-lg border-2 border-black bg-white px-4 py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="flex items-center px-4 font-bold">
                    Page {pagination.current_page} of {pagination.total_pages}
                  </span>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={!pagination.has_next}
                    className="rounded-lg border-2 border-black bg-white px-4 py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          {plants.length === 0 && !isLoading && !error && (
            <div className="text-center">
              <p className="text-gray-600">
                {searchTerm
                  ? "No plants found. Try a different search term."
                  : "Start typing to search for plants..."}
              </p>
            </div>
          )}
        </div>
      </main>
    </TooltipProvider>
  );
}
