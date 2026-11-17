"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  Copy,
  Database,
  GraduationCap,
  Layers,
  Loader2,
  Mail,
  MapPin,
  Play,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const verifiedPills = [
  { label: "Manual & Smoke QA", accent: "#38bdf8" },
  { label: "Exploratory & Edge Cases", accent: "#f59e0b" },
  { label: "Playwright POM (TypeScript)", accent: "#10b981" },
  { label: "60+ REST APIs (Postman)", accent: "#fb923c" },
  { label: "Oracle SQL DB Verification", accent: "#ef4444" },
  { label: "Jenkins CI & Unix Shell", accent: "#a855f7" },
];

type SuiteId = "playwright" | "postman" | "sql";

interface TestSpec {
  name: string;
  time: string;
  status: string;
}

interface TestSuite {
  tabName: string;
  command: string;
  runnerTitle: string;
  badgeColor: string;
  specs: TestSpec[];
}

const testSuites: Record<SuiteId, TestSuite> = {
  playwright: {
    tabName: "Playwright E2E",
    command: "npx playwright test --project=chromium",
    runnerTitle: "playwright-runner — bash",
    badgeColor: "#10b981",
    specs: [
      { name: "e2e/usps-mail-tracking.spec.ts", time: "18ms", status: "PASS" },
      { name: "e2e/nrcs-blood-inventory.spec.ts", time: "24ms", status: "PASS" },
      { name: "e2e/nims-enrollment-flow.spec.ts", time: "32ms", status: "PASS" },
    ],
  },
  postman: {
    tabName: "Postman API (60+)",
    command: "newman run collections/nrcs-bloodbank-api.json",
    runnerTitle: "newman-cli — node",
    badgeColor: "#fb923c",
    specs: [
      { name: "GET /api/v1/blood-bank/inventory (200 OK)", time: "12ms", status: "200 OK" },
      { name: "POST /api/v1/donors/register (201 Created)", time: "22ms", status: "201 OK" },
      { name: "GET /api/v1/blood-bank/inventory?type=AB_NEG [404]", time: "14ms", status: "404 CATCH" },
    ],
  },
  sql: {
    tabName: "Oracle SQL DB",
    command: "sqlplus -s qa_tester@USPS_DB @verify-records.sql",
    runnerTitle: "oracle-sqlplus — sql",
    badgeColor: "#38bdf8",
    specs: [
      { name: "SELECT count(*) FROM usps_tracking_events", time: "8ms", status: "VALID" },
      { name: "CHECK foreign_keys(parcel_shipments)", time: "14ms", status: "INTEGRITY OK" },
      { name: "ASSERT zero_orphan_delivery_records()", time: "11ms", status: "0 ORPHANS" },
    ],
  },
};

