import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scenario = searchParams.get("scenario") || "positive";

  // Simulate network latency (10-20ms)
  await new Promise((resolve) => setTimeout(resolve, 15));

  if (scenario === "negative") {
    return NextResponse.json(
      {
        status: "DEGRADED",
        error: "DATABASE_CONNECTION_TIMEOUT",
        database: "RECONNECTING_ATTEMPT_2",
      },
      {
        status: 503,
        headers: {
          "x-response-time": "15ms",
          "retry-after": "30",
          "x-circuit-state": "OPEN",
        },
      }
    );
  }

  return NextResponse.json(
    {
      status: "HEALTHY",
      uptime: "99.98%",
      database: "CONNECTED",
      redisCache: "CONNECTED",
    },
    {
      status: 200,
      headers: {
        "x-response-time": "12ms",
        "cache-control": "no-cache",
      },
    }
  );
}
