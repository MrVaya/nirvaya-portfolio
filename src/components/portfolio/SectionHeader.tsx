import GradientText from "./GradientText";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  accent,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  accent?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "section-heading section-heading-center" : "section-heading"}>
      <div className="eyebrow"><span />{eyebrow}</div>
      <h2>{title} {accent ? <GradientText>{accent}</GradientText> : null}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
