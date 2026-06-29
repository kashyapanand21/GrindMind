import { useState } from "react";
import { Clock, RefreshCw, TriangleAlert, ChevronRight } from "lucide-react";
import TopBar from "../components/TopBar";
import { DifficultyBadge, PriorityBadge } from "../components/Badges";
import { revisionQueue } from "../data/realData";

export default function RevisionQueue() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Today", "Tomorrow", "Critical"];

  const filtered =
    filter === "All"
      ? revisionQueue
      : filter === "Critical"
      ? revisionQueue.filter((r) => r.priority === "Critical")
      : revisionQueue.filter((r) => r.nextReview === filter);

  const priorityColor = {
    Critical: "var(--accent-red)",
    High: "var(--accent-amber)",
    Medium: "var(--accent-cyan)",
  };

  return (
    <>
      <TopBar title="Revision Queue" />
      <div className="page-content">
        {/* Header */}
        <div className="mb-6">
          <h1 className="page-title">Revision Queue</h1>
          <p className="page-subtitle">
            Spaced repetition queue — {revisionQueue.length} problems scheduled
          </p>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
            {[
              { label: "Due Today", count: revisionQueue.filter(r => r.nextReview === "Today").length, color: "var(--accent-red)" },
              { label: "Due Tomorrow", count: revisionQueue.filter(r => r.nextReview === "Tomorrow").length, color: "var(--accent-amber)" },
              { label: "Upcoming", count: revisionQueue.filter(r => r.nextReview === "In 2 days").length, color: "var(--accent-cyan)" },
            ].map(({ label, count, color }) => (
              <div key={label} className="card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, fontFamily: "var(--font-mono)", fontWeight: 700, color }}>{count}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Filter chips */}
          <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
            {filters.map((f) => (
              <button
                key={f}
                className="filter-chip"
                onClick={() => setFilter(f)}
                style={
                  filter === f
                    ? { borderColor: "var(--accent-amber)", color: "var(--accent-amber)", background: "var(--accent-amber-dim2)" }
                    : {}
                }
              >
                {f === "Critical" && <TriangleAlert size={10} />}
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Queue List */}
        <div className="card">
          <table className="data-table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ width: 4 }} />
                <th>Problem</th>
                <th>Pattern</th>
                <th>Difficulty</th>
                <th>Attempts</th>
                <th>Priority</th>
                <th>Next Review</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} style={{ cursor: "pointer" }}>
                  <td>
                    <div
                      className={`priority-bar priority-${row.priority.toLowerCase()}`}
                      style={{ height: 36 }}
                    />
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{row.title}</span>
                  </td>
                  <td>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10.5px",
                        background: "var(--bg-input)",
                        border: "1px solid var(--border)",
                        borderRadius: 3,
                        padding: "2px 6px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {row.pattern}
                    </span>
                  </td>
                  <td><DifficultyBadge level={row.difficulty} /></td>
                  <td>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-secondary)" }}>
                      {row.attempts}x
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10.5px",
                        fontWeight: 600,
                        color: priorityColor[row.priority] || "var(--text-secondary)",
                      }}
                    >
                      {row.priority}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1" style={{ color: "var(--text-secondary)", fontSize: 12 }}>
                      <Clock size={11} />
                      {row.nextReview}
                    </div>
                  </td>
                  <td>
                    <ChevronRight size={14} color="var(--text-muted)" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
