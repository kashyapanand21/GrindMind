import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";
import { approachDistribution } from "../data/realData";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "4px",
          padding: "6px 10px",
          fontSize: "11px",
          fontFamily: "var(--font-mono)",
          color: "var(--text-primary)",
        }}
      >
        {payload[0].payload.name}: {payload[0].value}%
      </div>
    );
  }
  return null;
};

export default function ApproachChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={approachDistribution} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <XAxis
            dataKey="name"
            tick={{ fill: "#666", fontSize: 9, fontFamily: "'JetBrains Mono', monospace" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#666", fontSize: 9, fontFamily: "'JetBrains Mono', monospace" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="value" radius={[2, 2, 0, 0]}>
            {approachDistribution.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginTop: "8px",
          justifyContent: "flex-end",
        }}
      >
        {approachDistribution.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2"
            style={{ fontSize: "11px", color: "var(--text-secondary)" }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "2px",
                background: item.color,
                flexShrink: 0,
              }}
            />
            {item.name} {item.value}%
          </div>
        ))}
      </div>
    </div>
  );
}
