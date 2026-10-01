"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Database,
  ExternalLink,
  Eye,
  FileCode2,
  Loader2,
  Lock,
  Play,
  RotateCw,
  Send,
  Server,
  ShieldCheck,
  Terminal,
} from "lucide-react";

interface EndpointScenario {
  status: string;
  statusCode: number;
  time: string;
  response: Record<string, unknown>;
  assertions: { name: string; passed: boolean }[];
  requestBody?: Record<string, unknown>;
}

interface EndpointConfig {
  id: string;
  name: string;
  method: "GET" | "POST";
  description: string;
  scenarios: {
    positive: EndpointScenario;
    negative: EndpointScenario;
  };
}

const apiEndpoints: EndpointConfig[] = [
  {
    id: "auth-session",
    name: "/api/v1/auth/session",
    method: "GET",
    description: "Session authorization token & permission verification",
    scenarios: {
      positive: {
        status: "200 OK",
        statusCode: 200,
        time: "24ms",
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
          { name: "pm.test('Status code is 200 OK')", passed: true },
          { name: "pm.test('Response time < 100ms (24ms)')", passed: true },
          { name: "pm.test('User payload contains QA permissions')", passed: true },
          { name: "pm.test('Bearer token expiry is valid future date')", passed: true },
        ],
      },
      negative: {
        status: "401 Unauthorized",
        statusCode: 401,
        time: "18ms",
        response: {
          error: "UNAUTHORIZED",
          message: "Bearer token expired or invalid signature",
          code: "AUTH_TOKEN_EXPIRED",
          timestamp: "2026-10-01T17:10:00Z",
        },
        assertions: [
          { name: "pm.test('Status code is 401 Unauthorized')", passed: true },
          { name: "pm.test('Response payload contains error code & message')", passed: true },
          { name: "pm.test('No sensitive user data leaked in error body')", passed: true },
        ],
      },
    },
  },
  {
    id: "user-register",
    name: "/api/v1/users/register",
    method: "POST",
    description: "User registration schema & negative input validation",
    scenarios: {
      positive: {
        status: "201 Created",
        statusCode: 201,
        time: "48ms",
        requestBody: {
          fullName: "Nirvaya Ligal",
          email: "nirvaya22@gmail.com",
          password: "SecurePassword123!",
        },
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
          { name: "pm.test('Status code is 201 Created')", passed: true },
          { name: "pm.test('Response includes new unique userId')", passed: true },
          { name: "pm.test('Plaintext password never returned in body')", passed: true },
          { name: "pm.test('Initial account state is PENDING_VERIFICATION')", passed: true },
        ],
      },
      negative: {
        status: "400 Bad Request",
        statusCode: 400,
        time: "21ms",
        requestBody: {
          fullName: "Nirvaya",
          email: "invalid-email-string",
          password: "123",
        },
        response: {
          error: "VALIDATION_FAILED",
          details: {
            email: "Must be a valid RFC 5322 email format",
            password: "Password must be at least 8 characters with 1 symbol",
          },
        },
        assertions: [
          { name: "pm.test('Status code is 400 Bad Request')", passed: true },
          { name: "pm.test('Returns targeted field-level validation errors')", passed: true },
          { name: "pm.test('Malformed record NOT committed to database')", passed: true },
        ],
      },
    },
  },
  {
    id: "health-check",
    name: "/api/v1/health",
    method: "GET",
    description: "Subsystem health & connection heartbeat checks",
    scenarios: {
      positive: {
        status: "200 OK",
        statusCode: 200,
        time: "9ms",
        response: {
          status: "HEALTHY",
          uptime: "99.98%",
          database: "CONNECTED",
          redisCache: "CONNECTED",
        },
        assertions: [
          { name: "pm.test('Status code is 200 OK')", passed: true },
          { name: "pm.test('Database connection latency < 15ms')", passed: true },
          { name: "pm.test('All critical subsystems reporting HEALTHY')", passed: true },
        ],
      },
      negative: {
        status: "503 Service Unavailable",
        statusCode: 503,
        time: "14ms",
        response: {
          status: "DEGRADED",
          error: "DATABASE_CONNECTION_TIMEOUT",
          database: "RECONNECTING_ATTEMPT_2",
        },
        assertions: [
          { name: "pm.test('Status code is 503 Service Unavailable')", passed: true },
          { name: "pm.test('Circuit breaker prevents cascade failure')", passed: true },
          { name: "pm.test('Error event dispatched to telemetry logger')", passed: true },
        ],
      },
    },
  },
];

