import React from "react";

function HealthCards({ stats = {}}) {
  const items = [
    {
      label: "Risk Level",
      value: stats.riskLabel || "Low",
      desc: stats.riskDesc || "No major anomalies detected.",
    },
    {
      label: "Upcoming Medications",
      value: stats.medicationsDue || "2 today",
      desc: "Behavior-aware reminders active.",
    },
    {
      label: "Data Ownership",
      value: stats.permissionedParties || "You + 1 doctor",
      desc: "Decentralized consent on-chain.",
    },
    {
      label: "IoT Sync",
      value: stats.iotStatus || "Wearables connected",
      desc: "Streaming vitals in real-time.",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-slate-950/40"
        >
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {item.label}
          </h3>
          <p className="mt-2 text-lg font-semibold text-cyan-300">
            {item.value}
          </p>
          <p className="mt-1 text-xs text-slate-400">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default HealthCards;
