import {
  Briefcase,
  CheckCircle2,
  FileSpreadsheet,
  ShieldCheck,
} from "lucide-react";

const roles = [
  {
    role: "QA Engineer / Software Tester",
    company: "Remote · Contract / Part-Time",
    category: "Software Quality Assurance",
    timeline: "Nov 2025 – Jan 2026 · May 2026 – Present",
    icon: ShieldCheck,
    accentColor: "#38bdf8",
    bullets: [
      {
        title: "Functional & Regression Testing:",
        text: "Executed functional, smoke, and exploratory test cases across web applications, verifying requirements, UI behavior, and cross-browser compatibility.",
      },
      {
        title: "REST API Testing:",
        text: "Tested RESTful endpoints in Postman and Swagger, checking status codes, JSON request/response payloads, and error handling.",
      },
      {
        title: "Playwright Automation:",
        text: "Wrote and maintained automated regression tests in Playwright (TypeScript) using Page Object Model for core user flows like login, navigation, and forms.",
      },
      {
        title: "Database Verification:",
        text: "Ran SQL queries to verify backend data persistence and ensure frontend actions properly updated database tables.",
      },
      {
        title: "Defect Reporting & Retesting:",
        text: "Logged clear, reproducible bug tickets in Jira and ClickUp with steps to reproduce, expected vs. actual behavior, and DevTools console/network logs, followed by retesting fixes.",
      },
      {
        title: "Version Control:",
        text: "Maintained test scripts and collaborated through Git and GitHub branching workflows.",
      },
    ],
    skills: [
      "Manual Testing",
      "Regression Testing",
      "Playwright",
      "TypeScript",
      "Postman",
      "REST APIs",
      "SQL",
      "Jira",
      "ClickUp",
      "Git / GitHub",
    ],
  },
  {
    role: "Admin & Finance Officer",
    company: "CWES Nepal",
    category: "Financial Administration & Operations",
    timeline: "Jan 2026 – Present",
    icon: FileSpreadsheet,
    accentColor: "#34d399",
    bullets: [
      {
        title: "Bank Reconciliation:",
        text: "Conducted regular monthly bank reconciliations, petty cash management, and disbursement oversight.",
      },
      {
        title: "TDS / e-TDS Compliance:",
        text: "Prepared statutory withholding tax (TDS / e-TDS) documentation in compliance with national tax guidelines.",
      },
      {
        title: "Documentation & Audit Support:",
        text: "Maintained employee payroll records, project expenditure logs, and voucher verification trails for internal and external audit reviews.",
      },
    ],
    skills: [
      "Bank Reconciliation",
      "TDS / e-TDS",
      "Financial Documentation",
      "Audit Trail Maintenance",
      "Payroll Support",
    ],
  },
];

export default function Experience() {
  return (
    <section className="content-section section-shell" id="experience">
      <div className="section-heading">
        <div className="eyebrow eyebrow-accent">
          <span />
          01 / Experience
        </div>
        <h2>Professional Experience.</h2>
        <p>
          Hands-on experience across manual testing, API validation, test automation, database verification,
          and defect management in remote software projects, supported by a professional background in administration and finance.
        </p>
      </div>

      <div className="experience-timeline">
        {roles.map((item) => (
          <article className="timeline-card" key={item.role + item.company}>
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
                  <p style={{ color: "#e2e8f0", fontWeight: 500 }}>
                    {item.company} · <span style={{ color: "#94a3b8", fontWeight: 400 }}>{item.category}</span>
                  </p>
                </div>
              </div>

              <div className="timeline-meta-tags">
                <span className="meta-chip meta-chip-highlight">{item.timeline}</span>
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
