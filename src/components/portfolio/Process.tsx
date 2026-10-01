import { CheckCircle2, FileSearch, Layers, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Specification & Boundary Analysis",
    copy: "Review requirements, PRDs, and acceptance criteria. Map out high-risk user journeys, edge cases, and boundary data limits before development finishes.",
    icon: FileSearch,
  },
  {
    number: "02",
    title: "Test Architecture & Scripting",
    copy: "Build Page Object models for Playwright automated regression suites, configure Postman API assertions, and document detailed manual test matrices.",
    icon: Layers,
  },
  {
    number: "03",
    title: "Automated & Exploratory Execution",
    copy: "Execute automated cross-browser test suites, validate API response codes and payloads, and run responsive mobile exploratory testing.",
    icon: CheckCircle2,
  },
  {
    number: "04",
    title: "Defect Triage & Release Sign-Off",
    copy: "Log high-signal bug tickets with network payloads, console logs, and step-by-step reproduction videos. Retest fixes and prepare release readiness reports.",
    icon: ShieldCheck,
  },
];

export default function Process() {
  return (
    <section className="content-section section-shell" id="process">
      <div className="section-heading">
        <div className="eyebrow">
          <span />
          05 / Methodology
        </div>
        <h2>The Verification Lifecycle.</h2>
        <p>
          A disciplined, step-by-step engineering workflow ensuring digital applications ship
          defect-free and operational finances stay balanced.
        </p>
      </div>

      <div className="lifecycle-grid">
        {steps.map((step) => (
          <article className="lifecycle-step" key={step.number}>
            <span className="step-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
