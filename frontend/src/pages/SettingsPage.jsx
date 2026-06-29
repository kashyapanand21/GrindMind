import { Settings, BookOpen } from "lucide-react";
import TopBar from "../components/TopBar";

export default function SettingsPage() {
  return (
    <>
      <TopBar title="Settings" />
      <div className="page-content">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Configure your agent preferences and integrations.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 800 }}>
          {[
            { label: "LeetCode Username", value: "your_handle", type: "text" },
            { label: "Sync Frequency", value: "Daily at 9 AM", type: "select" },
            { label: "Notification Channel", value: "App only", type: "select" },
            { label: "Spaced Repetition Interval", value: "14 days", type: "select" },
          ].map(({ label, value, type }) => (
            <div key={label} className="card">
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: 8, fontFamily: "var(--font-mono)", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                {label}
              </div>
              <input
                defaultValue={value}
                style={{
                  width: "100%",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  padding: "7px 10px",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  outline: "none",
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--accent-amber)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
            </div>
          ))}
        </div>

        <button className="btn btn-amber" style={{ marginTop: 24 }}>
          Save Changes
        </button>
      </div>
    </>
  );
}