export default function Projects() {
  // API Playground State
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>("auth-session");
  const [scenario, setScenario] = useState<"positive" | "negative">("positive");
  const [isSending, setIsSending] = useState(false);
  const [responseKey, setResponseKey] = useState(0);

  // Defect Ticket Drawer State
  const [showBugTicket, setShowBugTicket] = useState(false);

  const currentEndpoint =
    apiEndpoints.find((ep) => ep.id === selectedEndpointId) || apiEndpoints[0];
  const activeData = currentEndpoint.scenarios[scenario];

  const handleSendRequest = () => {
    if (isSending) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setResponseKey((prev) => prev + 1);
    }, 240);
  };

  const handleSelectEndpoint = (id: string) => {
    setSelectedEndpointId(id);
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setResponseKey((prev) => prev + 1);
    }, 200);
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

        {/* Interactive Feature 2: REST API Inspector Playground */}
        <div className="api-playground-box">
          {/* Header */}
          <div className="api-playground-header">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="terminal-dots">
                <i className="dot-red" />
                <i className="dot-yellow" />
                <i className="dot-green" />
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#ffffff", fontWeight: 600 }}>
                Interactive QA Sandbox: REST API Contract &amp; Schema Inspector
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="badge-chip" style={{ fontSize: "0.68rem", color: "#38bdf8", borderColor: "rgba(56, 189, 248, 0.3)" }}>
                Live Postman Test Assertions
              </span>
            </div>
          </div>

          {/* Endpoints Row */}
          <div className="api-endpoints-row">
            {apiEndpoints.map((ep) => (
              <button
                type="button"
                key={ep.id}
                className={`api-endpoint-btn ${selectedEndpointId === ep.id ? "active" : ""}`}
                onClick={() => handleSelectEndpoint(ep.id)}
              >
                <span
                  className={`api-method-badge ${
                    ep.method === "GET" ? "method-get" : "method-post"
                  }`}
                >
                  {ep.method}
                </span>
                <span>{ep.name}</span>
              </button>
            ))}
          </div>

          {/* Action Bar with Scenario Switcher and Send Request */}
          <div className="api-action-bar">
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.72rem", color: "#94a3b8", fontFamily: "var(--font-mono)" }}>
                Test Scenario:
              </span>
              <div className="api-scenario-toggle">
                <button
                  type="button"
                  className={`api-scenario-btn ${scenario === "positive" ? "active" : ""}`}
                  onClick={() => setScenario("positive")}
                >
                  ✓ Positive (Happy Path)
                </button>
                <button
                  type="button"
                  className={`api-scenario-btn ${scenario === "negative" ? "active" : ""}`}
                  onClick={() => setScenario("negative")}
                >
                  ✕ Negative / Error Path
                </button>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "none" }} className="desktop-only">
                {currentEndpoint.description}
              </span>
              <button
                type="button"
                className="api-send-btn"
                onClick={handleSendRequest}
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <Loader2 size={12} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={12} /> Send Request
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Request / Response Split Grid */}
          <div className="api-response-grid" key={responseKey}>
            {/* Left Pane: Response Payload (JSON) */}
            <div className="api-response-pane">
              <div className="api-pane-label">
                <span>Response Payload (JSON)</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    className={`api-status-badge ${
                      activeData.statusCode < 400 ? "api-status-200" : "api-status-400"
                    }`}
                  >
                    {activeData.status}
                  </span>
                  <span style={{ color: "#94a3b8", fontSize: "0.68rem" }}>
                    <Clock size={11} style={{ display: "inline", marginRight: "3px" }} />
                    {activeData.time}
                  </span>
                </div>
              </div>

              {/* If request body exists (POST), show mini request body snippet */}
              {activeData.requestBody && (
                <div style={{ marginBottom: "12px", padding: "8px 10px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "6px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                  <span style={{ color: "#64748b", fontSize: "0.66rem", display: "block", marginBottom: "4px" }}>
                    Request Body (JSON):
                  </span>
                  <pre style={{ margin: 0, fontSize: "0.72rem", color: "#93c5fd", fontFamily: "var(--font-mono)" }}>
                    {JSON.stringify(activeData.requestBody, null, 2)}
                  </pre>
                </div>
              )}

              <pre
                style={{
                  margin: 0,
                  fontSize: "0.75rem",
                  color: activeData.statusCode < 400 ? "#86efac" : "#fca5a5",
                  fontFamily: "var(--font-mono)",
                  lineHeight: 1.6,
                  overflowX: "auto",
                }}
              >
                {JSON.stringify(activeData.response, null, 2)}
              </pre>
            </div>

            {/* Right Pane: Postman Test Assertions */}
            <div className="api-response-pane" style={{ background: "#0a0e14" }}>
              <div className="api-pane-label">
                <span>Postman Test Assertions</span>
                <span style={{ color: "#34d399", fontSize: "0.68rem", fontWeight: 600 }}>
                  {activeData.assertions.length}/{activeData.assertions.length} PASSED
                </span>
              </div>

              <div className="api-assertions-list">
                {activeData.assertions.map((ast) => (
                  <div className="api-assertion-item" key={ast.name}>
                    <CheckCircle2 size={14} style={{ color: "#34d399" }} />
                    <span style={{ fontFamily: "var(--font-mono)" }}>{ast.name}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "16px",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  background: "rgba(56, 189, 248, 0.05)",
                  border: "1px solid rgba(56, 189, 248, 0.15)",
                  fontSize: "0.7rem",
                  color: "#94a3b8",
                }}
              >
                <strong style={{ color: "#38bdf8", display: "block", marginBottom: "2px" }}>
                  QA Validation Context:
                </strong>
                {scenario === "positive"
                  ? "Happy path verifies 2xx status codes, required JSON schema keys, token lifetimes, and latency thresholds under normal conditions."
                  : "Negative testing asserts that malformed inputs and expired credentials cleanly return proper 4xx status codes without exposing internal stack traces."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
