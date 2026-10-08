"use client";

import { useState } from "react";
import {
  CheckSquare,
  Code2,
  Database,
  Filter,
  Info,
  Server,
  Sparkles,
} from "lucide-react";

interface SkillItem {
  name: string;
  context: string;
}

interface MatrixGroup {
  id: string;
  icon: typeof CheckSquare;
  title: string;
  copy: string;
  accent: string;
  skills: SkillItem[];
}

const matrixGroups: MatrixGroup[] = [
  {
    id: "manual",
    icon: CheckSquare,
    title: "Manual & Functional QA",
    copy: "Practical testing techniques ensuring web applications behave reliably across browsers.",
    accent: "#38bdf8",
    skills: [
      { name: "Manual Testing", context: "Systematic test execution against business requirements and edge cases." },
      { name: "Functional Testing", context: "Verifying user authentication, form submissions, and workflow states." },
      { name: "Regression Testing", context: "Validating that new code changes do not break existing functionality." },
      { name: "Smoke Testing", context: "Fast critical-path verification after staging and production builds." },
      { name: "Exploratory Testing", context: "Investigating unscripted edge cases, invalid inputs, and boundary values." },
      { name: "Cross-Browser Testing", context: "Ensuring visual and behavioral consistency across Chromium, Firefox, and WebKit." },
      { name: "Edge-Case Identification", context: "Testing empty states, special characters, and concurrent session states." },
    ],
  },
  {
    id: "automation",
    icon: Code2,
    title: "Test Automation",
    copy: "Writing and maintaining browser automation tests with TypeScript and Playwright.",
    accent: "#60a5fa",
    skills: [
      { name: "Playwright", context: "End-to-end browser automation framework for Chromium, Firefox, and WebKit." },
      { name: "TypeScript", context: "Type-safe scripting for robust locators, assertions, and test fixtures." },
      { name: "JavaScript", context: "Scripting test logic, assertions, and asynchronous promises." },
      { name: "Page Object Model (POM)", context: "Architecting clean test suites by isolating page elements from test logic." },
      { name: "E2E Automation", context: "Automating core user journeys from landing to authenticated checkout/dashboard." },
      { name: "Regression Automation", context: "Building reusable suites to eliminate repetitive manual regression cycles." },
    ],
  },
  {
    id: "api",
    icon: Server,
    title: "API Testing",
    copy: "Validating REST endpoints, request payloads, response bodies, and HTTP status codes.",
    accent: "#818cf8",
    skills: [
      { name: "Postman", context: "Organizing parameterized test collections, environments, and automated assertions." },
      { name: "REST APIs", context: "Testing HTTP methods (GET, POST, PUT, DELETE) and header authentication." },
      { name: "Swagger ", context: "Cross-verifying endpoint schema contracts against official API specifications." },
      { name: "Status Code Validation", context: "Asserting correct 2xx, 4xx, and 5xx return codes across all branches." },
      // { name: "JSON Payload Verification", context: "Inspecting response structure, data types, and required key presence." },
      { name: "Negative Testing", context: "Passing malformed payloads and expired tokens to verify secure error handling." },
    ],
  },
  {
    id: "database",
    icon: Database,
    title: "Database & Tools",
    copy: "Backend data verification queries, issue tracking, and version control workflows.",
    accent: "#34d399",
    skills: [
      { name: "SQL Queries", context: "Writing SELECT, JOIN, and aggregate queries to inspect raw table entries." },
      { name: "Database Verification", context: "Confirming frontend actions commit proper rows and foreign key references." },
      // { name: "Jira", context: "Logging structured defect tickets with reproduction steps and priority triage." },
      // { name: "ClickUp", context: "Tracking testing tasks, sprint backlogs, and test coverage checklists." },
      { name: "Git & GitHub", context: "Version control for test repositories, branching, and pull request reviews." },
      { name: "Browser DevTools", context: "Inspecting network requests, console errors, localStorage, and DOM elements." },
    ],
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>({
    name: "Playwright",
    context: "End-to-end browser automation framework for Chromium, Firefox, and WebKit using Page Object Model.",
  });

  const filteredGroups =
    activeCategory === "all"
      ? matrixGroups
      : matrixGroups.filter((g) => g.id === activeCategory);

  const totalSkillCount = matrixGroups.reduce((acc, g) => acc + g.skills.length, 0);

  return (
    <section className="content-section section-shell" id="skills">
      <div className="section-heading">
        <div className="eyebrow">
          <span />
          03 / Skills
        </div>
        <h2>Technical QA Toolkit.</h2>
        <p>
          Core tools and testing methods I use for manual testing, browser automation, API validation, and defect tracking.
          Click any skill to view its practical testing application.
        </p>
      </div>

      {/* Interactive Category Filter Pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px",
          marginTop: "24px",
          marginBottom: "16px",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "0.74rem",
            color: "#94a3b8",
            marginRight: "6px",
            fontFamily: "var(--font-mono)",
          }}
        >
          <Filter size={12} /> Filter:
        </span>

        <button
          type="button"
          className={`terminal-tab-btn ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => setActiveCategory("all")}
          style={{ padding: "6px 14px", borderRadius: "8px" }}
        >
          All Categories ({totalSkillCount})
        </button>

        {matrixGroups.map((g) => (
          <button
            type="button"
            key={g.id}
            className={`terminal-tab-btn ${activeCategory === g.id ? "active" : ""}`}
            onClick={() => setActiveCategory(g.id)}
            style={{ padding: "6px 14px", borderRadius: "8px" }}
          >
            {g.title} ({g.skills.length})
          </button>
        ))}
      </div>

      {/* Interactive Context Inspector Bar */}
      {selectedSkill && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 18px",
            borderRadius: "10px",
            background: "rgba(56, 189, 248, 0.08)",
            border: "1px solid rgba(56, 189, 248, 0.25)",
            marginBottom: "24px",
            fontSize: "0.82rem",
            color: "#e2e8f0",
          }}
        >
          <Sparkles size={16} style={{ color: "#38bdf8", flexShrink: 0 }} />
          <div>
            <strong style={{ color: "#38bdf8", marginRight: "6px" }}>
              {selectedSkill.name}:
            </strong>
            <span>{selectedSkill.context}</span>
          </div>
        </div>
      )}

      {/* Skills Matrix Grid */}
      <div
        className="skills-matrix-grid"
        style={{
          gridTemplateColumns:
            activeCategory === "all"
              ? "repeat(auto-fit, minmax(280px, 1fr))"
              : "1fr",
        }}
      >
        {filteredGroups.map((group) => (
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
              <div>
                <h3>{group.title}</h3>
                <span style={{ fontSize: "0.7rem", color: "#94a3b8", fontFamily: "var(--font-mono)" }}>
                  {group.skills.length} core competencies
                </span>
              </div>
            </div>
            <p className="matrix-card-copy">{group.copy}</p>

            <div className="matrix-tags-group">
              {group.skills.map((skill) => {
                const isSelected = selectedSkill?.name === skill.name;
                return (
                  <button
                    type="button"
                    key={skill.name}
                    className="matrix-tag"
                    onClick={() => setSelectedSkill(skill)}
                    style={{
                      cursor: "pointer",
                      border: isSelected
                        ? `1px solid ${group.accent}`
                        : undefined,
                      background: isSelected
                        ? `${group.accent}22`
                        : undefined,
                      color: isSelected ? "#ffffff" : undefined,
                      fontWeight: isSelected ? 600 : undefined,
                    }}
                    title="Click to inspect testing context"
                  >
                    {skill.name}
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
