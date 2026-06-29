import { PatternBadge, StatusBadge } from "./Badges";

export default function AgentTable({ rows }) {
  return (
    <table className="data-table" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Problem</th>
          <th>Pattern Detected</th>
          <th>Complexity</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td style={{ color: "var(--text-primary)", fontWeight: 500 }}>{row.problem}</td>
            <td>
              <PatternBadge label={row.pattern} />
            </td>
            <td>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11.5px", color: "var(--text-secondary)" }}>
                {row.complexity}
              </span>
            </td>
            <td>
              <StatusBadge status={row.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
