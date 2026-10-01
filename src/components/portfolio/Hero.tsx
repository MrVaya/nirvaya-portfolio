"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  Check,
  Copy,
  Mail,
  MapPin,
  ShieldCheck,
  Terminal,
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
  "Manual Testing",
  "REST API Testing",
  "Playwright (TS)",
  "Postman",
  "SQL Validation",
  "Defect Reporting",
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("nirvaya22@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const fadeInUp = (delay: number) => ({
    initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: prefersReducedMotion ? 0.2 : 0.45, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="hero-section section-shell" id="home">
      <div className="hero-grid">
        {/* Left Column: Authoritative Copy */}
        <div className="hero-copy">
          <motion.div className="hero-availability" {...fadeInUp(0.1)}>
            <span className="status-pill">
              <span className="status-pill-dot" />
              <span>Open to QA / Software Testing Opportunities · Pokhara / Remote</span>
            </span>
          </motion.div>

          <motion.h1 className="hero-title" {...fadeInUp(0.2)}>
            NIRVAYA LIGAL
          </motion.h1>

          <motion.div className="hero-subtitle" {...fadeInUp(0.3)}>
            QA Engineer | Software Tester
          </motion.div>

          <motion.div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "#38bdf8",
              marginTop: "8px",
              letterSpacing: "0.04em",
            }}
            {...fadeInUp(0.35)}
          >
            Manual Testing · API Testing · Test Automation
          </motion.div>

          <motion.div className="hero-description" {...fadeInUp(0.4)}>
            <p style={{ margin: "0 0 12px", color: "#f1f5f9", fontWeight: 500 }}>
              Building confidence in software through thoughtful testing, practical automation, and clear defect reporting.
            </p>
            <p style={{ margin: "0 0 12px", fontSize: "0.95rem" }}>
              QA Engineer with hands-on experience in manual exploratory testing, REST API validation in Postman, and automated regression testing using Playwright and TypeScript.
            </p>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "#94a3b8" }}>
              Experienced with SQL database checks, bug tracking in Jira and ClickUp, and disciplined professional operations.
            </p>
          </motion.div>

          <motion.div className="hero-actions" {...fadeInUp(0.5)}>
            <a className="btn btn-primary" href="#projects">
              View Projects <ArrowDown size={16} />
            </a>
            <a className="btn btn-secondary" href="#contact">
              <Mail size={16} /> Contact Me
            </a>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "4px" }}>
              <a
                className="footer-icon-btn"
                href="https://github.com/MrVaya"
                target="_blank"
                rel="noreferrer"
                title="GitHub: MrVaya"
                aria-label="GitHub Profile"
              >
                <GitHubIcon size={16} />
              </a>
              <a
                className="footer-icon-btn"
                href="https://www.linkedin.com/in/ligal-nirvaya/"
                target="_blank"
                rel="noreferrer"
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

          <motion.div className="hero-badges-row" {...fadeInUp(0.6)}>
            <span className="hero-badges-label">Core Capabilities &amp; Technical Stack</span>
            <div className="hero-badges-list">
              {verifiedPills.map((pill) => (
                <span className="badge-chip" key={pill}>
                  <ShieldCheck size={13} style={{ color: "#38bdf8" }} />
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Headshot & Verification Console */}
        <motion.div
          className="hero-visual-container"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        >
          {/* Framed Headshot Card */}
          <div className="portrait-card">
            <div className="portrait-image-wrapper">
              <Image
                src="/portrait.jpg"
                alt="Nirvaya Ligal - QA Engineer & Software Tester"
                width={600}
                height={600}
                priority
                className="portrait-image"
              />
              <div className="portrait-gradient-overlay" />
              <div className="portrait-meta-bar">
                <div>
                  <strong>Nirvaya Ligal</strong>
                  <span>
                    <MapPin size={12} /> Pokhara, Nepal
                  </span>
                </div>
                <span className="badge-chip" style={{ fontSize: "0.68rem" }}>
                  QA / Software Testing
                </span>
              </div>
            </div>
          </div>

          {/* Realistic Test Execution Console */}
          <div className="terminal-card">
            <div className="terminal-header">
              <div className="terminal-dots">
                <i className="dot-red" />
                <i className="dot-yellow" />
                <i className="dot-green" />
              </div>
              <span className="terminal-title">playwright-runner — bash</span>
              <Terminal size={13} style={{ color: "#64748b" }} />
            </div>
            <div className="terminal-body">
              <div className="terminal-command">
                $ <span>npx playwright test</span>
              </div>
              <div style={{ color: "#94a3b8", fontSize: "0.7rem", marginBottom: "6px" }}>
                Running regression suite...
              </div>
              <div className="terminal-row terminal-row-success">
                <span>✓ e2e/auth-session.spec.ts</span>
                <span className="terminal-time">passed</span>
              </div>
              <div className="terminal-row terminal-row-success">
                <span>✓ e2e/navigation-flows.spec.ts</span>
                <span className="terminal-time">passed</span>
              </div>
              <div className="terminal-row terminal-row-success">
                <span>✓ api/payload-validation.spec.ts</span>
                <span className="terminal-time">passed</span>
              </div>
              <div className="terminal-row terminal-row-success">
                <span>✓ db/consistency-check.spec.ts</span>
                <span className="terminal-time">passed</span>
              </div>
              <div className="terminal-summary-bar">
                <span>Test run completed successfully</span>
                <span>STATUS: PASSED</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
