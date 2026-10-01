import {
  CheckSquare,
  Code2,
  Cpu,
  Database,
  GitPullRequest,
  Server,
} from "lucide-react";

const matrixGroups = [
  {
    icon: CheckSquare,
    title: "Manual & Functional QA",
    copy: "Practical testing techniques ensuring web applications behave reliably across browsers.",
    accent: "#38bdf8",
    skills: [
      "Manual Testing",
      "Functional Testing",
      "Regression Testing",
      "Smoke Testing",
      "Exploratory Testing",
      "Cross-Browser Testing",
      "Edge-Case Identification",
    ],
  },
  {
    icon: Code2,
    title: "Test Automation",
    copy: "Writing and maintaining browser automation tests with TypeScript and Playwright.",
    accent: "#60a5fa",
    skills: [
      "Playwright",
      "TypeScript",
      "JavaScript",
      "Page Object Model (POM)",
      "E2E Automation",
      "Regression Automation",
    ],
  },
  {
    icon: Server,
    title: "API Testing",
    copy: "Validating REST endpoints, request payloads, response bodies, and HTTP status codes.",
    accent: "#818cf8",
    skills: [
      "Postman",
      "REST APIs",
      "Swagger / OpenAPI",
      "Status Code Validation",
      "JSON Payload Verification",
      "Negative Testing",
    ],
  },
  {
    icon: Database,
    title: "Database & Tools",
    copy: "Backend data verification queries, issue tracking, and version control workflows.",
    accent: "#34d399",
    skills: [
      "SQL Queries",
      "Database Verification",
      "Jira",
      "ClickUp",
      "Git & GitHub",
      "Browser DevTools",
    ],
  },
];

export default function Skills() {
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
        </p>
      </div>

      <div
        className="skills-matrix-grid"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
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
