import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  RefreshCw,
  History,
  Map,
  MessageSquare,
  Settings,
  BookOpen,
  Plus,
  Zap,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/revision-queue", icon: RefreshCw, label: "Revision Queue" },
  { to: "/problem-history", icon: History, label: "Problem History" },
  { to: "/skill-map", icon: Map, label: "Skill Map" },
  { to: "/ai-chat", icon: MessageSquare, label: "AI Chat" },
];

const footerItems = [
  { to: "/settings", icon: Settings, label: "Settings" },
  { to: "/docs", icon: BookOpen, label: "Docs" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="flex items-center">
          <div className="sidebar-logo-avatar">
            <Zap size={16} />
          </div>
          <div className="sidebar-logo-text">
            <div className="sidebar-logo-title">LC Growth<br />Agent</div>
            <div className="sidebar-status">
              <span className="status-dot" />
              Monitoring Active
            </div>
          </div>
        </div>
      </div>

      {/* New Analysis Button */}
      <button className="sidebar-new-btn">
        <Plus size={13} />
        New Analysis
      </button>

      {/* Main Nav */}
      <nav className="sidebar-nav">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `nav-item${isActive ? " active" : ""}`
            }
          >
            <Icon size={14} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer Nav */}
      <div className="sidebar-footer">
        {footerItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `nav-item${isActive ? " active" : ""}`
            }
          >
            <Icon size={14} />
            {label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
