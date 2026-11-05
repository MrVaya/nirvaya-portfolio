"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Code2,
  Database,
  FileCheck2,
  Layers,
  Search,
  ShieldAlert,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

interface PlaybookPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  accent: string;
  icon: typeof ShieldAlert;
  summary: string;
  practicalExample: string;
  tools: string[];
}

const pillars: PlaybookPillar[] = [
  {
    id: "edge-cases",
    number: "01",
    title: "Break It Before Users Do",
    subtitle: "Exploratory & Edge-Case QA",
    accent: "#f59e0b",
    icon: ShieldAlert,
    summary:
      "Happy paths are just table stakes. Real software bugs hide in boundary conditions, expired sessions, and unexpected inputs.",
    practicalExample:
      "In the NRCS Blood Bank system, I caught an edge case where expired cross-match units still showed as available because the system was checking dates at midnight rather than the exact timestamp.",
    tools: ["Exploratory Testing", "Edge-Case Analysis", "Smoke Tests"],
  },
  {
    id: "resilient-automation",
    number: "02",
    title: "Locators That Never Flake",
    subtitle: "Playwright & TypeScript (POM)",
    accent: "#10b981",
    icon: Code2,
    summary:
      "Flaky tests are worse than no tests. I structure test automation using Page Object Model (POM) and semantic, user-facing locators.",
    practicalExample:
      "Using getByRole and getByLabel instead of brittle CSS selectors means our Playwright suites across USPS, NRCS, and NIMS stay green even after design updates.",
    tools: ["Playwright", "TypeScript", "Page Object Model (POM)"],
  },
  {
    id: "database-verification",
    number: "03",
    title: "Don't Trust the UI Alone",
    subtitle: "Oracle SQL & Backend Validation",
    accent: "#38bdf8",
    icon: Database,
    summary:
      "A green checkmark in the browser does not prove the data was saved. I always verify state directly in the database.",
    practicalExample:
      "On USPS postal tracking, I executed Oracle SQL queries to verify tracking events, confirm foreign key relationships on parcels, and ensure zero orphan rows after user transactions.",
    tools: ["Oracle SQL", "Data Integrity", "CRUD Validation"],
  },
  {
    id: "actionable-reporting",
    number: "04",
    title: "Bug Reports Developers Love",
    subtitle: "Evidence-Driven Defect Triage",
    accent: "#a855f7",
    icon: FileCheck2,
    summary:
      "A bug report without evidence wastes developer time. Every ticket I log has exact reproduction steps, screenshots, and network logs.",
    practicalExample:
      "In Jira and ClickUp, I attach DevTools network payloads, console traces, and clear Actual vs. Expected results, reducing back-and-forth communication and speeding up fix turnaround.",
    tools: ["Jira", "ClickUp", "Browser DevTools", "Clear Steps"],
  },
];

export default function TestingPlaybook() {
  const [activePillar, setActivePillar] = useState<string>("edge-cases");
  const prefersReducedMotion = useReducedMotion() ?? false;

  const current = pillars.find((p) => p.id === activePillar) || pillars[0];
  const CurrentIcon = current.icon;

  return (
    <section className="content-section section-shell" id="playbook">
      <div className="section-heading">
        <div className="eyebrow eyebrow-accent">
          <span />
          QA Mindset &amp; Philosophy
        </div>
        <h2>How I Approach Testing.</h2>
        <p>
          Quality isn&apos;t just checking boxes. Here are the four principles I follow on every project to catch critical bugs early, prevent flaky automation, and deliver software teams can trust.
        </p>
      </div>

      <div className="playbook-grid">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          const isActive = activePillar === pillar.id;

          return (
            <motion.div
              key={pillar.id}
              className={`playbook-card ${isActive ? "active" : ""}`}
              onClick={() => setActivePillar(pillar.id)}
              style={{
                borderColor: isActive ? pillar.accent : undefined,
                boxShadow: isActive ? `0 16px 40px ${pillar.accent}18` : undefined,
              }}
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="playbook-card-top">
                <span
                  className="playbook-pill-num"
                  style={{
                    color: pillar.accent,
                    background: `${pillar.accent}15`,
                    borderColor: `${pillar.accent}30`,
                  }}
                >
                  {pillar.number}
                </span>

                <div
                  className="playbook-icon-box"
                  style={{
                    color: pillar.accent,
                    background: `${pillar.accent}12`,
                    border: `1px solid ${pillar.accent}28`,
                  }}
                >
                  <Icon size={20} />
                </div>
              </div>

              <div className="playbook-subtitle" style={{ color: pillar.accent }}>
                {pillar.subtitle}
              </div>
              <h3 className="playbook-title">{pillar.title}</h3>
              <p className="playbook-summary">{pillar.summary}</p>

              <div className="playbook-tools-strip">
                {pillar.tools.map((t) => (
                  <span className="badge-chip" key={t} style={{ fontSize: "0.68rem", padding: "4px 8px" }}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="playbook-active-indicator">
                <span
                  style={{
                    background: isActive ? pillar.accent : "transparent",
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Deep-Dive Drawer for Selected Mindset */}
      <div className="playbook-detail-panel" style={{ borderColor: `${current.accent}33` }}>
        <div className="detail-panel-left">
          <div
            className="detail-icon-circle"
            style={{
              background: `${current.accent}18`,
              color: current.accent,
              border: `1px solid ${current.accent}40`,
            }}
          >
            <CurrentIcon size={24} />
          </div>
          <div>
            <span className="detail-eyebrow" style={{ color: current.accent }}>
              Principle {current.number} in Practice
            </span>
            <h4>{current.title}</h4>
          </div>
        </div>

        <div className="detail-panel-content">
          <div className="detail-quote-mark">“</div>
          <p>{current.practicalExample}</p>
          <div className="detail-meta-row">
            <span className="detail-chip">
              <Zap size={12} style={{ color: current.accent }} />
              Tested on real applications: USPS, NRCS Blood Bank, NIMS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

