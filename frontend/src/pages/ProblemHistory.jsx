import { useState } from "react";
import { CheckCircle, TriangleAlert, Info, ChevronDown, ChevronRight, Wrench, GitCompare } from "lucide-react";
import TopBar from "../components/TopBar";
import { DifficultyBadge } from "../components/Badges";
import { problemHistory } from "../data/mockData";

const noteIcon = {
  success: <CheckCircle size={13} color="var(--accent-green)" />,
  warning: <TriangleAlert size={13} color="var(--accent-amber)" />,
  info: <Info size={13} color="var(--accent-cyan)" />,
};

const noteColor = {
  success: "var(--accent-green)",
  warning: "var(--accent-amber)",
  info: "var(--accent-cyan)",
};

export default function ProblemHistory() {
  const [expanded, setExpanded] = useState(146); // LRU Cache starts expanded
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    { label: "Arrays", count: 42 },
    { label: "DP", count: 18 },
    { label: "Graphs", count: 24 },
  ];

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  const codeLines = [
    { text: "def put(self, key: int, value: int) -> None:", highlight: false },
    { text: "    if key in self.cache:", highlight: false },
    { text: "        self.remove(self.cache[key])", highlight: false },
    { text: "    node = Node(key, value)", highlight: false },
    { text: "    self.insert(node)", highlight: false },
    { text: "    self.cache[key] = node", highlight: false },
    { text: "    if len(self.cache) > self.capacity:", highlight: false },
    { text: "        lru = self.left.next", highlight: false },
    { text: "        self.remove(lru)  # High overhead on eviction", highlight: true },
    { text: "        del self.cache[lru.key]", highlight: false },
  ];

  return (
    <>
      <TopBar title="Growth Dashboard" tabs={["Streaks", "Solves", "Metrics"]} activeTab="Solves" />
      <div className="page-content">
        {/* Header */}
        <div className="mb-4">
          <h1 className="page-title">Analysis History</h1>
          <p className="page-subtitle">Review past implementations and agent optimization notes.</p>

          {/* Filter chips */}
          <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
            {filters.map(({ label, count }) => (
              <button
                key={label}
                className="filter-chip"
                onClick={() => setActiveFilter(label)}
                style={activeFilter === label ? {
                  borderColor: "var(--accent-amber)",
                  color: "var(--accent-amber)",
                  background: "var(--accent-amber-dim2)"
                } : {}}
              >
                {label}
                <span className="filter-chip-count">({count})</span>
              </button>
            ))}
            <button className="filter-chip">
              ≡ More
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="data-table" style={{ width: "100%" }}>
            <thead>
              <tr style={{ background: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px" }}>Problem</th>
                <th style={{ padding: "12px 8px" }}>Difficulty</th>
                <th style={{ padding: "12px 8px" }}>Pattern Tag</th>
                <th style={{ padding: "12px 8px" }}>Complexity (T / S)</th>
                <th style={{ padding: "12px 8px" }}>Agent Note</th>
              </tr>
            </thead>
            <tbody>
              {problemHistory.map((row) => (
                <>
                  <tr
                    key={row.id}
                    onClick={() => toggle(row.number)}
                    style={{ cursor: "pointer" }}
                  >
                    <td style={{ padding: "12px 16px" }}>
                      <div className="flex items-center gap-2">
                        {expanded === row.number
                          ? <ChevronDown size={13} color="var(--accent-amber)" />
                          : <ChevronRight size={13} color="var(--text-muted)" />
                        }
                        <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)", fontWeight: 500 }}>
                          {row.number}. {row.title}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <DifficultyBadge level={row.difficulty} />
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <span style={{
                        fontSize: "11px",
                        color: "var(--text-secondary)",
                        fontFamily: "var(--font-mono)"
                      }}>
                        {row.pattern}
                      </span>
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <span style={{
                        fontSize: "11px",
                        fontFamily: "var(--font-mono)",
                        color: "var(--text-secondary)"
                      }}>
                        {row.timeComplexity} / {row.spaceComplexity}
                      </span>
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <div className="flex items-center gap-2">
                        {noteIcon[row.agentNoteType]}
                        <span style={{ fontSize: "12px", color: noteColor[row.agentNoteType] }}>
                          {row.agentNote}
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Analysis Row */}
                  {expanded === row.number && row.agentAnalysis && (
                    <tr key={`expanded-${row.id}`}>
                      <td colSpan={5} style={{ padding: "0 16px 16px" }}>
                        <div className="expanded-row">
                          {/* Agent Analysis Header */}
                          <div className="flex items-center gap-2 mb-3">
                            <div
                              style={{
                                width: 22,
                                height: 22,
                                borderRadius: 4,
                                background: "var(--accent-amber-dim)",
                                border: "1px solid rgba(245,166,35,0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Wrench size={11} color="var(--accent-amber)" />
                            </div>
                            <span
                              style={{
                                fontSize: "11px",
                                fontFamily: "var(--font-mono)",
                                color: "var(--text-muted)",
                                letterSpacing: "0.5px",
                              }}
                            >
                              Agent Analysis Output
                            </span>
                          </div>
                          <p style={{ fontSize: "12.5px", color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.7 }}>
                            {row.agentAnalysis}
                          </p>

                          {/* Code + Optimization side-by-side */}
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 14 }}>
                            {/* Code block */}
                            <div>
                              <div
                                style={{
                                  fontSize: "10px",
                                  color: "var(--text-muted)",
                                  fontFamily: "var(--font-mono)",
                                  letterSpacing: "0.5px",
                                  marginBottom: 6,
                                }}
                              >
                                Your Implementation
                              </div>
                              <div className="code-block">
                                {codeLines.map((line, i) => (
                                  <span
                                    key={i}
                                    className={`code-line${line.highlight ? " highlight" : ""}`}
                                  >
                                    {line.text}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Optimization Strategy */}
                            <div
                              style={{
                                background: "#0a1214",
                                border: "1px solid rgba(0,212,212,0.15)",
                                borderRadius: 8,
                                padding: 14,
                              }}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <div
                                  style={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: 3,
                                    background: "var(--accent-cyan-dim)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Wrench size={10} color="var(--accent-cyan)" />
                                </div>
                                <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)" }}>
                                  Optimization Strategy
                                </span>
                              </div>
                              <p style={{ fontSize: "11.5px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 12 }}>
                                {row.optimizationStrategy}
                              </p>
                              <div className="flex gap-2">
                                <button className="btn btn-outline" style={{ fontSize: "11px" }}>
                                  <Wrench size={11} />
                                  Apply Fix
                                </button>
                                <button className="btn btn-outline" style={{ fontSize: "11px" }}>
                                  <GitCompare size={11} />
                                  View diff
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