const impactMetrics = [
  {
    value: "3",
    label: "Production Systems",
    desc: "USPS · NRCS Blood Bank · NIMS",
    color: "#38bdf8",
    icon: Layers,
  },
  {
    value: "60+",
    label: "REST APIs Tested",
    desc: "Postman, Swagger & Edge Cases",
    color: "#fb923c",
    icon: Server,
  },
  {
    value: "30+",
    label: "Playwright E2E Tests",
    desc: "Page Object Model in TypeScript",
    color: "#10b981",
    icon: Code2,
  },
  {
    value: "P0",
    label: "Critical Defect Caught",
    desc: "Expired cross-match timestamp bug",
    color: "#ef4444",
    icon: AlertTriangle,
  },
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [copied, setCopied] = useState(false);
  const [nepalTime, setNepalTime] = useState<string>("");

  const [activeSuite, setActiveSuite] = useState<SuiteId>("playwright");
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(3);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kathmandu",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setNepalTime(timeStr);
      } catch {
        setNepalTime("Pokhara Time");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("nirvaya22@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleRunSuite = (suiteKey = activeSuite) => {
    if (isRunning) return;
    setIsRunning(true);
    setProgress(15);
    setCompletedSteps(0);

    setTimeout(() => {
      setProgress(45);
      setCompletedSteps(1);
    }, 280);

    setTimeout(() => {
      setProgress(75);
      setCompletedSteps(2);
    }, 560);

    setTimeout(() => {
      setProgress(100);
      setCompletedSteps(3);
      setIsRunning(false);
    }, 850);
  };

  const handleSelectSuite = (key: SuiteId) => {
    setActiveSuite(key);
    handleRunSuite(key);
  };

  const fadeInUp = (delay: number) => ({
    initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: prefersReducedMotion ? 0.2 : 0.45, ease: [0.16, 1, 0.3, 1] as const },
  });

  const currentSuite = testSuites[activeSuite];

  return (
    <section className="hero-section section-shell" id="home">
      {/* Top Status & Live Location Bar */}
      <motion.div className="hero-top-status-bar" {...fadeInUp(0.05)}>
        <div className="hero-status-left">
          <span className="hero-status-tag">
            <span className="live-pulse-dot" />
            <span>Open to QA Roles</span>
          </span>

          <span className="hero-grad-tag">
            <GraduationCap size={13} style={{ color: "#38bdf8" }} />
            <span>2026 Graduate</span>
          </span>
        </div>

        <div className="hero-status-right">
          <span className="hero-time-pill" title="Live Local Time in Pokhara, Nepal (UTC+5:45)">
            <MapPin size={12} style={{ color: "#34d399" }} />
            <span>Pokhara, Nepal</span>
            <span className="hero-time-sep">·</span>
            <Clock size={12} style={{ color: "#38bdf8" }} />
            <span className="hero-live-clock">{nepalTime || "Loading..."} NPT</span>
          </span>
        </div>
      </motion.div>

      <div className="hero-grid">
        {/* Left Column: Clear Humanized Intro */}
        <div className="hero-copy">
          <motion.div className="hero-eyebrow-chip" style={{ width: "fit-content", alignSelf: "flex-start" }} {...fadeInUp(0.15)}>
            <Sparkles size={13} style={{ color: "#38bdf8" }} />
            <span>Practical Quality Assurance &amp; Test Automation</span>
          </motion.div>

          <motion.h1 className="hero-title" {...fadeInUp(0.2)}>
            NIRVAYA LIGAL
          </motion.h1>

          <motion.div className="hero-subtitle" {...fadeInUp(0.25)}>
            QA Engineer · Software Tester
          </motion.div>

          <motion.div className="hero-skills-headline" {...fadeInUp(0.3)}>
            Manual QA · Playwright Automation · REST APIs · Oracle SQL
          </motion.div>

          <motion.div className="hero-description" {...fadeInUp(0.35)}>
            <p className="hero-desc-lead">
              2026 graduate building reliable software through thoughtful manual testing, Playwright automation, and clear defect reporting.
            </p>
            <p className="hero-desc-sub">
              Hands-on testing experience on <strong>USPS</strong> at TechStaffing Hub, and <strong>Nepal Red Cross Society Blood Bank</strong> and <strong>NIMS</strong> educational platform at Skybase.
            </p>
            <p className="hero-desc-tools">
              Skilled in Playwright (TypeScript &amp; POM), smoke and exploratory testing, 60+ API tests in Postman, Oracle SQL database verification, and Jenkins on Unix.
            </p>
          </motion.div>

          <motion.div className="hero-actions" {...fadeInUp(0.4)}>
            <a className="btn btn-primary" href="#projects">
              View Projects <ArrowDown size={16} />
            </a>
            <a className="btn btn-secondary" href="#playbook">
              <ShieldCheck size={16} /> QA Mindset
            </a>
            <a className="btn btn-secondary" href="#contact">
              <Mail size={16} /> Contact Me
            </a>

            <div className="hero-social-strip">
              <a
                className="footer-icon-btn"
                href="https://github.com/MrVaya"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub: MrVaya"
                aria-label="GitHub Profile"
              >
                <GitHubIcon size={16} />
              </a>
              <a
                className="footer-icon-btn"
                href="https://www.linkedin.com/in/ligal-nirvaya/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <LinkedInIcon size={16} />
              </a>
              <button
                className="footer-icon-btn"
                type="button"
                onClick={handleCopyEmail}
                title={copied ? "Email copied!" : "Copy email address"}
                aria-label="Copy Email"
              >
                {copied ? <Check size={15} style={{ color: "#34d399" }} /> : <Copy size={15} />}
              </button>
            </div>
          </motion.div>

          {/* Core Skills & Badges */}
          <motion.div className="hero-badges-row" {...fadeInUp(0.45)}>
            <span className="hero-badges-label">Core Skills &amp; Everyday Tools</span>
            <div className="hero-badges-list">
              {verifiedPills.map((pill) => (
                <span
                  className="badge-chip hero-colored-chip"
                  key={pill.label}
                  style={{
                    borderColor: `${pill.accent}33`,
                    background: `${pill.accent}0d`,
                  }}
                >
                  <span
                    className="chip-dot"
                    style={{ background: pill.accent, boxShadow: `0 0 6px ${pill.accent}` }}
                  />
                  {pill.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Interactive Test Runner */}
        <motion.div
          className="hero-visual-container"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        >
          {/* Live Interactive Test Execution Console */}
          <div className="terminal-card">
            {/* Header with Title and Dots */}
            <div className="terminal-header">
              <div className="terminal-dots">
                <i className="dot-red" />
                <i className="dot-yellow" />
                <i className="dot-green" />
              </div>
              <span className="terminal-title">{currentSuite.runnerTitle}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span className="terminal-live-badge">
                  <span className="live-pulse-dot" /> LIVE RUNNER
                </span>
                <Terminal size={13} style={{ color: "#64748b" }} />
              </div>
            </div>

            {/* Interactive Suite Tabs Row with Touch Scroll */}
            <div className="terminal-tabs-row">
              {(Object.keys(testSuites) as SuiteId[]).map((key) => {
                const s = testSuites[key];
                const isActive = activeSuite === key;
                return (
                  <button
                    type="button"
                    key={key}
                    className={`terminal-tab-btn ${isActive ? "active" : ""}`}
                    onClick={() => handleSelectSuite(key)}
                    style={{
                      borderColor: isActive ? s.badgeColor : undefined,
                      color: isActive ? "#ffffff" : undefined,
                    }}
                    title={`Switch to ${s.tabName}`}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: s.badgeColor,
                        marginRight: "6px",
                      }}
                    />
                    {s.tabName}
                  </button>
                );
              })}

              <button
                type="button"
                className="terminal-run-btn"
                onClick={() => handleRunSuite()}
                disabled={isRunning}
                title="Execute test simulation"
              >
                {isRunning ? (
                  <>
                    <Loader2 size={11} className="animate-spin" /> Running...
                  </>
                ) : (
                  <>
                    <Play size={11} fill="currentColor" /> Run Suite
                  </>
                )}
              </button>
            </div>

            {/* Live Progress Bar */}
            <div className="terminal-progress-track">
              <div
                className="terminal-progress-bar"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${currentSuite.badgeColor}, #38bdf8)`,
                }}
              />
            </div>

            {/* Terminal Body */}
            <div className="terminal-body">
              <div className="terminal-command">
                <span style={{ color: currentSuite.badgeColor }}>$</span>{" "}
                <span>{currentSuite.command}</span>
              </div>
              <div className="terminal-status-lead">
                {isRunning ? "Executing automated test suite..." : "Ready to execute · 3 specs loaded"}
              </div>

              {currentSuite.specs.map((spec, index) => {
                const isPassed = completedSteps > index;
                const isCurrent = completedSteps === index && isRunning;

                return (
                  <div
                    key={spec.name}
                    className={`terminal-row ${
                      isPassed
                        ? "terminal-row-success"
                        : isCurrent
                          ? "terminal-row-running"
                          : "terminal-row-pending"
                    }`}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
                      {isPassed ? (
                        <CheckCircle2 size={13} style={{ color: currentSuite.badgeColor, flexShrink: 0 }} />
                      ) : isCurrent ? (
                        <Loader2 size={12} className="animate-spin" style={{ color: "#38bdf8", flexShrink: 0 }} />
                      ) : (
                        <span style={{ opacity: 0.4, flexShrink: 0 }}>○</span>
                      )}
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{spec.name}</span>
                    </span>

                    <span className="terminal-time" style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                      {isPassed ? (
                        <>
                          <span
                            className="spec-tag"
                            style={{
                              color: currentSuite.badgeColor,
                              background: `${currentSuite.badgeColor}15`,
                              borderColor: `${currentSuite.badgeColor}30`,
                            }}
                          >
                            {spec.status}
                          </span>
                          <span>{spec.time}</span>
                        </>
                      ) : isCurrent ? (
                        <span style={{ color: "#38bdf8" }}>evaluating...</span>
                      ) : (
                        <span>queued</span>
                      )}
                    </span>
                  </div>
                );
              })}

              <div className="terminal-summary-bar">
                <span>
                  {isRunning ? (
                    <span style={{ color: "#38bdf8" }}>Running specs...</span>
                  ) : (
                    <span>
                      <strong style={{ color: currentSuite.badgeColor }}>PASS</strong> 3 specs passed
                    </span>
                  )}
                </span>
                <span className="terminal-exit-pill">
                  {isRunning ? (
                    <span style={{ color: "#38bdf8" }}>RUNNING</span>
                  ) : (
                    <span style={{ color: "#34d399" }}>EXIT CODE 0</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4-Card Quick Impact & Metrics Strip */}
      <motion.div className="hero-stats-strip" {...fadeInUp(0.55)}>
        {impactMetrics.map((item) => {
          const Icon = item.icon;
          return (
            <div className="hero-stat-card" key={item.label}>
              <div className="hero-stat-card-top">
                <span className="hero-stat-num" style={{ color: item.color }}>
                  {item.value}
                </span>
                <div
                  className="hero-stat-icon-wrap"
                  style={{
                    color: item.color,
                    background: `${item.color}14`,
                    borderColor: `${item.color}28`,
                  }}
                >
                  <Icon size={16} />
                </div>
              </div>
              <div className="hero-stat-label">{item.label}</div>
              <div className="hero-stat-sub">{item.desc}</div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
