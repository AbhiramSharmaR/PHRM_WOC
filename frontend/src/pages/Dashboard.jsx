import React from "react";
import HealthCards from "../components/HealthCards";

function Dashboard() {
  const stats = {
    riskLabel: "Moderate",
    riskDesc: "Detected elevated nightly HR and reduced sleep duration.",
    medicationsDue: "1 pill in 2 hours",
    permissionedParties: "You + 2 physicians",
    iotStatus: "Wearable synced | EHR connected",
  };

  return (
    <div className="space-y-8">
      <HealthCards stats={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 shadow-xl shadow-black/40 backdrop-blur-md">
          <h3 className="text-lg font-semibold text-cyan-300">Recent Anomaly Insight</h3>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            It appears your resting heart rate has been consistently high this week.
            Consider checking stress levels and reviewing physical recovery patterns.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 shadow-xl shadow-black/40 backdrop-blur-md">
          <h3 className="text-lg font-semibold text-cyan-300">Upcoming Reminders</h3>
          <ul className="mt-2 text-sm space-y-2 text-slate-300">
            <li>💊 Vitamin D Supplement — Tomorrow 8 AM</li>
            <li>📍 Cardiology Follow-up — Tuesday 04:00 PM</li>
            <li>❤️ BP Check — Daily 8 PM</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
