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
    title: "Manual Testing",
    tag: "Functional & Regression",
    icon: CheckCircle2,
    description:
      "Executed functional, smoke, and exploratory test cases across web applications, verifying requirements, UI behavior, and cross-browser compatibility.",
  },
  {
    title: "REST API Testing",
    tag: "Postman & Swagger",
    icon: Send,
    description:
      "Tested RESTful endpoints in Postman and Swagger, checking status codes, JSON request/response payloads, and error handling.",
  },
  {
    title: "Playwright Automation",
    tag: "TypeScript · POM",
    icon: Terminal,
    description:
      "Wrote and maintained automated regression tests in Playwright (TypeScript) using Page Object Model for core user flows like login, navigation, and forms.",
  },
  {
    title: "SQL Database Verification",
    tag: "Data Integrity & CRUD",
    icon: Database,
    description:
      "Ran SQL queries to verify backend data persistence and ensure frontend actions properly updated database tables.",
  },
];

const qaDetailedResponsibilities: QABullet[] = [
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
];

const qaSkills = [
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
];

const financeAreas = [
  {
    title: "Financial Operations",
    icon: Receipt,
    description:
      "Conducted regular monthly bank reconciliations, petty cash management, and disbursement oversight.",
  },
  {
    title: "Tax & Payroll Documentation",
    icon: FileText,
    description:
      "Prepared statutory withholding tax (TDS / e-TDS) documentation in compliance with national tax guidelines, alongside employee payroll records.",
  },
  {
    title: "Audit & Reporting",
    icon: FileCheck,
    description:
      "Maintained project expenditure logs and voucher verification trails for internal and external audit reviews.",
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
        <h2>Professional Experience.</h2>
        <p>
          Hands-on experience across manual testing, API validation, test automation, database verification,
          and defect management in remote software projects, supported by a professional background in administration and finance.
        </p>
      </div>

      <div className="experience-timeline-wrap">
        {/* Continuous vertical timeline connector spine */}
        <div className="timeline-track-spine" aria-hidden="true" />

        <div className="timeline-items-flow">
          {/* ============================================================
              1. PRIMARY FOCUS: QA ENGINEER / SOFTWARE TESTER
              ============================================================ */}
          <div className="timeline-item-entry">
            {/* Timeline Accent Node */}
            <div className="timeline-node-anchor timeline-node-qa" aria-hidden="true">
              <ShieldCheck size={22} />
            </div>

            {/* QA Card Content */}
            <article className="timeline-card-content timeline-card-qa">
              <div className="timeline-card-header">
                <div className="timeline-header-top-row">
                  <div className="timeline-role-title-group">
                    <div className="timeline-badges-wrap" style={{ marginBottom: "6px" }}>
                      <span className="discipline-badge discipline-badge-qa">
                        <span className="live-pulse-dot" />
                        Primary Focus · Active Role
                      </span>
                    </div>
                    <h3>QA Engineer / Software Tester</h3>
                    <p className="timeline-role-meta-text">
                      <span className="timeline-company-name">Remote · Contract / Part-Time</span>
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

                {/* Natural Role Summary */}
                <p className="role-summary-copy">
                  Delivering end-to-end quality assurance across agile sprints through structured manual exploratory testing,
                  Playwright regression suites, and backend API &amp; database verification to ensure zero critical defects in production.
                </p>
              </div>

              {/* Four Compact Competency Cards */}
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
                        : "View Detailed Responsibilities (6 Areas)"}
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

              {/* Minimal Technology Badges Row */}
              <div className="timeline-skills-footer">
                {qaSkills.map((skill) => (
                  <span className="badge-chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          </div>

          {/* ============================================================
              2. SECONDARY FOCUS: ADMIN & FINANCE OFFICER
              ============================================================ */}
          <div className="timeline-item-entry">
            {/* Timeline Accent Node */}
            <div className="timeline-node-anchor timeline-node-finance" aria-hidden="true">
              <FileSpreadsheet size={20} />
            </div>

            {/* Finance Card Content */}
            <article className="timeline-card-content timeline-card-finance">
              <div className="timeline-card-header">
                <div className="timeline-header-top-row">
                  <div className="timeline-role-title-group">
                    <div className="timeline-badges-wrap" style={{ marginBottom: "6px" }}>
                      <span className="discipline-badge discipline-badge-finance">
                        Secondary Discipline · Operations
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
                  Overseeing institutional financial controls, statutory tax compliance, and audit-ready documentation
                  to uphold operational transparency and fiscal rigor.
                </p>
              </div>

              {/* Three Organized Responsibility Pillars */}
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
