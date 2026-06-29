import { Bot } from "lucide-react";

export function UserBubble({ content }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
      <span style={{ fontSize: "10.5px", color: "var(--text-muted)", marginRight: 4 }}>You</span>
      <div className="chat-bubble chat-bubble-user">{content}</div>
    </div>
  );
}

export function AgentBubble({ content, recommendedStructure, contextLinks }) {
  // Render inline code spans (backtick-wrapped)
  const renderContent = (text) => {
    const parts = text.split(/`([^`]+)`/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <code key={i}>{part}</code> : part
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
      <div className="flex items-center gap-2" style={{ marginLeft: 4 }}>
        <Bot size={12} color="var(--accent-cyan)" />
        <span style={{ fontSize: "10.5px", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)" }}>
          LC Growth Agent
        </span>
      </div>
      <div className="chat-bubble chat-bubble-agent" style={{ maxWidth: "80%" }}>
        <p style={{ marginBottom: recommendedStructure ? 12 : 0 }}>
          {renderContent(content)}
        </p>

        {recommendedStructure && (
          <div
            style={{
              background: "#0a1214",
              border: "1px solid #1a2a2a",
              borderRadius: "6px",
              padding: "12px",
              marginTop: 4,
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                marginBottom: 8,
                letterSpacing: "0.5px",
              }}
            >
              {recommendedStructure.title}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", whiteSpace: "pre-line" }}>
              {recommendedStructure.body}
            </div>
          </div>
        )}

        {contextLinks?.length > 0 && (
          <div
            className="flex items-center gap-2"
            style={{ marginTop: 10, flexWrap: "wrap" }}
          >
            <span style={{ fontSize: "10.5px", color: "var(--text-muted)" }}>Context Links:</span>
            {contextLinks.map((link, i) => (
              <span
                key={i}
                style={{
                  fontSize: "10.5px",
                  fontFamily: "var(--font-mono)",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border)",
                  borderRadius: "3px",
                  padding: "2px 8px",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                }}
              >
                {i === 0 ? "🔗 " : "🕐 "}
                {link}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
