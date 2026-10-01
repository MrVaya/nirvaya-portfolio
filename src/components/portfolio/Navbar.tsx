"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FileDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const links = [
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

  return (
    <motion.header
      className={cn("site-nav", scrolled && "site-nav-scrolled")}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <div className="nav-inner">
        <a className="brand" href="#home" aria-label="Nirvaya Ligal home">
          <span className="brand-mark">NL</span>
          <span className="brand-copy">
            <strong>Nirvaya Ligal</strong>
            <small>QA Engineer · Software Tester</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <span className="status-pill">
            <span className="status-pill-dot" />
            <span>Open to QA Roles</span>
          </span>
          <a
            className="btn btn-secondary"
            style={{ height: "38px", fontSize: "0.78rem", padding: "0 14px" }}
            href="/resume.pdf"
            download
          >
            <FileDown size={14} /> Resume
          </a>
          <button
            className="btn btn-secondary btn-icon-only"
            style={{ display: "none" }}
            id="mobile-nav-toggle"
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
