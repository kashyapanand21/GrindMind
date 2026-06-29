// Difficulty badge
export function DifficultyBadge({ level }) {
  const cls = {
    Easy: "badge badge-easy",
    Medium: "badge badge-medium",
    Hard: "badge badge-hard",
  }[level] || "badge";
  return <span className={cls}>{level}</span>;
}

// Status badge (Optimal / Sub-optimal)
export function StatusBadge({ status }) {
  if (!status) return null;
  const isOpt = status.toLowerCase().includes("optimal") && !status.toLowerCase().includes("sub");
  return (
    <span className={isOpt ? "badge badge-optimal" : "badge badge-suboptimal"}>
      {isOpt ? "✓ " : "↘ "}
      {status}
    </span>
  );
}

// Pattern tag
export function PatternBadge({ label }) {
  return <span className="badge badge-pattern">{label}</span>;
}

// Complexity badge (cyan mono)
export function ComplexityBadge({ value }) {
  return <span className="badge badge-cyan">{value}</span>;
}

// Priority badge for revision queue
export function PriorityBadge({ level }) {
  const colors = {
    Critical: "badge-hard",
    High: "badge-medium",
    Medium: "badge badge-easy",
  };
  return <span className={`badge ${colors[level] || "badge"}`}>{level}</span>;
}
