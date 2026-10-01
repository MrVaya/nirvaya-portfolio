import { FileText, ShieldAlert, Target } from "lucide-react";

const valuePillars = [
  {
    icon: Target,
    title: "Zero-Assumption Verification",
    copy: "I never assume an API works or a balance is right until tested with edge data. Probing boundary conditions is second nature.",
    accent: "#38bdf8",
  },
  {
    icon: FileText,
    title: "High-Signal Communication",
    copy: "Bug reports formatted so engineers fix them immediately without back-and-forth, and financial records formatted for effortless audit sign-off.",
    accent: "#818cf8",
  },
  {
    icon: ShieldAlert,
    title: "Autonomous Accountability",
    copy: "High-trust independence. Whether handling release testing or month-end reconciliation, you can count on 100% thorough execution.",
    accent: "#34d399",
  },
];

export default function WhyMe() {
  return (
    <section className="content-section section-shell" id="value">
      <div className="section-heading">
        <div className="eyebrow eyebrow-accent">
          <span />
          06 / Value
        </div>
        <h2>Why This Combination Delivers Results.</h2>
        <p>
          The rare combination of technical test engineering and financial precision brings
          immediate stability to growing product teams and organizations.
        </p>
      </div>

      <div className="skills-matrix-grid">
        {valuePillars.map((item) => (
          <article className="matrix-card" key={item.title}>
            <div className="matrix-card-header">
              <div
                style={{
                  display: "grid",
                  width: "40px",
                  height: "40px",
                  placeItems: "center",
                  borderRadius: "10px",
                  background: `${item.accent}14`,
                  color: item.accent,
                  border: `1px solid ${item.accent}33`,
                }}
              >
                <item.icon size={20} />
              </div>
              <h3>{item.title}</h3>
            </div>
            <p className="matrix-card-copy">{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
