import { Clock, TriangleAlert } from "lucide-react";
import { DifficultyBadge } from "./Badges";

export default function RevisionCard({ item }) {
  const { title, difficulty, tag, timeAgo, urgent, label } = item;

  return (
    <div className="revision-item">
      <div className="flex items-center justify-between gap-2">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <span style={{ fontWeight: 600, fontSize: "13px", color: "var(--text-primary)" }}>
              {title}
            </span>
            <DifficultyBadge level={difficulty} />
          </div>
          <div className="flex items-center gap-2">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                background: "var(--bg-input)",
                color: "var(--text-muted)",
                padding: "2px 6px",
                borderRadius: "3px",
                border: "1px solid var(--border)",
              }}
            >
              {tag}
            </span>
            {timeAgo && (
              <span className="flex items-center gap-1 text-muted text-xs">
                <Clock size={10} />
                {timeAgo}
              </span>
            )}
            {urgent && (
              <span
                className="flex items-center gap-1 text-xs"
                style={{ color: "var(--accent-red)" }}
              >
                <TriangleAlert size={10} />
                {label}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
