import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scenario = searchParams.get("scenario") || "positive";

  // Simulate network latency (~25ms)
  await new Promise((resolve) => setTimeout(resolve, 25));

  if (scenario === "negative") {
    return NextResponse.json(
      {
        error: "NO_UNITS_AVAILABLE",
        message:
          "No compatible blood units found for requested type AB_NEG",
        bloodType: "AB_NEG",
        suggestion:
          "Contact regional blood bank network for emergency transfer",
        timestamp: new Date().toISOString(),
      },
      {
        status: 404,
        headers: {
          "x-response-time": "18ms",
        },
      }
    );
  }

  return NextResponse.json(
    {
      status: "success",
      data: {
        bloodType: "O_POS",
        unitsAvailable: 12,
        nearestExpiry: "2026-11-15T00:00:00Z",
        crossMatchValid: true,
        storageTemp: "2-6°C",
        lastVerified: new Date().toISOString(),
      },
    },
    {
      status: 200,
      headers: {
        "x-response-time": "22ms",
        "cache-control": "no-store",
      },
    }
  );
}
