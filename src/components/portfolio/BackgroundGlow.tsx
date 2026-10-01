"use client";

export default function BackgroundGlow() {
  return (
    <div className="background-layer" aria-hidden="true">
      <div className="tech-grid" />
      <div className="ambient-beam ambient-beam-primary" />
      <div className="ambient-beam ambient-beam-emerald" />
    </div>
  );
}
