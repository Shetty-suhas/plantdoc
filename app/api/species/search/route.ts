import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const page = searchParams.get("page") || "1";

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_PERENUAL_API_KEY;
  if (!apiKey) {
    console.error("Perenual API key is missing");
    return NextResponse.json(
      { error: "API configuration is missing" },
      { status: 500 }
    );
  }

  try {
    // First get the species list
    const listUrl = `https://perenual.com/api/species-list?key=${apiKey}&q=${encodeURIComponent(query)}&page=${page}`;
    console.log("Making request to Perenual API:", listUrl);

    const listResponse = await fetch(listUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    const listData = await listResponse.json();
    console.log("API List Response:", listData);

    if (!listResponse.ok) {
      throw new Error(
        listData.message ||
          `API request failed with status: ${listResponse.status}`
      );
    }

    if (!listData.data || !Array.isArray(listData.data)) {
      console.error("Unexpected API response:", listData);
      return NextResponse.json(
        { error: "Invalid API response format" },
        { status: 500 }
      );
    }

    // Get detailed information for each plant
    const detailedPlants = await Promise.all(
      listData.data.map(async (plant: any) => {
        try {
          const detailUrl = `https://perenual.com/api/species/details/${plant.id}?key=${apiKey}`;
          const detailResponse = await fetch(detailUrl);
          const detailData = await detailResponse.json();

          return {
            id: plant.id,
            common_name: plant.common_name || "Unknown",
            scientific_name: plant.scientific_name || "Unknown",
            image_url:
              plant.default_image?.regular_url ||
              plant.default_image?.original_url ||
              null,
            cycle: detailData.cycle || plant.cycle || "Not specified",
            watering: detailData.watering || plant.watering || "Not specified",
            sunlight: Array.isArray(detailData.sunlight)
              ? detailData.sunlight.join(", ")
              : Array.isArray(plant.sunlight)
                ? plant.sunlight.join(", ")
                : "Not specified",
            growth_rate: detailData.growth_rate || "Not specified",
            maintenance: detailData.maintenance || "Not specified",
            poisonous:
              detailData.poisonous_to_humans ||
              plant.poisonous_to_humans ||
              false,
            description: detailData.description || plant.description || null,
          };
        } catch (error) {
          console.error(
            `Failed to fetch details for plant ${plant.id}:`,
            error
          );
          return plant;
        }
      })
    );

    return NextResponse.json({
      plants: detailedPlants,
      pagination: {
        current_page: listData.current_page,
        total_pages: listData.last_page,
        has_next: listData.current_page < listData.last_page,
        has_prev: listData.current_page > 1,
      },
    });
  } catch (error) {
    console.error("Failed to fetch from Perenual API:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch plant data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
