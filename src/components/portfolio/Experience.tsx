"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Database,
  FileCheck,
  FileSpreadsheet,
  FileText,
  Receipt,
  Send,
  ShieldCheck,
  Terminal,
} from "lucide-react";

interface QABullet {
  title: string;
  text: string;
}

const qaCompetencies = [
  {
    title: "Manual & Exploratory Testing",
    tag: "Smoke · Edge Cases · Cross-Browser",
    icon: CheckCircle2,
    description:
      "Performed smoke, exploratory, and cross-browser testing across Chrome, Firefox, and Safari on USPS, NRCS Blood Bank, and NIMS, catching edge cases before releases.",
  },
  {
    title: "Playwright Automation",
    tag: "TypeScript · Page Object Model (POM)",
    icon: Terminal,
    description:
      "Wrote and maintained automated regression suites in Playwright with TypeScript using Page Object Model (POM) for core user flows across postal tracking, blood bank inventory, and student portals.",
  },
  {
    title: "REST API Testing",
    tag: "60+ Endpoints · Postman & Swagger",
    icon: Send,
    description:
      "Tested 60+ RESTful APIs in Postman against Swagger docs, validating status codes, JSON response data, and negative 4xx/5xx error handling.",
  },
  {
    title: "Oracle SQL, Jenkins & Unix",
    tag: "DB Checks · CI Runs · Server Logs",
    icon: Database,
    description:
      "Wrote Oracle SQL queries to check database records on USPS transactions, ran test jobs in Jenkins, and used Unix commands to inspect server logs.",
  },
];

const qaDetailedResponsibilities: QABullet[] = [
  {
    title: "Manual & Exploratory QA:",
    text: "Ran manual test cases covering smoke testing, boundary values, empty states, and cross-browser execution on Chromium, Firefox, and WebKit.",
  },
  {
    title: "Playwright E2E Automation:",
    text: "Built modular, maintainable tests in Playwright (TypeScript) using Page Object Model (POM), automating core paths like USPS tracking lookups, donor registrations, and student enrollment.",
  },
  {
    title: "REST API Testing (60+ Endpoints):",
    text: "Tested 60+ endpoints in Postman using environment variables and bearer tokens, cross-referencing Swagger documentation to verify responses and error messages.",
  },
  {
    title: "Oracle SQL Database Verification:",
    text: "Validated database records on USPS transactions using Oracle SQL, verifying table updates and ensuring foreign key integrity without orphan records.",
  },
  {
    title: "Jenkins CI & Unix Workflows:",
    text: "Triggered and monitored automated test suites through Jenkins CI pipelines, using Unix shell commands to view logs and verify test run status.",
  },
  {
    title: "Defect Tracking in Jira & ClickUp:",
    text: "Reported clear, reproducible bug tickets in Jira and ClickUp with exact steps, screenshots, and console/network logs, retesting fixes after deployment.",
  },
];

const qaSkills = [
  "Manual Testing",
  "Smoke Testing",
  "Exploratory Testing",
  "Cross-Browser Testing",
  "Playwright",
  "TypeScript",
  "JavaScript",
  "Page Object Model (POM)",
  "E2E Automation",
  "Postman",
  "Swagger",
  "Oracle SQL",
  "Jenkins",
  "Unix",
  "Jira",
  "ClickUp",
];

const financeAreas = [
  {
    title: "Financial Operations",
    icon: Receipt,
    description:
      "Handled regular bank reconciliations, petty cash management, and payment verification.",
  },
  {
    title: "Tax & Payroll Documentation",
    icon: FileText,
    description:
      "Prepared withholding tax (TDS / e-TDS) documentation in compliance with national guidelines, along with employee payroll records.",
  },
  {
    title: "Audit & Reporting",
    icon: FileCheck,
    description:
      "Maintained expenditure logs, voucher records, and audit documentation for internal and external reviews.",
  },
];

const financeSkills = [
  "Bank Reconciliation",
  "TDS / e-TDS",
  "Financial Documentation",
  "Audit Trail Maintenance",
  "Payroll Support",
];

