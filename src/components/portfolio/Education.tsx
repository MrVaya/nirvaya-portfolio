import { GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section className="content-section section-shell" id="education">
      <div className="section-heading">
        <div className="eyebrow">
          <span />
          04 / Education
        </div>
        <h2>Education.</h2>
        <p>
          Academic foundation in computer information systems, database management, and software testing principles.
        </p>
      </div>

      <div style={{ maxWidth: "700px", marginTop: "32px" }}>
        <article className="matrix-card" style={{ padding: "30px" }}>
          <div className="matrix-card-header" style={{ justifyContent: "space-between" }}>
            <div
              style={{
                display: "grid",
                width: "44px",
                height: "44px",
                placeItems: "center",
                borderRadius: "12px",
                background: "rgba(56, 189, 248, 0.12)",
                color: "#38bdf8",
                border: "1px solid rgba(56, 189, 248, 0.25)",
              }}
            >
              <GraduationCap size={22} />
            </div>
            <span className="meta-chip meta-chip-highlight" style={{ fontSize: "0.72rem" }}>
              2026 Graduate
            </span>
          </div>

          <h3 style={{ margin: "0 0 6px", fontSize: "1.2rem", fontWeight: 700, color: "#ffffff" }}>
            Bachelor of Computer Information Systems (BCIS)
          </h3>
          <p style={{ margin: "0 0 14px", fontSize: "0.88rem", color: "#38bdf8", fontWeight: 500 }}>
            Pokhara College of Management · Pokhara University
          </p>
          <p className="matrix-card-copy" style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.65 }}>
            Coursework in software systems, database management (SQL), systems analysis, and web development. Graduating class of 2026.
          </p>
        </article>
      </div>
    </section>
  );
}
