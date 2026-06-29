import { Search, Bell, User } from "lucide-react";
import { useState } from "react";

export default function TopBar({ title = "Growth Dashboard", tabs = [], activeTab, onTabChange }) {
  const [query, setQuery] = useState("");

  return (
    <header className="topbar">
      <div className="topbar-title-group">
        <span className="topbar-title">{title}</span>
        {tabs.length > 0 && (
          <div className="topbar-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`topbar-tab${activeTab === tab ? " active" : ""}`}
                onClick={() => onTabChange?.(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="topbar-spacer" />

      {/* Search */}
      <div className="topbar-search">
        <Search size={12} color="var(--text-muted)" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search patterns, problems..."
        />
      </div>

      {/* Agent Status */}
      <button className="agent-status-btn">
        <span className="dot" />
        Agent Status
      </button>

      {/* Bell */}
      <button className="topbar-icon-btn" aria-label="Notifications">
        <Bell size={14} />
      </button>

      {/* Avatar */}
      <button className="topbar-icon-btn" aria-label="Profile">
        <User size={14} />
      </button>
    </header>
  );
}