export default function Experience() {
  const [showQAResponsibilities, setShowQAResponsibilities] = useState(false);

  return (
    <section className="content-section section-shell" id="experience">
      <div className="section-heading">
        <div className="eyebrow eyebrow-accent">
          <span />
          01 / Experience
        </div>
        <h2>Experience.</h2>
        <p>
          Quality assurance experience testing USPS at TechStaffing Hub, and Nepal Red Cross Society Blood Bank and NIMS educational platform at Skybase — supported by an operational background in administration and finance.
        </p>
      </div>

      <div className="experience-timeline-wrap">
        <div className="timeline-track-spine" aria-hidden="true" />

        <div className="timeline-items-flow">
          {/* 1. PRIMARY FOCUS: QA ENGINEER / SOFTWARE TESTER */}
          <div className="timeline-item-entry">
            <div className="timeline-node-anchor timeline-node-qa" aria-hidden="true">
              <ShieldCheck size={22} />
            </div>

            <article className="timeline-card-content timeline-card-qa">
              <div className="timeline-card-header">
                <div className="timeline-header-top-row">
                  <div className="timeline-role-title-group">
                    <div className="timeline-badges-wrap" style={{ marginBottom: "6px" }}>
                      <span className="discipline-badge discipline-badge-qa">
                        <span className="live-pulse-dot" />
                        QA &amp; Automation Testing
                      </span>
                    </div>
                    <h3>QA Engineer / Software Tester</h3>
                    <p className="timeline-role-meta-text">
                      <span className="timeline-company-name">TechStaffing Hub &amp; Skybase</span>
                      <span className="timeline-meta-dot">·</span>
                      <span className="timeline-category-label">Software Quality Assurance</span>
                    </p>
                  </div>

                  <div className="timeline-meta-tags">
                    <span className="meta-chip meta-chip-highlight">
                      <Calendar size={13} style={{ display: "inline", marginRight: "6px", verticalAlign: "-2px" }} />
                      Nov 2025 – Jan 2026 · May 2026 – Present
                    </span>
                  </div>
                </div>

                <p className="role-summary-copy">
                  Tested applications like USPS at TechStaffing Hub, and Nepal Red Cross Society Blood Bank and NIMS at Skybase. Built automated E2E tests with Playwright, tested 60+ APIs in Postman against Swagger docs, verified database records with Oracle SQL, and worked with Jenkins on Unix.
                </p>
              </div>

              {/* Four Competency Cards */}
              <div className="qa-competency-grid" role="list" aria-label="Key QA Competencies">
                {qaCompetencies.map((comp) => {
                  const Icon = comp.icon;
                  return (
                    <div className="competency-item-card" key={comp.title} role="listitem">
                      <div className="competency-card-top">
                        <div className="competency-icon-box">
                          <Icon size={16} />
                        </div>
                        <div>
                          <h4>{comp.title}</h4>
                          <span className="competency-micro-tag">{comp.tag}</span>
                        </div>
                      </div>
                      <p>{comp.description}</p>
                    </div>
                  );
                })}
              </div>

              {/* Expandable "View Responsibilities" Accordion */}
              <div className="expandable-responsibilities-wrap">
                <button
                  type="button"
                  className="expand-toggle-button"
                  onClick={() => setShowQAResponsibilities(!showQAResponsibilities)}
                  aria-expanded={showQAResponsibilities}
                  aria-controls="qa-detailed-responsibilities-panel"
                >
                  <span className="expand-toggle-left">
                    <span className="toggle-badge">
                      {showQAResponsibilities ? "Expanded" : "Details"}
                    </span>
                    <span>
                      {showQAResponsibilities
                        ? "Hide Detailed Responsibilities"
                        : "View What I Did Day-to-Day (6 Areas)"}
                    </span>
                  </span>
                  <span className="expand-toggle-icon">
                    <span>{showQAResponsibilities ? "Collapse" : "Expand"}</span>
                    {showQAResponsibilities ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                </button>

                {showQAResponsibilities && (
                  <div
                    id="qa-detailed-responsibilities-panel"
                    className="expanded-bullets-container"
                    role="region"
                    aria-label="Detailed Responsibilities List"
                  >
                    {qaDetailedResponsibilities.map((item) => (
                      <div className="expanded-bullet-row" key={item.title}>
                        <CheckCircle2 size={15} className="bullet-icon-check" />
                        <div>
                          <strong>{item.title}</strong> <span>{item.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Skills Footer */}
              <div className="timeline-skills-footer">
                {qaSkills.map((skill) => (
                  <span className="badge-chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          </div>

          {/* 2. SECONDARY FOCUS: ADMIN & FINANCE OFFICER */}
          <div className="timeline-item-entry">
            <div className="timeline-node-anchor timeline-node-finance" aria-hidden="true">
              <FileSpreadsheet size={20} />
            </div>

            <article className="timeline-card-content timeline-card-finance">
              <div className="timeline-card-header">
                <div className="timeline-header-top-row">
                  <div className="timeline-role-title-group">
                    <div className="timeline-badges-wrap" style={{ marginBottom: "6px" }}>
                      <span className="discipline-badge discipline-badge-finance">
                        Secondary Background · Operations
                      </span>
                    </div>
                    <h3 style={{ fontSize: "1.2rem" }}>Admin &amp; Finance Officer</h3>
                    <p className="timeline-role-meta-text">
                      <span className="timeline-company-name">CWES Nepal</span>
                      <span className="timeline-meta-dot">·</span>
                      <span className="timeline-category-label">Financial Administration &amp; Operations</span>
                    </p>
                  </div>

                  <div className="timeline-meta-tags">
                    <span className="meta-chip meta-chip-emerald">
                      <Calendar size={13} style={{ display: "inline", marginRight: "6px", verticalAlign: "-2px" }} />
                      Jan 2026 – Present
                    </span>
                  </div>
                </div>

                <p className="role-summary-copy" style={{ fontSize: "0.88rem" }}>
                  Managed financial records, bank reconciliations, statutory tax compliance, and audit-ready documentation to ensure clean operational reporting.
                </p>
              </div>

              {/* Three Responsibility Pillars */}
              <div className="finance-pillars-grid" role="list" aria-label="Finance Core Areas">
                {financeAreas.map((area) => {
                  const Icon = area.icon;
                  return (
                    <div className="finance-pillar-box" key={area.title} role="listitem">
                      <div className="finance-pillar-header">
                        <div className="finance-pillar-icon">
                          <Icon size={15} />
                        </div>
                        <h4>{area.title}</h4>
                      </div>
                      <p>{area.description}</p>
                    </div>
                  );
                })}
              </div>

              {/* Finance Skills Badges */}
              <div className="timeline-skills-footer">
                {financeSkills.map((skill) => (
                  <span className="badge-chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
