import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import RevisionQueue from "./pages/RevisionQueue";
import ProblemHistory from "./pages/ProblemHistory";
import SkillMap from "./pages/SkillMap";
import AIChat from "./pages/AIChat";
import SettingsPage from "./pages/SettingsPage";

function NotFound() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column", gap: 12 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 48, color: "var(--accent-amber)" }}>404</span>
      <p style={{ color: "var(--text-muted)" }}>Page not found</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <div className="main-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/revision-queue" element={<RevisionQueue />} />
            <Route path="/problem-history" element={<ProblemHistory />} />
            <Route path="/skill-map" element={<SkillMap />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
