import { useState, useMemo, useEffect } from "react";
import { Flame, CheckCircle, Clock, Settings2, Target, RefreshCw } from "lucide-react";
import TopBar from "../components/TopBar";
import SkillRadar from "../components/SkillRadar";
import MasteryBar from "../components/MasteryBar";
import AgentTable from "../components/AgentTable";
import RevisionCard from "../components/RevisionCard";
import { useBulkRecords } from "lemma-sdk/react";
import { lemmaClient } from "../lemma-client";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("STREAKS");

  const { records: rawSolvedProblems } = useBulkRecords({
    client: lemmaClient,
    podId: lemmaClient.podId,
    tableName: "solved_problems"
  });

  const { records: rawAnalyses } = useBulkRecords({
    client: lemmaClient,
    podId: lemmaClient.podId,
    tableName: "analyses"
  });

  const { records: rawSkillScores } = useBulkRecords({
    client: lemmaClient,
    podId: lemmaClient.podId,
    tableName: "skill_scores"
  });

  const { records: rawRevisionQueue } = useBulkRecords({
    client: lemmaClient,
    podId: lemmaClient.podId,
    tableName: "revision_queue"
  });

  const lcUsername = localStorage.getItem("leetcodeUsername");

  // Fetch live stats directly from LeetCode's public GraphQL API
  const [leetcodeStats, setLeetcodeStats] = useState(null);
  useEffect(() => {
    if (!lcUsername) return;
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          streak: submissionCalendar
        }
      }
    `;
    fetch("/leetcode-api", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Referer": "https://leetcode.com" },
      body: JSON.stringify({ query, variables: { username: lcUsername } })
    })
      .then(r => r.json())
      .then(data => {
        const stats = data?.data?.matchedUser?.submitStats?.acSubmissionNum || [];
        const total = stats.find(s => s.difficulty === "All")?.count || 0;
        const easy = stats.find(s => s.difficulty === "Easy")?.count || 0;
        const medium = stats.find(s => s.difficulty === "Medium")?.count || 0;
        const hard = stats.find(s => s.difficulty === "Hard")?.count || 0;
        setLeetcodeStats({ totalSolved: total, easy, medium, hard });
      })
      .catch(console.error);
  }, [lcUsername]);

  const solvedProblems = useMemo(() => {
    return lcUsername && rawSolvedProblems ? rawSolvedProblems.filter(r => r.username === lcUsername) : rawSolvedProblems;
  }, [rawSolvedProblems, lcUsername]);

  const analyses = useMemo(() => {
    return lcUsername && rawAnalyses ? rawAnalyses.filter(r => r.username === lcUsername) : rawAnalyses;
  }, [rawAnalyses, lcUsername]);

  const skillScores = useMemo(() => {
    return lcUsername && rawSkillScores ? rawSkillScores.filter(r => r.username === lcUsername) : rawSkillScores;
  }, [rawSkillScores, lcUsername]);

  const revisionQueue = useMemo(() => {
    return lcUsername && rawRevisionQueue ? rawRevisionQueue.filter(r => r.username === lcUsername) : rawRevisionQueue;
  }, [rawRevisionQueue, lcUsername]);

  const dashboardStats = useMemo(() => {
    return {
      currentStreak: 10, // Placeholder
      totalSolved: leetcodeStats?.totalSolved ?? solvedProblems?.length ?? 0,
      easy: leetcodeStats?.easy ?? 0,
      medium: leetcodeStats?.medium ?? 0,
      hard: leetcodeStats?.hard ?? 0,
      nextRevisionHours: 4, // Placeholder
      pendingRevisions: revisionQueue?.filter(r => r.status === "pending")?.length || 0
    };
  }, [leetcodeStats, solvedProblems, revisionQueue]);

  const masteryBars = useMemo(() => {
    if (!skillScores) return [];
    return skillScores.map(score => ({
      label: score.topic,
      value: score.score || 0,
      color: (score.score || 0) < 50 ? "#e74c3c" : "#f5a623",
      critical: (score.score || 0) < 50
    }));
  }, [skillScores]);

  const recentAnalysis = useMemo(() => {
    if (!analyses) return [];
    return [...analyses].reverse().slice(0, 3).map(a => ({
      id: a.id,
      problem: a.problem_slug,
      pattern: a.pattern_used || "Unknown",
      complexity: a.time_complexity || "-",
      status: a.approach_type || "Reviewed"
    }));
  }, [analyses]);

  const todaysRevision = useMemo(() => {
    if (!revisionQueue) return [];
    return revisionQueue.filter(r => r.status === "pending").map(r => ({
      id: r.id,
      title: r.problem_name || r.problem_slug,
      difficulty: "Medium", // Placeholder
      tag: "Review",
      timeAgo: "Recently",
      urgent: r.priority === "High",
      label: "Spaced Repetition"
    }));
  }, [revisionQueue]);

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
            {leetcodeStats && (
              <div style={{ fontSize: "10px", color: "var(--text-muted)", display: "flex", gap: 10, marginBottom: 6, fontFamily: "var(--font-mono)" }}>
                <span style={{ color: "var(--accent-green)" }}>E: {dashboardStats.easy}</span>
                <span style={{ color: "var(--accent-amber)" }}>M: {dashboardStats.medium}</span>
                <span style={{ color: "var(--accent-red)" }}>H: {dashboardStats.hard}</span>
              </div>
            )}
            <div className="stat-bar-multi">
              <div className="stat-bar-segment" style={{ background: "var(--accent-green)", flex: dashboardStats.easy || 1 }} />
              <div className="stat-bar-segment" style={{ background: "var(--accent-amber)", flex: dashboardStats.medium || 1 }} />
              <div className="stat-bar-segment" style={{ background: "var(--accent-red)", flex: dashboardStats.hard || 1 }} />
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
