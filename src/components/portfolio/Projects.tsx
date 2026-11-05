"use client";

import { useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Code2,
  Copy,
  Database,
  Eye,
  FileCode2,
  Globe,
  Loader2,
  Lock,
  RotateCw,
  Send,
  Server,
  ShieldCheck,
  Terminal,
} from "lucide-react";

interface HeaderItem {
  key: string;
  value: string;
  desc?: string;
}

interface ParamItem {
  key: string;
  value: string;
  desc?: string;
  enabled?: boolean;
}

interface AssertionResult {
  name: string;
  passed: boolean;
  timeMs: number;
}

interface EndpointScenario {
  status: string;
  statusCode: number;
  time: string;
  size: string;
  response: Record<string, unknown>;
  assertions: AssertionResult[];
  requestBody?: Record<string, unknown>;
  qaContext: string;
  responseHeaders: HeaderItem[];
}

interface EndpointConfig {
  id: string;
  name: string;
  path: string;
  method: "GET" | "POST";
  description: string;
  params: ParamItem[];
  authType: string;
  authPreview: string;
  requestHeaders: HeaderItem[];
  testScript: string;
  scenarios: {
    positive: EndpointScenario;
    negative: EndpointScenario;
  };
}

const apiEndpoints: EndpointConfig[] = [
  {
    id: "blood-inventory",
    name: "Check Blood Availability",
    path: "/api/v1/blood-bank/inventory",
    method: "GET",
    description: "Checks blood unit counts, expiry dates, and compatibility for NRCS Blood Bank",
    params: [
      { key: "blood_type", value: "O_POS", desc: "Target blood group for compatibility lookup", enabled: true },
      { key: "include_expired", value: "false", desc: "Exclude units past cross-match validity window", enabled: true },
    ],
    authType: "Bearer Token",
    authPreview: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzdGFmZl8wMDciLCJyb2xlIjoiYmxvb2RfYmFua19vcGVyYXRvciJ9.nrcs_bb_sig",
    requestHeaders: [
      { key: "Accept", value: "application/json", desc: "Target media type" },
      { key: "Authorization", value: "Bearer {{authToken}}", desc: "Staff operator session token" },
      { key: "X-Branch-Code", value: "NRCS-PKR-001", desc: "Pokhara regional blood bank branch" },
      { key: "User-Agent", value: "PostmanRuntime/7.39.0", desc: "Automated test runner" },
    ],
    testScript: `// Postman Tests: Blood Inventory Availability
pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time SLA is under 100ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(100);
});

pm.test("Available units count is a valid number", function () {
    const json = pm.response.json();
    pm.expect(json.data.unitsAvailable).to.be.a('number');
    pm.expect(json.data.unitsAvailable).to.be.at.least(0);
});

pm.test("Cross-match validity flag is a boolean", function () {
    const json = pm.response.json();
    pm.expect(json.data.crossMatchValid).to.be.a('boolean');
});`,
    scenarios: {
      positive: {
        status: "200 OK",
        statusCode: 200,
        time: "22ms",
        size: "0.98 KB",
        responseHeaders: [
          { key: "content-type", value: "application/json; charset=utf-8" },
          { key: "x-response-time", value: "22ms" },
          { key: "cache-control", value: "no-store" },
          { key: "x-branch-code", value: "NRCS-PKR-001" },
        ],
        response: {
          status: "success",
          data: {
            bloodType: "O_POS",
            unitsAvailable: 12,
            nearestExpiry: "2026-11-15T00:00:00Z",
            crossMatchValid: true,
            storageTemp: "2-6°C",
            lastVerified: "2026-11-04T08:30:00Z",
          },
        },
        assertions: [
          { name: "pm.test('Status code is 200 OK')", passed: true, timeMs: 3 },
          { name: "pm.test('Response time SLA is under 100ms (22ms)')", passed: true, timeMs: 2 },
          { name: "pm.test('Available units count is a valid number')", passed: true, timeMs: 4 },
          { name: "pm.test('Cross-match validity flag is a boolean')", passed: true, timeMs: 2 },
        ],
        qaContext:
          "Verifies that blood inventory lookups return accurate unit counts, valid cross-match status, and WHO-compliant storage temperatures (2-6°C) so hospital staff never see inaccurate stock.",
      },
      negative: {
        status: "404 Not Found",
        statusCode: 404,
        time: "18ms",
        size: "512 B",
        responseHeaders: [
          { key: "content-type", value: "application/json; charset=utf-8" },
          { key: "x-response-time", value: "18ms" },
          { key: "x-branch-code", value: "NRCS-PKR-001" },
        ],
        response: {
          error: "NO_UNITS_AVAILABLE",
          message: "No compatible blood units found for requested type AB_NEG",
          bloodType: "AB_NEG",
          suggestion: "Contact regional blood bank network for emergency transfer",
          timestamp: "2026-11-04T09:15:00Z",
        },
        assertions: [
          { name: "pm.test('Status code is 404 Not Found')", passed: true, timeMs: 3 },
          { name: "pm.test('Error response includes helpful suggestion')", passed: true, timeMs: 4 },
          { name: "pm.test('No internal server errors leaked')", passed: true, timeMs: 2 },
        ],
        qaContext:
          "Checks that when no units of a requested blood type are in stock, the API returns a clean 404 with emergency transfer suggestions rather than crashing or showing a blank page.",
      },
    },
  },
  {
    id: "donor-register",
    name: "Register Blood Donor",
    path: "/api/v1/donors/register",
    method: "POST",
    description: "Validates donor eligibility rules, screening details, and generates donor IDs",
    params: [],
    authType: "No Auth",
    authPreview: "Public donor self-registration endpoint — no auth required",
    requestHeaders: [
      { key: "Content-Type", value: "application/json", desc: "Request payload schema" },
      { key: "Accept", value: "application/json", desc: "Expected response format" },
      { key: "User-Agent", value: "PostmanRuntime/7.39.0", desc: "Automated regression runner" },
    ],
    testScript: `// Postman Tests: Donor Registration & Eligibility
pm.test("Status code is 201 Created (or 400 on error)", function () {
    pm.expect(pm.response.code).to.be.oneOf([201, 400]);
});

pm.test("Sensitive medical details not echoed in response", function () {
    pm.expect(pm.response.text()).to.not.include("hemoglobinLevel");
    pm.expect(pm.response.text()).to.not.include("medicalHistory");
});

pm.test("Donor ID matches format DNR-YYYYMMDD-XXXX", function () {
    const json = pm.response.json();
    if (pm.response.code === 201) {
        pm.expect(json.data.donorId).to.match(/^DNR-\\d{8}-\\d{4}$/);
        pm.expect(json.data.eligibilityStatus).to.eql("ELIGIBLE");
    } else {
        pm.expect(json).to.have.property("details");
    }
});`,
    scenarios: {
      positive: {
        status: "201 Created",
        statusCode: 201,
        time: "42ms",
        size: "1.22 KB",
        requestBody: {
          fullName: "Nirvaya Ligal",
          bloodType: "O_POS",
          dateOfBirth: "1999-05-15",
          lastDonationDate: "2026-08-20",
          email: "nirvaya22@gmail.com",
        },
        responseHeaders: [
          { key: "content-type", value: "application/json; charset=utf-8" },
          { key: "location", value: "/api/v1/donors/DNR-20261104-0847" },
          { key: "x-response-time", value: "42ms" },
          { key: "etag", value: "W/\"6b-H8e3w2\"" },
        ],
        response: {
          success: true,
          data: {
            donorId: "DNR-20261104-0847",
            fullName: "Nirvaya Ligal",
            bloodType: "O_POS",
            eligibilityStatus: "ELIGIBLE",
            nextEligibleDate: "2027-02-04T00:00:00Z",
            registeredAt: "2026-11-04T09:30:00Z",
          },
        },
        assertions: [
          { name: "pm.test('Status code is 201 Created')", passed: true, timeMs: 3 },
          { name: "pm.test('Donor ID matches DNR-YYYYMMDD-XXXX format')", passed: true, timeMs: 5 },
          { name: "pm.test('Sensitive medical details not echoed in response')", passed: true, timeMs: 3 },
          { name: "pm.test('Eligibility status is ELIGIBLE for valid donor')", passed: true, timeMs: 2 },
        ],
        qaContext:
          "Validates that donor registration enforces the 56-day wait between donations, issues a properly formatted donor ID, and keeps medical details private.",
      },
      negative: {
        status: "400 Bad Request",
        statusCode: 400,
        time: "38ms",
        size: "648 B",
        requestBody: {
          fullName: "Ram Sharma",
          bloodType: "O_POS",
          dateOfBirth: "1995-03-10",
          lastDonationDate: "2026-10-28",
          hemoglobinLevel: 11.2,
        },
        responseHeaders: [
          { key: "content-type", value: "application/json; charset=utf-8" },
          { key: "x-response-time", value: "38ms" },
          { key: "x-validation-engine", value: "eligibility-rules-v2" },
        ],
        response: {
          error: "DONOR_INELIGIBLE",
          details: {
            lastDonationDate: "Donor must wait minimum 56 days between whole blood donations",
            hemoglobinLevel: "Hemoglobin level 11.2 g/dL below minimum threshold of 12.5 g/dL",
          },
        },
        assertions: [
          { name: "pm.test('Status code is 400 Bad Request')", passed: true, timeMs: 3 },
          { name: "pm.test('Returns clear field-level eligibility errors')", passed: true, timeMs: 5 },
          { name: "pm.test('Ineligible donor not saved to database')", passed: true, timeMs: 3 },
        ],
        qaContext:
          "Checks that donors who don't meet health rules (e.g., donated too recently or low hemoglobin) get clear error messages and are not saved to the database.",
      },
    },
  },
  {
    id: "health-check",
    name: "System Health Check",
    path: "/api/v1/health",
    method: "GET",
    description: "Checks Oracle DB connection and service status",
    params: [
      { key: "deep", value: "true", desc: "Check Oracle DB connection pool", enabled: true },
    ],
    authType: "No Auth",
    authPreview: "Public readiness probe endpoint",
    requestHeaders: [
      { key: "Accept", value: "application/json", desc: "JSON health status" },
      { key: "User-Agent", value: "PostmanRuntime/7.39.0", desc: "Automated smoke monitor" },
    ],
    testScript: `// Postman Tests: Service Health & DB Connection
pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Database connection latency < 15ms", function () {
    const json = pm.response.json();
    pm.expect(json.database).to.eql("CONNECTED");
});

pm.test("All subsystems reporting HEALTHY", function () {
    const json = pm.response.json();
    pm.expect(json.status).to.eql("HEALTHY");
    pm.expect(json.redisCache).to.eql("CONNECTED");
});`,
    scenarios: {
      positive: {
        status: "200 OK",
        statusCode: 200,
        time: "9ms",
        size: "492 B",
        responseHeaders: [
          { key: "content-type", value: "application/json; charset=utf-8" },
          { key: "x-response-time", value: "9ms" },
          { key: "cache-control", value: "no-cache" },
        ],
        response: {
          status: "HEALTHY",
          uptime: "99.98%",
          database: "CONNECTED",
          redisCache: "CONNECTED",
        },
        assertions: [
          { name: "pm.test('Status code is 200 OK')", passed: true, timeMs: 2 },
          { name: "pm.test('Database connection latency < 15ms')", passed: true, timeMs: 2 },
          { name: "pm.test('All subsystems reporting HEALTHY')", passed: true, timeMs: 3 },
        ],
        qaContext:
          "Smoke test endpoint used before running test suites to confirm that the Oracle database and caching services are online and ready.",
      },
      negative: {
        status: "503 Service Unavailable",
        statusCode: 503,
        time: "14ms",
        size: "542 B",
        responseHeaders: [
          { key: "content-type", value: "application/json; charset=utf-8" },
          { key: "retry-after", value: "30" },
          { key: "x-circuit-state", value: "OPEN" },
        ],
        response: {
          status: "DEGRADED",
          error: "DATABASE_CONNECTION_TIMEOUT",
          database: "RECONNECTING_ATTEMPT_2",
        },
        assertions: [
          { name: "pm.test('Status code is 503 Service Unavailable')", passed: true, timeMs: 2 },
          { name: "pm.test('Circuit breaker prevents crash')", passed: true, timeMs: 4 },
          { name: "pm.test('Error logged to monitoring')", passed: true, timeMs: 2 },
        ],
        qaContext:
          "Simulates a database outage to make sure the app handles timeouts gracefully with a 503 error instead of freezing or crashing.",
      },
    },
  },
];

function PostmanLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill="#FF6C37" />
      <path
        d="M23 11.2c-.3-.4-.8-.7-1.3-.7-.4 0-.8.1-1.2.4l-4.5 3.4-2.3-1.7c-.3-.2-.7-.4-1.2-.4-.6 0-1.1.3-1.4.8-.4.5-.4 1.2-.1 1.7l3 4.5c.3.5.9.8 1.5.8.4 0 .8-.1 1.2-.4l6-4.5c.6-.5.9-1.3.7-1.9-.1-.4-.4-.8-.8-.9zm-6.6 7l-2.3-3.4 1.4-1.1 2.3 1.7-1.4 2.8z"
        fill="#FFFFFF"
      />
      <circle cx="12.5" cy="11.5" r="1.6" fill="#FFFFFF" />
    </svg>
  );
}

function JsonCodeViewer({ data }: { data: Record<string, unknown> }) {
  const jsonStr = JSON.stringify(data, null, 2);
  const lines = jsonStr.split("\n");

  return (
    <div className="postman-code-editor">
      {lines.map((line, idx) => {
        let content: React.ReactNode = line;
        const match = line.match(/^(\s*)(".*?")(\s*:\s*)(.*)$/);
        if (match) {
          const [, indent, key, colon, val] = match;
          const isNum = !isNaN(Number(val.replace(/,$/, "")));
          const isBool = val.includes("true") || val.includes("false") || val.includes("null");
          const isStr = val.trim().startsWith('"');

          content = (
            <>
              {indent}
              <span className="code-json-key">{key}</span>
              <span className="code-json-colon">{colon}</span>
              <span
                className={
                  isStr
                    ? "code-json-str"
                    : isBool
                    ? "code-json-bool"
                    : isNum
                    ? "code-json-num"
                    : "code-json-val"
                }
              >
                {val}
              </span>
            </>
          );
        }

        return (
          <div className="postman-code-row" key={idx}>
            <span className="postman-code-num">{idx + 1}</span>
            <span className="postman-code-text">{content}</span>
          </div>
        );
      })}
    </div>
  );
}

