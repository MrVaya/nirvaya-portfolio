"use client";

import { useState } from "react";
import {
  CheckSquare,
  Code2,
  Database,
  Filter,
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
    title: "Manual Testing",
    copy: "Finding issues through hands-on testing before releases reach production.",
    accent: "#38bdf8",
    skills: [
      { name: "Manual Testing", context: "Testing business flows and user journeys against requirements across USPS, NRCS, and NIMS." },
      { name: "Smoke Testing", context: "Quick critical-path checks after builds to verify system stability." },
      { name: "Exploratory Testing", context: "Hands-on, unscripted testing to uncover unexpected defects and usability problems." },
      { name: "Edge-Case Identification", context: "Testing boundary conditions, empty states, special inputs, and time boundaries." },
    ],
  },
  {
    id: "automation",
    icon: Code2,
    title: "Playwright Automation",
    copy: "Writing reliable, maintainable browser tests in TypeScript using Page Object Model.",
    accent: "#60a5fa",
    skills: [
      { name: "Playwright", context: "Browser automation for Chrome, Firefox, and WebKit." },
      { name: "TypeScript", context: "Type-safe test scripts with clear assertions and reusable helpers." },
      { name: "JavaScript", context: "Writing test logic, async/await promises, and assertions." },
      { name: "Page Object Model (POM)", context: "Keeping locators and test logic separate so tests are clean and easy to update." },
      { name: "E2E Automation", context: "Automating full user journeys from login to confirmation across web apps." },
    ],
  },
  {
    id: "api",
    icon: Server,
    title: "API Testing",
    copy: "Checking REST endpoints, status codes, and JSON response data with Postman.",
    accent: "#818cf8",
    skills: [
      { name: "Postman", context: "Building organized collections, environment variables, and test assertions." },
      { name: "REST APIs (60+)", context: "Testing GET, POST, PUT, DELETE methods across 60+ endpoints." },
      { name: "Swagger / OpenAPI", context: "Checking actual API behavior against official endpoint specifications." },
      { name: "Status Code Validation", context: "Verifying 200, 201, 400, 401, 404, and 503 responses." },
      { name: "Negative Testing", context: "Testing bad inputs, missing fields, and expired tokens to make sure errors are handled cleanly." },
    ],
  },
  {
    id: "database",
    icon: Database,
    title: "Database, CI/CD & Tools",
    copy: "Validating backend records, running automated builds, and tracking bugs.",
    accent: "#34d399",
    skills: [
      { name: "Oracle SQL", context: "Writing queries to check raw tables and verify that frontend actions save correctly." },
      { name: "Database Verification", context: "Checking table updates, foreign keys, and making sure there are no orphan records." },
      { name: "Jenkins", context: "Triggering and monitoring automated test runs in CI pipelines." },
      { name: "Unix / Linux", context: "Using command-line tools to navigate servers, inspect test logs, and check processes." },
      { name: "Jira", context: "Writing reproducible bug reports with steps, screenshots, and logs." },
      { name: "ClickUp", context: "Managing test checklists, sprint tasks, and bug retests." },
      { name: "Git & GitHub", context: "Version control for test repositories and pull requests." },
      { name: "Browser DevTools", context: "Inspecting network requests, console errors, cookies, and local storage." },
    ],
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>({
    name: "Playwright",
    context: "Browser automation for Chrome, Firefox, and WebKit using TypeScript and Page Object Model.",
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
        <h2>Technical Skills.</h2>
        <p>
          Tools and testing methods I use day-to-day for manual testing, Playwright automation, API checks, and database validation. Click any skill to see how I use it.
        </p>
      </div>

      {/* Category Filter */}
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
          All Skills ({totalSkillCount})
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

      {/* Selected Skill Inspector */}
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
                  {group.skills.length} skills
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
                    title="Click to view details"
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
