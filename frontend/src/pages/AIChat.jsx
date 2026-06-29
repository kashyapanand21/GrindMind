import { useState, useRef, useEffect } from "react";
import { Send, RefreshCw, Database } from "lucide-react";
import TopBar from "../components/TopBar";
import { UserBubble, AgentBubble } from "../components/ChatBubble";
import { chatRecommendations } from "../data/realData";
import { useAssistantSession } from "lemma-sdk/react";
import { lemmaClient } from "../lemma-client";

export default function AIChat() {
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const session = useAssistantSession({
    client: lemmaClient,
    podId: lemmaClient.podId,
    agentName: "lemma-agent",
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session.messages, session.isStreaming]);

  const handleSendMessage = () => {
    const text = input.trim();
    if (!text) return;
    
    setInput("");
    session.sendMessage(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const sessionId = "#AX-992";

  const difficultyColor = { MED: "var(--accent-amber)", HARD: "var(--accent-red)", EASY: "var(--accent-green)" };

  return (
    <>
      <TopBar title="Growth Dashboard" tabs={["Streaks", "Solves", "Metrics"]} />
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 260px",
          overflow: "hidden",
          height: "calc(100vh - 56px)",
        }}
      >
        {/* ── Main Chat Area ─────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", borderRight: "1px solid var(--border)" }}>
          {/* Session header */}
          <div
            style={{
              padding: "14px 20px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "var(--bg-secondary)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 4,
                  background: "var(--accent-cyan-dim)",
                  border: "1px solid rgba(0,212,212,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Database size={13} color="var(--accent-cyan)" />
              </div>
              <span style={{ fontWeight: 600, fontSize: "13.5px" }}>Consultation Session</span>
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--accent-amber)",
              }}
            >
              Session ID: {sessionId}
            </span>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {session.messages.map((msg) =>
              msg.role === "user" ? (
                <UserBubble key={msg.id} content={msg.text} />
              ) : (
                <AgentBubble
                  key={msg.id}
                  content={msg.text}
                  recommendedStructure={msg.metadata?.recommendedStructure}
                  contextLinks={msg.metadata?.contextLinks}
                />
              )
            )}

            {session.isStreaming && (
              <div className="analyzing-indicator fade-in">
                <RefreshCw size={13} />
                Analyzing next optimal problem...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="chat-input-bar">
            <div className="chat-input-wrap">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your problem history or algorithms..."
              />
              <button className="chat-send-btn" onClick={handleSendMessage}>
                <Send size={13} />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="chat-slash-hints">
                {["/analyze", "/explain", "/hint"].map((cmd) => (
                  <span
                    key={cmd}
                    className="chat-slash-hint"
                    onClick={() => setInput(cmd + " ")}
                  >
                    {cmd}
                  </span>
                ))}
              </div>
              <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                Shift + Enter for new line
              </span>
            </div>
          </div>
        </div>

        {/* ── Right Sidebar ─────────────────────────────────────────────── */}
        <div
          style={{
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: "var(--bg-secondary)",
          }}
        >
          {/* Memory Status */}
          <div
            style={{
              padding: 16,
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                fontSize: "9.5px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                marginBottom: 10,
              }}
            >
              Memory Status
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "42px",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1,
                marginBottom: 4,
              }}
            >
              342
            </div>
            <div className="flex items-center justify-between">
              <span style={{ fontSize: "11.5px", color: "var(--text-secondary)" }}>Solves Indexed</span>
              <div className="live-sync">
                <span className="live-sync-dot" />
                Syncing
              </div>
            </div>
          </div>

          {/* Current Recommendations */}
          <div style={{ padding: 16, flex: 1, overflow: "hidden auto" }}>
            <div
              style={{
                fontSize: "12.5px",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: 4,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 14 }}>⟡</span>
              Current Recommendations
            </div>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: 14 }}>
              Based on weak patterns in recent sessions.
            </p>

            {chatRecommendations.map((rec) => (
              <div
                key={rec.id}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  padding: "10px 12px",
                  marginBottom: 10,
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent-amber)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
              >
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
                    {rec.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      fontWeight: 700,
                      padding: "2px 6px",
                      borderRadius: 3,
                      background: rec.difficulty === "HARD" ? "var(--accent-red-dim)" : "var(--accent-amber-dim)",
                      color: rec.difficulty === "HARD" ? "var(--accent-red)" : "var(--accent-amber)",
                      border: `1px solid ${rec.difficulty === "HARD" ? "rgba(231,76,60,0.3)" : "rgba(245,166,35,0.3)"}`,
                    }}
                  >
                    {rec.difficulty}
                  </span>
                </div>
                <div
                  className="flex items-center gap-1"
                  style={{
                    fontSize: "11px",
                    color: rec.type === "warning" ? "var(--accent-amber)" : "var(--text-muted)",
                  }}
                >
                  {rec.type === "warning" ? "⚠ " : "◎ "}
                  {rec.note}
                </div>
              </div>
            ))}

            <button className="btn btn-outline w-full" style={{ justifyContent: "center", marginTop: 8 }}>
              <RefreshCw size={12} />
              Regenerate List
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
