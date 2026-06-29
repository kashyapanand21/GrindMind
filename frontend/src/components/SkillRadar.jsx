import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { radarData } from "../data/realData";

export default function SkillRadar() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={radarData} outerRadius={85}>
        <PolarGrid
          stroke="#1e1e1e"
          gridType="polygon"
        />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "#666", fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}
          tickLine={false}
        />
        <Radar
          dataKey="value"
          stroke="#f5a623"
          fill="#f5a623"
          fillOpacity={0.2}
          strokeWidth={1.5}
          dot={{ fill: "#f5a623", r: 3 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
