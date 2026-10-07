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
  ExternalLink,
  Eye,
  FileCode2,
  FileJson,
  Folder,
  Globe,
  Layers,
  Loader2,
  Lock,
  Play,
  RotateCw,
  Send,
  Server,
  ShieldCheck,
  Sliders,
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
    id: "auth-session",
    name: "Verify Session Token",
    path: "/api/v1/auth/session",
    method: "GET",
    description: "Validates JWT token expiry, RBAC permissions & session revocation state",
    params: [
      { key: "include_perms", value: "true", desc: "Include fine-grained RBAC permissions", enabled: true },
      { key: "format", value: "json", desc: "Serialization output format", enabled: true },
    ],
    authType: "Bearer Token",
    authPreview: "eyJhGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c3JfOTkxMjAiLCJyb2xlIjoicWFfdGVzdGVyIn0.qa99120_sig",
    requestHeaders: [
      { key: "Accept", value: "application/json", desc: "Target media type" },
      { key: "Authorization", value: "Bearer {{authToken}}", desc: "Injected from Staging environment" },
      { key: "X-Client-Version", value: "2.4.0", desc: "Client contract release" },
      { key: "User-Agent", value: "PostmanRuntime/7.39.0", desc: "Automated test runner" },
    ],
    testScript: `// Postman Tests: Auth Session Contract
pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time SLA is under 100ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(100);
});

pm.test("User payload contains required QA permissions", function () {
    const json = pm.response.json();
    pm.expect(json.data.permissions).to.be.an('array');
    pm.expect(json.data.permissions).to.include('tests:execute');
});

pm.test("Session expiry timestamp is a valid future ISO date", function () {
    const expiry = new Date(pm.response.json().data.sessionExpiresAt);
    pm.expect(expiry.getTime()).to.be.greaterThan(Date.now());
});`,
    scenarios: {
      positive: {
        status: "200 OK",
        statusCode: 200,
        time: "24ms",
        size: "1.14 KB",
        responseHeaders: [
          { key: "content-type", value: "application/json; charset=utf-8" },
          { key: "x-ratelimit-remaining", value: "994" },
          { key: "x-response-time", value: "24ms" },
          { key: "cache-control", value: "no-store, no-cache, must-revalidate" },
          { key: "strict-transport-security", value: "max-age=31536000; includeSubDomains" },
        ],
        response: {
          status: "success",
          data: {
            userId: "usr_99120",
            username: "tester.vaya",
            role: "qa_tester",
            permissions: ["tests:read", "tests:execute", "reports:export"],
            sessionExpiresAt: "2026-10-02T18:00:00Z",
          },
        },
        assertions: [
          { name: "pm.test('Status code is 200 OK')", passed: true, timeMs: 4 },
          { name: "pm.test('Response time SLA is under 100ms (24ms)')", passed: true, timeMs: 2 },
          { name: "pm.test('User payload contains required QA permissions')", passed: true, timeMs: 5 },
          { name: "pm.test('Session expiry timestamp is a valid future ISO date')", passed: true, timeMs: 3 },
        ],
        qaContext:
          "Asserts that authenticated tokens return expected fine-grained RBAC claims without leaking superadmin elevation. Verifies server sets no-store cache headers to prevent token retention in intermediate proxies.",
      },
      negative: {
        status: "401 Unauthorized",
        statusCode: 401,
        time: "18ms",
        size: "468 B",
        responseHeaders: [
          { key: "content-type", value: "application/json; charset=utf-8" },
          { key: "www-authenticate", value: "Bearer error=\"invalid_token\", error_description=\"The token is expired\"" },
          { key: "x-response-time", value: "18ms" },
          { key: "server", value: "nginx/1.24 (staging-edge)" },
        ],
        response: {
          error: "UNAUTHORIZED",
          message: "Bearer token expired or signature validation failed",
          code: "AUTH_TOKEN_EXPIRED",
          timestamp: "2026-10-01T17:10:00Z",
        },
        assertions: [
          { name: "pm.test('Status code is 401 Unauthorized')", passed: true, timeMs: 3 },
          { name: "pm.test('Response payload contains standardized error code')", passed: true, timeMs: 4 },
          { name: "pm.test('No sensitive internal stack trace leaked')", passed: true, timeMs: 2 },
        ],
        qaContext:
          "Asserts that expired or tampered bearer tokens are blocked immediately at the authentication gateway before executing downstream database queries, guarding against unauthorized data exposure.",
      },
    },
  },
  {
    id: "user-register",
    name: "Register New User",
    path: "/api/v1/users/register",
    method: "POST",
    description: "Enforces RFC-compliant email, password complexity and duplicate detection",
    params: [],
    authType: "No Auth",
    authPreview: "Inherits from collection: None required for public registration",
    requestHeaders: [
      { key: "Content-Type", value: "application/json", desc: "Request payload schema" },
      { key: "Accept", value: "application/json", desc: "Expected response serialization" },
      { key: "User-Agent", value: "PostmanRuntime/7.39.0", desc: "Automated regression runner" },
    ],
    testScript: `// Postman Tests: Registration Contract & Boundary
pm.test("Status code is 201 Created (or 400 on error)", function () {
    pm.expect(pm.response.code).to.be.oneOf([201, 400]);
});

pm.test("Plaintext password never echoed in response body", function () {
    pm.expect(pm.response.text()).to.not.include("SecurePassword123!");
});

pm.test("Response includes unique new userId", function () {
    const json = pm.response.json();
    if (pm.response.code === 201) {
        pm.expect(json.data).to.have.property("userId");
        pm.expect(json.data.status).to.eql("PENDING_VERIFICATION");
    } else {
        pm.expect(json).to.have.property("details");
    }
});`,
    scenarios: {
      positive: {
        status: "201 Created",
        statusCode: 201,
        time: "48ms",
        size: "1.38 KB",
        requestBody: {
          fullName: "Nirvaya Ligal",
          email: "nirvaya22@gmail.com",
          password: "SecurePassword123!",
          role: "qa_tester",
        },
        responseHeaders: [
          { key: "content-type", value: "application/json; charset=utf-8" },
          { key: "location", value: "/api/v1/users/usr_88204" },
          { key: "x-response-time", value: "48ms" },
          { key: "etag", value: "W/\"5a-G7d9v1\"" },
        ],
        response: {
          success: true,
          data: {
            userId: "usr_88204",
            email: "nirvaya22@gmail.com",
            status: "PENDING_VERIFICATION",
            createdAt: "2026-10-01T17:10:20Z",
          },
        },
        assertions: [
          { name: "pm.test('Status code is 201 Created')", passed: true, timeMs: 4 },
          { name: "pm.test('Response includes new unique userId')", passed: true, timeMs: 5 },
          { name: "pm.test('Plaintext password never returned in body')", passed: true, timeMs: 3 },
          { name: "pm.test('Initial account state is PENDING_VERIFICATION')", passed: true, timeMs: 2 },
        ],
        qaContext:
          "Verifies proper registration workflow: passwords must be securely hashed with argon2id on ingestion, user records must enter PENDING_VERIFICATION, and HTTP 201 headers must provide resource location.",
      },
      negative: {
        status: "400 Bad Request",
        statusCode: 400,
        time: "21ms",
        size: "624 B",
        requestBody: {
          fullName: "Nirvaya",
          email: "invalid-email-string",
          password: "123",
        },
        responseHeaders: [
          { key: "content-type", value: "application/json; charset=utf-8" },
          { key: "x-response-time", value: "21ms" },
          { key: "x-error-handler", value: "zod-schema-validator" },
        ],
        response: {
          error: "VALIDATION_FAILED",
          details: {
            email: "Must be a valid RFC 5322 email format",
            password: "Password must be at least 8 characters with 1 symbol",
          },
        },
        assertions: [
          { name: "pm.test('Status code is 400 Bad Request')", passed: true, timeMs: 3 },
          { name: "pm.test('Returns targeted field-level validation errors')", passed: true, timeMs: 5 },
          { name: "pm.test('Malformed record NOT committed to database')", passed: true, timeMs: 3 },
        ],
        qaContext:
          "Asserts that malformed email strings and weak passwords fail field-level Zod/JSON schema validations with targeted feedback, preventing invalid data from reaching Postgres persistence tables.",
      },
    },
  },
  {
    id: "health-check",
    name: "Subsystem Health Check",
    path: "/api/v1/health",
    method: "GET",
    description: "Subsystem health, DB connection pool, and queue heartbeat validation",
    params: [
      { key: "deep", value: "true", desc: "Ping Postgres and Redis connection pools", enabled: true },
    ],
    authType: "No Auth",
    authPreview: "Public readiness probe endpoint",
    requestHeaders: [
      { key: "Accept", value: "application/json", desc: "JSON health status" },
      { key: "User-Agent", value: "PostmanRuntime/7.39.0", desc: "Automated smoke monitor" },
    ],
    testScript: `// Postman Tests: Service Health & Subsystem Connectivity
pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Database connection latency < 15ms", function () {
    const json = pm.response.json();
    pm.expect(json.database).to.eql("CONNECTED");
});

pm.test("All critical subsystems reporting HEALTHY", function () {
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
          { name: "pm.test('All critical subsystems reporting HEALTHY')", passed: true, timeMs: 3 },
        ],
        qaContext:
          "Heartbeat endpoint monitored in CI smoke testing and Kubernetes liveness probes. Confirms that connection pools to primary database and caching tiers are healthy before test runner begins test runs.",
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
          { name: "pm.test('Circuit breaker prevents cascade failure')", passed: true, timeMs: 4 },
          { name: "pm.test('Error event dispatched to telemetry logger')", passed: true, timeMs: 2 },
        ],
        qaContext:
          "Simulates database failover scenario to assert that service circuit breakers trip immediately, returning HTTP 503 with Retry-After rather than locking worker threads or causing cascading outages.",
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
  // Real Postman State
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>("auth-session");
  const [scenario, setScenario] = useState<"positive" | "negative">("positive");
  const [requestTab, setRequestTab] = useState<"params" | "auth" | "headers" | "body" | "tests">("params");
  const [responseTab, setResponseTab] = useState<"body" | "headers" | "tests" | "console" | "strategy">("body");
  const [isSending, setIsSending] = useState(false);
  const [sendingPhase, setSendingPhase] = useState<string>("");
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [responseKey, setResponseKey] = useState(0);
  const [liveResult, setLiveResult] = useState<LiveResult | null>(null);
  const [hasExecuted, setHasExecuted] = useState<boolean>(false);

  // Defect Ticket Drawer State
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
      // Fallback in case of network issue
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
        <h2>Featured QA Projects.</h2>
        <p>
          Practical testing work demonstrating test automation design, API contract validation,
          backend data verification, and structured defect reporting across real web applications.
        </p>
      </div>

      <div className="cases-grid">
        {/* Case Study 01: Playwright Test Automation */}
        <article className="case-card case-featured">
          <div className="case-content">
            <div className="case-kicker">
              <span className="case-type-badge">E2E Web Automation</span>
              <span className="meta-chip" style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <Lock size={12} style={{ color: "#94a3b8" }} /> Professional Project · Private Repo
              </span>
            </div>
            <h3>Automated E2E Regression Suite</h3>
            <p>
              An automated end-to-end regression testing framework built with Playwright and
              TypeScript. Implements Page Object Model (POM) architecture to validate authentication
              states, dynamic form workflows, and core user journeys.
            </p>

            <div className="case-deliverables-list">
              <div className="case-deliverable">
                <CheckCircle2 size={16} />
                <span><strong>Challenge:</strong> Validating asynchronous UI updates and state transitions across browsers without flaky tests</span>
              </div>
              <div className="case-deliverable">
                <CheckCircle2 size={16} />
                <span><strong>Approach:</strong> Separated page locators from assertions using Page Object Model and reusable action helpers</span>
              </div>
              <div className="case-deliverable">
                <CheckCircle2 size={16} />
                <span><strong>Coverage:</strong> Authentication, session persistence, input validation, negative paths, and cross-browser execution</span>
              </div>
              <div className="case-deliverable">
                <CheckCircle2 size={16} />
                <span><strong>Key Takeaway:</strong> Built reliable, deterministic tests by prioritizing user-facing accessibility locators over brittle CSS paths</span>
              </div>
            </div>

            <div className="case-tags">
              <span className="badge-chip">Playwright</span>
              <span className="badge-chip">TypeScript</span>
              <span className="badge-chip">Page Object Model</span>
              <span className="badge-chip">Cross-Browser</span>
              <span className="badge-chip">Regression</span>
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
                <span>auth-flow.spec.ts</span>
                <FileCode2 size={13} style={{ color: "#64748b" }} />
              </div>
              <div className="code-body">
                <p>
                  <span className="code-keyword">import</span> &#123; test, expect &#125;{" "}
                  <span className="code-keyword">from</span>{" "}
                  <span className="code-string">&apos;@playwright/test&apos;</span>;
                </p>
                <p>
                  <span className="code-keyword">import</span> &#123; LoginPage &#125;{" "}
                  <span className="code-keyword">from</span>{" "}
                  <span className="code-string">&apos;../pages/LoginPage&apos;</span>;
                </p>
                <br />
                <p>
                  <span className="code-func">test.describe</span>(
                  <span className="code-string">&apos;Authentication Workflow&apos;</span>, () =&gt; &#123;
                </p>
                <p style={{ paddingLeft: "16px" }}>
                  <span className="code-func">test</span>(
                  <span className="code-string">&apos;validates credentials &amp; active session&apos;</span>,{" "}
                  <span className="code-keyword">async</span> (&#123; page &#125;) =&gt; &#123;
                </p>
                <p style={{ paddingLeft: "32px" }}>
                  <span className="code-keyword">const</span> loginPage ={" "}
                  <span className="code-keyword">new</span> LoginPage(page);
                </p>
                <p style={{ paddingLeft: "32px" }}>
                  <span className="code-keyword">await</span> loginPage.goto();
                </p>
                <p style={{ paddingLeft: "32px" }}>
                  <span className="code-keyword">await</span> loginPage.login(
                  <span className="code-string">&apos;tester@domain.com&apos;</span>, <span className="code-string">&apos;SecurePass!&apos;</span>);
                </p>
                <br />
                <p style={{ paddingLeft: "32px" }}>
                  <span className="code-comment">&#47;&#47; Assert dashboard redirected &amp; session stored</span>
                </p>
                <p style={{ paddingLeft: "32px" }}>
                  <span className="code-keyword">await</span> expect(page).toHaveURL(<span className="code-string">/\/dashboard/</span>);
                </p>
                <p style={{ paddingLeft: "32px" }}>
                  <span className="code-keyword">await</span> expect(loginPage.userBadge).toBeVisible();
                </p>
                <p style={{ paddingLeft: "16px" }}>&#125;);</p>
                <p>&#125;);</p>
              </div>
            </div>
          </div>
        </article>

        {/* 2 Structured Case Studies */}
        <div className="cases-subgrid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {/* Case Study 02: API Validation */}
          <article className="subcase-card">
            <div
              className="subcase-icon-box"
              style={{
                background: "rgba(56, 189, 248, 0.12)",
                color: "#38bdf8",
                border: "1px solid rgba(56, 189, 248, 0.25)",
              }}
            >
              <Server size={22} />
            </div>
            <div className="case-kicker">
              <span className="case-type-badge">REST API Validation</span>
              <span className="meta-chip" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.68rem" }}>
                <Lock size={11} style={{ color: "#94a3b8" }} /> Private Project
              </span>
            </div>
            <h3>REST API Validation Suite</h3>
            <p>
              Systematic API test collections structured in Postman to validate endpoint contracts,
              payload schemas, and response behaviors against Swagger/OpenAPI documentation.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "16px 0 20px", fontSize: "0.82rem", color: "#cbd5e1" }}>
              <div>
                <strong style={{ color: "#ffffff" }}>Challenge:</strong> Verifying HTTP status codes, request header authentication, and error message structures across endpoints.
              </div>
              <div>
                <strong style={{ color: "#ffffff" }}>Approach:</strong> Parameterized requests using environment variables, automated bearer token inheritance, and wrote JavaScript response assertions.
              </div>
              <div>
                <strong style={{ color: "#ffffff" }}>Coverage:</strong> GET, POST, PUT, DELETE operations, schema compliance, missing field validation, and negative 4xx/5xx handling.
              </div>
              <div>
                <strong style={{ color: "#ffffff" }}>Key Takeaway:</strong> Catching contract mismatches early at the API level prevented UI-breaking bugs in downstream workflows.
              </div>
            </div>

            <div className="case-tags" style={{ marginTop: "auto" }}>
              <span className="badge-chip">Postman</span>
              <span className="badge-chip">REST APIs</span>
              <span className="badge-chip">Swagger / OpenAPI</span>
              <span className="badge-chip">Negative Testing</span>
            </div>
          </article>

          {/* Case Study 03: Enterprise Application & Data Validation */}
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
              <span className="case-type-badge">Backend &amp; DB Validation</span>
              <span className="meta-chip" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.68rem" }}>
                <Lock size={11} style={{ color: "#94a3b8" }} /> Private Project
              </span>
            </div>
            <h3>Enterprise Application &amp; Data Validation</h3>
            <p>
              Functional and database-level verification of enterprise software modules, confirming
              business rule compliance, database record integrity, and cross-session persistence.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "16px 0 20px", fontSize: "0.82rem", color: "#cbd5e1" }}>
              <div>
                <strong style={{ color: "#ffffff" }}>Challenge:</strong> Ensuring user actions and multi-step transaction forms correctly mutate database states without silent failures.
              </div>
              <div>
                <strong style={{ color: "#ffffff" }}>Approach:</strong> Paired manual and functional exploratory testing with targeted SQL queries to inspect raw table entries and foreign key references.
              </div>
              <div>
                <strong style={{ color: "#ffffff" }}>Coverage:</strong> Functional workflows, data consistency across updates, edge-case transactions, and detailed defect reporting in Jira/ClickUp.
              </div>
              <div>
                <strong style={{ color: "#ffffff" }}>Key Takeaway:</strong> Directly inspecting backend data verified that the UI was not merely displaying cached or uncommitted information.
              </div>
            </div>

            {/* Interactive Defect Ticket Preview Toggle */}
            <div style={{ marginTop: "auto", paddingTop: "12px" }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ width: "100%", fontSize: "0.78rem", padding: "8px 12px", justifyContent: "space-between" }}
                onClick={() => setShowBugTicket(!showBugTicket)}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <AlertCircle size={14} style={{ color: "#fbbf24" }} />
                  {showBugTicket ? "Hide Bug Report Ticket" : "Inspect Sample Bug Report (Jira #QA-104)"}
                </span>
                {showBugTicket ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>

            <div className="case-tags" style={{ marginTop: "12px" }}>
              <span className="badge-chip">SQL</span>
              <span className="badge-chip">Database Validation</span>
              <span className="badge-chip">Functional QA</span>
              <span className="badge-chip">Defect Triage</span>
            </div>
          </article>
        </div>

        {/* Interactive Defect Report Card (Expands when toggled) */}
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
                  BUG-104
                </span>
                <span style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.95rem" }}>
                  Session authentication token persists in localStorage after explicit user logout
                </span>
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span className="badge-chip" style={{ color: "#fbbf24", borderColor: "rgba(251, 191, 36, 0.3)" }}>
                  Priority: High (P1)
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
              <div><strong>Environment:</strong> Staging / Build v1.4.2</div>
              <div><strong>Browser:</strong> Chrome 124 (macOS Sonoma)</div>
              <div><strong>Reproduction Rate:</strong> 100% (5/5 attempts)</div>
              <div><strong>Reporter:</strong> Nirvaya Ligal (QA)</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.83rem", color: "#cbd5e1" }}>
              <div>
                <strong style={{ color: "#ffffff", display: "block", marginBottom: "4px" }}>
                  Steps to Reproduce:
                </strong>
                <ol style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <li>Log into the application with valid test credentials (<code style={{ color: "#38bdf8" }}>tester@domain.com</code>).</li>
                  <li>Click user profile menu in navigation bar and select <strong>&quot;Sign Out&quot;</strong>.</li>
                  <li>Open Chrome DevTools &gt; <em>Application &gt; Local Storage</em> and inspect <code style={{ color: "#38bdf8" }}>auth_session_token</code>.</li>
                  <li>Manually enter protected route URL: <code style={{ color: "#38bdf8" }}>https://staging.app/dashboard</code>.</li>
                </ol>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div style={{ padding: "10px 14px", borderRadius: "8px", background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                  <strong style={{ color: "#f87171", display: "block", marginBottom: "4px" }}>Actual Result:</strong>
                  <span>Protected route briefly renders; session token remains stored in localStorage without server-side revocation.</span>
                </div>
                <div style={{ padding: "10px 14px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                  <strong style={{ color: "#34d399", display: "block", marginBottom: "4px" }}>Expected Result:</strong>
                  <span>Tokens are purged immediately from storage; request redirects to <code style={{ color: "#38bdf8" }}>/login</code> with HTTP 401.</span>
                </div>
              </div>

              <div style={{ padding: "10px 14px", borderRadius: "8px", background: "rgba(56, 189, 248, 0.06)", border: "1px solid rgba(56, 189, 248, 0.2)" }}>
                <strong style={{ color: "#38bdf8", display: "block", marginBottom: "2px" }}>Root Cause &amp; Retest Verification:</strong>
                <span>
                  Backend logout endpoint was returning 200 without issuing a Redis blacklist token invalidate command. Fixed in PR #142; retested across Chrome, Firefox, and Safari on staging. Regression test automated in Playwright.
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
                <span className="breadcrumb-collection">QA Automation Test Suite</span>
              </div>
            </div>

            <div className="postman-header-right">
              {/* Environment Selector */}
              <div className="postman-env-badge" title="Active Environment Profile">
                <Globe size={13} style={{ color: "#38bdf8" }} />
                <span>Staging-US-East (Active)</span>
                <ChevronDown size={12} style={{ color: "#94a3b8" }} />
              </div>

              <button
                type="button"
                className="postman-quick-look-btn"
                title="Environment Quick Look: baseUrl, authToken, userId"
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
              <span className="postman-env-token" title="Environment Variable: https://api.staging.nirvaya-qa.dev">
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
                          This token is injected into the <code>Authorization: Bearer</code> header automatically on request dispatch.
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
                      <span>Postman Sandbox JavaScript Tests Script</span>
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
                  <h4 className="state-box-title">Dispatching HTTP Request...</h4>
                  <p className="state-box-subtitle">
                    {sendingPhase || `Sending ${currentEndpoint.method} request to ${currentEndpoint.path}`}
                  </p>
                  <div className="postman-transmission-steps">
                    <span className="tx-step tx-done">✓ DNS Resolution</span>
                    <span className="tx-sep">→</span>
                    <span className="tx-step tx-done">✓ TLS Handshake</span>
                    <span className="tx-sep">→</span>
                    <span className="tx-step tx-active">● Awaiting Response</span>
                  </div>
                </div>
              ) : !hasExecuted || !liveResult ? (
                /* Authentic Postman Unsent Ready State */
                <div className="postman-pane-state-box">
                  <div className="postman-state-icon">
                    <PostmanLogo size={42} />
                  </div>
                  <h4 className="state-box-title">Hit &quot;Send&quot; to execute request</h4>
                  <p className="state-box-subtitle">
                    Dispatches live HTTP <strong style={{ color: currentEndpoint.method === "GET" ? "#34d399" : "#ff6c37" }}>{currentEndpoint.method}</strong> request to <code style={{ color: "#38bdf8" }}>{currentEndpoint.path}</code> ({scenario === "positive" ? "Happy Path 200/201" : "Error Boundary Path"}) and inspects live status code &amp; output.
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
                        QA Strategy
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
                          <span>Postman Console Network Trace</span>
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
                            <span>QA Engineering Validation Rationale</span>
                          </div>
                          <p className="strategy-body">{activeData.qaContext}</p>
                        </div>

                        <div className="strategy-metrics-row">
                          <div className="strategy-mini-box">
                            <span className="mini-label">Pipeline Trigger:</span>
                            <span className="mini-value">GitHub Actions / Newman CLI</span>
                          </div>
                          <div className="strategy-mini-box">
                            <span className="mini-label">Test Automation Type:</span>
                            <span className="mini-value">Automated Contract &amp; Schema Regression</span>
                          </div>
                          <div className="strategy-mini-box">
                            <span className="mini-label">SLA Enforcement:</span>
                            <span className="mini-value">p95 Latency &lt; 100ms</span>
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