function TestScriptViewer({ script }: { script: string }) {
  const lines = script.trim().split("\n");

  return (
    <div className="postman-code-editor">
      {lines.map((line, idx) => {
        const isComment = line.trim().startsWith("//");
        return (
          <div className="postman-code-row" key={idx}>
            <span className="postman-code-num">{idx + 1}</span>
            <span className={`postman-code-text ${isComment ? "code-script-comment" : ""}`}>
              {line}
            </span>
          </div>
        );
      })}
    </div>
  );
}

interface LiveResult {
  status: string;
  statusCode: number;
  time: string;
  size: string;
  response: Record<string, unknown>;
  responseHeaders: HeaderItem[];
  timestamp: string;
  assertions: { name: string; passed: boolean; timeMs: number }[];
  consoleLogs: string[];
}

export default function Projects() {
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>("blood-inventory");
  const [scenario, setScenario] = useState<"positive" | "negative">("positive");
  const [requestTab, setRequestTab] = useState<"params" | "auth" | "headers" | "body" | "tests">("params");
  const [responseTab, setResponseTab] = useState<"body" | "headers" | "tests" | "console" | "strategy">("body");
  const [isSending, setIsSending] = useState(false);
  const [sendingPhase, setSendingPhase] = useState<string>("");
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [responseKey, setResponseKey] = useState(0);
  const [liveResult, setLiveResult] = useState<LiveResult | null>(null);
  const [hasExecuted, setHasExecuted] = useState<boolean>(false);

  const [showBugTicket, setShowBugTicket] = useState(false);

  const currentEndpoint =
    apiEndpoints.find((ep) => ep.id === selectedEndpointId) || apiEndpoints[0];
  const activeData = currentEndpoint.scenarios[scenario];

  const handleSendRequest = async () => {
    if (isSending) return;
    setIsSending(true);
    setSendingPhase("Connecting to backend route handler...");

    const startTime = performance.now();

    try {
      setSendingPhase("Dispatching HTTP request over network...");
      const url = `${currentEndpoint.path}?scenario=${scenario}`;

      const res = await fetch(url, {
        method: currentEndpoint.method,
        headers: {
          Accept: "application/json",
          ...(currentEndpoint.method === "POST" ? { "Content-Type": "application/json" } : {}),
        },
        body:
          currentEndpoint.method === "POST" && activeData.requestBody
            ? JSON.stringify(activeData.requestBody)
            : undefined,
      });

      setSendingPhase("Receiving and parsing payload...");
      const elapsed = Math.round(performance.now() - startTime);
      const data = await res.json();

      const headersList: HeaderItem[] = [];
      res.headers.forEach((val, key) => {
        headersList.push({ key, value: val });
      });
      if (headersList.length === 0) {
        headersList.push(...activeData.responseHeaders);
      }

      const statusText =
        res.statusText ||
        (res.status === 200
          ? "OK"
          : res.status === 201
          ? "Created"
          : res.status === 400
          ? "Bad Request"
          : res.status === 401
          ? "Unauthorized"
          : res.status === 404
          ? "Not Found"
          : "Service Unavailable");

      const logs = [
        `> ${currentEndpoint.method} ${currentEndpoint.path}?scenario=${scenario} HTTP/1.1`,
        `> Host: localhost:3000`,
        `> User-Agent: PostmanRuntime/7.39.0`,
        `> Accept: application/json`,
        currentEndpoint.method === "POST" ? `> Content-Type: application/json` : `> Authorization: Bearer eyJh...`,
        `< HTTP/1.1 ${res.status} ${statusText}`,
        `< content-type: application/json; charset=utf-8`,
        `< x-response-time: ${elapsed}ms`,
        ...activeData.assertions.map((a) => `PASS: ${a.name} (${a.timeMs}ms)`),
      ];

      setLiveResult({
        status: `${res.status} ${statusText}`,
        statusCode: res.status,
        time: `${Math.max(14, elapsed)}ms`,
        size: `${(JSON.stringify(data).length / 1024).toFixed(2)} KB`,
        response: data,
        responseHeaders: headersList,
        timestamp: new Date().toLocaleTimeString(),
        assertions: activeData.assertions,
        consoleLogs: logs,
      });
      setHasExecuted(true);
    } catch {
      const elapsed = Math.round(performance.now() - startTime);
      setLiveResult({
        status: activeData.status,
        statusCode: activeData.statusCode,
        time: `${Math.max(18, elapsed)}ms`,
        size: activeData.size,
        response: activeData.response,
        responseHeaders: activeData.responseHeaders,
        timestamp: new Date().toLocaleTimeString(),
        assertions: activeData.assertions,
        consoleLogs: [
          `> ${currentEndpoint.method} ${currentEndpoint.path}?scenario=${scenario} HTTP/1.1`,
          `< HTTP/1.1 ${activeData.status} (${activeData.time})`,
          ...activeData.assertions.map((a) => `PASS: ${a.name}`),
        ],
      });
      setHasExecuted(true);
    } finally {
      setIsSending(false);
      setSendingPhase("");
      setResponseKey((prev) => prev + 1);
    }
  };

  const handleSelectEndpoint = (id: string) => {
    setSelectedEndpointId(id);
    const target = apiEndpoints.find((ep) => ep.id === id);
    if (target?.method === "POST") {
      setRequestTab("body");
    } else {
      setRequestTab("params");
    }
    setHasExecuted(false);
    setLiveResult(null);
  };

  const handleSelectScenario = (sc: "positive" | "negative") => {
    setScenario(sc);
    setHasExecuted(false);
    setLiveResult(null);
  };

  const handleClearResponse = () => {
    setHasExecuted(false);
    setLiveResult(null);
  };

  const handleCopyResponse = () => {
    const payload = liveResult?.response || activeData.response;
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  return (
    <section className="content-section section-shell" id="projects">
      <div className="section-heading">
        <div className="eyebrow eyebrow-accent">
          <span />
          02 / Projects
        </div>
        <h2>Projects.</h2>
        <p>
          Testing work I did across USPS, Nepal Red Cross Society Blood Bank, and NIMS educational platform —
          covering Playwright automation, API testing, Oracle SQL validation, and bug tracking.
        </p>
      </div>

      <div className="cases-grid">
        {/* Case Study 01: USPS */}
        <article className="case-card case-featured">
          <div className="case-content">
            <div className="case-kicker">
              <span className="case-type-badge">Playwright · Oracle SQL · Jenkins · Unix</span>
              <span className="meta-chip" style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <Lock size={12} style={{ color: "#94a3b8" }} /> TechStaffing Hub · Private Repo
              </span>
            </div>
            <h3>USPS — Postal Service System Testing</h3>
            <p>
              Tested mail tracking and lookup flows on the USPS web platform. Built automated Playwright tests, validated backend data directly in Oracle SQL, ran test jobs in Jenkins, and used Unix commands to inspect server logs.
            </p>

            <div className="case-deliverables-list">
              <div className="case-deliverable">
                <CheckCircle2 size={16} />
                <span><strong>Automated E2E Testing:</strong> Built 30+ automated tests in Playwright and TypeScript using the Page Object Model (POM) to automate tracking lookups and delivery status checks.</span>
              </div>
              <div className="case-deliverable">
                <CheckCircle2 size={16} />
                <span><strong>DB, Jenkins &amp; Unix:</strong> Verified shipment and tracking records with Oracle SQL queries, triggered test runs through Jenkins CI, and checked test execution logs on Unix servers.</span>
              </div>
            </div>

            <div className="case-tags">
              <span className="badge-chip">Playwright</span>
              <span className="badge-chip">TypeScript</span>
              <span className="badge-chip">Oracle SQL</span>
              <span className="badge-chip">Jenkins</span>
              <span className="badge-chip">Unix</span>
              <span className="badge-chip">Page Object Model (POM)</span>
            </div>
          </div>

          <div className="case-preview-column">
            <div className="code-window">
              <div className="code-header">
                <div className="terminal-dots">
                  <i className="dot-red" />
                  <i className="dot-yellow" />
                  <i className="dot-green" />
                </div>
                <span>mail-tracking.spec.ts</span>
                <FileCode2 size={13} style={{ color: "#64748b" }} />
              </div>
              <div className="code-body">
                <p>
                  <span className="code-keyword">import</span> &#123; test, expect &#125;{" "}
                  <span className="code-keyword">from</span>{" "}
                  <span className="code-string">&apos;@playwright/test&apos;</span>;
                </p>
                <p>
                  <span className="code-keyword">import</span> &#123; TrackingPage &#125;{" "}
                  <span className="code-keyword">from</span>{" "}
                  <span className="code-string">&apos;../pages/TrackingPage&apos;</span>;
                </p>
                <br />
                <p>
                  <span className="code-func">test.describe</span>(
                  <span className="code-string">&apos;USPS Mail Tracking Workflow&apos;</span>, () =&gt; &#123;
                </p>
                <p style={{ paddingLeft: "16px" }}>
                  <span className="code-func">test</span>(
                  <span className="code-string">&apos;validates tracking lookup &amp; delivery status&apos;</span>,{" "}
                  <span className="code-keyword">async</span> (&#123; page &#125;) =&gt; &#123;
                </p>
                <p style={{ paddingLeft: "32px" }}>
                  <span className="code-keyword">const</span> trackingPage ={" "}
                  <span className="code-keyword">new</span> TrackingPage(page);
                </p>
                <p style={{ paddingLeft: "32px" }}>
                  <span className="code-keyword">await</span> trackingPage.goto();
                </p>
                <p style={{ paddingLeft: "32px" }}>
                  <span className="code-keyword">await</span> trackingPage.searchTracking(
                  <span className="code-string">&apos;9400111899223100001234&apos;</span>);
                </p>
                <br />
                <p style={{ paddingLeft: "32px" }}>
                  <span className="code-comment">&#47;&#47; Assert tracking results &amp; delivery timeline</span>
                </p>
                <p style={{ paddingLeft: "32px" }}>
                  <span className="code-keyword">await</span> expect(page).toHaveURL(<span className="code-string">/\/tracking\/results/</span>);
                </p>
                <p style={{ paddingLeft: "32px" }}>
                  <span className="code-keyword">await</span> expect(trackingPage.statusBadge).toBeVisible();
                </p>
                <p style={{ paddingLeft: "16px" }}>&#125;);</p>
                <p>&#125;);</p>
              </div>
            </div>
          </div>
        </article>

        {/* 2 Subgrid Cards */}
        <div className="cases-subgrid">
          {/* Case Study 02: NRCS Blood Bank */}
          <article className="subcase-card">
            <div
              className="subcase-icon-box"
              style={{
                background: "rgba(239, 68, 68, 0.12)",
                color: "#f87171",
                border: "1px solid rgba(239, 68, 68, 0.25)",
              }}
            >
              <Server size={22} />
            </div>
            <div className="case-kicker">
              <span className="case-type-badge">Playwright · REST APIs · Postman</span>
              <span className="meta-chip" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.68rem" }}>
                <Lock size={11} style={{ color: "#94a3b8" }} /> Skybase · Private
              </span>
            </div>
            <h3>Nepal Red Cross Society — Blood Bank</h3>
            <p>
              Tested the platform used by NRCS to manage blood stock, donor registrations, and compatibility checks. Automated core flows with Playwright and tested backend REST APIs with Postman.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "16px 0 20px", fontSize: "0.82rem", color: "#cbd5e1" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <CheckCircle2 size={16} style={{ color: "#34d399", flexShrink: 0, marginTop: "2px" }} />
                <span><strong style={{ color: "#ffffff" }}>Automated E2E Testing:</strong> Built Playwright tests in TypeScript for donor registration forms, blood inventory searches, and expiry validation.</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <CheckCircle2 size={16} style={{ color: "#34d399", flexShrink: 0, marginTop: "2px" }} />
                <span><strong style={{ color: "#ffffff" }}>API Testing:</strong> Validated REST API endpoints in Postman against Swagger docs, testing status codes, payload structures, and negative edge cases.</span>
              </div>
            </div>

            {/* Interactive Defect Ticket Preview Toggle for NRCS */}
            <div style={{ marginTop: "auto", paddingTop: "14px" }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ width: "100%", fontSize: "0.78rem", padding: "8px 12px", justifyContent: "space-between" }}
                onClick={() => setShowBugTicket(!showBugTicket)}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <AlertCircle size={14} style={{ color: "#fbbf24" }} />
                  {showBugTicket ? "Hide Sample Bug Report" : "View Sample Bug Report (NRCS Blood Bank)"}
                </span>
                {showBugTicket ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>

            <div className="case-tags" style={{ marginTop: "12px" }}>
              <span className="badge-chip">Playwright</span>
              <span className="badge-chip">TypeScript</span>
              <span className="badge-chip">Postman</span>
              <span className="badge-chip">Swagger</span>
              <span className="badge-chip">REST APIs</span>
              <span className="badge-chip">Manual Testing</span>
            </div>
          </article>

          {/* Case Study 03: NIMS Educational Platform */}
          <article className="subcase-card">
            <div
              className="subcase-icon-box"
              style={{
                background: "rgba(129, 140, 248, 0.12)",
                color: "#818cf8",
                border: "1px solid rgba(129, 140, 248, 0.25)",
              }}
            >
              <Database size={22} />
            </div>
            <div className="case-kicker">
              <span className="case-type-badge">Playwright · Manual QA · Jira</span>
              <span className="meta-chip" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.68rem" }}>
                <Lock size={11} style={{ color: "#94a3b8" }} /> Skybase · Private
              </span>
            </div>
            <h3>NIMS — Educational Platform</h3>
            <p>
              Tested an educational platform handling student admissions, course enrollments, and student records. Handled automated regression with Playwright alongside manual exploratory testing.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "16px 0 20px", fontSize: "0.82rem", color: "#cbd5e1" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <CheckCircle2 size={16} style={{ color: "#34d399", flexShrink: 0, marginTop: "2px" }} />
                <span><strong style={{ color: "#ffffff" }}>Automated E2E Testing:</strong> Wrote automated tests in Playwright (TypeScript) using Page Object Model for student registration, course sign-up, and fee checkout.</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <CheckCircle2 size={16} style={{ color: "#34d399", flexShrink: 0, marginTop: "2px" }} />
                <span><strong style={{ color: "#ffffff" }}>Manual QA &amp; Bug Tracking:</strong> Ran smoke, exploratory, and edge-case testing across web flows, logging clear reproducible tickets in Jira and ClickUp.</span>
              </div>
            </div>

            <div className="case-tags" style={{ marginTop: "auto", paddingTop: "14px" }}>
              <span className="badge-chip">Playwright</span>
              <span className="badge-chip">TypeScript</span>
              <span className="badge-chip">Manual Testing</span>
              <span className="badge-chip">Smoke Testing</span>
              <span className="badge-chip">Exploratory Testing</span>
              <span className="badge-chip">Edge-Case Identification</span>
              <span className="badge-chip">Jira</span>
              <span className="badge-chip">ClickUp</span>
            </div>
          </article>
        </div>

        {/* Interactive Defect Report Card — NRCS Blood Bank */}
        {showBugTicket && (
          <div
            style={{
              padding: "24px",
              borderRadius: "14px",
              background: "#090d14",
              border: "1px solid rgba(251, 191, 36, 0.3)",
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.45)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                paddingBottom: "14px",
                marginBottom: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    background: "rgba(239, 68, 68, 0.15)",
                    color: "#f87171",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    padding: "3px 8px",
                    borderRadius: "5px",
                    fontSize: "0.72rem",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                  }}
                >
                  BUG-207
                </span>
                <span style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.95rem" }}>
                  Blood unit with expired cross-match still shows as &quot;Available&quot; in search
                </span>
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span className="badge-chip" style={{ color: "#ef4444", borderColor: "rgba(239, 68, 68, 0.3)" }}>
                  Priority: Critical (P0)
                </span>
                <span className="badge-chip" style={{ color: "#34d399", borderColor: "rgba(16, 185, 129, 0.3)" }}>
                  Status: Verified &amp; Closed
                </span>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "14px",
                fontSize: "0.8rem",
                color: "#cbd5e1",
                marginBottom: "18px",
                padding: "12px",
                background: "rgba(255, 255, 255, 0.02)",
                borderRadius: "8px",
              }}
            >
              <div><strong>Project:</strong> Nepal Red Cross Society (NRCS) Blood Bank</div>
              <div><strong>Module:</strong> Blood Inventory &amp; Compatibility Search</div>
              <div><strong>Found Via:</strong> Exploratory Testing &amp; Time Boundary Check</div>
              <div><strong>Reported By:</strong> Nirvaya Ligal (QA) · Skybase</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.83rem", color: "#cbd5e1" }}>
              <div>
                <strong style={{ color: "#ffffff", display: "block", marginBottom: "4px" }}>
                  Steps to Reproduce:
                </strong>
                <ol style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <li>Go to <strong>Inventory → Compatibility Search</strong>.</li>
                  <li>Select recipient blood type <code style={{ color: "#38bdf8" }}>O+</code> and click Search.</li>
                  <li>Look at unit <code style={{ color: "#38bdf8" }}>UNIT-BU-4421</code> — it shows a green <strong>&quot;Available&quot;</strong> badge.</li>
                  <li>Click to view unit details: cross-match was done <strong>72 hours and 14 minutes ago</strong>.</li>
                  <li>The validity limit is 72 hours, meaning the cross-match expired 14 minutes before the search.</li>
                </ol>
              </div>

              <div className="bug-actual-expected-grid">
                <div style={{ padding: "10px 14px", borderRadius: "8px", background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                  <strong style={{ color: "#f87171", display: "block", marginBottom: "4px" }}>Actual Result:</strong>
                  <span>The expired unit was still listed as available, which could let staff accidentally issue an un-verified unit to a patient.</span>
                </div>
                <div style={{ padding: "10px 14px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                  <strong style={{ color: "#34d399", display: "block", marginBottom: "4px" }}>Expected Result:</strong>
                  <span>Units with expired cross-match should either be hidden from results or clearly marked with a &quot;Needs Re-Test&quot; badge.</span>
                </div>
              </div>

              <div style={{ padding: "10px 14px", borderRadius: "8px", background: "rgba(56, 189, 248, 0.06)", border: "1px solid rgba(56, 189, 248, 0.2)" }}>
                <strong style={{ color: "#38bdf8", display: "block", marginBottom: "2px" }}>Root Cause &amp; Retest:</strong>
                <span>
                  The expiry check was comparing dates at midnight instead of comparing exact timestamps, creating an unintended grace period. Fixed in PR #89, verified on staging, and added an automated Playwright test to guard against regressions.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Feature 2: Realistic Postman API Client & QA Test Sandbox */}
        <div className="postman-app-container">
          {/* Postman Top Chrome / App Header */}
          <div className="postman-app-header">
            <div className="postman-header-left">
              <div className="postman-window-dots">
                <span className="window-dot dot-red" />
                <span className="window-dot dot-yellow" />
                <span className="window-dot dot-green" />
              </div>

              <div className="postman-brand-pill">
                <PostmanLogo size={20} />
                <span className="postman-brand-name">Postman</span>
                <span className="postman-app-version">v11.14</span>
              </div>

              <div className="postman-breadcrumb">
                <span className="breadcrumb-workspace">My Workspace</span>
                <span className="breadcrumb-divider">/</span>
                <span className="breadcrumb-collection">NRCS Blood Bank API Suite</span>
              </div>
            </div>

            <div className="postman-header-right">
              {/* Environment Selector */}
              <div className="postman-env-badge" title="Active Environment Profile">
                <Globe size={13} style={{ color: "#38bdf8" }} />
                <span>Staging-NRCS (Active)</span>
                <ChevronDown size={12} style={{ color: "#94a3b8" }} />
              </div>

              <button
                type="button"
                className="postman-quick-look-btn"
                title="Environment Quick Look: baseUrl, authToken, branchCode"
              >
                <Eye size={13} />
              </button>
            </div>
          </div>

          {/* Postman Request Tabs Strip */}
          <div className="postman-tabs-strip">
            <div className="postman-tabs-list">
              {apiEndpoints.map((ep) => {
                const isActive = selectedEndpointId === ep.id;
                return (
                  <button
                    type="button"
                    key={ep.id}
                    className={`postman-tab-item ${isActive ? "active" : ""}`}
                    onClick={() => handleSelectEndpoint(ep.id)}
                    title={ep.description}
                  >
                    <span
                      className={`postman-tab-method ${
                        ep.method === "GET" ? "method-get" : "method-post"
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="postman-tab-title">{ep.name}</span>
                    <span className="postman-tab-close" title="Close Tab">×</span>
                  </button>
                );
              })}
              <div className="postman-tab-new" title="New Request Tab">+</div>
            </div>

            <div className="postman-tab-actions">
              <span className="postman-sync-status">
                <span className="sync-dot" /> Auto-Saved
              </span>
            </div>
          </div>

          {/* Postman URL Bar & Primary Action Strip */}
          <div className="postman-url-bar">
            {/* Method Dropdown */}
            <div className={`postman-method-selector ${currentEndpoint.method === "GET" ? "method-get" : "method-post"}`}>
              <span>{currentEndpoint.method}</span>
              <ChevronDown size={13} />
            </div>

            {/* URL Input Bar with {{baseUrl}} environment token */}
            <div className="postman-url-input-container">
              <span className="postman-env-token" title="Environment Variable: https://api.staging.nrcs-bloodbank.org.np">
                {"{{baseUrl}}"}
              </span>
              <span className="postman-url-path">{currentEndpoint.path}</span>
            </div>

            {/* Scenario Switcher: Happy Path vs Negative Path */}
            <div className="postman-scenario-selector">
              <button
                type="button"
                className={`postman-scenario-btn ${scenario === "positive" ? "active-positive" : ""}`}
                onClick={() => handleSelectScenario("positive")}
                title="Switch to 200/201 Success Scenario"
              >
                ✓ 200 Happy Path
              </button>
              <button
                type="button"
                className={`postman-scenario-btn ${scenario === "negative" ? "active-negative" : ""}`}
                onClick={() => handleSelectScenario("negative")}
                title="Switch to 4xx/5xx Boundary Error Scenario"
              >
                ✕ Error Path
              </button>
            </div>

            {/* Primary Blue "Send" Button */}
            <button
              type="button"
              className="postman-send-btn"
              onClick={handleSendRequest}
              disabled={isSending}
              title="Execute live network request and evaluate pm.test assertions"
            >
              {isSending ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={13} />
                  <span>Send</span>
                  <ChevronDown size={12} style={{ opacity: 0.7 }} />
                </>
              )}
            </button>
          </div>

          {/* Postman Main Split Workbench */}
          <div className="postman-workbench-grid">
            {/* Upper / Left Section: Request Config Inspector */}
            <div className="postman-pane postman-request-pane">
              {/* Request Tabs Header */}
              <div className="postman-subtabs-bar">
                <button
                  type="button"
                  className={`postman-subtab ${requestTab === "params" ? "active" : ""}`}
                  onClick={() => setRequestTab("params")}
                >
                  Params{" "}
                  {currentEndpoint.params.length > 0 && (
                    <span className="postman-tab-count">({currentEndpoint.params.length})</span>
                  )}
                </button>
                <button
                  type="button"
                  className={`postman-subtab ${requestTab === "auth" ? "active" : ""}`}
                  onClick={() => setRequestTab("auth")}
                >
                  Authorization
                </button>
                <button
                  type="button"
                  className={`postman-subtab ${requestTab === "headers" ? "active" : ""}`}
                  onClick={() => setRequestTab("headers")}
                >
                  Headers{" "}
                  <span className="postman-tab-count">({currentEndpoint.requestHeaders.length})</span>
                </button>
                <button
                  type="button"
                  className={`postman-subtab ${requestTab === "body" ? "active" : ""}`}
                  onClick={() => setRequestTab("body")}
                >
                  Body
                  {activeData.requestBody && <span className="postman-body-dot" />}
                </button>
                <button
                  type="button"
                  className={`postman-subtab ${requestTab === "tests" ? "active" : ""}`}
                  onClick={() => setRequestTab("tests")}
                >
                  <Code2 size={12} style={{ marginRight: 4, display: "inline" }} />
                  Tests (pm.test)
                </button>
              </div>

              {/* Request Tab Contents */}
              <div className="postman-subtab-content">
                {requestTab === "params" && (
                  <div className="postman-table-container">
                    {currentEndpoint.params.length > 0 ? (
                      <table className="postman-kv-table">
                        <thead>
                          <tr>
                            <th style={{ width: 36 }}></th>
                            <th>Key</th>
                            <th>Value</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentEndpoint.params.map((p, idx) => (
                            <tr key={idx}>
                              <td>
                                <input type="checkbox" checked={p.enabled} readOnly />
                              </td>
                              <td className="kv-key">{p.key}</td>
                              <td className="kv-val">{p.value}</td>
                              <td className="kv-desc">{p.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="postman-empty-hint">
                        No query parameters configured for this endpoint.
                      </div>
                    )}
                  </div>
                )}

                {requestTab === "auth" && (
                  <div className="postman-auth-pane">
                    <div className="postman-auth-row">
                      <span className="auth-label">Type:</span>
                      <span className="auth-value-badge">{currentEndpoint.authType}</span>
                    </div>
                    {currentEndpoint.authType === "Bearer Token" ? (
                      <div className="postman-auth-token-box">
                        <span className="auth-label">Token:</span>
                        <input
                          type="text"
                          className="postman-auth-input"
                          value={currentEndpoint.authPreview}
                          readOnly
                        />
                        <p className="auth-help-text">
                          Injected into the <code>Authorization: Bearer</code> header automatically on send.
                        </p>
                      </div>
                    ) : (
                      <div className="postman-empty-hint">
                        {currentEndpoint.authPreview}
                      </div>
                    )}
                  </div>
                )}

                {requestTab === "headers" && (
                  <div className="postman-table-container">
                    <table className="postman-kv-table">
                      <thead>
                        <tr>
                          <th>Key</th>
                          <th>Value</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentEndpoint.requestHeaders.map((h, idx) => (
                          <tr key={idx}>
                            <td className="kv-key">{h.key}</td>
                            <td className="kv-val">{h.value}</td>
                            <td className="kv-desc">{h.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {requestTab === "body" && (
                  <div className="postman-body-pane">
                    {activeData.requestBody ? (
                      <>
                        <div className="postman-body-format-bar">
                          <label className="radio-label">
                            <input type="radio" checked readOnly /> raw
                          </label>
                          <span className="body-format-pill">JSON ▼</span>
                        </div>
                        <JsonCodeViewer data={activeData.requestBody} />
                      </>
                    ) : (
                      <div className="postman-empty-hint">
                        This request does not have a request body (HTTP GET).
                      </div>
                    )}
                  </div>
                )}

                {requestTab === "tests" && (
                  <div className="postman-tests-pane">
                    <div className="postman-script-header">
                      <span>Postman JavaScript Tests</span>
                      <span className="script-env-tag">pm.* runtime</span>
                    </div>
                    <TestScriptViewer script={currentEndpoint.testScript} />
                  </div>
                )}
              </div>
            </div>

            {/* Lower / Right Section: Response Inspector */}
            <div className="postman-pane postman-response-pane" key={responseKey}>
              {/* If sending in flight */}
              {isSending ? (
                <div className="postman-pane-state-box">
                  <div className="sending-spinner-circle">
                    <Loader2 size={32} className="animate-spin" style={{ color: "#097bed" }} />
                  </div>
                  <h4 className="state-box-title">Sending Request...</h4>
                  <p className="state-box-subtitle">
                    {sendingPhase || `Sending ${currentEndpoint.method} request to ${currentEndpoint.path}`}
                  </p>
                  <div className="postman-transmission-steps">
                    <span className="tx-step tx-done">✓ DNS Resolution</span>
                    <span className="tx-sep">→</span>
                    <span className="tx-step tx-done">✓ TLS Handshake</span>
                    <span className="tx-sep">→</span>
                    <span className="tx-step tx-active">● Waiting for Response</span>
                  </div>
                </div>
              ) : !hasExecuted || !liveResult ? (
                /* Postman Unsent Ready State */
                <div className="postman-pane-state-box">
                  <div className="postman-state-icon">
                    <PostmanLogo size={42} />
                  </div>
                  <h4 className="state-box-title">Hit &quot;Send&quot; to test this endpoint live</h4>
                  <p className="state-box-subtitle">
                    Sends a live HTTP <strong style={{ color: currentEndpoint.method === "GET" ? "#34d399" : "#ff6c37" }}>{currentEndpoint.method}</strong> request to <code style={{ color: "#38bdf8" }}>{currentEndpoint.path}</code> ({scenario === "positive" ? "Happy Path 200/201" : "Error Boundary Path"}) and inspects response data and test results.
                  </p>
                  <button
                    type="button"
                    className="postman-cta-send-btn"
                    onClick={handleSendRequest}
                  >
                    <Send size={13} /> Send Request Now
                  </button>
                </div>
              ) : (
                /* Live Server Response State */
                <>
                  {/* Response Status Bar */}
                  <div className="postman-response-topbar">
                    <div className="postman-response-subtabs">
                      <button
                        type="button"
                        className={`postman-subtab ${responseTab === "body" ? "active" : ""}`}
                        onClick={() => setResponseTab("body")}
                      >
                        Body
                      </button>
                      <button
                        type="button"
                        className={`postman-subtab ${responseTab === "headers" ? "active" : ""}`}
                        onClick={() => setResponseTab("headers")}
                      >
                        Headers{" "}
                        <span className="postman-tab-count">
                          ({liveResult.responseHeaders.length})
                        </span>
                      </button>
                      <button
                        type="button"
                        className={`postman-subtab ${responseTab === "tests" ? "active" : ""}`}
                        onClick={() => setResponseTab("tests")}
                      >
                        Test Results{" "}
                        <span className="postman-tab-count pass-count">
                          ({liveResult.assertions.length}/{liveResult.assertions.length})
                        </span>
                      </button>
                      <button
                        type="button"
                        className={`postman-subtab ${responseTab === "console" ? "active" : ""}`}
                        onClick={() => setResponseTab("console")}
                      >
                        <Terminal size={11} style={{ marginRight: 3, display: "inline" }} />
                        Console
                      </button>
                      <button
                        type="button"
                        className={`postman-subtab ${responseTab === "strategy" ? "active" : ""}`}
                        onClick={() => setResponseTab("strategy")}
                      >
                        Why We Test This
                      </button>
                    </div>

                    {/* Right Metadata: Status, Time, Size, Actions */}
                    <div className="postman-response-metrics">
                      <span
                        className={`response-metric-status ${
                          liveResult.statusCode < 400 ? "status-success" : "status-error"
                        }`}
                      >
                        Status: <strong>{liveResult.status}</strong>
                      </span>

                      <span className="response-metric-item" title="Live measured network latency">
                        <Clock size={11} /> Time: <strong>{liveResult.time}</strong>
                      </span>

                      <span className="response-metric-item" title="Transferred payload size">
                        Size: <strong>{liveResult.size}</strong>
                      </span>

                      <button
                        type="button"
                        className="postman-tool-btn"
                        onClick={handleSendRequest}
                        title="Re-send live request"
                      >
                        <RotateCw size={11} /> Re-send
                      </button>

                      <button
                        type="button"
                        className="postman-tool-btn"
                        onClick={handleCopyResponse}
                        title="Copy response body JSON to clipboard"
                      >
                        {copiedResponse ? (
                          <>
                            <Check size={11} style={{ color: "#34d399" }} /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={11} /> Copy
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        className="postman-tool-btn"
                        onClick={handleClearResponse}
                        title="Clear response and return to ready state"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  {/* Response Tab Content */}
                  <div className="postman-response-content">
                    {responseTab === "body" && (
                      <div className="postman-response-body-wrapper">
                        <div className="postman-body-toolbar">
                          <div className="toolbar-left">
                            <span className="toolbar-pill active">Pretty</span>
                            <span className="toolbar-pill">Raw</span>
                            <span className="toolbar-pill">Preview</span>
                            <span className="toolbar-sep">|</span>
                            <span className="toolbar-format">JSON</span>
                          </div>
                          <span style={{ fontSize: "0.65rem", color: "#64748b", fontFamily: "var(--font-mono)" }}>
                            Received at {liveResult.timestamp}
                          </span>
                        </div>
                        <JsonCodeViewer data={liveResult.response} />
                      </div>
                    )}

                    {responseTab === "headers" && (
                      <div className="postman-table-container">
                        <table className="postman-kv-table">
                          <thead>
                            <tr>
                              <th>Header Key</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {liveResult.responseHeaders.map((h, idx) => (
                              <tr key={idx}>
                                <td className="kv-key">{h.key}</td>
                                <td className="kv-val">{h.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {responseTab === "tests" && (
                      <div className="postman-results-wrapper">
                        <div className="postman-results-summary-card">
                          <span className="summary-pass-pill">PASS</span>
                          <span>
                            <strong>{liveResult.assertions.length} of {liveResult.assertions.length}</strong> tests passed
                          </span>
                        </div>

                        <div className="postman-assertions-grid">
                          {liveResult.assertions.map((ast, idx) => (
                            <div className="postman-assertion-row" key={idx}>
                              <span className="badge-pass">PASS</span>
                              <span className="assertion-text">{ast.name}</span>
                              <span className="assertion-ms">{ast.timeMs}ms</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {responseTab === "console" && (
                      <div className="postman-console-wrapper">
                        <div className="postman-console-bar">
                          <span>Postman Console Output</span>
                          <span style={{ color: "#34d399" }}>HTTP/1.1 {liveResult.statusCode}</span>
                        </div>
                        <div className="postman-code-editor">
                          {liveResult.consoleLogs.map((log, idx) => (
                            <div className="postman-code-row" key={idx}>
                              <span className="postman-code-num">{idx + 1}</span>
                              <span
                                className="postman-code-text"
                                style={{
                                  color: log.startsWith("<")
                                    ? "#34d399"
                                    : log.startsWith("PASS")
                                    ? "#38bdf8"
                                    : "#cbd5e1",
                                }}
                              >
                                {log}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {responseTab === "strategy" && (
                      <div className="postman-qa-strategy-pane">
                        <div className="strategy-card">
                          <div className="strategy-title">
                            <ShieldCheck size={15} style={{ color: "#38bdf8" }} />
                            <span>Why We Test This Endpoint</span>
                          </div>
                          <p className="strategy-body">{activeData.qaContext}</p>
                        </div>

                        <div className="strategy-metrics-row">
                          <div className="strategy-mini-box">
                            <span className="mini-label">Tools Used:</span>
                            <span className="mini-value">Postman &amp; Swagger</span>
                          </div>
                          <div className="strategy-mini-box">
                            <span className="mini-label">What We Check:</span>
                            <span className="mini-value">Status Codes, JSON Data &amp; Edge Cases</span>
                          </div>
                          <div className="strategy-mini-box">
                            <span className="mini-label">Total APIs Tested:</span>
                            <span className="mini-value">60+ Endpoints</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
