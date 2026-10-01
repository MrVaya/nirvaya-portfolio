import {
  CheckCircle2,
  Code2,
  Database,
  FileCode2,
  Lock,
  Server,
} from "lucide-react";

export default function Projects() {
  return (
    <section className="content-section section-shell" id="projects">
      <div className="section-heading">
        <div className="eyebrow eyebrow-accent">
          <span />
          02 / Projects
        </div>
        <h2>Featured QA Projects.</h2>
        <p>
          Practical testing work demonstrating test design, API validation, database verification,
          and automation thinking across real application workflows.
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

            <div className="case-tags" style={{ marginTop: "auto" }}>
              <span className="badge-chip">SQL</span>
              <span className="badge-chip">Database Validation</span>
              <span className="badge-chip">Functional QA</span>
              <span className="badge-chip">Defect Triage</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
