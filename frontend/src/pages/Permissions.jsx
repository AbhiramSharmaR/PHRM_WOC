import React from "react";
import AccessibleButton from "../components/AccessibleButton";

function Permissions() {
  const mockPermissions = [
    { name: "Dr. Rao - Cardiology", access: "Read", onChain: true },
    { name: "City Hospital EHR", access: "Read/Write", onChain: true },
    { name: "Research Study (Anonymized)", access: "Anonymized", onChain: true },
  ];

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Data Permissions</h2>
          <p className="text-sm text-slate-400">
            You fully control who can access your health records.
          </p>
        </div>
        <AccessibleButton>Grant New Access</AccessibleButton>
      </header>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <table className="w-full text-xs text-left">
          <thead className="text-slate-400">
            <tr>
              <th className="py-2">Entity</th>
              <th className="py-2">Access Level</th>
              <th className="py-2">Blockchain Status</th>
              <th className="py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-slate-200">
            {mockPermissions.map((p) => (
              <tr key={p.name} className="border-t border-slate-800">
                <td className="py-2">{p.name}</td>
                <td className="py-2">{p.access}</td>
                <td className="py-2">
                  {p.onChain ? "Recorded on ledger" : "Off-chain"}
                </td>
                <td className="py-2 text-right">
                  <button className="text-xs text-red-400 hover:underline">
                    Revoke
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[10px] text-slate-500 mt-3">
          Later this will talk to your blockchain smart contract via the Django
          backend to manage decentralized consent.
        </p>
      </div>
    </div>
  );
}

export default Permissions;
