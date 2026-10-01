import { Code2, Landmark, TestTube2 } from "lucide-react";

const matrixGroups = [
  {
    icon: Code2,
    title: "Test Automation & Tooling",
    copy: "Modern frameworks and developer tools used to build resilient, automated test pipelines.",
    accent: "#38bdf8",
    skills: [
      "Playwright (TypeScript)",
      "Postman API Automation",
      "RESTful API Validation",
      "JSON Schema Assertions",
      "Git & Version Control",
      "GitHub Actions (CI/CD Basics)",
      "Chrome & Firefox DevTools",
      "SQL Querying & DB Validation",
    ],
  },
  {
    icon: TestTube2,
    title: "QA Methodologies & Strategy",
    copy: "Systematic testing principles ensuring zero critical bugs escape into production environments.",
    accent: "#818cf8",
    skills: [
      "Manual & Exploratory QA",
      "End-to-End Regression",
      "Boundary Value Analysis",
      "Equivalence Partitioning",
      "Cross-Browser Testing",
      "Mobile Viewport Validation",
      "Defect Triage & Reporting",
      "Jira & ClickUp Workflow",
    ],
  },
  {
    icon: Landmark,
    title: "Admin, Finance & Compliance",
    copy: "Disciplined operational control ensuring accurate ledgers, tax compliance, and audit readiness.",
    accent: "#34d399",
    skills: [
      "Bank Statement Reconciliation",
      "Petty Cash & Voucher Control",
      "TDS / ETDS Tax Filing",
      "Payroll Calculations",
      "Financial Audit Preparation",
      "Standard Operating Procedures (SOPs)",
      "Expense Budget Tracking",
      "Advanced Excel Modeling",
    ],
  },
];

export default function Skills() {
  return (
    <section className="content-section section-shell" id="skills">
      <div className="section-heading">
        <div className="eyebrow">
          <span />
          03 / Competencies
        </div>
        <h2>Technical &amp; Operational Toolkit.</h2>
        <p>
          Organized by domain: automated testing infrastructure, software verification
          methodologies, and statutory financial operations.
        </p>
      </div>

      <div className="skills-matrix-grid">
        {matrixGroups.map((group) => (
          <article className="matrix-card" key={group.title}>
            <div className="matrix-card-header">
              <div
                style={{
                  display: "grid",
                  width: "40px",
                  height: "40px",
                  placeItems: "center",
                  borderRadius: "10px",
                  background: `${group.accent}14`,
                  color: group.accent,
                  border: `1px solid ${group.accent}33`,
                }}
              >
                <group.icon size={20} />
              </div>
              <h3>{group.title}</h3>
            </div>
            <p className="matrix-card-copy">{group.copy}</p>

            <div className="matrix-tags-group">
              {group.skills.map((skill) => (
                <span className="matrix-tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
