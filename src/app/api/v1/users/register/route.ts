import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const scenario = searchParams.get("scenario") || "positive";

  // Simulate network latency (35-50ms)
  await new Promise((resolve) => setTimeout(resolve, 45));

  if (scenario === "negative") {
    return NextResponse.json(
      {
        error: "VALIDATION_FAILED",
        details: {
          email: "Must be a valid RFC 5322 email format",
          password: "Password must be at least 8 characters with 1 symbol",
        },
      },
      {
        status: 400,
        headers: {
          "x-response-time": "45ms",
          "x-error-handler": "zod-schema-validator",
        },
      }
    );
  }

  return NextResponse.json(
    {
      success: true,
      data: {
        userId: "usr_88204",
        email: "nirvaya22@gmail.com",
        status: "PENDING_VERIFICATION",
        createdAt: new Date().toISOString(),
      },
    },
    {
      status: 201,
      headers: {
        "x-response-time": "48ms",
        location: "/api/v1/users/usr_88204",
        etag: 'W/"5a-G7d9v1"',
      },
    }
  );
}
