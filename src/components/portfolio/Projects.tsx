import {
  CheckCircle2,
  Code2,
  FileCode2,
  FileSpreadsheet,
  Smartphone,
} from "lucide-react";

export default function Projects() {
  return (
    <section className="content-section section-shell" id="projects">
      <div className="section-heading">
        <div className="eyebrow eyebrow-accent">
          <span />
          04 / Verified Work
        </div>
        <h2>QA Suites &amp; Operational Deliverables.</h2>
        <p>
          Real proof-of-work: automated test frameworks, API validation collections,
          product test matrices, and financial reconciliation models.
        </p>
      </div>

      <div className="cases-grid">
        {/* Featured Case Study: Playwright Test Automation */}
        <article className="case-card case-featured">
          <div className="case-content">
            <div className="case-kicker">
              <span className="case-type-badge">Featured QA Engineering Case</span>
              <span className="case-number">01 / 04</span>
            </div>
            <h3>Automated E2E Regression Suite</h3>
            <p>
              An automated end-to-end regression testing framework built with Playwright and
              TypeScript. Implements Page Object Model (POM) architecture, cross-browser
              execution, and failure artifact capture.
            </p>

            <div className="case-deliverables-list">
              <div className="case-deliverable">
                <CheckCircle2 size={16} />
                <span>Page Object Model separating UI locators from assertion logic</span>
              </div>
              <div className="case-deliverable">
                <CheckCircle2 size={16} />
                <span>Parallel test execution across Chromium, Firefox, and WebKit</span>
              </div>
              <div className="case-deliverable">
                <CheckCircle2 size={16} />
                <span>Automated video capture and trace logging on failed test steps</span>
              </div>
              <div className="case-deliverable">
                <CheckCircle2 size={16} />
                <span>Mock network route handlers for testing edge-case API 500 responses</span>
              </div>
            </div>

            <div className="case-tags">
              <span className="badge-chip">Playwright</span>
              <span className="badge-chip">TypeScript</span>
              <span className="badge-chip">CI Automation</span>
              <span className="badge-chip">Page Object Model</span>
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
                <span>checkout.spec.ts</span>
                <FileCode2 size={13} style={{ color: "#64748b" }} />
              </div>
              <div className="code-body">
                <p>
                  <span className="code-keyword">import</span> &#123; test, expect &#125;{" "}
                  <span className="code-keyword">from</span>{" "}
                  <span className="code-string">&apos;@playwright/test&apos;</span>;
                </p>
                <p>
                  <span className="code-keyword">import</span> &#123; CheckoutPage &#125;{" "}
                  <span className="code-keyword">from</span>{" "}
                  <span className="code-string">&apos;../pages/CheckoutPage&apos;</span>;
                </p>
                <br />
                <p>
                  <span className="code-func">test</span>(
                  <span className="code-string">&apos;validate checkout coupon flow&apos;</span>,{" "}
                  <span className="code-keyword">async</span> (&#123; page &#125;) =&gt; &#123;
                </p>
                <p style={{ paddingLeft: "16px" }}>
                  <span className="code-keyword">const</span> cart ={" "}
                  <span className="code-keyword">new</span> CheckoutPage(page);
                </p>
                <p style={{ paddingLeft: "16px" }}>
                  <span className="code-keyword">await</span> cart.goto();
                </p>
                <p style={{ paddingLeft: "16px" }}>
                  <span className="code-keyword">await</span> cart.addItem(
                  <span className="code-string">&apos;PROD-102&apos;</span>, 2);
                </p>
                <p style={{ paddingLeft: "16px" }}>
                  <span className="code-keyword">await</span> cart.applyCoupon(
                  <span className="code-string">&apos;NEPAL20&apos;</span>);
                </p>
                <br />
                <p style={{ paddingLeft: "16px" }}>
                  <span className="code-comment">&#47;&#47; Assert pricing calculations</span>
                </p>
                <p style={{ paddingLeft: "16px" }}>
                  <span className="code-keyword">await</span> expect(cart.discountTotal)
                </p>
                <p style={{ paddingLeft: "28px" }}>
                  .toHaveText(<span className="code-string">&apos;-$20.00&apos;</span>);
                </p>
                <p>&#125;);</p>
              </div>
            </div>
          </div>
        </article>

        {/* 3 Secondary Deliverables */}
        <div className="cases-subgrid">
          <article className="subcase-card">
            <div
              className="subcase-icon-box"
              style={{
                background: "rgba(56, 189, 248, 0.12)",
                color: "#38bdf8",
                border: "1px solid rgba(56, 189, 248, 0.25)",
              }}
            >
              <Code2 size={22} />
            </div>
            <div className="case-kicker">
              <span className="case-type-badge">API Testing Suite</span>
              <span className="case-number">02</span>
            </div>
            <h3>RESTful API Validation Collection</h3>
            <p>
              A modular Postman test suite covering 30+ endpoints. Features JSON Schema
              contract verification, automatic JWT token refreshing, boundary validation, and
              error status assertions.
            </p>
            <div className="case-tags">
              <span className="badge-chip">Postman</span>
              <span className="badge-chip">JSON Schema</span>
              <span className="badge-chip">REST APIs</span>
            </div>
          </article>

          <article className="subcase-card">
            <div
              className="subcase-icon-box"
              style={{
                background: "rgba(129, 140, 248, 0.12)",
                color: "#818cf8",
                border: "1px solid rgba(129, 140, 248, 0.25)",
              }}
            >
              <Smartphone size={22} />
            </div>
            <div className="case-kicker">
              <span className="case-type-badge">Product QA Strategy</span>
              <span className="case-number">03</span>
            </div>
            <h3>NepraRide Mobility Test Matrix</h3>
            <p>
              Comprehensive QA test plan and boundary matrix for a Pokhara ride-hailing concept:
              driver matching edge cases, payment race conditions, and cross-device responsive
              validations.
            </p>
            <div className="case-tags">
              <span className="badge-chip">Test Matrix</span>
              <span className="badge-chip">Mobile QA</span>
              <span className="badge-chip">Edge Cases</span>
            </div>
          </article>

          <article className="subcase-card">
            <div
              className="subcase-icon-box"
              style={{
                background: "rgba(52, 211, 153, 0.12)",
                color: "#34d399",
                border: "1px solid rgba(52, 211, 153, 0.25)",
              }}
            >
              <FileSpreadsheet size={22} />
            </div>
            <div className="case-kicker">
              <span className="case-type-badge">Financial Control</span>
              <span className="case-number">04</span>
            </div>
            <h3>SME Reconciliation &amp; Audit Model</h3>
            <p>
              An operational accounting framework linking voucher verification, petty cash
              tracking, and monthly bank reconciliation with built-in TDS/ETDS tax schedules.
            </p>
            <div className="case-tags">
              <span className="badge-chip">Reconciliation</span>
              <span className="badge-chip">TDS / ETDS</span>
              <span className="badge-chip">Audit Trail</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
