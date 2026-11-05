"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Download,
  FileDown,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";

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

const links = [
  { label: "Mindset", href: "#playbook" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <motion.header
      className={cn("site-nav", scrolled && "site-nav-scrolled")}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <div className="nav-inner">
        <a className="brand" href="#home" aria-label="Nirvaya Ligal home" onClick={handleNavClick}>
          <span className="brand-mark">NL</span>
          <span className="brand-copy">
            <strong>Nirvaya Ligal</strong>
            <small>QA Engineer · Software Tester</small>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop & Mobile Actions */}
        <div className="nav-actions">
          <span className="status-pill desktop-status-pill">
            <span className="status-pill-dot" />
            <span>Open to QA Roles</span>
          </span>

          <a
            className="btn btn-secondary desktop-resume-btn"
            style={{ height: "38px", fontSize: "0.78rem", padding: "0 14px" }}
            href="/resume.pdf"
            download
          >
            <FileDown size={14} /> Resume
          </a>

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-nav-toggle-btn"
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-nav-drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-nav-inner">
              <div className="mobile-nav-status">
                <span className="status-pill" style={{ width: "100%", justifyContent: "center" }}>
                  <span className="status-pill-dot" />
                  <span>Open to QA &amp; Software Testing Roles · 2026</span>
                </span>
              </div>

              <nav className="mobile-nav-links" aria-label="Mobile navigation">
                {links.map((link, idx) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="mobile-nav-link-item"
                    onClick={handleNavClick}
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={15} style={{ opacity: 0.5 }} />
                  </a>
                ))}
              </nav>

              <div className="mobile-nav-actions">
                <a
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center", height: "44px" }}
                  href="/resume.pdf"
                  download
                  onClick={handleNavClick}
                >
                  <Download size={16} /> Download Resume
                </a>

                <div className="mobile-nav-socials">
                  <a
                    className="footer-icon-btn"
                    href="https://github.com/MrVaya"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub: MrVaya"
                    aria-label="GitHub Profile"
                  >
                    <GitHubIcon size={18} />
                  </a>
                  <a
                    className="footer-icon-btn"
                    href="https://www.linkedin.com/in/ligal-nirvaya/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn Profile"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedInIcon size={18} />
                  </a>
                  <a
                    className="btn btn-secondary"
                    style={{ flex: 1, justifyContent: "center", height: "40px", fontSize: "0.82rem" }}
                    href="#contact"
                    onClick={handleNavClick}
                  >
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
