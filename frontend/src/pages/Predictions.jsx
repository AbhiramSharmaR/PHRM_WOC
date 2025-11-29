import React from "react";

function Predictions() {
  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-2xl font-semibold">Predictive Insights</h2>
        <p className="text-sm text-slate-400">
          AI-driven risk scores and anomaly detection powered by your trends.
        </p>
      </header>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-300">
        <p>
          Here you’ll call your Django <code>/api/predictions/</code> endpoint
          and visualize:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Risk levels for chronic conditions</li>
          <li>Outlier events from wearables (sleep, HR, steps)</li>
          <li>Suggested preventive check-ups or lifestyle adjustments</li>
        </ul>
      </div>
    </div>
  );
}

export default Predictions;
