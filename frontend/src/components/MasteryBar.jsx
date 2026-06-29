import { TriangleAlert } from "lucide-react";

export default function MasteryBar({ label, value, color, critical }) {
  return (
    <div className="mastery-row">
      <div className={`mastery-label${critical ? " critical" : ""}`}>
        {critical && <TriangleAlert size={11} />}
        {label}
      </div>
      <div className="mastery-track">
        <div
          className="mastery-fill"
          style={{
            width: `${value}%`,
            background: critical
              ? "var(--accent-red)"
              : value >= 80
              ? "var(--accent-amber)"
              : value >= 60
              ? "var(--accent-amber)"
              : "var(--accent-amber)",
          }}
        />
      </div>
      <div
        className="mastery-pct"
        style={{ color: critical ? "var(--accent-red)" : "var(--accent-amber)" }}
      >
        {value}%
      </div>
    </div>
  );
}
