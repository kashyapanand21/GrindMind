export default function PatternCard({ title, mastery, solved, complexity, color }) {
  return (
    <div className="card" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: color,
          opacity: 0.04,
          transform: "translate(30px, -30px)",
          pointerEvents: "none",
        }}
      />
      <div className="flex justify-between items-center mb-2">
        <span style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--text-primary)" }}>
          {title}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "20px",
            fontWeight: 700,
            color,
          }}
        >
          {mastery}%
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: "3px",
          background: "var(--bg-input)",
          borderRadius: "2px",
          marginBottom: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${mastery}%`,
            background: color,
            borderRadius: "2px",
            transition: "width 1s ease",
          }}
        />
      </div>

      <div className="flex justify-between items-center">
        <span style={{ fontSize: "11.5px", color: "var(--text-secondary)" }}>
          {solved} Solved
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            background: "var(--bg-input)",
            border: "1px solid var(--border)",
            borderRadius: "3px",
            padding: "2px 6px",
            color: color,
          }}
        >
          {complexity}
        </span>
      </div>
    </div>
  );
}
