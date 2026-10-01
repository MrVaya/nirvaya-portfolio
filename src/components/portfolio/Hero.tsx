"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  Check,
  Copy,
  FileDown,
  MapPin,
  ShieldCheck,
  Terminal,
} from "lucide-react";

const verifiedPills = [
  "Playwright E2E",
  "Postman API",
  "Manual Regression",
  "Mobile QA",
  "Bank Reconciliation",
  "TDS / ETDS Compliance",
  "SQL Queries",
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("nirvaya.ligal@gmail.com");
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
              <span>Available for QA &amp; Operations Roles · Pokhara / Remote</span>
            </span>
          </motion.div>

          <motion.h1 className="hero-title" {...fadeInUp(0.2)}>
            NIRVAYA LIGAL
          </motion.h1>

          <motion.div className="hero-subtitle" {...fadeInUp(0.3)}>
            Precision in Code. <span>Integrity in Numbers.</span>
          </motion.div>

          <motion.p className="hero-description" {...fadeInUp(0.4)}>
            Specialized QA Engineer &amp; Admin-Finance Specialist. I ensure digital
            applications ship defect-free through rigorous test automation (Playwright,
            Postman, API validation) while maintaining absolute financial accuracy through
            systematic reconciliation, TDS/ETDS compliance, and audit-ready records.
          </motion.p>

          <motion.div className="hero-actions" {...fadeInUp(0.5)}>
            <a className="btn btn-primary" href="#projects">
              Explore QA Suites <ArrowDown size={16} />
            </a>
            <a className="btn btn-secondary" href="/resume.pdf" download>
              <FileDown size={16} /> Download CV
            </a>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleCopyEmail}
              title="Click to copy email address"
            >
              {copied ? (
                <>
                  <Check size={16} style={{ color: "#10b981" }} />
                  <span style={{ color: "#34d399" }}>Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} /> Copy Email
                </>
              )}
            </button>
          </motion.div>

          <motion.div className="hero-badges-row" {...fadeInUp(0.6)}>
            <span className="hero-badges-label">Core Capabilities &amp; Verified Stack</span>
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

        {/* Right Column: Real Editorial Portrait & Verification Console */}
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
                alt="Nirvaya Ligal - QA Engineer & Finance Officer"
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
                  QA · Finance
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Test & Audit Verification Console */}
          <div className="terminal-card">
            <div className="terminal-header">
              <div className="terminal-dots">
                <i className="dot-red" />
                <i className="dot-yellow" />
                <i className="dot-green" />
              </div>
              <span className="terminal-title">verification-runner.sh — zsh</span>
              <Terminal size={13} style={{ color: "#64748b" }} />
            </div>
            <div className="terminal-body">
              <div className="terminal-command">
                $ <span>npx playwright test --project=chromium</span>
              </div>
              <div className="terminal-row terminal-row-success">
                <span>✓ e2e/auth-checkout.spec.ts (42 tests passed)</span>
                <span className="terminal-time">12.4s</span>
              </div>
              <div className="terminal-row terminal-row-success">
                <span>✓ api/payment-reconciliation.spec.ts (18 endpoints)</span>
                <span className="terminal-time">2.1s</span>
              </div>
              <div className="terminal-row terminal-row-success">
                <span>✓ audit/ledger-zero-diff.test.ts (balanced: $0.00 diff)</span>
                <span className="terminal-time">0.8s</span>
              </div>
              <div className="terminal-summary-bar">
                <span>PASS 3 suites, 60 tests passed</span>
                <span>STATUS: 0 DEFECTS</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
