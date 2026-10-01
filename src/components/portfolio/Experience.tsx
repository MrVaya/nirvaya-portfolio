import {
  CheckCircle2,
  FileSpreadsheet,
  ShieldCheck,
} from "lucide-react";

const roles = [
  {
    role: "QA Engineer & Test Specialist",
    category: "Software Quality Assurance",
    type: "Remote · Contract / Part-Time",
    timeline: "2023 — Present",
    icon: ShieldCheck,
    accentColor: "#38bdf8",
    bullets: [
      {
        title: "Automated E2E Regression Suites:",
        text: "Designed and implemented automated end-to-end regression test suites in Playwright & TypeScript, decreasing manual testing overhead by 40% across major product releases.",
      },
      {
        title: "RESTful API Validation & Contract Testing:",
        text: "Built modular Postman test suites validating status codes, JSON schema compliance, response headers, and token authentication flows across 35+ backend endpoints.",
      },
      {
        title: "Manual Exploratory & Responsive Testing:",
        text: "Conducted exhaustive exploratory testing across desktop browsers (Chrome, Firefox, Safari) and mobile viewports, identifying critical boundary conditions and UI regressions.",
      },
      {
        title: "High-Signal Defect Reporting:",
        text: "Documented reproducible bug tickets in Jira and ClickUp complete with step-by-step reproduction steps, expected vs. actual outcomes, network logs, and video captures.",
      },
    ],
    skills: [
      "Playwright",
      "TypeScript",
      "Postman",
      "API Testing",
      "Manual Testing",
      "Regression",
      "Jira",
      "ClickUp",
      "Browser DevTools",
    ],
  },
  {
    role: "Admin & Finance Officer",
    category: "Finance & Operational Control",
    type: "NGO & SME Sector · Part-Time",
    timeline: "2022 — Present",
    icon: FileSpreadsheet,
    accentColor: "#34d399",
    bullets: [
      {
        title: "Comprehensive Bank & Ledger Reconciliation:",
        text: "Administered monthly bank statements, ledger entries, and petty cash disbursements, maintaining zero variance and 100% reconciliation accuracy across fiscal periods.",
      },
      {
        title: "Tax Compliance (TDS / ETDS Filing):",
        text: "Calculated statutory tax deductions at source (TDS / ETDS) in compliance with national tax rules, preparing error-free documentation and preventing regulatory penalties.",
      },
      {
        title: "Payroll & Disbursement Oversight:",
        text: "Managed monthly employee payroll schedules, benefit calculations, and vendor invoice settlements with structured voucher verification trails.",
      },
      {
        title: "Internal Audit Preparation & SOPs:",
        text: "Established standard operating procedures for petty cash management, expense pre-approval, and organized transaction binders for external financial auditors.",
      },
    ],
    skills: [
      "Bank Reconciliation",
      "TDS / ETDS",
      "Payroll Systems",
      "Expense Tracking",
      "Voucher Verification",
      "Internal Controls",
      "Advanced Excel",
      "Financial Reporting",
    ],
  },
];

export default function Experience() {
  return (
    <section className="content-section section-shell" id="experience">
      <div className="section-heading">
        <div className="eyebrow eyebrow-accent">
          <span />
          02 / Experience
        </div>
        <h2>Verified Professional Track Record.</h2>
        <p>
          Demonstrated competence across software verification and operational accounting.
          Grounded, measurable results built on systematic methodology and relentless attention to detail.
        </p>
      </div>

      <div className="experience-timeline">
        {roles.map((item) => (
          <article className="timeline-card" key={item.role}>
            <div className="timeline-header-row">
              <div className="timeline-title-area">
                <div
                  className="timeline-role-icon"
                  style={{
                    background: `${item.accentColor}18`,
                    color: item.accentColor,
                    border: `1px solid ${item.accentColor}33`,
                  }}
                >
                  <item.icon size={24} />
                </div>
                <div>
                  <h3>{item.role}</h3>
                  <p>{item.category}</p>
                </div>
              </div>

              <div className="timeline-meta-tags">
                <span className="meta-chip meta-chip-highlight">{item.timeline}</span>
                <span className="meta-chip">{item.type}</span>
              </div>
            </div>

            <ul className="timeline-bullets">
              {item.bullets.map((b) => (
                <li className="timeline-bullet-item" key={b.title}>
                  <CheckCircle2 size={16} className="bullet-check" />
                  <span>
                    <strong>{b.title}</strong> {b.text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="timeline-skills-footer">
              {item.skills.map((skill) => (
                <span className="badge-chip" key={skill}>
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
