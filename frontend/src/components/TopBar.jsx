import { Search, Bell, User, Copy, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { lemmaClient } from "../lemma-client";

export default function TopBar({ title = "Growth Dashboard", tabs = [], activeTab, onTabChange }) {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lcUsername, setLcUsername] = useState(localStorage.getItem("leetcodeUsername") || "");
  const dropdownRef = useRef(null);

  useEffect(() => {
    lemmaClient.users.current().then(setUser).catch(console.error);
  }, []);

  const handleSaveLcUsername = () => {
    localStorage.setItem("leetcodeUsername", lcUsername);
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = () => {
    if (!user?.id) return;
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(user.id);
      } else {
        // Fallback for non-HTTPS
        const el = document.createElement("textarea");
        el.value = user.id;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

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
      <div style={{ position: "relative" }} ref={dropdownRef}>
        <button 
          className="topbar-icon-btn" 
          aria-label="Profile"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <User size={14} />
        </button>

        {showDropdown && user && (
          <div style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 6,
            padding: 12,
            width: 240,
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            zIndex: 100
          }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
              {user.email}
            </div>
            <div style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 12, wordBreak: "break-all" }}>
              Auth ID: {user.id}
            </div>

            <div style={{ marginBottom: 12, borderTop: "1px solid var(--border)", paddingTop: 12 }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>
                LeetCode ID
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <input 
                  value={lcUsername}
                  onChange={(e) => setLcUsername(e.target.value)}
                  placeholder="e.g. kashyapanand21"
                  style={{ 
                    flex: 1, 
                    background: "var(--bg-secondary)", 
                    border: "1px solid var(--border)", 
                    borderRadius: 4, 
                    padding: "4px 8px", 
                    fontSize: "12px",
                    color: "var(--text-primary)"
                  }}
                />
                <button 
                  className="btn btn-outline" 
                  style={{ padding: "4px 8px", fontSize: "11px" }}
                  onClick={handleSaveLcUsername}
                >
                  Save
                </button>
              </div>
            </div>

            <button 
              className="btn btn-outline w-full" 
              style={{ justifyContent: "center", fontSize: "11px", height: 28 }}
              onClick={handleCopy}
            >
              {copied ? <Check size={12} color="var(--accent-green)" /> : <Copy size={12} />}
              {copied ? "Copied Auth ID!" : "Copy Auth ID"}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
