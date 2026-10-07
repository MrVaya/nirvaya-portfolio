import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scenario = searchParams.get("scenario") || "positive";

  // Simulate network latency (20-40ms)
  await new Promise((resolve) => setTimeout(resolve, 30));

  if (scenario === "negative") {
    return NextResponse.json(
      {
        error: "UNAUTHORIZED",
        message: "Bearer token expired or invalid signature",
        code: "AUTH_TOKEN_EXPIRED",
        timestamp: new Date().toISOString(),
      },
      {
        status: 401,
        headers: {
          "x-response-time": "30ms",
          "x-ratelimit-remaining": "994",
          "cache-control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }

  return NextResponse.json(
    {
      status: "success",
      data: {
        userId: "usr_99120",
        username: "tester.vaya",
        role: "qa_tester",
        permissions: ["tests:read", "tests:execute", "reports:export"],
        sessionExpiresAt: new Date(Date.now() + 86400000).toISOString(),
      },
    },
    {
      status: 200,
      headers: {
        "x-response-time": "28ms",
        "x-ratelimit-remaining": "994",
        "cache-control": "no-store, no-cache, must-revalidate",
        "strict-transport-security": "max-age=31536000; includeSubDomains",
      },
    }
  );
}
