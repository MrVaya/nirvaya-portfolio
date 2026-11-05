"use client";

import { useState } from "react";
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Database,
  ExternalLink,
  FileCheck,
  FileSpreadsheet,
  FileText,
  Layers,
  MapPin,
  Receipt,
  Send,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";

interface QABullet {
  title: string;
  text: string;
}

const qaCompetencies = [
  {
    title: "Manual & Exploratory QA",
    tag: "Smoke · Edge Cases · Cross-Browser",
    icon: CheckCircle2,
    accent: "#38bdf8",
    description:
      "Performed smoke, exploratory, and edge-case testing on USPS, NRCS Blood Bank, and NIMS, catching boundary defects before releases reached production.",
  },
  {
    title: "Playwright Automation",
    tag: "TypeScript · Page Object Model (POM)",
    icon: Terminal,
    accent: "#10b981",
    description:
      "Wrote and maintained automated regression suites in Playwright with TypeScript using Page Object Model (POM) for core user flows across postal tracking, blood bank inventory, and student portals.",
  },
  {
    title: "REST API Testing",
    tag: "60+ Endpoints · Postman & Swagger",
    icon: Send,
    accent: "#fb923c",
    description:
      "Tested 60+ RESTful APIs in Postman against Swagger docs, validating status codes, JSON response payloads, and negative 4xx/5xx error handling.",
  },
  {
    title: "Oracle SQL, Jenkins & Unix",
    tag: "DB Checks · CI Runs · Server Logs",
    icon: Database,
    accent: "#a855f7",
    description:
      "Wrote Oracle SQL queries to check database records on USPS transactions, ran test jobs in Jenkins, and used Unix shell commands to inspect server logs.",
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
  { name: "Manual Testing", color: "#38bdf8" },
  { name: "Smoke Testing", color: "#38bdf8" },
  { name: "Exploratory Testing", color: "#38bdf8" },
  { name: "Edge-Case Identification", color: "#38bdf8" },
  { name: "Playwright", color: "#10b981" },
  { name: "TypeScript", color: "#38bdf8" },
  { name: "Page Object Model (POM)", color: "#10b981" },
  { name: "E2E Automation", color: "#10b981" },
  { name: "Postman", color: "#fb923c" },
  { name: "Swagger", color: "#fb923c" },
  { name: "Oracle SQL", color: "#f59e0b" },
  { name: "Jenkins", color: "#ef4444" },
  { name: "Unix", color: "#a855f7" },
  { name: "Jira", color: "#38bdf8" },
  { name: "ClickUp", color: "#a855f7" },
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
        <h2>Work Experience.</h2>
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
                    <div className="timeline-badges-wrap" style={{ marginBottom: "8px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <span className="discipline-badge discipline-badge-qa">
                        <span className="live-pulse-dot" />
                        Primary Focus · Quality Assurance &amp; Automation
                      </span>
                      <span className="discipline-badge" style={{ background: "rgba(56, 189, 248, 0.1)", color: "#38bdf8", borderColor: "rgba(56, 189, 248, 0.25)" }}>
                        3 Systems Tested
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
                      <div className="company-avatar-box avatar-techstaffing-skybase">
                        <span>QA</span>
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: "1.45rem", color: "#ffffff" }}>QA Engineer / Software Tester</h3>
                        <p className="timeline-role-meta-text" style={{ margin: "4px 0 0" }}>
                          <strong className="timeline-company-name">TechStaffing Hub &amp; Skybase</strong>
                          <span className="timeline-meta-dot">·</span>
                          <span className="timeline-category-label">USPS, NRCS Blood Bank, NIMS</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-meta-tags">
                    <span className="meta-chip meta-chip-highlight">
                      <Calendar size={13} style={{ display: "inline", marginRight: "6px", verticalAlign: "-2px" }} />
                      Nov 2025 – Jan 2026 · May 2026 – Present
                    </span>
                  </div>
                </div>

                <p className="role-summary-copy">
                  Tested applications like <strong>USPS</strong> at TechStaffing Hub, and <strong>Nepal Red Cross Society Blood Bank</strong> and <strong>NIMS</strong> at Skybase. Built automated E2E tests with Playwright, tested 60+ APIs in Postman against Swagger docs, verified database records with Oracle SQL, and worked with Jenkins on Unix.
                </p>
              </div>

              {/* Four Competency Cards */}
              <div className="qa-competency-grid" role="list" aria-label="Key QA Competencies">
                {qaCompetencies.map((comp) => {
                  const Icon = comp.icon;
                  return (
                    <div
                      className="competency-item-card"
                      key={comp.title}
                      role="listitem"
                      style={{
                        borderColor: "rgba(255, 255, 255, 0.08)",
                      }}
                    >
                      <div className="competency-card-top">
                        <div
                          className="competency-icon-box"
                          style={{
                            background: `${comp.accent}14`,
                            color: comp.accent,
                            border: `1px solid ${comp.accent}28`,
                          }}
                        >
                          <Icon size={16} />
                        </div>
                        <div>
                          <h4>{comp.title}</h4>
                          <span className="competency-micro-tag" style={{ color: comp.accent }}>
                            {comp.tag}
                          </span>
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
                        : "View What I Did Day-to-Day across USPS, NRCS & NIMS"}
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
                  <span
                    className="badge-chip hero-colored-chip"
                    key={skill.name}
                    style={{
                      borderColor: `${skill.color}30`,
                      background: `${skill.color}0a`,
                    }}
                  >
                    <span
                      className="chip-dot"
                      style={{ background: skill.color }}
                    />
                    {skill.name}
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
                    <div className="timeline-badges-wrap" style={{ marginBottom: "8px" }}>
                      <span className="discipline-badge discipline-badge-finance">
                        Secondary Operational Background
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
                      <div className="company-avatar-box avatar-cwes">
                        <span>CW</span>
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#ffffff" }}>Admin &amp; Finance Officer</h3>
                        <p className="timeline-role-meta-text" style={{ margin: "4px 0 0" }}>
                          <strong className="timeline-company-name">CWES Nepal</strong>
                          <span className="timeline-meta-dot">·</span>
                          <span className="timeline-category-label">Financial Administration &amp; Operations</span>
                        </p>
                      </div>
                    </div>
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
