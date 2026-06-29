import { TriangleAlert, BarChart3 } from "lucide-react";
import TopBar from "../components/TopBar";
import PatternCard from "../components/PatternCard";
import ApproachChart from "../components/ApproachChart";
import { patternCards, criticalWeakZones, patternAffinities } from "../data/mockData";

export default function SkillMap() {
  return (
    <>
      <TopBar title="Growth Dashboard" tabs={["Streaks", "Solves", "Metrics"]} />
      <div className="page-content">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="page-title">Pattern Analysis</h1>
            <p className="page-subtitle">Diagnostics & structural approach mapping.</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.5px" }}>
              Overall Competence
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--accent-amber)",
              }}
            >
              68.4%
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 16 }}>
          {/* Left column */}
          <div className="flex flex-col gap-4">

            {/* Pattern Mastery cards */}
            <div className="card">
              <div className="section-header">
                <div className="section-title">
                  <BarChart3 size={14} color="var(--accent-amber)" />
                  Pattern Mastery
                </div>
              </div>
              <div className="grid-2">
                {patternCards.map((card) => (
                  <PatternCard key={card.id} {...card} />
                ))}
              </div>
            </div>

            {/* Approach Distribution */}
            <div className="card">
              <div className="section-header">
                <div className="section-title">
                  <BarChart3 size={14} color="var(--accent-amber)" />
                  Approach Distribution (Last 50 Solves)
                </div>
              </div>
              <ApproachChart />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">

            {/* Critical Weak Zones */}
            <div className="card" style={{ borderColor: "rgba(231,76,60,0.2)" }}>
              <div className="section-title mb-3">
                <TriangleAlert size={13} color="var(--accent-red)" />
                <span style={{ color: "var(--accent-red)" }}>Critical Weak Zones</span>
              </div>
              {criticalWeakZones.map(({ label, mastery }) => (
                <div key={label} className="critical-zone-item">
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--text-primary)" }}>
                      {label}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--accent-red)", marginTop: 2 }}>
                      {mastery}% Mastery
                    </div>
                  </div>
                  <button className="btn btn-outline" style={{ fontSize: "10.5px", padding: "4px 10px" }}>
                    Practice
                  </button>
                </div>
              ))}
            </div>

            {/* Pattern Affinity */}
            <div className="card">
              <div className="section-title mb-3" style={{ fontSize: 12 }}>
                <span style={{ fontSize: 13 }}>⟡</span>
                Pattern Affinity (Heuristics)
              </div>
              {patternAffinities.map((text, i) => (
                <div key={i} className="affinity-item">
                  <span style={{ color: "var(--accent-cyan)", fontFamily: "var(--font-mono)", marginRight: 4 }}>
                    &gt;
                  </span>
                  {/* Render code spans */}
                  {text.split(/(`[^`]+`)/g).map((part, j) =>
                    part.startsWith("`") ? (
                      <code key={j}>{part.slice(1, -1)}</code>
                    ) : (
                      part
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
