"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const quickTemplates = [
  { label: "QA Testing Inquiry", subject: "QA Testing / Test Automation Inquiry" },
  { label: "Contract / Remote Role", subject: "Remote QA / Software Tester Opportunity" },
  { label: "Manual QA / Triage", subject: "Functional QA & Defect Reporting" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopy = () => {
    navigator.clipboard.writeText("nirvaya22@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSelectTemplate = (subject: string) => {
    setFormData((prev) => ({ ...prev, subject }));
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(
      formData.subject || `QA Inquiry from ${formData.name || "Portfolio Visitor"}`
    );
    const body = encodeURIComponent(
      `Hello Nirvaya,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n`
    );
    return `mailto:nirvaya22@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // 1. Try submitting through our Next.js API route first (which relays directly to FormSubmit)
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setSubmitted(true);
        return;
      }

      // 2. Direct client fallback if API route encountered issues
      const directRes = await fetch("https://formsubmit.co/ajax/nirvaya22@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject || `[QA Inquiry] New message from ${formData.name}`,
          message: formData.message,
          _captcha: "false",
          _template: "table",
        }),
      });

      const directData = await directRes.json().catch(() => null);

      if (directRes.ok && (directData?.success === "true" || directData?.success === true)) {
        setSubmitted(true);
      } else {
        throw new Error(data?.error || directData?.message || "Could not deliver email.");
      }
    } catch (err: unknown) {
      console.error("Contact send error:", err);
      setErrorMessage(
        "Could not send automatically via the form service. You can send directly using your email client with the button below."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="content-section section-shell" id="contact">
      <div className="contact-card-shell">
        <div className="contact-layout">
          {/* Left Column: Direct Info */}
          <div className="contact-info-side">
            <div className="eyebrow">
              <span />
              05 / Contact
            </div>
            <h2>Let&apos;s Connect.</h2>
            <p>
              I am open to QA, software testing, and junior QA automation opportunities where I can
              contribute to product quality while continuing to grow toward SDET and automation engineering.
            </p>

            <div className="contact-direct-links">
              <div className="contact-link-row" style={{ cursor: "pointer" }} onClick={handleCopy}>
                <div className="contact-link-left">
                  <Mail size={18} />
                  <span>nirvaya22@gmail.com</span>
                </div>
                {copied ? (
                  <span
                    style={{
                      color: "#34d399",
                      fontSize: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Check size={14} /> Copied!
                  </span>
                ) : (
                  <Copy size={15} style={{ color: "#64748b" }} />
                )}
              </div>

              <a
                className="contact-link-row"
                href="https://www.linkedin.com/in/ligal-nirvaya/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact-link-left">
                  <LinkedInIcon size={18} />
                  <span>linkedin.com/in/ligal-nirvaya</span>
                </div>
                <ArrowRight size={15} style={{ color: "#64748b" }} />
              </a>

              <a
                className="contact-link-row"
                href="https://github.com/MrVaya"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact-link-left">
                  <GitHubIcon size={18} />
                  <span>github.com/MrVaya</span>
                </div>
                <ArrowRight size={15} style={{ color: "#64748b" }} />
              </a>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.78rem",
                  color: "#94a3b8",
                  marginTop: "16px",
                  paddingLeft: "4px",
                }}
              >
                <MapPin size={14} style={{ color: "#38bdf8" }} />
                <span>Based in Pokhara, Nepal · Available for Global Remote Work</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-side">
            {submitted ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  textAlign: "center",
                  padding: "40px 20px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    width: "60px",
                    height: "60px",
                    placeItems: "center",
                    borderRadius: "50%",
                    background: "rgba(16, 185, 129, 0.15)",
                    border: "1px solid rgba(16, 185, 129, 0.35)",
                    color: "#34d399",
                    marginBottom: "20px",
                    boxShadow: "0 0 24px rgba(16, 185, 129, 0.2)",
                  }}
                >
                  <Check size={32} />
                </div>
                <h3 style={{ color: "#ffffff", fontSize: "1.45rem", margin: "0 0 10px" }}>
                  Message Sent Successfully!
                </h3>
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.92rem",
                    maxWidth: "360px",
                    margin: "0 0 24px",
                    lineHeight: 1.6,
                  }}
                >
                  Thank you, <strong style={{ color: "#ffffff" }}>{formData.name}</strong>. Your note
                  has been sent directly to <span style={{ color: "#38bdf8" }}>nirvaya22@gmail.com</span>.
                  I will get back to you within 1 business day.
                </p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                  >
                    Send Another Note
                  </button>
                  <a
                    className="btn btn-secondary"
                    href={getMailtoUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={14} /> Open in Email App
                  </a>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {/* Quick Topic Chips */}
                <div style={{ marginBottom: "16px" }}>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: "#94a3b8",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      marginBottom: "8px",
                    }}
                  >
                    <Sparkles size={12} style={{ color: "#38bdf8" }} /> Quick Topic:
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {quickTemplates.map((t) => (
                      <button
                        type="button"
                        key={t.label}
                        className="meta-chip"
                        style={{
                          cursor: "pointer",
                          borderColor: formData.subject === t.subject ? "#38bdf8" : undefined,
                          color: formData.subject === t.subject ? "#38bdf8" : undefined,
                          background:
                            formData.subject === t.subject ? "rgba(56, 189, 248, 0.1)" : undefined,
                        }}
                        onClick={() => handleSelectTemplate(t.subject)}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {errorMessage && (
                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: "8px",
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      fontSize: "0.82rem",
                      color: "#fca5a5",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      marginBottom: "12px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                      <AlertCircle size={16} style={{ color: "#ef4444", flexShrink: 0, marginTop: "2px" }} />
                      <span>{errorMessage}</span>
                    </div>
                    <a
                      href={getMailtoUrl()}
                      className="btn btn-secondary"
                      style={{
                        alignSelf: "flex-start",
                        fontSize: "0.76rem",
                        padding: "6px 12px",
                        height: "auto",
                      }}
                    >
                      <Mail size={13} /> Send via Email Client
                    </a>
                  </div>
                )}

                <div className="form-field">
                  <label htmlFor="form-name">Your Name</label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="form-email">Your Email</label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="form-subject">Subject / Project Scope</label>
                  <input
                    id="form-subject"
                    type="text"
                    placeholder="e.g. Automated QA testing for web app"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="form-message">Message</label>
                  <textarea
                    id="form-message"
                    rows={4}
                    required
                    placeholder="Tell me about your product, testing timeline, or QA needs..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSubmitting}
                    style={{ width: "100%", height: "44px", justifyContent: "center" }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending Message...
                      </>
                    ) : (
                      <>
                        <Send size={15} /> Send Message
                      </>
                    )}
                  </button>

                  <div style={{ textAlign: "center", fontSize: "0.75rem", color: "#64748b", marginTop: "4px" }}>
                    Or email directly:{" "}
                    <a
                      href={getMailtoUrl()}
                      style={{ color: "#38bdf8", textDecoration: "underline" }}
                    >
                      nirvaya22@gmail.com
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
