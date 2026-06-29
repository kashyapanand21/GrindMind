import { useState } from "react";
import { Flame, CheckCircle, Clock, Settings2, Target, RefreshCw } from "lucide-react";
import TopBar from "../components/TopBar";
import SkillRadar from "../components/SkillRadar";
import MasteryBar from "../components/MasteryBar";
import AgentTable from "../components/AgentTable";
import RevisionCard from "../components/RevisionCard";
import {
  dashboardStats,
  masteryBars,
  recentAnalysis,
  todaysRevision,
} from "../data/realData";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("STREAKS");

  return (
    <>
      <TopBar
        title="Growth Dashboard"
        tabs={["STREAKS", "SOLVES", "METRICS"]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="page-content">

        {/* ── Top stat row ─────────────────────────────────────────────────── */}
        <div className="dashboard-grid">

          {/* Current Streak */}
          <div className="stat-card fade-in">
            <div className="stat-label">
              Current Streak
              <Flame size={14} color="var(--accent-amber)" />
            </div>
            <div className="flex items-center" style={{ gap: 6 }}>
              <span className="stat-value">{dashboardStats.currentStreak}</span>
              <span className="stat-unit">Days</span>
            </div>
            <div className="stat-bar" style={{ background: "var(--accent-amber)", width: "60%" }} />
          </div>

          {/* Total Solved */}
          <div className="stat-card fade-in">
            <div className="stat-label">
              Total Solved
              <CheckCircle size={14} color="var(--accent-cyan)" />
            </div>
            <div className="flex items-center" style={{ gap: 6 }}>
              <span className="stat-value">{dashboardStats.totalSolved}</span>
              <span className="stat-unit">Problems</span>
            </div>
            <div className="stat-bar-multi">
              <div className="stat-bar-segment" style={{ background: "var(--accent-cyan)", flex: 3 }} />
              <div className="stat-bar-segment" style={{ background: "var(--accent-amber)", flex: 2 }} />
              <div className="stat-bar-segment" style={{ background: "var(--accent-red)", flex: 1 }} />
            </div>
          </div>

          {/* Next Revision */}
          <div className="stat-card fade-in">
            <div className="stat-label">
              Next Revision
              <Clock size={14} color="var(--text-muted)" />
            </div>
            <div className="flex items-center" style={{ gap: 6 }}>
              <span className="stat-value" style={{ fontSize: 40 }}>
                {dashboardStats.nextRevisionHours}h
              </span>
              <span className="stat-unit">Until Queue Ready</span>
            </div>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: 8 }}>
              {dashboardStats.pendingRevisions} problems pending for spaced repetition
            </p>
          </div>
        </div>

        {/* ── Main content row ──────────────────────────────────────────────── */}
        <div className="dashboard-bottom">

          {/* Left: Skill Gap + Agent Analysis */}
          <div className="flex flex-col gap-4">

            {/* Skill Gap Analysis */}
            <div className="card fade-in">
              <div className="section-header">
                <div className="section-title">
                  <Settings2 size={15} color="var(--accent-amber)" />
                  Skill Gap Analysis
                </div>
                <button className="section-action">Detailed View</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <SkillRadar />
                <div style={{ paddingTop: 12 }}>
                  {masteryBars.map((bar) => (
                    <MasteryBar key={bar.label} {...bar} />
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Agent Analysis */}
            <div className="card fade-in">
              <div className="section-header">
                <div className="section-title">
                  <RefreshCw size={14} color="var(--accent-amber)" />
                  Recent Agent Analysis
                </div>
                <div className="live-sync">
                  <span className="live-sync-dot" />
                  Live Sync
                </div>
              </div>
              <AgentTable rows={recentAnalysis} />
            </div>
          </div>

          {/* Right: Today's Revision Panel */}
          <div className="flex flex-col gap-4">

            {/* Today's Revision */}
            <div className="card fade-in">
              <div className="section-header">
                <div className="section-title">
                  <Target size={14} color="var(--accent-amber)" />
                  Today's Revision
                </div>
                <span
                  style={{
                    background: "var(--accent-amber-dim)",
                    color: "var(--accent-amber)",
                    border: "1px solid rgba(245,166,35,0.3)",
                    borderRadius: 4,
                    padding: "2px 7px",
                    fontSize: "10px",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                  }}
                >
                  {dashboardStats.pendingRevisions} Pending
                </span>
              </div>

              {todaysRevision.map((item) => (
                <RevisionCard key={item.id} item={item} />
              ))}

              <button
                className="btn btn-outline w-full"
                style={{ marginTop: 16, justifyContent: "center" }}
              >
                Start Session →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
