import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const scenario = searchParams.get("scenario") || "positive";

  // Simulate network latency (~40ms)
  await new Promise((resolve) => setTimeout(resolve, 40));

  if (scenario === "negative") {
    return NextResponse.json(
      {
        error: "DONOR_INELIGIBLE",
        details: {
          lastDonationDate:
            "Donor must wait minimum 56 days between whole blood donations",
          hemoglobinLevel:
            "Hemoglobin level 11.2 g/dL below minimum threshold of 12.5 g/dL",
        },
      },
      {
        status: 400,
        headers: {
          "x-response-time": "38ms",
          "x-validation-engine": "eligibility-rules-v2",
        },
      }
    );
  }

  return NextResponse.json(
    {
      success: true,
      data: {
        donorId: "DNR-20261104-0847",
        fullName: "Nirvaya Ligal",
        bloodType: "O_POS",
        eligibilityStatus: "ELIGIBLE",
        nextEligibleDate: "2027-02-04T00:00:00Z",
        registeredAt: new Date().toISOString(),
      },
    },
    {
      status: 201,
      headers: {
        "x-response-time": "42ms",
        location: "/api/v1/donors/DNR-20261104-0847",
      },
    }
  );
}
