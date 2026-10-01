import { ArrowDown, CheckCircle2, ShieldAlert } from "lucide-react";

export default function About() {
  return (
    <section className="content-section section-shell" id="about">
      <div className="section-heading">
        <div className="eyebrow">
          <span />
          01 / Philosophy
        </div>
        <h2>The Zero-Defect Standard.</h2>
        <p>
          Quality Assurance and Financial Administration share one uncompromising requirement:
          zero tolerance for undetected discrepancies. In both disciplines, success means
          everything functions as intended, records balance, and surprises are eliminated.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-text-column">
          <p style={{ color: "#e2e8f0", fontSize: "1.05rem", lineHeight: 1.8, margin: "0 0 16px" }}>
            A missed boundary edge-case in an API payload can bring down a production
            checkout flow. Similarly, an unverified transaction or delayed TDS filing
            compromises financial integrity and regulatory compliance.
          </p>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.75, margin: "0 0 24px" }}>
            Whether I am writing automated regression suites in Playwright, validating REST
            endpoints in Postman, or reconciling complex bank statements, I apply the same
            systematic methodology: clarify specifications, probe boundary limits, and
            maintain an unquestionable audit trail.
          </p>
          <div>
            <a className="btn btn-secondary" href="#experience">
              Review Professional Experience <ArrowDown size={14} />
            </a>
          </div>
        </div>

        <div className="about-pillars">
          <div className="pillar-card">
            <div className="pillar-header">
              <div className="pillar-icon-box icon-qa">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <h3>Software Quality Engineering</h3>
                <small style={{ color: "#60a5fa", fontFamily: "var(--font-mono)", fontSize: "0.68rem" }}>
                  TEST AUTOMATION · API VALIDATION
                </small>
              </div>
            </div>
            <p>
              Challenging engineering assumptions, designing deterministic automated test
              scenarios, validating HTTP response contracts, and documenting reproducible defect
              tickets before releases reach end users.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-header">
              <div className="pillar-icon-box icon-finance">
                <ShieldAlert size={22} />
              </div>
              <div>
                <h3>Administrative &amp; Financial Integrity</h3>
                <small style={{ color: "#34d399", fontFamily: "var(--font-mono)", fontSize: "0.68rem" }}>
                  RECONCILIATION · TDS &amp; COMPLIANCE
                </small>
              </div>
            </div>
            <p>
              Balancing cash and bank ledgers, processing payroll, tracking government tax
              deductions at source (TDS/ETDS), and establishing standard operating procedures
              that guarantee audit readiness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
