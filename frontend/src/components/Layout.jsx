import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Activity, ShieldCheck } from "lucide-react";
import VoiceAssistant from "./VoiceAssistant";

const navItems = [
  { path: "/", label: "Dashboard", icon: <Home size={18} /> },
  { path: "/records", label: "Health Records", icon: <FileText size={18} /> },
  { path: "/predictions", label: "Predictive Insights", icon: <Activity size={18} /> },
  { path: "/permissions", label: "Permissions", icon: <ShieldCheck size={18} /> },
];

function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 p-6 backdrop-blur-xl bg-slate-900/40">
        <h1 className="text-2xl font-bold text-cyan-400 tracking-tight mb-8">
          Health<span className="text-slate-200">AI</span>
        </h1>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all font-medium ${
                  active
                    ? "bg-cyan-400 text-slate-900 shadow-lg shadow-cyan-500/40"
                    : "hover:bg-slate-800 hover:text-cyan-300"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Personal Health <span className="text-cyan-400">Intelligence</span>
            </h2>
            <p className="text-sm text-slate-400">
              AI-powered proactive health. Predictive. Private. User-controlled.
            </p>
          </div>
          <VoiceAssistant />
        </header>
        {children}
      </main>
    </div>
  );
}

export default Layout;
